class Extractor {
  constructor(extractionRules) {
    this.extractionRules = extractionRules;
  }

  extract(response) {
    const extracted = {};
    for (const [key, value] of Object.entries(this.extractionRules)) {
      extracted[key] = eval(value); // CAUTION: Avoid eval() in production code
    }
    console.log(`Following variables were extracted and placed into context: ${JSON.stringify(extracted)}`);
    return extracted;
  }
}

module.exports = Extractor;
