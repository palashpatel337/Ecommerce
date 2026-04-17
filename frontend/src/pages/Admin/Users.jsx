import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const Users = () => {
  return (
    <Layout title={'Dashboard - Users'}>
            <div className=' grid grid-cols-3'>
                <div className='p-5 col-span-1 text-xl'>
                    <AdminMenu>

                    </AdminMenu>
                </div>
                <div className='p-5 col-span-2 mr-5'>
                    <h1 className='text-xl p-5'>Users</h1>
                    <div className='border-1 border-zinc-900 p-5'>
                    
                    </div>
                </div>
            </div>
        </Layout>  )
}

export default Users