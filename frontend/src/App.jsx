import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListStudentComponent from './components/ListStudentComponent'
import StudentComponent from './components/StudentComponent'
import AuthPage from './components/AuthPage'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to="/login" />} />

                <Route path='/login' element={<AuthPage />} />
                <Route path='/register' element={<AuthPage />} />

               
                <Route 
                    path='/dashboard' 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />

                <Route path='/students' element={<ListStudentComponent />} />
                <Route path='/add-student' element={<StudentComponent />} />
                <Route path='/edit-student/:id' element={<StudentComponent />} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default App