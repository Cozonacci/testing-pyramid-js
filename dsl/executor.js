const TemplatingService = require('./templatingService');

class Executor {
  constructor(parser, requestHandler, verification, extractor) {
    this.parser = parser;
    this.requestHandler = requestHandler;
    this.verification = verification;
    this.extractor = extractor;
  }

  async execute(id, name) {
    // Step 1: Prepare the URL by replacing placeholders
    const url = TemplatingService.replacePlaceholders(this.parser.getUrl(), { id, name });

    // Step 2: Make the GET request
    const response = await this.requestHandler.get(url);

    // Step 3: Perform verification
    const verificationRule = this.parser.getVerification();
    const isVerified = this.verification.verify(response, { id, name });

    // Step 4: Extract the needed data into context
    if (isVerified) {
      const extractionRules = this.parser.getExtraction();
      const extractedData = this.extractor.extract(response);

      return extractedData; // Return extracted data
    } else {
      console.log("Verification failed. No data will be extracted.");
    }
  }
}

module.exports = Executor;
