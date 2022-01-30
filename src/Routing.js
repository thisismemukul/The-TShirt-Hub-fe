import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoutes from './auth/helper/PrivateRoutes';
import AdminDashboard from './user/AdminDashBoard';
import UserDashboard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategory';
import Cart from './core/Cart';
import Wishlist from './core/Wishlist';
const Routing = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/signup' element={<Signup />} />
            <Route exact path='/signin' element={<Signin />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/wishlist' element={<Wishlist />} />
            {/* <Route path='*' element={<ErrorPage />} /> */}
            <Route exact path='/' element={<PrivateRoutes />}>
                <Route exact path='/user/dashboard' element={<UserDashboard />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/create/category' element={<AddCategory />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/categories' element={<ManageCategories />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/category/update/:categoryId' element={<UpdateCategory />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/create/product' element={<AddProduct />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/products' element={<ManageProducts />} />
            </Route>
            <Route exact path='/' element={<AdminRoute />}>
                <Route exact path='/admin/product/update/:productId' element={<UpdateProduct />} />
            </Route>
        </Routes>
    );
};

export default Routing;
