SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    emp_role.title,
    department.dept_name AS department,
    emp_role.salary,
    employee.manager_id AS manager
FROM employee
LEFT JOIN emp_role ON employee.role_id = emp_role.id
LEFT JOIN department ON emp_role.dept_id = department.id;
