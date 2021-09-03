const minLength = (ruleValue, errorMessage) => {
  return (enteredValue) => enteredValue.length < ruleValue ? errorMessage : '';
};

const maxLength = (ruleValue, errorMessage) => {
  return (enteredValue) => enteredValue.length > ruleValue ? errorMessage : '';
};

const shouldInclude = (ruleValue, errorMessage) => {
  return (enteredValue) => new RegExp(ruleValue).test(enteredValue) ? '' : errorMessage;
};

const isRequired = (errorMessage) => {
  return (enteredValue) => enteredValue.length === 0 ? errorMessage : '';
};

export const VALIDATION_RULES = {
  local: {
    'login': [
      isRequired('Login is required!'),
      maxLength(10, 'Login should be less than 10'),
      minLength(3, 'Login should be more than 3'),
    ],
    'password': [
      isRequired('Password is required!'),
      maxLength(10, 'Password should be less than 10'),
      minLength(3, 'Password should be more than 3'),
      shouldInclude('[0-9]+', 'Password should include numbers'),
    ],
    'e-mail': [
      isRequired('E-mail is required!'),
      minLength(3, 'E-mail should be more than 3'),
      shouldInclude('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$', 'E-mail should be')
    ],
    'repeatPassword': [
      isRequired('Password is required!'),
      maxLength(10, 'Password should be less than 10'),
      minLength(3, 'Password should be more than 3'),
      shouldInclude('[0-9]+', 'Password should include numbers'),
    ]
  },
  common: {
    'arePasswordsTheSame': {
      rule: (data) => (data.password === data.repeatPassword
          ? ''
          : { 'repeatPassword': 'Passwords should be the same' }
      ),
      isApplicable: (data) => data.password && data.repeatPassword
    }
  }
};

export class Validation {
  constructor (validationScheme) {
    this.validationScheme = validationScheme;
  }

  validateField (fieldName, value) {
    const rules = this.validationScheme.local[fieldName];

    for (const rule of rules) {
      const errorMessage = rule(value);
      if (errorMessage) {
        return {
          isValid: false,
          errorMessage
        };
      }
    }

    return {
      isValid: true
    };
  }

  validateCommon (data) {
    let errorMessages = {};
    for (const ruleName in VALIDATION_RULES.common) {
      const { rule, isApplicable } = VALIDATION_RULES.common[ruleName];
      if (isApplicable(data)) {
        errorMessages = { ...errorMessages, ...rule(data) };
      }
    }

    return {
      isValid: !Object.keys(errorMessages).length,
      errorMessages
    };

  }

  _validateAllFields (data) {
    const errorMessages = {};
    for (const [fieldName, fieldValue] of Object.entries(data)) {
      const { isValid, errorMessage } = this.validateField(fieldName, fieldValue);
      if (!isValid) {
        errorMessages[fieldName] = errorMessage;
      }
    }

    return {
      isValid: !Object.keys(errorMessages).length,
      errorMessages
    };

  }

  validateGlobal (data) {
    let validationResult = this._validateAllFields(data);

    if (validationResult.isValid) {
      validationResult = this.validateCommon(data);
    }
    return validationResult;
  }
}

