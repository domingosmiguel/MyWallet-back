const databaseName = 'myWallet';
const collectionsName = {
  users: 'users',
  sessions: 'sessions',
  records: 'records',
};

const serverAnswers = {
  databaseProblem: { code: 500 },
  newUser: {
    invalidUser: {
      code: 422,
      message: 'invalid user',
    },
    userAlreadyExists: {
      code: 409,
      message: 'user already exists',
    },
    userCreated: {
      code: 201,
      message: 'new user created',
    },
  },
  login: {
    invalid: {
      code: 404,
      message: 'invalid email or password',
    },
  },
  records: {
    unauthorized: {
      code: 401,
      message: 'transaction not authorized',
    },
    invalidUser: {
      code: 404,
      message: 'invalid user',
    },
    recordNotFound: {
      code: 404,
      message: 'record not found',
    },
    recordUpdated: {
      code: 200,
      message: 'record updated',
    },
    recordCreated: {
      code: 201,
      message: 'record created',
    },
    recordDeleted: {
      code: 204,
      message: 'record deleted',
    },
    invalidData: {
      code: 422,
      message: 'invalid data',
    },
  },
};
export { collectionsName, databaseName, serverAnswers };
