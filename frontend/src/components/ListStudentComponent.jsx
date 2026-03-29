import React, { useEffect, useState } from 'react';
import { deleteStudent, listStudents, createStudent } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Students.css';

// Icons
const IcoPlus = () => (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const IcoClose = () => (<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const navigator = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });

    useEffect(() => {
        getAllStudents();
    }, []);

    function getAllStudents() {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewStudent() {
        setIsDrawerOpen(true);
    }

    function removeStudent(id) {
        console.log("Deleting Student ID:", id);
        deleteStudent(id).then((response) => {
            getAllStudents();
            toast.success("Student deleted successfully!", { theme: "dark" });
        }).catch(error => {
            console.error(error);
        });
    }

    function updateStudent(id) {
        navigator(`/edit-student/${id}`);
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveStudent = (e) => {
        e.preventDefault();

        // Call the backend API
        createStudent(formData).then((response) => {
            // If successful, fetch the updated list
            getAllStudents();

            // Close the drawer and clear the form
            setIsDrawerOpen(false);
            setFormData({ firstName: '', lastName: '', email: '' });

            // Show success message
            toast.success("Student Added Successfully!", { theme: "dark" });
        }).catch(error => {
            console.error(error);
            toast.error("Failed to add student!", { theme: "dark" });
        });
    };

    return (
        <main className="dashboard-content" style={{ padding: '28px 32px' }}>

            {/* ── Header ── */}
            <div className="students-header">
                <h1 className="dashboard-title" style={{ marginBottom: 0 }}>STUDENTS DIRECTORY</h1>
                <button className="add-student-btn" onClick={addNewStudent}>
                    <IcoPlus /> Add New Student
                </button>
            </div>

            {/* ── Students Table ── */}
            <div className="students-table-container">
                <table className="students-table">
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
                                    <span style={{ color: '#FF8C00', fontWeight: 'bold' }}>#{student.id}</span>
                                </td>
                                <td style={{ color: 'white' }}>{student.firstName}</td>
                                <td style={{ color: 'white' }}>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                            <span
                                                style={{ color: 'var(--orange)', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                                                onClick={() => updateStudent(student.id)}
                                            >
                                                EDIT
                                            </span>
                                        <span
                                            style={{ color: '#ff4d4d', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                                            onClick={() => removeStudent(student.id)}
                                        >
                                                DELETE
                                            </span>
                                    </div>
                                </td>
                            </tr>
                        )
                    }

                    {students.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                                No students found. Click "Add New Student" to get started!
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* ── Overlay (Background Dimmer) ── */}
            <div
                className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
                onClick={() => setIsDrawerOpen(false)}
            ></div>

            {/* ── Side Drawer Form ── */}
            <div className={`side-drawer ${isDrawerOpen ? 'open' : ''}`}>

                <div className="drawer-header">
                    <h2 className="drawer-title">ADD STUDENT</h2>
                    <button className="close-drawer-btn" onClick={() => setIsDrawerOpen(false)}>
                        <IcoClose />
                    </button>
                </div>

                <div className="drawer-body">
                    <form id="addStudentForm" onSubmit={handleSaveStudent}>

                        <div className="drawer-form-group">
                            <label className="drawer-form-label">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="drawer-form-input"
                                placeholder="e.g. Kaveesha"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="drawer-form-group">
                            <label className="drawer-form-label">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="drawer-form-input"
                                placeholder="e.g. Pathumina"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="drawer-form-group">
                            <label className="drawer-form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="drawer-form-input"
                                placeholder="e.g. kaveesha@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                    </form>
                </div>

                <div className="drawer-footer">
                    <button className="btn-cancel" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
                    <button type="submit" form="addStudentForm" className="btn-save">Save Student</button>
                </div>

            </div>

        </main>
    );
}

export default ListStudentComponent;