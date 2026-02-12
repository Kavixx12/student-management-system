import React, { useEffect, useState } from 'react'
import { listStudents } from '../services/StudentService'

const ListStudentComponent = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    return (
        <div className='container'>
            <h2 className='text-center mt-4'>List of Students</h2>
            <table className='table table-striped table-bordered mt-4'>
                <thead className='table-dark'>
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Id</th>
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
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListStudentComponent