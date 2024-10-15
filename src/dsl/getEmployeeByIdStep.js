const Executor = require("../dsl/executor");
const Extractor = require("../dsl/extractor");
const DSLParser = require("../dsl/parser");
const RequestHandler = require("../dsl/requestHandler");
const Verification = require("../dsl/verification");

async function executeStep(testStep, testData) {
  console.log(`========= Executing Test Step =========`);
  console.log(testStep);

  const parser = new DSLParser(testStep);
  const requestHandler = new RequestHandler();
  const verification = new Verification(parser.getVerification());
  const extractor = new Extractor(parser.getExtraction());

  // Execute the DSL logic
  const executor = new Executor(
    parser,
    requestHandler,
    verification,
    extractor,
  );

  await executor.execute(testData);
  console.log(`\n========= Finished Executing Test Step =========`);
}

executeStep(
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
);
