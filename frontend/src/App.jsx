import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import PageNotFound from './pages/PageNotFound'
import PrivacyAndPolicy from './pages/PrivacyAndPolicy'
import About from './pages/About'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Dashboard from './pages/user/Dashboard'
import { ToastContainer } from 'react-toastify';
import cors from 'cors';
import PrivateRoute from './components/routes/Private'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from './pages/Admin/Users'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'
import Orders from './pages/user/Orders'
import Cart from './pages/user/Cart'
import Products from './pages/Admin/Products'
import UpdateProduct from './pages/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProduct from './pages/CategoryProduct'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'
import Google from './pages/Google'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/product/:slug" element={<ProductDetails/>}></Route>
        <Route path="/categories" element={<Categories/>}></Route>
        <Route path="/cart" element={<CartPage/>}></Route>
        <Route path="/category/:slug" element={<CategoryProduct/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy_policy" element={<PrivacyAndPolicy />} />
        <Route path="/google" element={<Google />} />


        <Route path='/dashboard' element={<PrivateRoute/>}>
          <Route path='user' element={<Dashboard/>} />
          <Route path='user/profile' element={<Profile/>} />
          <Route path='user/update-profile' element={<EditProfile/>} />
          <Route path='user/orders' element={<Orders/>} />
          <Route path='user/cart' element={<Cart/>} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute/>}>
          <Route path='admin' element={<AdminDashboard/>} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/update-product/:slug' element={<UpdateProduct/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/users' element={<Users/>} />
          <Route path='admin/orders' element={<AdminOrders/>} />
        </Route>
        
    
        <Route path="*" element={<PageNotFound />} />
      </Routes>
</>
  )
}

export default App