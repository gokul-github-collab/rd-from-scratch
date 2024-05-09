import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import { BrowserRouter, Route, RouterProvider, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import HomePage from './pages/HomePage'
import CourseList from './components/CourseList'
import MainLayout from './layouts/MainLayout'

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
          <Route path='/' element={<MainLayout />}>
            
          <Route index element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
          <Route path='/courses' element={<ProtectedRoute> <CourseList /> </ProtectedRoute>} />

          </Route>
          <Route path='/login' element={<Login />} />

          <Route path='register' element={<Register />} />

          <Route path="*" element={<NotFound />} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
