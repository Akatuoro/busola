const jsyaml = require('js-yaml');

module.exports = async function multiFile(source) {
  const parsed = jsyaml.load(source);
  return JSON.stringify(parsed);
};
