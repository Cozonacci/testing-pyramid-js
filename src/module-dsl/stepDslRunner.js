const Executor = require("./executor");
const Extractor = require("./extractor");
const DSLParser = require("./parser");
const RequestHandler = require("./requestHandler");
const Verification = require("./verification");

class StepDslRunner {
  constructor(stepDef, testData) {
    this.stepDef = stepDef;
    this.testData = testData;
  }

  async executeStep() {
    console.log(`========= Executing Test Step =========`);
    console.log(this.stepDef);

    const parser = new DSLParser(this.stepDef);
    const requestHandler = new RequestHandler();
    const verification = new Verification(parser.getVerification());
    const extractor = new Extractor(parser.getExtraction());

    const executor = new Executor(
      parser,
      requestHandler,
      verification,
      extractor,
    );

    await executor.execute(this.testData);

    console.log(`\n========= Finished Executing Test Step =========`);
  }
}

module.exports = StepDslRunner;
