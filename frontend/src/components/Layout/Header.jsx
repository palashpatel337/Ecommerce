import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'
import Example from '../Dropdown'
import { RiLuggageCartLine } from "react-icons/ri";
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { Button, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useCart } from '../../context/Cart'






const Header = () => {
  const [auth,setAuth] = useAuth();
  const categories = useCategory()
  const [cart] = useCart();


  return (
    <nav className='h-[7vh] w-full fixed top-0 z-1000  bg-zinc-100 border-1 border-zinc-300 shadow-md shadow-zinc-400  flex justify-between items-center max-w-6xl'>
      <div className="relative mx-5 mb-2 flex items-center">
        <NavLink
          to="/"
          className="text-3xl font-bold tracking-tight text-zinc-900"
        >
          mui<span className="text-indigo-500">n</span>
        </NavLink>

        {/* Accent underline */}
        <span className="absolute -bottom-1 left-0 h-1 w-8 rounded-full bg-indigo-500"></span>
      </div>
      
      <div className='text-zinc-600 text-sm pt-2 mx-1 hover:underline font-family font-thin cursor-pointer uppercase  '>
        <NavLink to='/'>
          home
        </NavLink>
      </div>
      <div className='text-zinc-600 text-sm pt-2 mx-1 hover:underline font-family font-thin cursor-pointer uppercase  '>
        <NavLink to='/trending'>
        </NavLink>
            trending
      </div>

          <div>
            <Menu as="div" className="relative inline-block">
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                <p>CATEGORIES</p>
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                  <MenuItem >
                    <Link 
                      to={`/categories`}
                      
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      All Categories
                    </Link>

                  </MenuItem>
                
                <div className="py-1">
                  {categories.map((c) => (
                  <MenuItem key={c._id}>
                    <Link 
                      to={`/category/${c.slug}`}
                      
                      className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    >
                      {c?.name}
                    </Link>

                  </MenuItem>
                  ))} 
                  
                </div>
              </MenuItems>
            </Menu>
          </div>
      {
        !auth.user ? (<>
      <div className='text-zinc-600 text-sm pt-2 mx-1 hover:underline font-family font-thin cursor-pointer uppercase  '>
          <NavLink to='/register'>
            register
          </NavLink>
        </div>
        <div className='text-zinc-600 text-sm pt-2 mx-1 hover:underline font-family font-thin cursor-pointer uppercase  '>
          <NavLink to='/login'>
            login
          </NavLink>
        </div>
        </>) : (<>

        <Example></Example>

        </>)
      }
      <div className='text-zinc-600 text-sm pt-2 mx-1 hover:underline font-family font-thin cursor-pointer uppercase  '>
        <NavLink to='/cart' className="flex">
        <div className='pt-3'>
            cart {cart?.length}
        </div>
        <div className='text-3xl pl-1 pb-2'>

            <RiLuggageCartLine />
        </div>

        </NavLink>    
      </div>  
        <div className='p-0 b-0'>
          <SearchInput></SearchInput>
        </div>

      </nav>
  )
}

export default Header