import { EditUserComponent } from './EditUserComponent';
import { router } from '../../app';
import { BaseController } from '../BaseController';
import { addImage, deleteImage, getUser, getUserImages, updateUser, uploadAvatar } from '../../api';

export class EditUserController extends BaseController {
  constructor (place) {
    super(undefined);
    this.place = place;
    this.state = '';
    this.handlers = {
      onAvatarLoad: {
        queryParam: '#photo-upload',
        eventType: 'change',
        callback: this._onAvatarLoad.bind(this),
      },
      onPhotoLoad: {
        queryParam: '#user-photos-upload',
        eventType: 'change',
        callback: this._onPhotoLoad.bind(this),
      },
      onDeleteAvatar: {
        queryParam: '#delete-avatar',
        eventType: 'click',
        callback: this._onDeleteAvatar.bind(this),
      },
      onDeleteUserPhoto: {
        queryParam: '.user-photos',
        eventType: 'click',
        callback: this._onDeleteUserPhoto.bind(this),
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

  loadAvatar (file) {
    const reader = new FileReader();
    this.uploadedAvatarFile = file;

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.updateAvatarRender(reader.result);
    };
  }

  updateAvatarRender (src) {
    // this.view.renderAvatar(src);
    this.view.renderImage({ queryParam: '.avatar', src });

  }

  async loadUserPhoto (file) {
    const userImageInfo = { userId: this.state._id, image: file };
    const userImage = await addImage(userImageInfo);
    const urlEncodedName = encodeURI(userImage.name);
    const date = new Date(userImage.date).toISOString().slice(0, 10);
    const src = `http://localhost:8080/userImages/${urlEncodedName}`;

    this.view.renderImageCard({ ...userImage, src, date });
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
    if (this.uploadedAvatarFile) {
      const savedFileId = await this.uploadAvatarOnServer(this.uploadedAvatarFile);
      this.modifyState(state => {state.avatarId = savedFileId;});
    }

    updateUser(this.state);
    router.changeRoute('/users');
  }

  close () {
    router.changeRoute('/users');
  }

  deleteAvatar () {
    this.uploadedAvatarFile = undefined;
    this.modifyState(state => {state.avatarId = undefined;});
    const photoParams = {
      queryParam: '.avatar',
      src: this._getAvatarSrc()
    };
    this.view.renderImage(photoParams);
  }

  async uploadAvatarOnServer (avatar) {
    return await uploadAvatar({
      avatar,
      login: this.state.login,
    });
  }

  deleteUserPhoto (image) {
    deleteImage({ userId: this.state._id, name: image.dataset.name });
    this.view.deleteImageCard(image);
    //remove photo from db
    //remove from express
  }

  async connect (params) {
    console.log(params);
    const user = await getUser(params.id);
    const userPhotosInfo = await getUserImages(params.id);
    const photos = this._handlePhotos(userPhotosInfo);
    this.state = {
      ...user,
      photos,
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

  _handlePhotos (photosData) {
    if (!photosData) {
      return null;
    }

    return photosData.map((photoData) => {
      return {
        date: new Date(photoData.date).toISOString().slice(0, 10),
        name: photoData.name,
        src: `http://localhost:8080/userImages/${photoData.name}`
      };
    });
  }

  _getAvatarSrc () {
    const avatar = this.state.avatarId && this.state.avatarId !== 'undefined' ? this.state.avatarId : 'default_avatar.jpg';
    return `http://localhost:8080/avatars/${avatar}`;
  }

  _onAvatarLoad (event) {
    this.loadAvatar(event.target.files[0]);
  }

  _onPhotoLoad (event) {
    this.loadUserPhoto(event.target.files[0]);
  }

  _onDeleteAvatar () {
    this.deleteAvatar();
  }

  _onDeleteUserPhoto (event) {
    if(event.target.dataset.name) {
      this.deleteUserPhoto(event.target);
    }
  }

  _onMaleClick (event) {
    if (event.target.checked) {
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