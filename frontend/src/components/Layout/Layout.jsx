import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { ToastContainer } from 'react-toastify';


const Layout = ({children, description,title, author, keywords}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />                
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
          <Header />
              <main style = {{minHeight: '79vh',marginTop: '7vh',zIndex: '0'}} >
                <ToastContainer/>
                {children} 
              </main>
          <Footer />
    </div>
  );
}
Layout.defaultProps = {
  title: "Ecommerce App",
  description: "MERN stack project",
  author: "Palash"
}

export default Layout