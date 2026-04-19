import React from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/Auth';

export default function Profile() {
    const [auth, setAuth] = useAuth();
  return (
    <Layout title={'Dashboard - Orders'}>
        <div className=' grid grid-cols-4 mr-5'>
            <div className='p-5 col-span-1 text-xl border-r-5 border-zinc-300'>
                <UserMenu></UserMenu>
            </div>
            <div className='p-5 col-span-3'>
                <h1>Profile</h1>
                <p>Welcome, {auth.user?.name}!</p>
                <p>Email: {auth.user?.email}</p>
                <p>Phone: {auth.user?.phone}</p>
                <p>Address: {auth.user?.address}</p>
            </div>
        </div>
    </Layout>
  )
}
