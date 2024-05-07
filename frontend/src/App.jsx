import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { BrowserRouter, Route, RouterProvider, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'

const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login" />

}

const RegisterAndLogout = () => {
  localStorage.clear()
  return <Register />
}

function App() {

  return (
    <>
      <BrowserRouter>
      
      <Routes>

          <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />

          <Route path='/login' element={<Login />} />

          <Route path='register' element={<Register />} />

          <Route path="*" element={<NotFound />} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
