import React from 'react'
import { RouterProvider } from 'react-router'
import Router from '../app/App.route'
import store from '../app/App.store.js'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <div className='p-4 h-screen w-full'>
      <Provider store={store}>
      <RouterProvider router={Router}/>
      </Provider>
    </div>
  )
}

export default App