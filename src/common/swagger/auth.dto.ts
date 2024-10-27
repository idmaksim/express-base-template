export const UserSignInDto = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
};

export const UserSignUpDto = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
};

export const UserRefreshDto = {
  type: "object",
  properties: {
    refreshToken: {
      type: "string",
    },
  },
};
