import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Detail from './components/Detail'
import ProtectedRoute from './components/ProtectedRoute'
import UserDashboard from './pages/userdashboard/UserDashboard'
import Dashboard from './pages/userdashboard/Dashoard'
import ProfilePage from './pages/userdashboard/ProfilePage'
import ProdutListPage from './pages/ProdutListPage'
import CartPage from './pages/userdashboard/CartPage'
import SignUp from './pages/SignUp'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/products" element={<ProdutListPage />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App