# Express Backend Template

This repository serves as a template for backend projects using Express and TypeScript, structured in an Object-Oriented Programming (OOP) style. It provides a solid foundation for building scalable and maintainable server-side applications.

## Features

- **Express**: A minimal and flexible Node.js web application framework.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **OOP Design**: The project is structured using Object-Oriented Programming principles, promoting code reusability and modularity.
- **Validation**: Input validation is implemented using Zod, a TypeScript-first schema declaration and validation library. Additionally, validation can also be performed using `class-validator`.
- **Prisma**: Prisma is used as an ORM to interact with the database.

## Validation

The project supports two methods for validating data, allowing you to choose the one that best fits your needs:

1. **Zod Validation**: This is the primary method used in the project. Zod provides a simple and powerful way to define and validate schemas. You can implement validation using Zod by defining schemas and using them in your middleware.

2. **Class-Validator**: An alternative validation method using decorators. This can be useful if you prefer using decorators for validation. You can switch to `class-validator` by defining DTO classes with decorators and using the corresponding middleware for validation.

You can choose to implement validation using either Zod or `class-validator`, but not both simultaneously. Each method offers its own advantages, so select the one that aligns with your project's requirements.

### Example Code

Below is an example of how validation is implemented in the project:

#### Zod Validation Middleware

```typescript
export const validateDtoMiddleware = (schema: z.ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors });
    }
    next();
  };
};
```

#### Class-Validator Middleware

```typescript
export const validateDtoMiddleware = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dto, req.body);
    const errors = await validate(dtoInstance);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    next();
  };
};
```

#### DTO Example with Class-Validator

```typescript
export class TwitCreateDto {
  @IsString()
  text: string;

  @IsString()
  author: string;
}
```

#### Zod Schema Example

```typescript
export const TwitCreateDto = z.object({
  text: z.string().min(1).max(2000),
  author: z.string().min(1).max(255),
});
```

## Getting Started

To start using this template, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd express-base-template
npm install
```

### Development

To run the project in development mode, use:

```bash
npm run dev
```

This will start the server with `nodemon` for automatic reloading.

### Production

To build and run the project in production mode, use:

```bash
npm run prod
```

This will compile the TypeScript code and start the server using Node.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```

```
