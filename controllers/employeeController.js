const employees = require('../models/employeeModel');

// Get all employees
const getAllEmployees = (_req, res) => {
  res.json(employees);
};

// Get employee by ID
const getEmployeeById = (req, res) => {
  const employee = employees.find(emp => emp.id === parseInt(req.params.id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
};

// Export the controller functions for use in routes
module.exports = {
  getAllEmployees,
  getEmployeeById
};
