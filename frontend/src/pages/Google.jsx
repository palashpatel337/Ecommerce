import { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";


function Google() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState([]);

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
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
  );
}

export default Google;