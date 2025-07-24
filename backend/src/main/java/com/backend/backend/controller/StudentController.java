package com.backend.backend.controller;

import com.backend.backend.model.Student;
import com.backend.backend.model.User;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = { "http://localhost:5173", "http://10.91.66.25:5173" })
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private UserRepository userRepository;

    // This assumes you pass the user's email as a header (replace with JWT logic as
    // needed)
    @GetMapping("/me")
    public ResponseEntity<?> getMyDetails(@RequestHeader("X-User-Email") String email) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    Student student = studentService.findByUser(user);
                    if (student == null) {
                        return ResponseEntity.status(404).body(Map.of("error", "Student not found"));
                    }
                    // Debug log for department value
                    System.out.println("[DEBUG] Department for student " + student.getRegNumber() + ": "
                            + student.getDepartment());
                    // Use HashMap to avoid Map.of() limit
                    Map<String, Object> map = new java.util.HashMap<>();
                    map.put("name", student.getFullName());
                    map.put("regNumber", student.getRegNumber());
                    map.put("semester", student.getSemester());
                    map.put("department", student.getDepartment());
                    map.put("branch", student.getDepartment());
                    map.put("dob", student.getDob());
                    map.put("gender", student.getGender());
                    map.put("phoneNumber", student.getPhoneNumber());
                    map.put("secondaryEmail", student.getSecondaryEmail());
                    map.put("aadhaar", student.getAadhaar());
                    map.put("address", student.getAddress());
                    map.put("pincode", student.getPincode());
                    map.put("city", student.getCity());
                    map.put("district", student.getDistrict());
                    map.put("state", student.getState());
                    map.put("year", student.getYear());
                    map.put("religion", student.getReligion());
                    map.put("category", student.getCategory());
                    map.put("caste", student.getCaste());
                    map.put("sslcMarks", student.getSslcMarks());
                    map.put("admissionYear", student.getAdmissionYear());
                    map.put("sspId", student.getSspId());
                    map.put("nspId", student.getNspId());
                    map.put("apaarId", student.getApaarId());
                    map.put("admissionType", student.getAdmissionType());
                    map.put("eduBoard", student.getEduBoard());
                    map.put("fatherName", student.getFatherName());
                    map.put("motherName", student.getMotherName());
                    map.put("parentMobile", student.getParentMobile());
                    map.put("profileImage", student.getProfileImage() != null ? java.util.Base64.getEncoder().encodeToString(student.getProfileImage()) : null);
                    return ResponseEntity.ok(map);
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "User not found")));
    }
}
