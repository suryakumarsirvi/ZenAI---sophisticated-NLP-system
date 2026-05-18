import React, { useState } from 'react'
import Login from '../features/auth/components/Login';
import Register from '../features/auth/components/Register';
import { useNavigate } from 'react-router';
import useAuth from '../features/auth/hooks/useAuth';

const Authlayout = ({ mode: initialMode }) => {
  const { handleRegister, handleLogin } = useAuth();
  const navigate = useNavigate();
  const [toggleForm, setToggleForm] = useState(initialMode);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    const { value, name } = e.target;

    setFormData((prev) => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;

    const res = await handleRegister(formData);

    setFormData({
      fullname: "",
      email: "",
      password: ""
    });

    navigate('/home')
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!formData) return;
    console.log("start")

    const res = await handleLogin(formData);
    console.log("last")

    setFormData({
      fullname: "",
      email: "",
      password: ""
    });

    navigate('/home')
  }


  return (
    <div className='h-full w-full gap-4 flex items-center justify-center flex-col'>
      {
        toggleForm === 'login' ?
          <Login
            handleChange={handleChange}
            handleLoginSubmit={handleLoginSubmit}
            formData={formData}
            setFormData={setFormData}
          /> :
          <Register
            handleChange={handleChange}
            handleRegisterSubmit={handleRegisterSubmit}
            formData={formData}
            setFormData={setFormData}
          />
      }
      <button className='bg-black cursor-pointer text-sm px-4 py-2 rounded-md text-white' onClick={() => setToggleForm((prev) => prev === 'login' ? "register" : "login")}>{
        toggleForm === "login" ? "Register" : "Login"
      }</button>
    </div>
  )
}

export default Authlayout