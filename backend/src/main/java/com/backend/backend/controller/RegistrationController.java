package com.backend.backend.controller;

import com.backend.backend.model.Student;
import com.backend.backend.model.Teacher;
import com.backend.backend.model.User;
import com.backend.backend.service.StudentService;
import com.backend.backend.service.TeacherService;
import com.backend.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = { "http://localhost:5173", "http://10.91.66.25:5173", "https://edutrackappcse.netlify.app" })
public class RegistrationController {
    @Autowired
    private UserService userService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private TeacherService teacherService;

    @PostMapping("/user")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String password = payload.get("password");
        String role = payload.get("role");
        if (userService.emailExists(email)) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        User user = userService.registerUser(email, password, role);
        return ResponseEntity.ok(Map.of("userId", user.getId()));
    }

    @PostMapping("/student")
    public ResponseEntity<?> registerStudent(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Student student = new Student();
        User user = new User();
        user.setId(userId);
        student.setUser(user);
        student.setFullName((String) payload.get("fullName"));
        // Parse and store only yyyy-MM-dd for dob
        String dobRaw = (String) payload.get("dob");
        if (dobRaw != null && !dobRaw.isEmpty()) {
            try {
                LocalDate dob = LocalDate.parse(dobRaw.substring(0, 10));
                student.setDob(dob.toString()); // yyyy-MM-dd
            } catch (Exception e) {
                student.setDob(dobRaw); // fallback
            }
        }
        student.setGender((String) payload.get("gender"));
        student.setPhoneNumber((String) payload.get("phoneNumber"));
        student.setSecondaryEmail((String) payload.get("secondaryEmail"));
        student.setAadhaar((String) payload.get("aadhaar"));
        student.setAddress((String) payload.get("address"));
        student.setPincode((String) payload.get("pincode"));
        student.setCity((String) payload.get("city"));
        student.setDistrict((String) payload.get("district"));
        student.setState((String) payload.get("state"));
        student.setDepartment((String) payload.get("department"));
        student.setSemester((String) payload.get("semester"));
        student.setYear((String) payload.get("year"));
        student.setReligion((String) payload.get("religion"));
        student.setCategory((String) payload.get("category"));
        student.setCaste((String) payload.get("caste"));
        student.setSslcMarks((String) payload.get("sslcMarks"));
        student.setRegNumber((String) payload.get("regNumber"));
        student.setAdmissionYear((String) payload.get("admissionYear"));
        student.setSspId((String) payload.get("sspId"));
        student.setNspId((String) payload.get("nspId"));
        student.setApaarId((String) payload.get("apaarId"));
        student.setAdmissionType((String) payload.get("admissionType"));
        student.setEduBoard((String) payload.get("eduBoard"));
        student.setFatherName((String) payload.get("fatherName"));
        student.setMotherName((String) payload.get("motherName"));
        student.setParentMobile((String) payload.get("parentMobile"));
        // Handle profile image (base64 string to byte[]), JPEG/PNG only, max 50KB
        Object profileImageObj = payload.get("profileImage");
        System.out.println("[DEBUG] profileImageObj type: "
                + (profileImageObj == null ? "null" : profileImageObj.getClass().getName()));
        System.out.println("[DEBUG] profileImageObj value: " + profileImageObj);
        // Defensive: Only process if it's a non-empty String, else set null
        if (profileImageObj != null && profileImageObj instanceof String) {
            String base64 = (String) profileImageObj;
            if (!base64.isEmpty()) {
                try {
                    byte[] imageBytes = java.util.Base64.getDecoder().decode(base64);
                    // Check size <= 50KB
                    if (imageBytes.length > 51200) {
                        return ResponseEntity.badRequest().body("Profile image must be 50KB or less.");
                    }
                    // Check JPEG/PNG magic numbers
                    boolean isJpeg = imageBytes.length > 3 && imageBytes[0] == (byte) 0xFF
                            && imageBytes[1] == (byte) 0xD8 && imageBytes[2] == (byte) 0xFF;
                    boolean isPng = imageBytes.length > 7 && imageBytes[0] == (byte) 0x89
                            && imageBytes[1] == (byte) 0x50 && imageBytes[2] == (byte) 0x4E
                            && imageBytes[3] == (byte) 0x47;
                    if (!isJpeg && !isPng) {
                        return ResponseEntity.badRequest().body("Profile image must be JPEG or PNG.");
                    }
                    student.setProfileImage(imageBytes);
                } catch (Exception e) {
                    student.setProfileImage(null);
                }
            } else {
                student.setProfileImage(null);
            }
        } else {
            student.setProfileImage(null);
        }
        studentService.registerStudent(student);
        return ResponseEntity.ok("Student registration successful");
    }

    @PostMapping("/teacher")
    public ResponseEntity<?> registerTeacher(@RequestBody Map<String, Object> payload) {
        Long userId = Long.valueOf(payload.get("userId").toString());
        Teacher teacher = new Teacher();
        User user = new User();
        user.setId(userId);
        teacher.setUser(user);
        teacher.setFullName((String) payload.get("fullName"));
        teacher.setEmployeeId((String) payload.get("employeeId"));
        teacher.setPhoneNumber((String) payload.get("phoneNumber"));
        teacher.setGender((String) payload.get("gender"));
        teacher.setQualification((String) payload.get("qualification"));
        teacher.setDesignation((String) payload.get("designation"));
        teacher.setDepartment((String) payload.get("department"));
        // Parse and store only yyyy-MM-dd for dateOfJoining
        String dojRaw = (String) payload.get("dateOfJoining");
        if (dojRaw != null && !dojRaw.isEmpty()) {
            try {
                LocalDate doj = LocalDate.parse(dojRaw.substring(0, 10));
                teacher.setDateOfJoining(doj.toString()); // yyyy-MM-dd
            } catch (Exception e) {
                teacher.setDateOfJoining(dojRaw); // fallback
            }
        }
        try {
            teacherService.registerTeacher(teacher);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("Teacher registration successful");
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
        boolean exists = userService.emailExists(email);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/check-aadhaar")
    public ResponseEntity<?> checkAadhaarExists(@RequestParam String aadhaar) {
        boolean exists = studentService.aadhaarExists(aadhaar);
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/check-employee-id")
    public ResponseEntity<?> checkEmployeeIdExists(@RequestParam String employeeId) {
        boolean exists = teacherService.employeeIdExists(employeeId);
        return ResponseEntity.ok(Map.of("exists", exists));
    }
}
