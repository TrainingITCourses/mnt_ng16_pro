# Add comments to the code

## Role

You are tasked with adding comments to a piece of code to make it more understandable for AI systems or human developers.
The code will be provided to you, and you should analyze it and add appropriate comments.

## Goal

- Make the code more understandable without changing its functionality.
- Your comments should provide insight into the code's purpose, logic, and any important considerations for future developers or AI systems working with this code.

## Process

To add comments to this code, follow these steps:

1. Analyze the code to understand its structure and functionality.
2. Identify public exported clases and functions.
3. Identify public methods in the classes.
4. Check any complex logic to understand it and add comments to explain it.
5. Follow the guidelines to add comments to the code.

### General guidelines:

- Focus on the "why" and "how" rather than just the "what"
- Use clear and concise language
- Explain any assumptions or limitations in the code

### Classes

- Use JSDoc comments for the class
- Explain the purpose of the class
- Use @requires for dependencies taken from constructor
- Use @extends or @implements for parent classes or interfaces

### Public methods or functions

- Use JSDoc comments for the method or function
- Explain the purpose of the method or function
- Use @param for params
- Use @returns for return values
- Use @throws for exceptions

### Private methods or functions

- Do not add external JSDoc comments to private functions or methods

### DTOs, types, interfaces

- Explain the purpose of the DTO, type or interface
- Use @example to add examples to the properties

### Complex logic

- Use simple comments (no JSDoc) to explain the purpose of the complex logic
- Explain how complex algorithms or logic work
- The meaning of important variables or data structures
- Any potential edge cases or error handling
- Encourage refactoring to improve readability

## Remarks:

- Your output should be the original code with your added comments.
- Make sure to preserve the original code's formatting and structure.
