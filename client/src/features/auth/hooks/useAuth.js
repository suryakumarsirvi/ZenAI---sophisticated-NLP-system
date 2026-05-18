import React from 'react'
import { loginService, registerService } from '../services/auth.service'
import {useDispatch, useSelector} from "react-redux"
import {setUser} from '../store/auth.slice'

const useAuth = () => {
    const dispatch = useDispatch();
    const handleRegister = async(formData) =>{
        const res = await registerService(formData);
        console.log(res);
        dispatch(setUser(res.data));
    }

    const handleLogin = async(formData) =>{
        const res = await loginService(formData);
        console.log(res);
        dispatch(setUser(res.data));
    }

    return {
        handleRegister,
        handleLogin,
    }
}

export default useAuth