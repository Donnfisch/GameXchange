module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true
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
      "modules": true
    }
  },
  "rules": {
    "arrow-parens": 0,
    "quotes": [2, "single", { "avoidEscape": true }],
    "jsx-quotes": ["error", "prefer-double"],
    "react/jsx-no-undef": [
      2,
      {
        "allowGlobals": true
      }
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "class-methods-use-this": 0,
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true, "minProperties": 3 },
      "ObjectPattern": { "multiline": true, "minProperties": 3 },
      "ImportDeclaration": { "multiline": true, "minProperties": 3 },
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
    "no-trailing-spaces": 2,
    "no-plusplus": 0,
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 2,
    "import/no-webpack-loader-syntax": 0,
    "import/prefer-default-export": 0,
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "jsx-a11y/aria-props": 2,
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/heading-has-content": 0,
    "jsx-a11y/href-no-hash": 0,
    "jsx-a11y/label-has-for": 1,
    "jsx-a11y/mouse-events-have-key-events": 2,
    "jsx-a11y/role-has-required-aria-props": 2,
    "jsx-a11y/role-supports-aria-props": 2,
    "linebreak-style": 0,
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-confusing-arrow": 0,
    "no-console": 1,
    "no-unused-expressions": [2, { allowTernary: true }],
    "no-use-before-define": 0,
    "prefer-template": 2,
    "react/forbid-prop-types": 0,
    "react/jsx-first-prop-new-line": [
      2,
      "multiline"
    ],
    "react/jsx-filename-extension": 0,
    "react/jsx-no-target-blank": 0,
    "react/require-default-props": 0,
    "react/require-extension": 0,
    "react/self-closing-comp": 0,
    "require-yield": 0,
  }
};