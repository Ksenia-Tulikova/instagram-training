import { authManager, pageResolver, validator } from './app.js';
import { SignUpComponent } from './SignUpComponent';
import { TEMPLATES } from './BaseComponent';

const initialState = {
  login: {
    value: '',
    errorMessage: ''
  },
  password: {
    value: '',
    errorMessage: ''
  },
  repeatPassword: {
    value: '',
    errorMessage: ''
  },
  isLogged: false
};

export class SignUpController {
  constructor (place) {
    this.place = place;
    this.state = initialState;
    this.handlers = {
      onLoginBlur: {
        queryParam: 'input[name="login"]',
        eventType: 'blur',
        callback: this._onLoginBlur.bind(this),
      },
      onPasswordBlur: {
        queryParam: 'input[name="password"]',
        eventType: 'blur',
        callback: this._onPasswordBlur.bind(this),
      },
      onRepeatPasswordBlur: {
        queryParam: 'input[name="repeat-password"]',
        eventType: 'blur',
        callback: this._onRepeatPasswordBlur.bind(this),
      },
      onSubmit: {
        queryParam: '.button-sign-up',
        eventType: 'click',
        callback: this._onSubmit.bind(this),
      }
    };
  }

  _onLoginBlur (event) {
    this.updateLogin(event.target.value);
  }

  _onPasswordBlur (event) {
    this.updatePassword(event.target.value);
  }

  _onRepeatPasswordBlur (event) {
    this.updateRepeatPassword(event.target.value);
  }

  _onSubmit (event) {
    event.preventDefault();
    this.submit();
  }

  _arrangeErrors (validationData, validationResult) {
    for (const field in validationData) {
      if (!validationResult.isValid) {
        this.state[field].errorMessage = validationResult.errorMessages[field] || '';
      }
    }
  }

  connect () {
    this.view = new SignUpComponent(this.place, TEMPLATES.signUp, this.handlers);
    this.view.render(this.state);
  }

  updateLogin (value) {
    this.state.login.value = value;
    this.state.login.errorMessage = '';

    const fieldValidationResult = validator.validateField('login', value);

    if (!fieldValidationResult.isValid) {
      this.state.login.errorMessage = fieldValidationResult.errorMessage;
    }

    this.modifyState();

    this.view.updateErrorsView(this.state);
  }

  updatePassword (value) {
    this.state.password.value = value;
    this.state.password.errorMessage = '';
    this.state.repeatPassword.errorMessage = '';

    const fieldValidationResult = validator.validateField('password', value);

    if (fieldValidationResult.isValid) {
      const validationData = {
        'password': value,
        'repeatPassword': this.state.repeatPassword.value
      };

      const commonValidationResult = validator.validateCommon(validationData);

      this._arrangeErrors(validationData, commonValidationResult);

    } else {
      this.state.password.errorMessage = fieldValidationResult.errorMessage;
    }

    this.modifyState();

    this.view.updateErrorsView(this.state);
  }

  updateRepeatPassword (value) {
    this.state.repeatPassword.value = value;
    this.state.repeatPassword.errorMessage = '';

    const fieldValidationResult = validator.validateField('repeatPassword', value);

    if (fieldValidationResult.isValid) {

      const validationData = {
        'password': this.state.password.value,
        'repeatPassword': value
      };

      const commonValidationResult = validator.validateCommon(validationData);

      this._arrangeErrors(validationData, commonValidationResult);

    } else {
      this.state.repeatPassword.errorMessage = fieldValidationResult.errorMessage;
    }

    this.modifyState();

    this.view.updateErrorsView(this.state);

  }

  submit () {
    const authData = {
      'login': this.state.login.value,
      'password': this.state.password.value,
      'repeatPassword': this.state.repeatPassword.value,
    };
    const additionalAuthData = {
      dateOfBirth: '',
      male: {
        woman: '',
        man: ''
      },
      tel: '',
      userCountry: ''
    };

    const validationResult = validator.validateGlobal(authData);

    if (validationResult.isValid) {
      authManager.setNewUser({...authData, ...additionalAuthData});

      this.modifyState(state => state.isLogged = true);

      pageResolver.goTo(pageResolver.pageMapping.usersTable.name);

    } else {
      this.modifyState(state => {
        for (const fieldName in validationResult.errorMessages) {
          state[fieldName].errorMessage = validationResult.errorMessages[fieldName];
        }
      });

      this.view.updateErrorsView(this.state);
    }

  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

}