import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";


const SearchInput = () => {
    const [values, setValues] = useSearch()

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/search/${values.keyword}`)
            setValues({...values, results: data})
            navigate('/search')
        } catch (error) {
            console.log(error);
            
        }

    }

  return (
    <div className=''>
        <form onSubmit={handleSubmit}>
            <div className=' h-10 mr-5 flex'>
            <div className='border-2 border-zinc-200 rounded-l-lg flex pl-5'>
            <input className='w-80 items-center  outline-none' type="search" placeholder='Search' value={values.keyword} onChange={(e) => setValues({...values, keyword: e.target.value})} />
            </div>
            <button className='bg-indigo-800 text-4xl text-zinc-100 rounded-r-lg  px-3' type='submit'><IoIosSearch /></button>
            </div>
        </form>
    </div>
)
}

export default SearchInput