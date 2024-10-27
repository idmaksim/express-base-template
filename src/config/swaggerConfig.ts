import { Options } from "swagger-jsdoc";
import {
  UserSignInDto,
  UserSignUpDto,
  UserRefreshDto,
} from "../common/swagger/auth.dto";

const swaggerOptions: Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API",
      version: "1.0.0",
      description: "API documentation for the Express project",
    },
    swagger: "2.0.0",
    components: {
      schemas: {
        UserSignInDto,
        UserSignUpDto,
        UserRefreshDto,
      },
    },
  },
  apis: ["./src/**/*.ts"],
};

export default swaggerOptions;
