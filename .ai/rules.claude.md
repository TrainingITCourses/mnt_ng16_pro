# TypeScript and Angular Classic Coding Rules

As a senior Angular Classic software engineer specializing in clean code and design patterns, follow these guidelines when generating, correcting, or refactoring code:

## 1. General Principles

- Write clean, well-structured, and easily maintainable code.
- Implement tests for all generated code.
- Include robust error handling and proper logging.
- Add comments to public code explaining the "why" rather than the "what".

## 2. TypeScript Guidelines

- Use explicit type annotations for variables, constants, parameters, and return values.
- Avoid the 'any' type; declare strict and specific TypeScript types.
- Prefer 'undefined' over 'null'. Better yet, use a value representing the absence of a value.
- Use union types instead of enums.

## 3. Code Style

- Use PascalCase for classes, types, and interfaces.
- Use camelCase for public variables, methods, and functions.
- Use #camelCase for private variables and methods.
- Use UPPERCASE for environment variables.
- Use kebab-case for file and directory names.
- One export per file.

## 4. Comments

- Use JSDoc to document public surfaces of classes and modules.
- Do not document private members.
- Avoid inline comments; the code should be self-explanatory.

## 5. Naming Conventions

- Follow capitalization conventions mentioned in Code Style.
- Avoid magic numbers and define constants (except well-known values like 0, 1, true, false).
- Start each function or method with a verb.
- Use verbs for boolean variables (e.g., isLoading, hasError, canDelete).
- Use complete words instead of abbreviations, with correct spelling (except standard acronyms like Api, Dto, Url or well-known abbreviations like i, j, id, err, ctx, req, res).

## 6. Functions and Methods

- Write short functions with a single purpose (less than 20 instructions).
- Name functions with a verb and something else.
- Avoid nested blocks by:
  - Early checks and returns.
  - Extraction to utility functions or private methods.
  - Using ternary operators only for simple expressions.
- Use higher-order functions (map, filter, reduce) to avoid block nesting.
- Reduce function parameters using the RO-RO (Request-Response Object) pattern.
- Maintain a single level of abstraction.

## 7. Data and Types

- Create necessary types to define each data structure.
- Prefer 'type' over 'interface' for data definitions.
- Use 'as const' for literals that don't change.
- Use 'readonly' for data that doesn't change.
- Encapsulate data in composite types instead of abusing primitive types.
- Implement data validation within classes when necessary.

## 8. Classes

- Follow SOLID principles.
- Prefer composition over inheritance.
- Declare each behavior in an interface and implement it in a class.
- Write small classes with a single purpose (less than 200 instructions, less than 10 public methods, less than 10 properties).

## 9. Exceptions

- Avoid throwing exceptions for input validation or assumption checking.
- Use a global handler to catch exceptions, log the error, and inform the user if applicable.
- If catching an exception, do so to fix an expected problem, add context and rethrow, or log and report.

## 10. Logging

- Use a logger for monitoring the application.
- Each entry should have a timestamp, level, message, and optional data.
- Log user/client interactions and critical or rare events.

## 11. Testing

- Generate a test file with a main 'describe' block for each class.
- Use 'describe' blocks for each method and 'it' blocks for each test case.
- Follow the 'Arrange-Act-Assert' convention and document each test.
- Name test variables clearly (e.g., inputX, mockX, actualX, expectedX).
- For unit tests, use test doubles to simulate dependencies.

## Examples

### Example 1: Function and Class

```typescript
/**
 * Represents user data with immutable properties.
 */
type UserData = {
  readonly id: string;
  readonly name: string;
  readonly age: number;
};

/**
 * Determines if a user is an adult based on their age.
 * @param userData - The user data to check.
 * @returns True if the user is 18 or older, false otherwise.
 */
function isAdult(userData: UserData): boolean {
  return userData.age >= 18;
}

/**
 * Gets the status of a user based on their age.
 * @param userData - The user data to check.
 * @returns 'adult' if the user is 18 or older, 'minor' otherwise.
 */
function getUserStatus(userData: UserData): string {
  return isAdult(userData) ? "adult" : "minor";
}

// Usage
const user: UserData = { id: "1", name: "John Doe", age: 25 };
const status: string = getUserStatus(user);
console.log(`User status: ${status}`);

/**
 * Represents a user with basic information and status methods.
 */
class User {
  readonly id: string;
  readonly name: string;
  readonly age: number;

  /**
   * Creates a new User instance.
   * @param id - The user's unique identifier.
   * @param name - The user's full name.
   * @param age - The user's age in years.
   * @throws {Error} If any of the input parameters are invalid.
   */
  constructor(id: string, name: string, age: number) {
    this.#validateInputs(id, name, age);
    this.id = id;
    this.name = name;
    this.age = age;
  }

  #validateInputs(id: string, name: string, age: number): void {
    if (typeof id !== "string" || id.trim() === "") {
      throw new Error("Invalid id");
    }
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Invalid name");
    }
    if (typeof age !== "number" || age < 0 || age > 120) {
      throw new Error("Invalid age");
    }
  }

  /**
   * Checks if the user is an adult.
   * @returns True if the user is 18 or older, false otherwise.
   */
  isAdult(): boolean {
    return this.age >= 18;
  }

  /**
   * Gets the status of the user based on their age.
   * @returns 'adult' if the user is 18 or older, 'minor' otherwise.
   */
  getStatus(): string {
    return this.isAdult() ? "adult" : "minor";
  }
}

// Usage
try {
  const user = new User("1", "John Doe", 25);
  console.log(`User status: ${user.getStatus()}`);
} catch (error) {
  console.error("Error creating user:", error.message);
}
```

### Example 2: Avoiding Nested Structures

```typescript
/**
 * Processes an array of numbers and returns a summary of the processing.
 * @param numbers - The array of numbers to process.
 * @returns An object containing the count of processed numbers and any errors encountered.
 */
function processNumbers(numbers: number[]): {
  processed: number;
  errors: string[];
} {
  const result = { processed: 0, errors: [] as string[] };

  const processNumber = (num: number): void => {
    if (isNaN(num)) {
      result.errors.push(`Invalid number: ${num}`);
      return;
    }
    if (num < 0) {
      result.errors.push(`Negative number: ${num}`);
      return;
    }
    result.processed++;
  };

  numbers.forEach(processNumber);

  return result;
}

// Usage
const numbersToProcess = [1, 2, -3, 4, NaN, 6, -7, 8];
const processingResult = processNumbers(numbersToProcess);

console.log(`Processed: ${processingResult.processed}`);
console.log(`Errors: ${processingResult.errors.join(", ")}`);
```

This example demonstrates:

1. Using a higher-order function (forEach) to iterate over the array, avoiding a traditional for loop.
2. Extracting processing logic to a separate function (processNumber) to maintain a single level of abstraction in the main function.
3. Using early returns within processNumber to avoid nested conditionals.
4. Accumulating results in an object, allowing processing of all numbers without interrupting the flow for individual errors.

Generate code following these guidelines and patterns. If you need more information or clarification on any specific point, please ask.
