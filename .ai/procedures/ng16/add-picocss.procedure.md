## Add PicoCSS

1. install PicoCSS

```bash
npm install @picocss/pico
```

2. Import at angular.json

```json
"styles": [
  "node_modules/@picocss/pico/css/pico.min.css",
  "src/styles.css"
]
```

3. Change styles.css

```css
body {
  padding: 1rem;
}
span {
  margin-right: 0.5rem;
}
```
