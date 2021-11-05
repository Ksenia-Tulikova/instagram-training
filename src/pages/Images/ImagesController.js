import { ImagesComponent } from './ImagesComponent';
import API from '../../api';
import { BaseController } from '../BaseController';
import { authManager } from '../../app';

export class ImagesController extends BaseController {
  constructor (place) {
    super(undefined);
    this.place = place;
    this.activeUserId = authManager.getActiveUserId();
    this.state = '';

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
      },
      onButtonReplyClick: {
        queryParam: '.comments',
        eventType: 'click',
        callback: this._onButtonReplyClick.bind(this),
      },
    };

    this.getUser();
  }

  async getUser () {
    this.activeUser = await API.users.get(this.activeUserId);
  }

  activateInput($replyBtn) {
    const imageId = $replyBtn.closest('.photo-container').dataset.imageId;
    this.activeReplyId = $replyBtn.closest('.comment').id;

    this.view.focusElement(imageId);
  }

  updateComments ($commentInput) {
    const value = $commentInput.value;
    if(value){
      this.comments.push({
        value,
        userId: this.activeUserId,
        parent_id: this.activeReplyId ? this.activeReplyId : null,
        imageId: $commentInput.closest('.photo-container').dataset.imageId
      });
    }
  }

  deleteComment ($deleteCommentIcon) {
    const commentId = $deleteCommentIcon.dataset.commentId;
    const imageId = $deleteCommentIcon.closest('.photo-container').dataset.imageId;

    API.comments.delete(commentId, imageId);

    this.view.deleteElement(commentId);
  }

  async addComment ($commentBtn) {
    const imageId = $commentBtn.closest('.photo-container').dataset.imageId;
    const comment = this._getCommentByParam('imageId', imageId);
    const commentInsertSelector = this.activeReplyId ? `.container-${comment.parent_id}`: '.comments';

    if (comment) {
      const commentResponse = await API.comments.add(comment);
      commentResponse.commentedBy = this.activeUser;

      //сделай функцию по рендеру смещенного комментария(общая функция для рендера)
      this.view.renderNewComment(this._createUserComments([commentResponse]), commentInsertSelector);
      this.view.clearInputValue(imageId);
      this._clearAllCommentData();
    }
  }

  unLike ($likeIcon) {
    const imageId = $likeIcon.dataset.imageId;
    const likeData = { $likeIcon, imageId, augment: false };

    API.likes.delete(this.activeUserId, imageId);

    this.makeLikeChanges(likeData);
    this.view.deleteElement(this.activeUserId);

  }

  addLike ($likeIcon) {
    const imageId = $likeIcon.dataset.imageId;
    const likeData = { $likeIcon, imageId, augment: true };

    API.likes.add(this.activeUserId, imageId);

    this.makeLikeChanges(likeData);
    this.view.renderAvatar({
      userId: this.activeUserId,
      likedUserAvatar: this._getAvatarSrc(this.activeUser.avatarId)
    });
  }

  makeLikeChanges (likeData) {
    this.modifyState((state) => {
      const image = this._getImageById(state, likeData.imageId);
      image.likes = likeData.augment ? ++image.likes : --image.likes;
      return state;
    });

    const likesQuantity = this._getImageById(this.state, likeData.imageId).likes;

    this.view.updateLikeRender(likeData.$likeIcon);
    this.view.updateLikeQuantity(likeData.$likeIcon, likesQuantity);
  }

  async connect () {
    const images = await API.images.getAll();
    const comments = await API.comments.getAll();

    this.state = this._composeImageDate(images, comments);
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

  _clearAllCommentData() {
    this.activeReplyPath = '';
    this.comments=[];
  }

  _getCommentByParam (param, value) {
    return this.comments.find(comment => comment[param] === value);
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

  _composeImageDate (images, comments) {
    return images.map(img => {
      const imageComments = comments.filter(comment => comment.image_id === img._id);
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
        comments: this._createUserComments(imageComments),
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
          commentId: comment._id,
          parent_id: comment.parent_id,
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

  _onButtonReplyClick (e) {
    if (e.target.classList.contains('button-reply')){
      this.activateInput(e.target);
    }
  }
}