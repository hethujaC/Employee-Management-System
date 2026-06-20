const express = require("express");
const {
  getNextEmployeeId,
  readEmployees,
  sanitizeEmployeeInput,
  validateEmployee,
  writeEmployees,
} = require("../models/Employee");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(readEmployees());
});

router.post("/", (req, res) => {
  const validationError = validateEmployee(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const employees = readEmployees();
  const employee = {
    id: getNextEmployeeId(employees),
    ...sanitizeEmployeeInput(req.body),
  };

  employees.push(employee);
  writeEmployees(employees);

  return res.status(201).json(employee);
});

router.put("/:id", (req, res) => {
  const employeeId = Number(req.params.id);
  const validationError = validateEmployee(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const employees = readEmployees();
  const employeeIndex = employees.findIndex(
    (employee) => Number(employee.id) === employeeId
  );

  if (employeeIndex === -1) {
    return res.status(404).json({ message: "Employee not found." });
  }

  const updatedEmployee = {
    ...employees[employeeIndex],
    ...sanitizeEmployeeInput(req.body),
  };

  employees[employeeIndex] = updatedEmployee;
  writeEmployees(employees);

  return res.json(updatedEmployee);
});

router.delete("/:id", (req, res) => {
  const employeeId = Number(req.params.id);
  const employees = readEmployees();
  const employeeExists = employees.some(
    (employee) => Number(employee.id) === employeeId
  );

  if (!employeeExists) {
    return res.status(404).json({ message: "Employee not found." });
  }

  writeEmployees(
    employees.filter((employee) => Number(employee.id) !== employeeId)
  );

  return res.status(204).send();
});

module.exports = router;
