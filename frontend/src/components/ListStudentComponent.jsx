import React, {useEffect, useState} from 'react'
import {deleteStudent, listStudents} from '../services/StudentService'
import { useNavigate } from 'react-router-dom'
import './ListStudentComponent.css' 

const ListStudentComponent = () => {

    const [students, setStudents] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllStudents();
    }, [])

    function getAllStudents() {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewStudent(){
        navigator('/add-student')
    }

    function removeStudent(id){
        console.log("Deleting Student ID:", id);
        deleteStudent(id).then((response) => {
            getAllStudents();
        }).catch(error => {
            console.error(error);
        })
    }

    function updateStudent(id){
        navigator(`/edit-student/${id}`)
    }

    return (
        <div className='student-page-wrapper'>
            
            <div className='student-page-header'>
                <h2 className='student-page-title'>Students Directory</h2>
                <button className='btn-add-student' onClick={addNewStudent}>
                    {/* Plus Icon */}
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
                    </svg>
                    Add New Student
                </button>
            </div>

            <div className='table-container'>
                <table className='custom-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student =>
                                <tr key={student.id}>
                                    <td>
                                        <span style={{color: '#FF8C00', fontWeight: 'bold'}}>#{student.id}</span>
                                    </td>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <div className='action-buttons'>
                                            <button className='btn-action btn-update' onClick={() => updateStudent(student.id)}>
                                                Edit
                                            </button>
                                            <button className='btn-action btn-delete' onClick={() => removeStudent(student.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                        
                        {/* ඩේටා නැති වුනොත් පෙන්නන්න පොඩි ලස්සන මැසේජ් එකක් */}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{textAlign: 'center', padding: '40px', color: '#666'}}>
                                    No students found. Click "Add New Student" to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default ListStudentComponent