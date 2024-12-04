import config from "./.eslintrc.json";


// import { createRequire } from "module"; // Bring in the ability to create the 'require' method
// const require = createRequire(import.meta.url); // construct the require method
// const config = require("./.eslintrc.json");

/** @type {import('eslint').Linter.Config[]} */
export default [...[].concat(config)];
