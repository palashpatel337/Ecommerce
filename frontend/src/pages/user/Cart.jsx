import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/Layout/UserMenu'


const Cart = () => {
    const [auth] = useAuth();
  return (
    <Layout title={'Ecommerce - Cart'}>
        <div className=' grid grid-cols-3 mr-5'>
            <div className='p-5 col-span-1 text-xl'>
                <UserMenu></UserMenu>
            </div>
            <div className='p-5 col-span-2'>
                <h1 className='text-xl text-center'>Cart Items</h1>
                <div className='border-1 border-zinc-900 p-5'>

                </div>
            </div>
        </div>
    </Layout>
)
}

export default Cart