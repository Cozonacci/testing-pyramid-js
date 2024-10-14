class TemplatingService {
  static replacePlaceholders(url, variables) {
    return url.replace(/@\{(.*?)\}/g, (_, key) => variables[key] || "");
  }
}

module.exports = TemplatingService;
