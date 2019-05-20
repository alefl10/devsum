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
    }],
    "jsx-a11y/label-has-associated-control": [ "error", {
        "required": {
          "some": [ "nesting", "id"  ]
        }
      }],
      "jsx-a11y/label-has-for": [ "error", {
        "required": {
          "some": [ "nesting", "id"  ]
        }
      }]
  }
};