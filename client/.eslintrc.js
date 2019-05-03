module.exports = {
  "extends": ["airbnb", "plugin:react/recommended"],
  "rules": {
    "no-console": 0,
    "import/no-dynamic-require": 0,
    "func-names": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "indent": [2, "tab"],
    "no-tabs": 0,
    "object-curly-newline": ["error", {
        "ObjectExpression": { "multiline": true, "minProperties": 10 },
        "ObjectPattern": { "multiline": false },
    }]
  }
};