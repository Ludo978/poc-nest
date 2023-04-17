export enum SuccessEnum {
  SUCCESS = 200,
  ACCOUNT_CREATED = 201,
  ACCOUNT_UPDATED = 200,
  ACCOUNT_DELETED = 200,
}

export enum ErrorEnum {
  ERROR = 400,
  ACCOUNT_NOT_FOUND = 404,
}

const CodeToCorrespondingMessage = {
  [SuccessEnum.ACCOUNT_CREATED]: {
    message: 'Account successfully created',
  },
  [SuccessEnum.ACCOUNT_UPDATED]: {
    message: 'Account successfully updated',
  },
  [SuccessEnum.ACCOUNT_DELETED]: {
    message: 'Account successfully deleted',
  },
  [ErrorEnum.ERROR]: {
    message: 'An error occured',
  },
  [ErrorEnum.ACCOUNT_NOT_FOUND]: {
    message: 'Account not found',
  },
};

export function successBuilder(code: SuccessEnum, id: string) {
  return {
    success: true,
    message: CodeToCorrespondingMessage[code].message,
    id,
  };
}

export function graphqlErrorBuilder(code: ErrorEnum) {
  return {
    success: false,
    message: CodeToCorrespondingMessage[code].message,
    code,
  };
}
