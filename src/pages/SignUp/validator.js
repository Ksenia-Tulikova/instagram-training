import Validator, { isRequired, minLength, maxLength, shouldInclude } from '../../validation';

export const validator = new Validator({
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
});