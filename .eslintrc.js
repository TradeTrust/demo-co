module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["plugin:react/recommended", "prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "no-unused-vars": [
          "error",
          {
            "argsIgnorePattern": "^_"
          }
        ],
        "func-names": ["error", "as-needed"],
        "react/react-in-jsx-scope": "off",
        "prettier/prettier": "error",
        "no-unused-expressions": "off",
        "prefer-destructuring": "off"
    }
};