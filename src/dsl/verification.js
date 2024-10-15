class Verification {
  constructor(assertions) {
    this.assertions = assertions;
  }

  verify(response, variables) {
    // assume a collection of assertions
    const assertionResults = [];

    this.assertions.forEach(assertion => {
      const assertionCondition = assertion.check.replace(
      /@\{(.*?)\}/g,
      (_, key) => variables[key] || "",
    );
    console.log(`Evaluating check ${assertionCondition}`);
    const assertionPassed = eval(assertionCondition); // CAUTION: eval() should be avoided in real production systems due to security risks.

    // Log the verification status
    console.log(assertion.log);

    if (assertionPassed) {
      console.log("Check passed: Condition met.");
    } else {
      console.log("Check failed: Condition not met.");
    }

    assertionResults.push(assertionPassed);
    });
    return assertionResults;
  }
}

module.exports = Verification;
