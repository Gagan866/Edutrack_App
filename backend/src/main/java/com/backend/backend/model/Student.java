package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String fullName;
    private String dob;
    private String gender;
    private String phoneNumber;
    private String secondaryEmail;
    private String aadhaar;
    private String address;
    private String pincode;
    private String city;
    private String district;
    private String state;
    private String department;
    private String semester;
    private String year;
    private String religion;
    private String category;
    private String caste;
    private String sslcMarks;
    private String regNumber;
    private String admissionYear;
    private String sspId;
    private String nspId;
    private String apaarId;
    private String admissionType;
    private String eduBoard;
    private String fatherName;
    private String motherName;
    private String parentMobile;

    @Column(name = "profile_image")
    private byte[] profileImage; // nullable, stores JPEG/PNG image <= 50KB
}
