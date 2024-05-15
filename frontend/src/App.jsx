import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import { BrowserRouter, Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import CourseLayout from './layouts/CourseLayout'
import CoursePage from './pages/CoursePage'
import AddPrograms from './components/AddPrograms'
import EditCoursePage from './pages/EditCoursePage'
import PoForm from './components/PoForm'
import PsoForm from './components/PsoForm'
import PoUpdateForm from './components/PoUpdateForm'
import PsoUpdateForm from './components/PsoUpdateForm'
import AddSyllabus from './components/AddSyllabus'

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
          <Route path='/courses' element={<ProtectedRoute> <CourseLayout/> </ProtectedRoute>} />
          <Route path='/courses/:id' element={<ProtectedRoute> <CoursePage /> </ProtectedRoute>} />
          <Route path='/add-course' element={ <ProtectedRoute> <AddPrograms /> </ProtectedRoute>} />

          <Route path='/courses/edit/:id' element={ <ProtectedRoute> <EditCoursePage /> </ProtectedRoute>} />
          <Route path='/add-po/:id' element={ <ProtectedRoute> <PoForm /> </ProtectedRoute>} />
          <Route path='/edit-po/:id' element={ <ProtectedRoute> <PoUpdateForm /> </ProtectedRoute>} />

          <Route path='/add-pso/:id' element={ <ProtectedRoute> <PsoForm /> </ProtectedRoute>} />
          <Route path='/edit-pso/:id' element={ <ProtectedRoute> <PsoUpdateForm /> </ProtectedRoute>} />


          <Route path='/add-syllabus/:id' element={<ProtectedRoute> <AddSyllabus /> </ProtectedRoute>} />

          </Route>

          <Route path='/login' element={<Login />} />

          <Route path="/logout" element={<Logout />} />
          
          <Route path='register' element={<Register />} />

          <Route path="*" element={<NotFound />} />

      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App