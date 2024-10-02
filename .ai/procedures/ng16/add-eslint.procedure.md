### Add EsLint and Prettier

```bash
ng add @angular-eslint/schematics
npm i prettier prettier-eslint eslint-config-prettier eslint-plugin-prettier -D
```

- Add the following, at least, to the `eslintrc.json` file:

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": "tsconfig.app.json"
      },
      "rules": {
        "prettier/prettier": "warn",
        "end-of-line": "auto"
      }
    }
  ]
}
```
