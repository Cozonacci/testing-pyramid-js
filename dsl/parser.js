const yaml = require('js-yaml');

class DSLParser {
  constructor(dsl) {
    this.dslObj = yaml.load(dsl);
  }

  getUrl() {
    return this.dslObj.url;
  }

  getVerification() {
    return this.dslObj.verify[0]; // Assuming only one verification for simplicity
  }

  getExtraction() {
    return this.dslObj.extract;
  }
}

module.exports = DSLParser;
