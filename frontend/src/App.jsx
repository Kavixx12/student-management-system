import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ListStudentComponent from './components/ListStudentComponent'
import StudentComponent from './components/StudentComponent'
import AuthPage from './components/AuthPage'
// 🔥 IMPORT THE NEW DASHBOARD COMPONENT HERE
import Dashboard from './components/Dashboard'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. Default Route: Redirect users to the Login page when they visit localhost:3000 */}
                <Route path='/' element={<Navigate to="/login" />} />

                {/* 2. Authentication Routes (Login & Register) */}
                <Route path='/login' element={<AuthPage />} />
                <Route path='/register' element={<AuthPage />} />

                {/* 3. Main Dashboard Route */}
                <Route path='/dashboard' element={<Dashboard />} />

                {/* 4. Student Management Routes (Your existing CRUD operations) */}
                <Route path='/students' element={<ListStudentComponent />} />
                <Route path='/add-student' element={<StudentComponent />} />
                <Route path='/edit-student/:id' element={<StudentComponent />} />
                
            </Routes>
        </BrowserRouter>
    )
}

export default App