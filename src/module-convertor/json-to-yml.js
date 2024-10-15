const fs = require("fs");
const yaml = require("js-yaml");

const readFile = () =>
  fs.readFile(
    "src/module-convertor/testing-pyramid-js.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading JSON file:", err);
        return;
      }

      try {
        // Parse the JSON data
        const jsonData = JSON.parse(data);

        jsonData.item.forEach((jsonTestCase) => {
          console.log(`Processing test case: ${jsonTestCase.name}`);
          // raw YML dump
          const jsonAsYml = yaml.dump(jsonTestCase);
          writeYml(jsonAsYml, "raw-yml", jsonTestCase.name);
          // converted YML dump
          const convertedTestCase = convertTestCase(jsonTestCase);
          const convertedJsonAsYml = yaml.dump(convertedTestCase);
          writeYml(convertedJsonAsYml, "converted-yml", jsonTestCase.name);
        });
      } catch (e) {
        console.error("Error parsing JSON data:", e);
      }
    },
  );

const convertTestCase = (jsonTestCase) => {
  const headersProcessed = new Map();
  jsonTestCase.request.header.forEach((header) => {
    headersProcessed.set(header.key, header.value);
  });

  return {
    name: jsonTestCase.name,
    action: jsonTestCase.request.method,
    url: jsonTestCase.request.url.raw,
    headers: Object.fromEntries(headersProcessed),
    script: jsonTestCase.event[0].script.exec.join("\n"),
  };
};

const writeYml = (ymlData, folder, fileName) => {
  fs.writeFile(
    `src/module-convertor/${folder}/${fileName}.yml`,
    ymlData,
    "utf8",
    (err) => {
      if (err) {
        console.error("Error writing YAML file:", err);
        return;
      }
      console.log("YAML file has been saved.");
    },
  );
};

module.exports = {
  readFile,
  convertTestCase,
  writeYml,
};
