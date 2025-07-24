package com.backend.backend.repository;

import com.backend.backend.model.Teacher;
import com.backend.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Teacher findByUser(User user);

    Teacher findByEmployeeId(String employeeId);
}
