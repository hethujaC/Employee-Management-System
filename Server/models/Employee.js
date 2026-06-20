const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "..", "employees.json");

const seedEmployees = [
  {
    id: 1,
    name: "Hethuja",
    designation: "Software Engineer",
    salary: 85000,
  },
  {
    id: 2,
    name: "Kamal",
    designation: "HR Executive",
    salary: 62000,
  },
];

const ensureDataFile = () => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedEmployees, null, 2));
  }
};

const readEmployees = () => {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
};

const writeEmployees = (employees) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(employees, null, 2));
};

const getNextEmployeeId = (employees) => {
  if (employees.length === 0) return 1;
  return Math.max(...employees.map((employee) => Number(employee.id))) + 1;
};

const validateEmployee = ({ name, designation, salary }) => {
  if (!name || !String(name).trim()) {
    return "Employee name is required.";
  }

  if (!designation || !String(designation).trim()) {
    return "Designation is required.";
  }

  if (salary === "" || salary === null || Number.isNaN(Number(salary))) {
    return "Salary must be a valid number.";
  }

  if (Number(salary) <= 0) {
    return "Salary must be a positive number.";
  }

  return null;
};

const sanitizeEmployeeInput = ({ name, designation, salary }) => ({
  name: String(name).trim(),
  designation: String(designation).trim(),
  salary: Number(salary),
});

module.exports = {
  getNextEmployeeId,
  readEmployees,
  sanitizeEmployeeInput,
  validateEmployee,
  writeEmployees,
};
