const Executor = require("../dsl/executor");
const Extractor = require("../dsl/extractor");
const DSLParser = require("../dsl/parser");
const RequestHandler = require("../dsl/requestHandler");
const Verification = require("../dsl/verification");

async function executeStep(testStep, testData) {
  console.log( `========= Executing Test Step =========`);
  console.log(testStep);
  console.log( `========= Finished Executing Test Step =========`);
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
}

executeStep(
  `
  name: get employee by id
  action: GET
  url: http://localhost:3000/api/employees/@{id}
  verify:
      - log: check employee name
        check: response.name == '@{name}'
  extract:
      employeeId: 'response.id'
      employeePosition: 'response.position'
  `,
  {
    id: 2,
    name: "Jane Smith",
  },
);
