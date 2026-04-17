import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'


const ForgotPassword = () => {

    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
                {email,newPassword,answer}
            );
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
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
                <h1 className='text-4xl font-normal font-family mb-3'>Reset Password</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='h-[6vh] w-[25vw] mt-3   py-3 border-b-2 border-zinc-900 outline-none  font-normal font-family ' placeholder='Enter your email' type="text" />
                    <input onChange={(e) => setAnswer(e.target.value)} value={answer} className='h-[6vh] w-[25vw] mt-3   py-3 border-b-2 border-zinc-900 outline-none  font-normal font-family ' placeholder='What is your favourite sport?' type="text" />
                    <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} className='h-[6vh] w-[25vw] mt-3 py-3 border-b-2 border-zinc-900 outline-none  font-normal font-family ' placeholder='Enter new password' type="password" />
                    <button className='h-[6vh] w-[25vw] bg-blue-500 text-white mt-6 rounded-md px-5 py-3  font-normal font-family hover:bg-blue-600' name=''  type="submit" >Reset New Password</button>
                </form>
            </div>
        </div>
    </Layout>

)
}


 

export default ForgotPassword