import './App.css'
import React from 'react'
import Login from './screens/login'
import Signup from './screens/signup'
import Home from './screens/home'
import SellerView from './screens/sellerview'
import AddPost from './screens/addpost'
import EditPost from './screens/editpost'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/seller' element={<SellerView />} />
          <Route path='/addpost' element={<AddPost />} />
          <Route path='/editpost' element={<EditPost />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;