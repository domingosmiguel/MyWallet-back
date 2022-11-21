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
    },
    userAlreadyExists: {
      code: 409,
      message: 'User already exists',
    },
    userCreated: {
      code: 201,
      message: 'created',
    },
  },
  login: {
    userNotFound: {
      code: 404,
      message: 'not found',
    },
  },
  records: {
    unauthorized: {
      code: 401,
      message: 'Transaction not authorized',
    },
    userNotFound: {
      code: 404,
    },
    recordNotFound: {
      code: 404,
    },
    recordUpdated: {
      code: 200,
    },
    recordCreated: {
      code: 201,
    },
    invalidData: {
      code: 422,
    },
  },
};
export { databaseName, collectionsName, serverAnswers };
