import React from 'react'
import Layout from '../components/Layout/Layout'


const Contact = () => {
  return (
    <Layout title={'Contact us'}>
      <div className='h-full w-full relative'>
        <div className='w-[80vw] h-full flex gap-7 absolute top-[calc(50vh-35vh)] left-[calc(50vw-35vw)]'>
          <div className='w-[35vw] h-[25vw]  p-3'>
            <img src='https://media.istockphoto.com/id/938430346/photo/managing-the-days-inquiries.jpg?s=2048x2048&w=is&k=20&c=6LA4U5OKbv293cBQUH2LLaK4X2tMv96HQGpSPQ7sX7U='/>
          </div>
          <div className='w-[35vw] h-[25vw] p-3'>
            <div className='w-full h-[8vh] text-white bg-zinc-800 px-5 flex items-center justify-center'>
              <h1 className='text-4xl font-bold'>Contact Us</h1>
            </div>
            <div className='px- py-2 text-xl font-semibold'>
              <p>For any product details and queries feel free to contact we are 24 x 7 available.</p>
            </div>
            <div className='contactDetail mt-3 text-xl text-zinc-600 px- font-semibold leading-10'>
              <ul>
                <li>Telephone - 538749093844</li>
              </ul>
              <ul>
                <li>Email - muin454@gmail.com</li>
              </ul>
              <ul>
                <li>Phone - 9403848484</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </Layout>
)
}

export default Contact