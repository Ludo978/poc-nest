export enum SuccessEnum {
  SUCCESS = 200,
  ORDER_CREATED = 201,
  ORDER_UPDATED = 200,
  ORDER_DELETED = 200,
}

export enum ErrorEnum {
  ERROR = 400,
  ORDER_NOT_FOUND = 404,
}

const CodeToCorrespondingMessage = {
  [SuccessEnum.ORDER_CREATED]: {
    message: 'Order successfully created',
  },
  [SuccessEnum.ORDER_UPDATED]: {
    message: 'Order successfully updated',
  },
  [SuccessEnum.ORDER_DELETED]: {
    message: 'Order successfully deleted',
  },
  [ErrorEnum.ERROR]: {
    message: 'An error occured',
  },
  [ErrorEnum.ORDER_NOT_FOUND]: {
    message: 'Order not found',
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
