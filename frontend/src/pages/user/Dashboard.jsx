import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/Layout/UserMenu'


const Dashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title={'Muin - Dashboard'}>
        <div className=' grid grid-cols-3 mr-5'>
            <div className='p-5 col-span-1 text-xl'>
                <UserMenu></UserMenu>
            </div>
            <div className='p-5 col-span-2'>
                <h1 className='text-xl text-center'>User Details</h1>
                <div className='border-1 border-zinc-900 p-5'>
                <h2>User Name : {auth?.user?.name}</h2>
                <h2>User Email : {auth?.user?.email}</h2>
                <h2>User Phone : {auth?.user?.phone}</h2>
                </div>
            </div>
        </div>
    </Layout>
)
}

export default Dashboard