package com.kaveesha.student_management.service;

import com.kaveesha.student_management.entity.Student;
import java.util.List;

public interface StudentService {
    void deleteStudent(long id);
    Student saveStudent(Student student);
    Student updateStudent(Student student, long id);
    List<Student> getAllStudents();

}