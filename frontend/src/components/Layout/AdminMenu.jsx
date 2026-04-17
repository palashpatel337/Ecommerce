import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div className="max-w-xs m-1 mr-3 flex flex-col text-center">
      <h1 className="pb-5 font-semibold text-lg">Admin Panel</h1>

      <NavLink
        to="/dashboard/admin/create-category"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`
        }
      >
        Create Category
      </NavLink>

      <NavLink
        to="/dashboard/admin/create-product"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`
        }
      >
        Create Product
      </NavLink>

      <NavLink
        to="/dashboard/admin/products"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`
        }
      >
        All Products
      </NavLink>

      <NavLink
        to="/dashboard/admin/users"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`
        }
      >
        Users
      </NavLink>


      <NavLink
        to="/dashboard/admin/orders"
        className={({ isActive }) =>
          `inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium border border-gray-200 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg transition 
          ${isActive ? "bg-blue-600 text-white" : "bg-white text-gray-800"}`
        }
      >
        Orders
      </NavLink>
    </div>
  )
}

export default AdminMenu
