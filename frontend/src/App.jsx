import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentComponent from './components/StudentComponent'

function App() {
    return (
        <>
            <BrowserRouter>
                <div className='container'>
                    <Routes>
                        {/* http://localhost:3000 */}
                        <Route path='/' element = { <ListStudentComponent /> }></Route>

                        {/* http://localhost:3000/students */}
                        <Route path='/students' element = { <ListStudentComponent /> }></Route>

                        {/* http://localhost:3000/add-student */}
                        <Route path='/add-student' element = { <StudentComponent /> }></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App