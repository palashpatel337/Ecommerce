import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'


function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
                {name,email,password,answer,phone,address}
            );
            if (res.data.success) {
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
        <div className="relativ ">
            <div className="w-100 h-130 absolute  px-5 py-3 top-[calc(50vh-39vh)]  left-[calc(50vw-14vw)] rounded-md shadow-xl/30 border-1 border-zinc-200">
                <h1 className='text-4xl font-normal font-family mb-3'>New User, Register</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='Enter Your Name' type="text" />
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='Enter Your Email' type="email" />
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='Enter Your Password' type="password" />
                    <input onChange={(e) => setPhone(e.target.value)} value={phone} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='Enter Your Phone' type="number" />
                    <input onChange={(e) => setAddress(e.target.value)} value={address} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='Enter Your Address' type="text" />
                    <input onChange={(e) => setAnswer(e.target.value)} value={answer} className='h-[6vh] w-90 mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family ' placeholder='What is your favourite sport?' type="text" />
                    <button className='h-[6vh] w-[25vw] bg-indigo-900 text-white mt-6 rounded-md px-5  text-xl hover:bg-indigo-600'  type="submit">Sign up</button> 
                </form>
            </div>
        </div>
    </Layout>

)
}

export default Register