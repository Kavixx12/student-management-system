import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import AccountSettings from './components/AccountSettings';
import 'react-toastify/dist/ReactToastify.css';
import ListStudentComponent from './components/ListStudentComponent'
import StudentComponent from './components/StudentComponent'
import AuthPage from './components/AuthPage'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {
    return (
        <BrowserRouter>
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                theme="dark" 
            />
            <Routes>
                {/* Default Route: Redirect users to the login page initially */}
                <Route path='/' element={<Navigate to="/login" />} />

                {/* Public Authentication Routes (Accessible without logging in) */}
                <Route path='/login' element={<AuthPage />} />
                <Route path='/register' element={<AuthPage />} />

                {/* Protected Routes: Wrapped with both Security (ProtectedRoute) and UI (Layout) */}
                <Route 
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    {/* These pages will now render inside the <Outlet /> of the Layout component */}
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/students' element={<ListStudentComponent />} />
                    <Route path='/add-student' element={<StudentComponent />} />
                    <Route path='/edit-student/:id' element={<StudentComponent />} />

                    <Route path='/account-settings' element={<AccountSettings />} />
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default App