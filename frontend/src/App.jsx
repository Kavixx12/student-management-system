import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import AuthPage from './components/AuthPage'

function App() {

    return (
        <>
            <BrowserRouter>
                
                <Routes>
                    {/* http://localhost:3000 */}
                    <Route path='/' element = { <ListStudentComponent /> }></Route>

                    {/* http://localhost:3000/students */}
                    <Route path='/students' element = { <ListStudentComponent /> }></Route>

                    {/* http://localhost:3000/add-student */}
                    <Route path='/add-student' element = { <StudentComponent /> }></Route>

                    {/* http://localhost:3000/edit-student/1 */}
                    <Route path='/edit-student/:id' element = { <StudentComponent /> }></Route>

                    {/* Login & Register Pages */}
                    <Route path='/login' element={<AuthPage />}></Route>
                    <Route path='/register' element={<AuthPage />}></Route>
                    
                </Routes>
                
            </BrowserRouter>
        </>
    )
}

export default App