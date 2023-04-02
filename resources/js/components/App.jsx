import React from 'react'
import './css/app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Navigation from './Navigation'
import Login from './Login'
import Store from './Store'
import Additem from './Additem'
import Signup from './Signup'
import ProductStore from './ProductStore'
import Update from './Update'

function App() {
  return (
    <div className=''>
      <BrowserRouter>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>  
        <Route path='/createstore' element={<Store />}/>  
        <Route path='/signup' element={<Signup /> }/>
        <Route path='/additem/:id' element={<Additem />}/>
        <Route path='/prodcut/:idproduct' element={<ProductStore />}/>
        <Route path='/update/:id/:idStore' element={<Update />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
