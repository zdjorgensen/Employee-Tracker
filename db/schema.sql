DROP DATABASE IF EXISTS cms_db;
CREATE DATABASE cms_db;

USE cms_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
)

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role)
    REFERENCES  role(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY(employee),
    REFERENCES employee(id),
    ON DELETE SET NULL
)