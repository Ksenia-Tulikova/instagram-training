import { EditUserComponent } from './EditUserComponent';
import { router } from '../../app';
import { BaseController } from '../BaseController';
import { getUser, updateUser, uploadAvatar } from '../../api';

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
      onDeletePhoto: {
        queryParam: '#delete-photo',
        eventType: 'click',
        callback: this._onDeletePhoto.bind(this),
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
      console.log(reader.result);
      this.updatePhotoRender(reader.result);
    };
  }

  updatePhotoRender (src) {
    this.view.renderAvatar(src);
  }

  updateGender (userGender) {
    this.modifyState(state => {
      state.gender = {
        male: userGender === 'male' ? 'checked' : '',
        female: userGender === 'female' ? 'checked' : '',
      };
    });
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
    if (this.uploadedFile) {
      const savedFileId = await this.uploadPhotoOnServer(this.uploadedFile);
      this.modifyState(state => {state.avatarId = savedFileId;});
    }

    // authManager.updateUser(this.state);
    updateUser(this.state);
    router.changeRoute('/users');
  }

  close () {
    router.changeRoute('/users');
  }

  deletePhoto () {
    this.uploadedFile = undefined;
    this.modifyState(state => {state.avatarId = undefined});
    this.view.renderAvatar(this._getAvatarSrc());
  }

  async uploadPhotoOnServer (avatar) {
    return await uploadAvatar({
      avatar,
      login: this.state.login,
    });
  }

  async connect (params) {
    // this.state = authManager.getUser(params.login);
    const user = await getUser(params.id);
    this.state = {
      ...user,
      gender: {
        male: user.gender === 'male' ? 'checked' : '',
        female: user.gender === 'female' ? 'checked' : '',
      }
    };

    const stateToRender = {
      ...this.state,
      avatarSrc: this._getAvatarSrc(),
    };
    this.view = new EditUserComponent(this.place, this.handlers);
    return this.view.render(stateToRender);
  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

  _getAvatarSrc () {
    const avatar = this.state.avatarId && this.state.avatarId !== 'undefined' ? this.state.avatarId : 'default_avatar.jpg';
    return `http://localhost:8080/avatars/${avatar}`;
  }

  _onPhotoLoad (event) {
    this.loadPhoto(event.target.files[0]);
  }

  _onDeletePhoto () {
    this.deletePhoto();
  }

  _onMaleClick (event) {
    if (event.target.checked) {
      console.log(`Male is: ${event.target.value}`);
      this.updateGender(event.target.value);
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