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
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
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