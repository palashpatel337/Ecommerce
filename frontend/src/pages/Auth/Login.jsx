import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useLocation, useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/Auth';
import { supabase } from '../../../config/supabaseClient';


function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth();
      const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);
    const location = useLocation()
    const navigate = useNavigate()


      useEffect(() => {
        // Get initial session
        const getSession = async () => {
          const { data } = await supabase.auth.getSession();
          setUser(data?.session?.user || null);
    
          if (data?.session?.user) {
            getInstruments();
          }
        };
    
        getSession();
    
        // Listen for auth changes
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user || null);
    
            if (session?.user) {
              getInstruments();
            } else {
              setInstruments([]);
            }
          }
        );
    
        return () => {
          authListener.subscription.unsubscribe();
        };
      }, []);
    
      // Google Login
      const handleGoogleLogin = async () => {
        try {
          setLoading(true);
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
          });
    
          if (error) {
            console.log("Login Error:", error.message);
          }
        } catch (err) {
          console.log("Something went wrong:", err);
        } finally {
          setLoading(false);
        }
      };
    
      // Logout
      const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
      };
    
      // Fetch instruments
      async function getInstruments() {
        const { data, error } = await supabase.from("instruments").select("*");
    
        if (error) {
          console.log("Fetch Error:", error.message);
          return;
        }
    
        setInstruments(data);
      }
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
                {email,password}
            );
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user : res.data.user,
                    token : res.data.token,
                })
                console.log(res.data.user.role);
                
                localStorage.setItem("auth",JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
            
        }
    }
    

  return (
    <Layout>
        <div className="w-full h-full relative bg-red-300">
            <div className="w-[28vw] h-[42vh] absolute px-5 py-3 top-[calc(50vh-29vh)]  left-[calc(50vw-14vw)] rounded-md shadow-xl/30 border-1 border-zinc-200">
                <h1 className='text-4xl font-normal font-family mb-3'>Sign in</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='h-[6vh] w-[25vw] mt-3   py-3 border-b-2 border-zinc-900 outline-none  font-normal font-family ' placeholder='Enter Your Email' type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='h-[6vh] w-[25vw] mt-3 py-3 border-b-2 border-zinc-900 outline-none  font-normal font-family ' placeholder='Enter Your Password' type="password" />
                    <button className='h-[6vh] w-[25vw] bg-blue-500 text-white mt-6 rounded-md px-5 py-3  font-normal font-family hover:bg-blue-600' name='Login'  type="submit" >LOGIN</button>
                    <div className='mt-2'>
                        <a href='forgot-Password'>
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
                  <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Supabase Google Auth
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          Login using Google to access instruments
        </p>

        {/* If user is not logged in */}
        {!user ? (
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-semibold"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Continue with Google
                </>
              )}
            </button>
          </div>
        ) : (
          <>
            {/* User Info */}
            <div className="mt-6 flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <img
                src={user.user_metadata?.avatar_url}
                alt="profile"
                className="w-14 h-14 rounded-full border"
              />

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {user.user_metadata?.full_name}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full mt-4 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition font-semibold"
            >
              Logout
            </button>

            {/* Instruments List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Instruments List
              </h3>

              {instruments.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  No instruments found in database.
                </p>
              ) : (
                <ul className="space-y-2">
                  {instruments.map((instrument) => (
                    <li
                      key={instrument.id}
                      className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-700">
                        {instrument.name}
                      </span>
                      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                        Active
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>

        </div>
    </Layout>

)
}

export default Login