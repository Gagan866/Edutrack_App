package com.backend.backend.service;

import com.backend.backend.model.Student;
import com.backend.backend.model.User;
import com.backend.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student registerStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student findByUser(User user) {
        return studentRepository.findByUser(user).orElse(null);
    }

    public boolean aadhaarExists(String aadhaar) {
        return studentRepository.findByAadhaar(aadhaar).isPresent();
    }
}
