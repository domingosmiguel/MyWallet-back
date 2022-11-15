const databaseName = 'myWallet';
const collections = {
  users: 'users',
  sessions: 'sessions',
  transactions: 'transactions',
};

const serverAnswers = {
  databaseProblem: { code: 500 }, // USED
  newUser: {
    invalidUser: {
      code: 422,
      message: 'Apelido deve ter entre 3 e 20 caracteres',
    },
    // USED
    userAlreadyExists: {
      code: 409,
      message: 'Usuário já existe',
    },
    // USED
    userCreated: {
      code: 201,
    },
  },
  login: {
    // USED
    userNotFound: {
      code: 404,
    },
    success: {
      code: 200,
    },
  },
  transactions: {
    // USED
    unauthorized: {
      code: 401,
    },
    // USED
    userNotFound: {
      code: 404,
    },
    // USED
    transactionNotFound: {
      code: 404,
    },
    transactionUpdated: {
      code: 201,
    },
  },
  deleteMsgs: {
    msgNotFound: {
      code: 404,
    },
    userNotOwner: {
      code: 401,
    },
    msgDeleted: {
      code: 200,
    },
  },
  editMsgs: {
    invalidMsg: {
      code: 422,
      message:
        "'to' e 'text' devem ser strings não vazias, 'type' só pode ser 'message' ou 'private_message', 'from' deve ser um participante existente na lista de participantes.",
    },
    msgNotFound: {
      code: 404,
    },
    userNotOwner: {
      code: 401,
    },
    msgEdited: {
      code: 200,
    },
  },
};
export { databaseName, collections, serverAnswers };
