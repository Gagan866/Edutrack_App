package com.backend.backend.controller;

import com.backend.backend.model.Teacher;
import com.backend.backend.model.User;
import com.backend.backend.repository.TeacherRepository;
import com.backend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher")
@CrossOrigin(origins = { "http://localhost:5173", "http://10.91.66.25:5173", "https://edutrackappcse.netlify.app" })
public class TeacherController {
    @Autowired
    private TeacherRepository teacherRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<?> getTeacherByEmail(@RequestHeader("X-User-Email") String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("User not found");
        }
        Teacher teacher = teacherRepository.findByUser(user);
        if (teacher == null) {
            return ResponseEntity.badRequest().body("Teacher not found");
        }
        // Attach email to response
        var response = new java.util.HashMap<String, Object>();
        response.put("fullName", teacher.getFullName());
        response.put("employeeId", teacher.getEmployeeId());
        response.put("phoneNumber", teacher.getPhoneNumber());
        response.put("gender", teacher.getGender());
        response.put("qualification", teacher.getQualification());
        response.put("designation", teacher.getDesignation());
        response.put("department", teacher.getDepartment());
        response.put("email", user.getEmail());
        return ResponseEntity.ok(response);
    }
}
