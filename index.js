const inquirer = require('inquirer');
const { default: prompt } = require('inquirer/lib/ui/prompt');
const mysql = require('mysql2');

// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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
    db.query('SELECT * FROM employee', function (err, results) {
        console.log(results);
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
    ]).then((res) => {
        let emp = [
            [res.firstName], 
            [res.lastName]
        ]
        console.log(emp);
        db.query(`INSERT INTO employee (first_name, last_name) VALUES (?)`, [emp]);
    })
    await menu();
};

async function updateEmp() {
    console.log('placeholder');
    await menu();
};

async function viewRole() {
    db.query('SELECT * FROM emp_role', function (err, results) {
        console.log(results);
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
    ]).then((res) => {
        let role = [
            [res.title], 
            [parseInt(res.salary)]
        ]
        console.log(role);
        db.query(`INSERT INTO emp_role (title, salary) VALUES (?)`, [role]);
    })
    await menu();
};

async function viewDept() {
    console.log('working');
    db.query('SELECT * FROM department', function (err, results) {
        console.log(results);
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
        console.log(res.dept_name);
        db.query(`INSERT INTO department (dept_name) VALUES (?)`, res.dept_name); 
    })
    await menu();
};

menu();