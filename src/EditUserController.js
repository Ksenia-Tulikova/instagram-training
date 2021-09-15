import axios from 'axios';
import { EditUserComponent } from './EditUserComponent';
import { authManager, router } from './app';
import { BaseController } from './BaseController';

export class EditUserController extends BaseController {
  constructor (place) {
    super(undefined);
    this.place = place;
    this.state = '';
    this.handlers = this.handlers = {
      onPhotoLoad: {
        queryParam: '#photo-upload',
        eventType: 'change',
        callback: this._onPhotoLoad.bind(this),
      },
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

  loadPhoto (file) {
    const reader = new FileReader();
    this.uploadedFile = file;

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.updatePhotoRender(reader.result);
    };
  }

  updatePhotoRender (src) {
    this.view.renderNewPhoto(src);
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

  async save () {
    const savedFileId = await this.uploadPhotoOnServer(this.uploadedFile);
    this.modifyState(state => state.avatarId = savedFileId);
    authManager.updateUser(this.state);
    router.changeRoute('/users');
  }

  close () {
    router.changeRoute('/users');
  }

  async uploadPhotoOnServer (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    formData.append('login', this.state.login);

    const response  = await axios({
      method: 'POST',
      url: 'http://localhost:8080/upload',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  }

  connect (params) {
    this.state = authManager.getUser(params.login);
    this.state.avatarSrc = `http://localhost:8080/avatars/${this.state.avatarId || 'default_avatar.jpg'}`;

    this.view = new EditUserComponent(this.place, this.handlers);
    return this.view.render(this.state);
  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

  _onPhotoLoad (event) {
    this.loadPhoto(event.target.files[0]);
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