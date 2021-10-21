import { ImagesComponent } from './ImagesComponent';
import { addLike, unLike, getImages, getUser } from '../../api';
import { BaseController } from '../BaseController';
import { authManager } from '../../app';

export class ImagesController extends BaseController {
  constructor (place) {
    super(undefined);
    this.place = place;
    this.state = '';
    this.activeUserId = authManager.getActiveUserId();

    this.avatarPath = 'http://localhost:8080/avatars/';
    this.imagePath = 'http://localhost:8080/userImages/';
    this.handlers = {
      onPhotoUserClick: {
        queryParam: '.photo-likes-icon',
        eventType: 'dblclick',
        callback: this._onLikeClick.bind(this),
      },
    };

    this.getUser();
  }

  async getUser() {
    this.activeUser = await getUser(this.activeUserId);
  }

  unLike ($likeIcon) {
    const imageId = $likeIcon.dataset.imageId;

    unLike(this.activeUserId, imageId);

    this.modifyState((state) => {
      const image = this._getImageById(state, imageId);
      image.likes = --image.likes;
      return state;
    });

    const likesQuantity = this._getImageById(this.state, imageId).likes;
    this.view.updateLikeRender($likeIcon);
    this.view.updateLikeQuantity($likeIcon, likesQuantity);
    this.view.deleteAvatar(this.activeUserId);

  }

  addLike ($likeIcon) {
    const imageId = $likeIcon.dataset.imageId;

    addLike(this.activeUserId, imageId);

    this.modifyState((state) => {
      const image = this._getImageById(state, imageId);
      image.likes = ++image.likes;
      return state;
    });

    const likesQuantity = this._getImageById(this.state, imageId).likes;

    this.view.updateLikeRender($likeIcon);
    this.view.updateLikeQuantity($likeIcon, likesQuantity);
    this.view.renderAvatar({
        userId:this.activeUserId,
        likedUserAvatar: this._getAvatarSrc(this.activeUser.avatarId)
      });
  }

  async connect () {
    const images = await getImages();
    console.log(images);
    this.state = this._composeImageDate(images);
    this._createSrc();
    this._convertDateToRightFormat();

    this.view = new ImagesComponent(this.place, this.handlers);
    return this.view.render(this.state);
  }

  modifyState (stateModifier) {
    const newState = JSON.parse(JSON.stringify(this.state));
    if (stateModifier) {
      stateModifier(newState);
    }
    this.state = newState;
  }

  _getImageById (images, imageId) {
    return images.find(image => image.imageId === imageId);
  }

  _createSrc () {
    if (this.state) {
      this.state.forEach(img => {
        img.avatar = this._getAvatarSrc(img.avatar);
        img.image = this._getImageSrc(img.image);
      });
    }
  }

  _getAvatarSrc(path) {
    return `${this.avatarPath}${path ? path : 'default_avatar.jpg'}`;
  }

  _getImageSrc(path) {
      return `${this.imagePath}${path}`;
  }

  _convertDateToRightFormat () {
    if (this.state) {
      this.state.forEach(img => {
        img.date = img.date.slice(0, 10);
      });
    }
  }

  _composeImageDate (images) {
    return images.map(img => {
      return {
        userId: img.userId._id,
        date: img.date,
        login: img.userId.login,
        avatar: img.userId.avatarId,
        likes: img.likes.length,
        likedBy: img.likes,
        imageId: img._id,
        image: img.name,
        likedImageMyself: this._doesImageLikedByActiveUser(img.likes) ? 'liked' : '',
        likedUsersAvatars: this._getUserAvatars(img.likes),
      };
    });
  }

  _getUserAvatars (likes) {
    if (likes.length > 3) {
      likes = likes.slice(-3);
    }
    return likes.reverse().map(like => {
      const user = like.likedBy;
      return {
        likedUserAvatar: `${this.avatarPath}${user.avatarId ? user.avatarId : 'default_avatar.jpg'}`,
        userId: user._id
      };
    });
  }

  _doesImageLikedByActiveUser (likes) {
    return likes.find(like => like.likedBy._id === this.activeUserId);
  }

  _onLikeClick (e) {
    const event = e.target;
    event.classList.contains('liked') ? this.unLike(event) : this.addLike(event);
  }
}