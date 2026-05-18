import {createBrowserRouter, Navigate} from 'react-router';
import Home from '../features/others/Home';
import Login from '../features/auth/components/Login';
import Register from '../features/auth/components/Register';
import Authlayout from '../layout/Authlayout';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/login',
        element: 
        <Authlayout mode="login">
            <Login />
        </Authlayout>
    },
    {
        path: "/register",
        element: 
        <Authlayout mode="register">
            <Register />
        </Authlayout>
    },
    {
        path: '/home',
        element: 
        <Home />
    }
]);

export default Router;