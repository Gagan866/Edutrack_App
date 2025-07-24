    package com.backend.backend.repository;

    import com.backend.backend.model.Student;
    import com.backend.backend.model.User;
    import org.springframework.data.jpa.repository.JpaRepository;
    import java.util.Optional;

    public interface StudentRepository extends JpaRepository<Student, Long> {
        Optional<Student> findByUser(User user);
        Optional<Student> findByAadhaar(String aadhaar);
    }
