import React from 'react'

export default function Profile() {
  return (
    <Layout title={'Dashboard - Orders'}>
        <div className=' grid grid-cols-4 mr-5'>
            <div className='p-5 col-span-1 text-xl border-r-5 border-zinc-300'>
                <UserMenu></UserMenu>
            </div>
        </div>
    </Layout>
  )
}
