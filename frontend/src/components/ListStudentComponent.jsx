import React, {useEffect, useState} from 'react'
import {deleteStudent, listStudents} from '../services/StudentService'
import { useNavigate } from 'react-router-dom'

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
        console.log(id);

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
        <div className='container'>
            <h2 className='text-center mt-4'>List of Students</h2>
            <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
            <table className='table table-striped table-bordered'>
                <thead className='table-dark'>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {
                    students.map(student =>
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateStudent(student.id)}>Update</button>


                                <button className='btn btn-danger' onClick={() => removeStudent(student.id)} style={{marginLeft: '10px'}}>Delete</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentComponent