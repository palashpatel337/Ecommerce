import React from 'react'
import Layout from '../components/Layout/Layout'


function PrivacyAndPolicy() {
  return (
    <Layout title={'Privacy Policy'}>
        <div className="w-[80vw] h-[50vh] flex justify-center items gap-3 absolute top-[calc(50vh-30vh)] left-[calc(50vw-40vw)]">
            <div className='h-[35vh] w-[40vw] p-7'>
                <img src='https://media.istockphoto.com/id/1279275886/vector/shield-with-lock-on-computer-display.jpg?s=2048x2048&w=is&k=20&c=QTB9MD_5aQvGWXyn7caGEcKGbukWdgjZxL4ExP9Vb-0='></img>
            </div>
            <div className='w-[40vw] px-5 mt-9'>
                <h1 className='text-5xl font-bold my-5'>Privacy Protection</h1>
                <p className='font-normal mt-9'>We use data to make shopping on MUIN and our products better and more convenient for you. Protecting your privacy and the security of your data has always been a top priority for MUIN.

Trusting us with your data means we can show you items inspired by your previous purchases, whether that's a new line of clothing, a film or TV show, or a great book that was just released. It also means you don't have to enter your payment and delivery information every time you make an order.</p>
            </div>
        </div>
    </Layout>
  )
}

export default PrivacyAndPolicy