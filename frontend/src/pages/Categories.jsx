import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'



const Categories = () => {
  const categories = useCategory()


  return (
    <Layout>
      <h1 className='mx-15 my-5 text-3xl'>All Categories</h1>
      <div className="m-10">
        {categories?.map((c) => (
          <div className="w-50  bg-blue-500 m-5" key={c._id}>
            <Link
              to={`/category/${c.slug}`} 
              className="block px-4 py-2 text-sm text-gray-100 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
              >
              {c.name}
              </Link>


          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Categories