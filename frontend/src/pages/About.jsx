import React from 'react'
import Layout from '../components/Layout/Layout'


const About = () => {
  return (
    <Layout title={"About-us"}>
      <div className='h-[75vh] w-full relative'>
        <div className='w-[80vw] h-full flex gap-7 absolute top-[calc(50vh-35vh)] left-[calc(50vw-35vw)]'>
          <div className='w-[35vw] h-[25vw]  p-3'>
            <img src='https://imgs.search.brave.com/BKnBQrArJ2ZLIWDFVMTYbbM8_aflbSYVDBb6p87I7Bk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YWJvdXQtdXMtcGFn/ZS1jb25jZXB0LWls/bHVzdHJhdGlvbl8x/MTQzNjAtMzkzMS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw'/>
          </div>
          <div className='w-[35vw] h-[25vw] p-3'>
            <h1 className='text-5xl font-bold'>About Us</h1>
            <div className='w-full h-full flex py-[5vh] font-normal text-zinc-700 font-family text-xl justify-center'>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque impedit asperiores debitis, recusandae sint similique iure autem ipsum natus mollitia cupiditate, minima ratione laborum eligendi. Saepe culpa perferendis dolores rerum!</p>
            </div>
            
          </div>
        </div>

      </div>    
    </Layout>
  )
}

export default About