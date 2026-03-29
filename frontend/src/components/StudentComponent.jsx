import React, { useState, useEffect } from 'react'
import { createStudent, getStudent, updateStudent } from '../services/StudentService'
import { useNavigate, useParams } from 'react-router-dom'
import './StudentComponent.css'

const StudentComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getStudent(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateStudent(e){
        e.preventDefault();

        const student = {firstName, lastName, email}

        if(id){
            updateStudent(id, student).then((response) => {
                navigator('/students');
            }).catch(error => {
                console.error(error);
            })
        }else{
            createStudent(student).then((response) => {
                navigator('/students')
            }).catch(error => {
                console.error(error);
            })
        }
    }

    return (
        <main className="dashboard-content update-student-page">
            <div className="update-card">
                <h2 className="update-title">
                    {id ? 'UPDATE STUDENT' : 'ADD STUDENT'}
                </h2>

                <form className="update-form" onSubmit={saveOrUpdateStudent}>
                    <div className="form-group">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Kaveesha"
                            name="firstName"
                            value={firstName}
                            className="form-input"
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Pathumina"
                            name="lastName"
                            value={lastName}
                            className="form-input"
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            placeholder="e.g. kaveesha@email.com"
                            name="email"
                            value={email}
                            className="form-input"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigator('/students')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-save">
                            {id ? 'Update Student' : 'Save Student'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default StudentComponent