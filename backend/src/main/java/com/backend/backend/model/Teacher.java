package com.backend.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "teachers")
@Data
public class Teacher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private String fullName;
    @Column(unique = true, nullable = false, length = 7)
    private String employeeId;
    private String phoneNumber;
    private String gender;
    private String qualification;
    private String designation;
    private String department;
    @Column(name = "date_of_joining", length = 10)
    private String dateOfJoining; // dd/mm/yyyy
}
