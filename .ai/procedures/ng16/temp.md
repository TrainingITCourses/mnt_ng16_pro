## Specific to Angular Classic

### Folder and Module structure

Organize the code following the principles of modularity and separation of concerns.

| **Criteria** | **Option A** | **Option B**    |
| ------------ | ------------ | --------------- |
| **Loading**  | Eager        | Lazy            |
| **Domain**   | Shared       | Domain-Specific |
| **Modules**  | Declarative  | Injectable      |

- Start with the following folder/module structure:

  - `src/app/`
    - `core/`
      - `auth/`
      - `layout/`
      - `global/`
      - `log/`
    - `routes/`
      - `home/`
      - `about/`
    - `shared/`
      - `domain/`
      - `ui/`
      - `utils/`

- Add a path alias in the `tsconfig.json` file to simplify imports.

> Example:

```json
"paths": {
  "@core/*": ["src/app/core/*"],
  "@shared/*": ["src/app/shared/*"],
  "@routes/*": ["src/app/routes/*"]
}
```

#### Core Module

```bash
ng generate module core
ng generate component core/layout --export
ng generate service core/layout
ng generate component core/layout/header
ng generate component core/layout/footer
ng generate service core/auth/auth-user-token
ng generate interceptor core/auth/auth-user-token
ng generate guard core/auth/auth-user-token
ng generate service core/global/global-error
ng generate service core/global/global-state
ng generate service core/log/logger
```

#### Shared Module

```bash
ng generate module shared
ng generate class shared/domain/user.dto
ng generate component shared/ui/button --export
```

#### Routes Modules

```bash
ng generate module routes/home --route=home --module=app.module
ng generate service routes/home
ng generate component routes/home-banner
ng generate component routes/home-content
ng generate module routes/about --route=about --module=app.module
```

#### App Module

- Keep it as simple as possible.
- AppRoutingModule using loadChildren.

> Example:

```typescript
const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./routes/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./routes/about/about.module").then((m) => m.AboutModule),
  },
];
```

### Component (Declarative) structure

Use the Container/Presentational Component pattern.

- Container:

  - Logic: Events, data, business rules, etc.
  - Connects the view to the model.
  - Interactions with the outside world.
  - Depends on injected services.

- Presentational(s):

  - UI: HTML, CSS, etc.
  - Only logic related to the UI .
  - Receives data via `@Input()` bindings
  - Raises events via `@Output()` bindings.

- Shared UI:
  - Reuseable Presentational components.
  - Use the `shared/ui` folder.
  - Must be exported from the `shared` module.

### Service (Injectable) structure

- Use one service for each Container as a facade.
- Use the default _provided in root_ even for local services.
- Extract common business logic to shared domain services.
- Extract generic logic to shared utility functions.
- Use core domain for interceptors, guards and global services.
