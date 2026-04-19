import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if(data?.error){
        toast.error(data.error)
      } else {
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth")
        ls= JSON.parse(ls)
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className=" ">
        <div className="w-[28vw] h-[60vh] absolute  px-5 py-3 top-[calc(50vh-35vh)]  left-[calc(50vw-14vw)] rounded-md shadow-xl/30 border-1 border-zinc-200">
          <h1 className="text-4xl text-center font-normal font-family mb-3 mx-15 border-b-1">
            User Profile
          </h1>
          <form action="" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border-zinc-400 text-zinc-600 h-[6vh] w-[25vw] mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family "
              placeholder={auth?.user?.name}
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border-zinc-400 text-zinc-600 h-[6vh] w-[25vw] mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family "
              placeholder={auth?.user?.email}
              type="email"
              disabled
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border-zinc-400 text-zinc-600 h-[6vh] w-[25vw] mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family "
              placeholder="Enter Your Password"
              type="password"
            />
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="border-zinc-400 text-zinc-600 h-[6vh] w-[25vw] mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family "
              placeholder={auth?.user?.phone}
              type="number"
            />
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="border-zinc-400 text-zinc-600 h-[6vh] w-[25vw] mt-3  px-5 py-3 border-b-2 outline-none hover:bg-zinc-200 font-normal font-family "
              placeholder={auth?.user?.address}
              type="text"
            />
            <button
              className="h-[6vh] w-[25vw] bg-indigo-900 text-white mt-6 rounded-md px-5  text-xl hover:bg-indigo-600"
              type="submit"
            >
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
