# Add Route

## 1.- Generate module with routing

```bash
ng generate module routes/home --routing --module=app.module
```

## 2.- Generate page component

```bash
ng generate component routes/home/home --type=page --export=false --selector=false
```

## 3.- Add route to feature module and app module

```typescript
// home-routing.module.ts
const routes: Routes = [{ path: "", component: HomePage, title: "Home" }];

// app-routing.module.ts
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("@app/home").then((module) => module.HomeModule),
  },
];
```

## 4.- Generate service

```bash
ng generate service routes/home
```

## 5.- Generate presenter component

```bash
ng generate component routes/home/home --export=false
```
