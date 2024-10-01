# Config Schematics

## Modify Angular.json

### Components

Use OnPush change detection strategy
Delay style declaration until last moment
Try to be flat
Do not test at component level

```json
"schematics": {
  "@schematics/angular:component": {
    "changeDetection": "OnPush",
    "inlineStyle": true,
    "flat": true,
    "skipTests": true,
    "style": "none",
  }
}
```

### Services

Do not test at service level

```json
"schematics": {
  "@schematics/angular:service": {
    "skipTests": true,
    "flat": true
  }
}
```
