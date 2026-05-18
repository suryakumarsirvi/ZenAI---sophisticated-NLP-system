import React from 'react'

const Login = ({ handleChange, handleSubmit, formData }) => {

  return (
    <form onSubmit={handleSubmit} className='p-4 md:w-1/4 w-1/2 flex flex-col gap-4'>
      <h1>Login Form</h1>
      <input type="email" name='email' value={formData.email} onChange={(e) => handleChange(e)} placeholder='email' className='p-2 w-full outline-none rounded border border-zinc-500 bg-zinc-300' type="text" />
      <input type="password" name='password' value={formData.password} onChange={(e) => handleChange(e)} placeholder='password' className='p-2 w-full outline-none rounded border border-zinc-500 bg-zinc-300' type="text" />
      <button type='submit' className='px-5 py-2 rounded-md bg-green-400 text-black cursor-pointer hover:bg-green-500 active:scale-95'>Submit</button>
    </form>
  )
}

export default Login