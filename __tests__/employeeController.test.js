const {
  getAllEmployees,
  getEmployeeById,
} = require("../controllers/employeeController");
const employees = require("../models/employeeModel"); // Mock employee data
const httpMocks = require("node-mocks-http");

// Group test cases under the same describe block
describe("Employee Controller", () => {
  // Test case for getAllEmployees
  describe("getAllEmployees", () => {
    it("should return all employees", () => {
      // Mock request and response objects
      const req = httpMocks.createRequest();
      const res = httpMocks.createResponse();

      getAllEmployees(req, res);

      // Check the status code and response body
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(employees);
    });
  });

  // Test case for getEmployeeById
  describe("getEmployeeById", () => {
    it("should return a single employee by ID", () => {
      // Mock request and response for an existing employee
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/employees/1",
        params: {
          id: "1",
        },
      });
      const res = httpMocks.createResponse();

      getEmployeeById(req, res);

      // Check the status code and response body
      const employee = employees[0]; // Employee with ID 1
      expect(res.statusCode).toBe(200);
      expect(res._getJSONData()).toEqual(employee);
    });

    it("should return 404 if employee not found", () => {
      // Mock request and response for a non-existing employee
      const req = httpMocks.createRequest({
        method: "GET",
        url: "/employees/999",
        params: {
          id: "999",
        },
      });
      const res = httpMocks.createResponse();

      getEmployeeById(req, res);

      // Check the status code and response body
      expect(res.statusCode).toBe(404);
      expect(res._getData()).toBe("Employee not found");
    });
  });
});
