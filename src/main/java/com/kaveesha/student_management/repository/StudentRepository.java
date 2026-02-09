package com.kaveesha.student_management.repository;

import com.kaveesha.student_management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // දැනට මෙතන මුකුත් ලියන්න ඕන නැහැ.
    // CRUD වැඩ ටික (Save, Delete, Find) Spring Boot අපිට නිකම්ම දෙනවා.
}