import { EditUserComponent } from './EditUserComponent';
import { authManager, router } from './app';

export class EditUserController {
  constructor (place) {
    this.place = place;
    this.state = '';
    this.handlers = this.handlers = {
      onMaleClick: {
        queryParam: '.male_radio_btn input',
        eventType: 'click',
        callback: this._onMaleClick.bind(this),
      },
      onDateOfBirth: {
        queryParam: 'input#dateOfBirth',
        eventType: 'change',
        callback: this._onDateOfBirth.bind(this),
      },
      onTelBlur: {
        queryParam: 'input#tel',
        eventType: 'blur',
        callback: this._onTelBlur.bind(this),
      },
      onCountrySelected: {
        queryParam: '.country-selector',
        eventType: 'change',
        callback: this._onCountrySelected.bind(this),
      },
      onSave: {
        queryParam: '.button-save',
        eventType: 'click',
        callback: this._onSave.bind(this),
      },
      onClose: {
        queryParam: '.button-close',
        eventType: 'click',
        callback: this._onClose.bind(this),
      }
    };
  }

  updateMale (userMale) {
    this.modifyState(state => state.male[userMale] = 'checked');
  }

  updateDateOfBirth (dateOfBirth) {
    this.modifyState(state => state.dateOfBirth = dateOfBirth);
  }

  updateTel (tel) {
    this.modifyState(state => state.tel = tel);
  }

  updateCountry (userCountry) {
    this.modifyState(state => state.userCountry = userCountry);
  }

  save () {
    authManager.updateUser(this.state);
    router.changeRoute('/users');
    // pageResolver.goTo(pageResolver.pageMapping.usersTable.name);
  }

  close () {
    router.changeRoute('/users');

    // pageResolver.goTo(pageResolver.pageMapping.usersTable.name);
  }

  connect (params) {
    console.log(params);
    this.state = authManager.getUser(params.login);
    this.view = new EditUserComponent(this.place, this.handlers);
    this.view.render(this.state);
  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

  _onMaleClick (event) {
    if (event.target.checked) {
      console.log(`Male is: ${event.target.value}`);
      this.updateMale(event.target.value);
    }
  }

  _onDateOfBirth (event) {
    this.updateDateOfBirth(event.target.value);
  }

  _onTelBlur (event) {
    this.updateTel(event.target.value);
  }

  _onCountrySelected (event) {
    this.updateCountry(event.target.value);
  }

  _onClose () {
    this.close();
  }

  _onSave () {
    this.save();
  }
}