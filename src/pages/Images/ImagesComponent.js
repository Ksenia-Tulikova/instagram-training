import { BaseComponent, TEMPLATES } from '../BaseComponent';

export class ImagesComponent extends BaseComponent {
  constructor ($insertPlace, handlers) {
    super($insertPlace, undefined, handlers);
    this.htmlTemplate = TEMPLATES.albumImagesContainer;
    this.htmlTemplateImage = TEMPLATES.albumImage;
    this.htmlTemplateUserAvatar = TEMPLATES.likedUserAvatar;
    this.htmlTemplateUserComment = TEMPLATES.comment;
  }

  render (state) {
    let htmlToRender = this.htmlTemplate;
    let imagesHtml = '';

    if (state) {
      imagesHtml = state.map(image => {
        let imageHtml = this.htmlTemplateImage.replaceAll(`{likedUsersAvatar}`, this._fillUserAvatars(image.likedUsersAvatars));
        imageHtml = imageHtml.replaceAll(`{userComments}`, this._fillUserComments(image.comments));

        return this._fillTemplateWithData(imageHtml, image);
      }).join('');
    }

    htmlToRender = htmlToRender.replaceAll(`{images}`, imagesHtml);

    return htmlToRender;
  }

  _fillUserAvatars (avatars) {
    let userAvatarsHtml = '';

    if (avatars) {
      userAvatarsHtml = avatars.map(avatar => {
        return this._fillTemplateWithData(this.htmlTemplateUserAvatar, avatar);
      }).join('');
    }

    return userAvatarsHtml;
  }

  _fillUserComments (comments) {
    let userCommentsHtml = '';

    if (comments) {
      userCommentsHtml = comments.map(comment => {
        return this._fillTemplateWithData(this.htmlTemplateUserComment, comment);
      }).join('');
    }

    return userCommentsHtml;
  }

  _fillTemplateWithData (template, data) {
    let html = template;
    const paths = new Set(html.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      html = html.replaceAll(`{${path}}`, super.get(data, path));
    });

    return html;
  }

  updateLikeRender ($element) {
    $element.classList.toggle('liked');
  }

  updateLikeQuantity ($element, likesQuantity) {
    $element.dataset.likes = likesQuantity;
    $element.nextElementSibling.innerText = likesQuantity;
  }

  renderAvatar(avatarData){
    const userAvatarHtml = this._fillTemplateWithData(this.htmlTemplateUserAvatar,avatarData);
    this.place.querySelector('.liked-users').insertAdjacentHTML('afterbegin',userAvatarHtml);
  }

  renderNewComment(commentData) {
    const userCommentHtml = this._fillTemplateWithData(this.htmlTemplateUserComment,...commentData);
    this.place.querySelector('.comments').insertAdjacentHTML('beforeend',userCommentHtml);
  }
  // deleteAvatar(userId){
  //   const userAvatar = this.place.querySelector(`#${CSS.escape(userId)}`);
  //   if(userAvatar) {
  //     userAvatar.remove();
  //   }
  // }
  //
  // deleteComment(commentId) {
  //   const comment = this.place.querySelector(`#${CSS.escape(commentId)}`);
  //   if(comment) {
  //     comment.remove();
  //   }
  // }

  deleteElement(elementId) {
    const htmlElement = this.place.querySelector(`#${CSS.escape(elementId)}`);
    if(htmlElement) {
      htmlElement.remove();
    }
  }

  clearInputValue(imageId) {
    this.place.querySelector(`.add-comment-${CSS.escape(imageId)}`).value = '';
  }

}