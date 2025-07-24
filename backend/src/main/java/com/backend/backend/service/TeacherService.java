package com.backend.backend.service;

import com.backend.backend.model.Teacher;
import com.backend.backend.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public Teacher registerTeacher(Teacher teacher) {
        // Check for unique employeeId
        if (teacherRepository.findByEmployeeId(teacher.getEmployeeId()) != null) {
            throw new RuntimeException("Employee ID already exists");
        }
        return teacherRepository.save(teacher);
    }

    public boolean employeeIdExists(String employeeId) {
        return teacherRepository.findByEmployeeId(employeeId) != null;
    }
}
