const axios = require('axios');
const yaml = require('js-yaml');

// Load YAML DSL
const dsl = `
  name: get employee by id
  action: GET
  url: http://localhost:3000/api/employees/@{id}
  verify:
    - log: check employee name
      check: response.body.name == @{name}
  extract:
    newUser: response.body.name
`;

// Step 1: Parse the YAML
const dslObj = yaml.load(dsl);

// Step 2: Helper function to replace placeholders in the URL
function replacePlaceholders(url, variables) {
  return url.replace(/@\{(.*?)\}/g, (_, key) => variables[key] || '');
}

// Step 3: Function to perform the GET request and apply checks
async function executeDsl(id, name) {
  const url = replacePlaceholders(dslObj.url, { id, name });

  try {
    // Step 4: Make the HTTP request
    const response = await axios.get(url);

    // Step 5: Verify conditions
    const verification = dslObj.verify[0];
    const nameFromResponse = response.data.name;
    const checkPassed = nameFromResponse === name;

    // Step 6: Log verification result
    console.log(verification.log);
    if (checkPassed) {
      console.log('Check passed: Employee name matches ID');
    } else {
      console.log('Check failed: Employee name does not match ID');
    }

    // Step 7: Extract the newUser variable into context
    const newUser = response.data.name;
    console.log(`Extracted newUser: ${newUser}`);

    return { newUser }; // Return the extracted variable for future use

  } catch (error) {
    console.error(`Error during GET request: ${error.message}`);
  }
}

// Example of execution
executeDsl('1', 'John Doe');
