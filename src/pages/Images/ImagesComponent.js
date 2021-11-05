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
        const userComments = image.comments.filter(comment => comment.parent_id == 'null');
        const commentsTree = userComments
          .map(rootComment => this.renderCommentTree(image.comments, rootComment))
          .join('');

        imageHtml = imageHtml.replaceAll(`{userComments}`, commentsTree);

        return this._fillTemplateWithData(imageHtml, image);
      }).join('');
    }

    htmlToRender = htmlToRender.replaceAll(`{images}`, imagesHtml);

    return htmlToRender;
  }

  renderCommentTree (comments, rootComment) {
    return comments ? this._renderCommentBranch(comments, rootComment) :  '';
  }

  _renderCommentBranch (comments, parentComment) {
    //заполнить html
    let htmlComment = this._fillTemplateWithData(this.htmlTemplateUserComment, parentComment);
    // найди всех детей
    const children = comments.filter(comment => comment.parent_id === parentComment.commentId);
    if (children) {
      // запони для всех детей html
      children.forEach(comment => {
        htmlComment = htmlComment.replaceAll(`[subTree]`, this._renderCommentBranch(comments, comment));
      });
    }
    //удали все оставшиеся пробелы
      htmlComment = htmlComment.replaceAll(`[subTree]`, '');

    return htmlComment;
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

  renderAvatar (avatarData) {
    const userAvatarHtml = this._fillTemplateWithData(this.htmlTemplateUserAvatar, avatarData);
    this.place.querySelector('.liked-users').insertAdjacentHTML('afterbegin', userAvatarHtml);
  }

  renderNewComment (commentData, selector) {
    let userCommentHtml = this._fillTemplateWithData(this.htmlTemplateUserComment, ...commentData);
    userCommentHtml = userCommentHtml.replaceAll(`[subTree]`, '');

    this.place.querySelector(selector).insertAdjacentHTML('beforeend', userCommentHtml);
  }

  deleteElement (elementId) {
    const htmlElement = this.place.querySelector(`#${CSS.escape(elementId)}`);
    if (htmlElement) {
      htmlElement.remove();
    }
  }

  clearInputValue (imageId) {
    this.place.querySelector(`.add-comment-${CSS.escape(imageId)}`).value = '';
  }

  focusElement (imageId) {
    this.place.querySelector(`.add-comment-${CSS.escape(imageId)}`).focus();
  }

}