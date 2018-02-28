module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    // 'plugin:vue/essential',
    // "plugin:vue/base"
    // "plugin:vue/recommended"
  ],
  env: {
    "es6": true,
    "node": true,
    "browser": true,
  },
  parserOptions: {
    "sourceType": "module",
    "ecmaVersion": 2017 // for async/await
  },
  plugins: [
    // "eslint-plugin-html", // for vue files or in Atom settings Lint HTML Files (text.html.vue)
    // "eslint-plugin-vue", // nope
    // "vue", // nope
  ],
  rules: {
    // 'vue/no-unused-vars': 'error'
    // "indent": ["error", 2],
    // "linebreak-style": ["error", "unix"],
    // "quotes": ["error", "double"],
    "semi": ["warn", "always"],
    "no-extra-semi": ["warn"],
    "no-cond-assign": ["error", "always"],
    "no-unused-vars": ["warn", { "vars": "local", "args": "none" }],
    "no-dupe-keys": ["warn"],
    "no-console": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-useless-escape": "off",
    "no-constant-condition": "off",

  },
  globals: {
    "gapi": false,
  }
}
