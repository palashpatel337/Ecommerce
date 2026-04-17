import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <div className="max-w-xs m-4 flex flex-col text-center">
      <h1 className="pb-5 font-semibold text-2xl">User Panel</h1>

      <NavLink
        to="/dashboard/user/profile"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`
        }
      >
        Profile
      </NavLink>

      <NavLink
        to="/dashboard/user/orders"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`
        }
      >
        Orders
      </NavLink>

      <NavLink
        to="/dashboard/user/cart"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"}`
        }
      >
        Cart
      </NavLink>
    </div>
  )
}

export default UserMenu
