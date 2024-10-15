const TemplatingService = require("./templatingService");
const yaml = require("js-yaml");

class Executor {
  constructor(parser, requestHandler, verification, extractor) {
    this.parser = parser;
    this.requestHandler = requestHandler;
    this.verification = verification;
    this.extractor = extractor;
  }

  async execute(testData) {
    // Step 1: Prepare the URL by replacing placeholders
    const url = TemplatingService.replacePlaceholders(
      this.parser.getUrl(),
      testData,
    );

    // Step 2: Make the GET request
    const response = await this.requestHandler.get(url);
    const responseProcessed = JSON.parse(JSON.stringify(response));
    console.log(`Received Response: \n${yaml.dump(responseProcessed)}`);

    // Step 3: Perform verification
    const verificationResults = this.verification.verify(response, testData);

    // Step 4: Extract the needed data into context
    if (verificationResults.every((item) => item === true)) {
      const extractedData = this.extractor.extract(response);
      return extractedData; // Return extracted data
    } else {
      console.log("\nThere are failed checks. No data will be extracted.");
    }
  }
}

module.exports = Executor;
