const axios = require("axios");

class RequestHandler {
  constructor(httpClient = axios) {
    this.httpClient = httpClient;
  }

  async get(url) {
    try {
      const response = await this.httpClient.get(url);
      return {
        status: response.status,
        headers: response.headers,
        body: response.data,
      };
    } catch (error) {
      console.error(`Error during GET request: ${error.message}`);
      throw error;
    }
  }
}

module.exports = RequestHandler;
