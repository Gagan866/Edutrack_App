CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

 
 
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(255),
    dob VARCHAR(50),
    gender VARCHAR(20),
    phone_number VARCHAR(20),
    secondary_email VARCHAR(255),
    aadhaar VARCHAR(20),
    address VARCHAR(255),
    pincode VARCHAR(20),
    city VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    department VARCHAR(100),
    semester VARCHAR(20),
    year VARCHAR(20),
    religion VARCHAR(50),
    category VARCHAR(50),
    caste VARCHAR(50),
    sslc_marks VARCHAR(20),
    reg_number VARCHAR(50),
    admission_year VARCHAR(20),
    ssp_id VARCHAR(50),
    nsp_id VARCHAR(50),
    apaar_id VARCHAR(50),
    admission_type VARCHAR(50),
    edu_board VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    parent_mobile VARCHAR(20),
    profile_image BYTEA,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);


CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    employee_id VARCHAR(7) NOT NULL UNIQUE,
    phone_number VARCHAR(20) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    designation VARCHAR(50) NOT NULL,
    department VARCHAR(100) NOT NULL,
    date_of_joining VARCHAR(10) NOT NULL,
    CONSTRAINT fk_teacher_user FOREIGN KEY(user_id) REFERENCES users(id)
);