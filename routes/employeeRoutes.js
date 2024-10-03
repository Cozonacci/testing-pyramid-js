const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Route to get all employees
router.get('/employees', employeeController.getAllEmployees);

// Route to get an employee by ID
router.get('/employees/:id', employeeController.getEmployeeById);

// Export the router for use in server.js
module.exports = router;
