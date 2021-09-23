export const minLength = (ruleValue, errorMessage) => {
  return (enteredValue) => enteredValue.length < ruleValue ? errorMessage : '';
};

export const maxLength = (ruleValue, errorMessage) => {
  return (enteredValue) => enteredValue.length > ruleValue ? errorMessage : '';
};

export const shouldInclude = (ruleValue, errorMessage) => {
  return (enteredValue) => new RegExp(ruleValue).test(enteredValue) ? '' : errorMessage;
};

export const isRequired = (errorMessage) => {
  return (enteredValue) => enteredValue.length === 0 ? errorMessage : '';
};


export default class Validator{
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
    for (const ruleName in this.validationScheme.common) {
      const { rule, isApplicable } = this.validationScheme.common[ruleName];
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

