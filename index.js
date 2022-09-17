const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cms_db'
    },
);

function menu() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'userChoice',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
    ]).then((res) => {
        switch (res.userChoice) {
            case 'View All Employees':
                viewEmp();
                break;
            case 'Add Employee':
                addEmp();
                break;
            case 'Update Employee Role':
                updateEmp();
                break;
            case 'View All Roles':
                viewRole();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDept();
                break;
            case 'Add Department':
                addDept();
                break;
            case 'Quit':
                process.exit();
        }
    });
};

async function viewEmp() {
    let sql = `SELECT
        employee.id,
        employee.first_name,
        employee.last_name,
        emp_role.title,
        department.dept_name AS department,
        emp_role.salary,
        employee.manager_id AS manager
        FROM employee
        INNER JOIN emp_role ON employee.role_id = emp_role.id
        INNER JOIN department ON emp_role.dept_id = department.id;`;
    db.query(sql, (err, res) => {
        if(err) throw err;
        console.log('\n');
        console.table(res);
    });
    await menu();

};

async function viewRole() {
    let sql = `SELECT
        emp_role.id,
        emp_role.title,
        department.dept_name AS department,
        emp_role.salary
        FROM emp_role
        INNER JOIN department on emp_role.dept_id = department.id;`;
    db.query(sql, (err, results) => {
        console.log('\n');
        console.table(results);
    })
    await menu();
};

async function viewDept() {
    let sql = `SELECT
        department.id,
        department.dept_name AS department
        FROM department`
    db.query(sql, (err, results) => {
        console.log('\n');
        console.table(results);
    })
    await menu();
};

async function addEmp() {
    const empQuestions = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the first name of the employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of the employee?',
            name: 'lastName',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'role',
            choices: [1, 2, 3, 4, 5]
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'manager',
            choices: ['No Manager']
        },
    ]).then((res) => {
        let emp = [
            [res.firstName], 
            [res.lastName],
            [res.role],
        ]
        db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES (?)`, [emp]);
    })
    await menu();
};

async function addRole() {
    const roleQuestions = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'What is the salary for the role?',
            name: 'salary',
        },
        {
            type: 'list',
            message: 'Which department does this role belong to?',
            name: 'department',
            choices: [1, 2, 3, 4, 5]
        },
    ]).then((res) => {
        let role = [
            [res.title], 
            [parseInt(res.salary)],
            [res.department]
        ]
        db.query(`INSERT INTO emp_role (title, salary, dept_id) VALUES (?)`, [role]);
    })
    await menu();
};

async function addDept() {
    const deptQuestions = await inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'dept_name'
        },
    ]).then((res) => {
        db.query(`INSERT INTO department (dept_name) VALUES (?)`, res.dept_name); 
    })
    await menu();
};

async function updateEmp() {
    console.log('placeholder');
    await menu();
};

menu();