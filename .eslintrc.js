module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "airbnb",
    "plugin:jsx-control-statements/recommended",
  ],
  "plugins": [
    "react",
    "jsx-a11y",
    "jsx-control-statements",
  ],
  "parserOptions": {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
    }
  },
  "rules": {
    "array-bracket-spacing": ["error", "always", {
      "singleValue": false
    }, {
      "arraysInArrays": false
    }],
    "arrow-body-style": ["error", "as-needed"],
    "arrow-parens": "off",
    "class-methods-use-this": "off",
    "comma-dangle": ["error", "always-multiline"],
    "import/imports-first": "error",
    "import/newline-after-import": "error",
    "import/no-dynamic-require": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-unresolved": "error",
    "import/no-webpack-loader-syntax": "off",
    "import/prefer-default-export": "off",
    "indent": [
      "error",
      2,
      {
        "ArrayExpresion": "first"
      },
      {
        "SwitchCase": 1
      },
      {
        "VariableDeclarator": "first"
      },
      {
        "FunctionDeclaration": {
          "parameters": "first"
        }
      }
    ],
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/heading-has-content": "off",
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/label-has-for": "warn",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "key-spacing": ["error", {
      "multiLine": {
        "beforeColon": false,
        "afterColon": true,
        "align": true
      },
      "align": {
        "beforeColon": true,
        "afterColon": true,
        "on": "value"
      }
    }],
    "max-len": "off",
    "newline-per-chained-call": "off",
    "no-confusing-arrow": "off",
    "no-console": "warn",
    "no-plusplus": "off",
    "no-trailing-spaces": "error",
    "no-unused-expressions": ["error", {
      "allowTernary": true
    }],
    "no-use-before-define": "off",
    "object-curly-newline": ["error", {
      "ObjectExpression": "never",
      "ObjectPattern": {
        "multiline": true
      },
      "ImportDeclaration": "never",
      "ExportDeclaration": {
        "multiline": true,
        "minProperties": 3
      }
    }],
    "object-property-newline": ["error", {
      "allowAllPropertiesOnSameLine": true
    }],
    "prefer-template": "error",
    "quotes": ["error", "single", {
      "avoidEscape": true
    }],
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-no-undef": ["error", {
      "allowGlobals": true
    }],
    "react/jsx-no-target-blank": "off",
    "react/require-default-props": "off",
    "react/require-extension": "off",
    "react/self-closing-comp": "off",
    "require-yield": "off",
  }
};