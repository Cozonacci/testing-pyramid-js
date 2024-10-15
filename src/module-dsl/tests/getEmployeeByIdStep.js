const StepDslRunner = require("../stepDslRunner");

new StepDslRunner(
  `
  name: Get employee by id
  action: GET
  url: http://localhost:3000/api/employees/@{id}
  verify:
      - log: Check response status
        check: response.status === 200
      - log: Check employee id
        check: response.body.id === @{id}
      - log: Check employee name
        check: expect(response.body.name).to.equal('@{name}')
  extract:
      employeeId: response.body.id
      employeePosition: response.body.position
  `,
  {
    id: 2,
    name: "Jane Smith",
  },
).executeStep();
