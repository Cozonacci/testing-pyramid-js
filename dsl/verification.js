class Verification {
  constructor(verificationRule) {
    this.verificationRule = verificationRule;
  }

  verify(response, variables) {
    const check = this.verificationRule.check.replace(/@\{(.*?)\}/g, (_, key) => variables[key] || '');
    console.log(`Evaluating check ${check}`);
    const checkPassed = eval(check); // CAUTION: eval() should be avoided in real production systems due to security risks.

    // Log the verification status
    console.log(this.verificationRule.log);
    if (checkPassed) {
      console.log('Check passed: Condition met.');
    } else {
      console.log('Check failed: Condition not met.');
    }

    return checkPassed;
  }
}

module.exports = Verification;
