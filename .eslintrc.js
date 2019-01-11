module.exports = {
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "env": {
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "globals": {
    "Promise": true,
    "Symbol": true,
    "Proxy": true
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "warn",
      "single"
    ],
    "no-unused-vars": "warn",
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "warn",
          "error"
        ]
      }
    ],
    "no-empty": [
      "error",
      {
        "allowEmptyCatch": true
      }
    ],
    "semi": [
      "warn",
      "never"
    ],
    "eol-last": "warn",
    "comma-dangle": [
      "error",
      "never"
    ]
  }
}
