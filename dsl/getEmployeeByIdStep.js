const DSLParser = require('./parser');
const RequestHandler = require('./requestHandler');
const Verification = require('./verification');
const Extractor = require('./extractor');
const DSLExecutor = require('./dslExecutor');

async function executeStep(dsl, {id, name}) {
    // Initialize components
    const parser = new DSLParser(dsl);
    const requestHandler = new RequestHandler();
    const verification = new Verification(parser.getVerification());
    const extractor = new Extractor(parser.getExtraction());

    // Execute the DSL logic
    const dslExecutor = new DSLExecutor(parser, requestHandler, verification, extractor);
    const result = await dslExecutor.execute(id, name);
  
    console.log(`Final Result: ${JSON.stringify(result)}`);
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
        newUser: 'response.name'
    `, 
    {
        id: 1,
        name: 'John Doe'
    }
)