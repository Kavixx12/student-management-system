import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/students';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Get the token from local storage
    let token = localStorage.getItem('token');

    // If token exists, add it to the headers
    if (token) {
        // Remove double quotes if present (Safety check)
        token = token.replace(/^"(.*)"$/, '$1');

        if (token.startsWith("Bearer ")) {
            config.headers.Authorization = token;
        } else {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

export const listStudents = () => axios.get(REST_API_BASE_URL);

export const createStudent = (student) => axios.post(REST_API_BASE_URL, student);

export const getStudent = (studentId) => axios.get(REST_API_BASE_URL + '/' + studentId);

export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL + '/' + studentId, student);

export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL + '/' + studentId);