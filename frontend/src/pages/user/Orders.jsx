import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import moment from 'moment'


const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([])

    const getOrders = async() => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/orders`)
            setOrders(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])
  return (
    <Layout title={'Dashboard - Orders'}>
        <div className=' grid grid-cols-4 mr-5'>
            <div className='p-5 col-span-1 text-xl border-r-5 border-zinc-300'>
                <UserMenu></UserMenu>
            </div>
            <div className='p-5 col-span-3'>
                <h1 className='text-4xl text-center mb-5'>Order Details</h1>
                    <div className="">
                        <table className="table w-full border-collapse border border-gray-300 p-5">
                        <thead>
                            <tr className="">
                            <th className="text-cenetr w-5 ">#</th>
                            <th className="text-center w-5 ">Status</th>
                            <th className="text-center w-5 ">Buyer</th>
                            <th className="text-center w-5 ">Date</th>
                            <th className="text-center w-5 ">Payment</th>
                            <th className="text-center w-5 ">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map((o, i) => (
                            <React.Fragment key={o._id}>
                            {/* Order summary row */}
                            <tr className="bg-gray-50 hover:bg-gray-100 transition">
                                <td className="text-center border p-2">{i + 1}</td>
                                <td className="text-center border p-2">{o?.status}</td>
                                <td className="text-center border p-2">{o?.buyer?.name || "Guest"}</td>
                                <td className="text-center border p-2">
                                {moment(o?.createdAt).fromNow()}
                                </td>
                                <td className="text-center border p-2">
                                {o?.payment?.success ? (
                                    <span className="text-green-600 font-medium">Successful</span>
                                ) : (
                                    <span className="text-red-600 font-medium">Failed</span>
                                )}
                                </td>
                                <td className="text-center border p-2">{o?.products?.length}</td>
                            </tr>

                            {/* Products card list below each order */}
                            <tr>
                                <td colSpan="6" className="p-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {o?.products?.map((p) => (
                                    <div
                                        key={p._id}
                                        className="flex bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
                                    >
                                        <div className="w-32 h-32 flex-shrink-0">
                                        <img
                                            alt={p.name}
                                            src={p.photo}
                                            className="object-cover w-full h-full"
                                        />
                                        </div>
                                        <div className="p-3 flex flex-col justify-between">
                                        <h2 className="text-lg font-semibold">{p.name}</h2>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {p?.description}
                                        </p>
                                        <p className="text-indigo-600 font-bold mt-1">₹{p.price}</p>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </td>
                            </tr>
                            </React.Fragment>
                        ))}
                        </tbody>

                        </table>
                        <div className="m-5">
                            

                        </div>
                    </div>
            </div>
        </div>
    </Layout>
)
}

export default Orders