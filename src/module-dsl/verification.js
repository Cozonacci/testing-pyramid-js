let chai;
let expect;

(async () => {
  try {
    chai = await import("chai");
    expect = chai.expect;
  } catch (error) {
    console.error("Failed to load chai module:", error);
  }
})();

class Verification {
  constructor(assertions) {
    this.assertions = assertions;
  }

  verify(response, variables) {
    // assume a collection of assertions
    const assertionResults = [];

    if (this.assertions.length !== 0) {
      this.assertions.forEach((assertion) => {
        const assertionCondition = assertion.check.replace(
          /@\{(.*?)\}/g,
          (_, key) => variables[key] || "",
        );

        console.log(
          `Evaluating check [${assertion.log} => ${assertionCondition}]`,
        );

        let assertionPassed = false;
        try {
          // CAUTION: eval() should be avoided in real production systems due to security risks.
          assertionPassed = eval(assertionCondition);
          if (typeof assertionPassed !== "boolean") {
            assertionPassed = true;
          } else if (!assertionPassed) {
            throw new Error("boolean condition is false.");
          }
          console.log("\tCheck passed.");
        } catch (error) {
          console.log(`\tCheck failed: ${error.message}`);
        }

        assertionResults.push(assertionPassed);
      });
    }

    return assertionResults;
  }
}

module.exports = Verification;
