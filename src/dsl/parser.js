const yaml = require("js-yaml");

class DSLParser {
  constructor(dsl) {
    this.dslObj = yaml.load(dsl);
  }

  getUrl() {
    return this.dslObj.url;
  }

  getVerification() {
    return this.dslObj.verify;
  }

  getExtraction() {
    return this.dslObj.extract;
  }
}

module.exports = DSLParser;
