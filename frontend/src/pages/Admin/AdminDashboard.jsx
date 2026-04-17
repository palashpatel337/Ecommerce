import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/Auth'


const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout>
        <div className=' grid grid-cols-2'>
            <div className='p-5 text-xl'>
                <AdminMenu></AdminMenu>
            </div>
            <div className='p-5 '>
                <h1 className='text-xl text-center'>Admin Details</h1>
                <div className='border-1 border-zinc-900 p-5'>
                <h2>Admin Name : {auth?.user?.name}</h2>
                <h2>Admin Email : {auth?.user?.email}</h2>
                <h2>Admin Phone : {auth?.user?.phone}</h2>
                </div>
            </div>
        </div>
    </Layout>
)
}

export default AdminDashboard