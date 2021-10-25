import { ImagesComponent } from './ImagesComponent';
import { addLike, unLike, getImages, getUser, deleteComment, addComment } from '../../api';
import { BaseController } from '../BaseController';
import { authManager } from '../../app';

export class ImagesController extends BaseController {
  constructor (place) {
    super(undefined);
    this.place = place;
    this.state = '';
    this.activeUserId = authManager.getActiveUserId();
    this.comments = [];

    this.avatarPath = 'http://localhost:8080/avatars/';
    this.imagePath = 'http://localhost:8080/userImages/';
    this.handlers = {
      onPhotoUserClick: {
        queryParam: '.photo-likes-icon',
        eventType: 'dblclick',
        callback: this._onLikeClick.bind(this),
      },
      onDeleteCommentClick: {
        queryParam: '.delete-user-comment',
        eventType: 'click',
        callback: this._onDeleteComment.bind(this),
      },
      onAddCommentClick: {
        queryParam: '.button-add-comment',
        eventType: 'click',
        callback: this._onAddCommentClick.bind(this),
      },
      onAddCommentInputBlur: {
        queryParam: '#add-comment',
        eventType: 'blur',
        callback: this._onAddCommentInputBlur.bind(this),
      }
    };

    this.getUser();
  }

  async getUser () {
    this.activeUser = await getUser(this.activeUserId);
  }

  updateComments($commentInput) {
    this.comments.push({
      value: $commentInput.value,
      userId: this.activeUserId,
      imageId: $commentInput.closest('.photo-container').dataset.imageId
    });
  }

  deleteComment ($deleteCommentIcon) {
    const commentId = $deleteCommentIcon.dataset.commentId;
    const imageId = $deleteCommentIcon.closest('.photo-container').dataset.imageId;

    //удалить комментарий в массиве
    deleteComment(commentId, imageId);

    this.view.deleteElement(commentId);
  }

  async addComment ($commentBtn) {
    const imageId = $commentBtn.closest('.photo-container').dataset.imageId;
    const comment = this._getCommentByImageId(imageId);

    if (comment) {
      const commentResponse = await addComment(comment)
      commentResponse.commentedBy = this.activeUser;

      this.view.renderNewComment(this._createUserComments([commentResponse]));
      this.view.clearInputValue(imageId);
    }
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
    this.view.deleteElement(this.activeUserId);

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
      userId: this.activeUserId,
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

  _getCommentByImageId(imageId) {
    return this.comments.find(comment => comment.imageId === imageId);
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

  _getAvatarSrc (path) {
    return `${this.avatarPath}${path ? path : 'default_avatar.jpg'}`;
  }

  _getImageSrc (path) {
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
        comments: this._createUserComments(img.comments),
      };
    });
  }

  _createUserComments (comments) {
    if (comments) {
      return comments.map(comment => {
        return {
          value: comment.value,
          login: comment.commentedBy.login,
          avatar: this._getAvatarSrc(comment.commentedBy.avatarId),
          commentId: comment._id
        };
      });
    }
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

  _onDeleteComment (e) {
      this.deleteComment(e.target);
  }

  _onAddCommentClick (e) {
      this.addComment(e.target);
  }

  _onAddCommentInputBlur (e) {
      this.updateComments(e.target);
    }
}