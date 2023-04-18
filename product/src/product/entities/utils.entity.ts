export enum SuccessEnum {
  SUCCESS = 200,
  PRODUCT_CREATED = 201,
  PRODUCT_UPDATED = 200,
  PRODUCT_DELETED = 200,
}

export enum ErrorEnum {
  ERROR = 400,
  PRODUCT_NOT_FOUND = 404,
}

const CodeToCorrespondingMessage = {
  [SuccessEnum.PRODUCT_CREATED]: {
    message: 'Product successfully created',
  },
  [SuccessEnum.PRODUCT_UPDATED]: {
    message: 'Product successfully updated',
  },
  [SuccessEnum.PRODUCT_DELETED]: {
    message: 'Product successfully deleted',
  },
  [ErrorEnum.ERROR]: {
    message: 'An error occured',
  },
  [ErrorEnum.PRODUCT_NOT_FOUND]: {
    message: 'Product not found',
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
