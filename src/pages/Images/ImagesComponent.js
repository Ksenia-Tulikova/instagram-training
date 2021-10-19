import { BaseComponent, TEMPLATES } from '../BaseComponent';

export class ImagesComponent extends BaseComponent {
  constructor ($insertPlace, handlers) {
    super($insertPlace, undefined, handlers);
    this.htmlTemplate = TEMPLATES.albumImagesContainer;
    this.htmlTemplateImage = TEMPLATES.albumImage;
    this.htmlTemplateUserAvatar = TEMPLATES.likedUserAvatar;
  }

  render (state) {
    let htmlToRender = this.htmlTemplate;
    let imagesHtml = '';

    if (state) {
      imagesHtml = state.map(image => {
        let imageHtml = this.htmlTemplateImage.replaceAll(`{likedUsersAvatar}`, this._fillUserAvatars(image.likedUsersAvatars));
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

  deleteAvatar(userId){
    const userAvatar = this.place.querySelector(`#${CSS.escape(userId)}`);
    if(userAvatar) {
      userAvatar.remove();
    }
  }

}