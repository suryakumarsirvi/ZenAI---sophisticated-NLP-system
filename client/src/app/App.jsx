import React from 'react'
import { RouterProvider } from 'react-router'
import Router from '../app/App.route'

const App = () => {
  return (
    <div className='p-4 h-screen w-full'>
      <RouterProvider router={Router}/>
    </div>
  )
}

export default App