import { BaseComponent, TEMPLATES } from '../BaseComponent';

export class ImagesComponent extends BaseComponent {
  constructor ($insertPlace) {
    super($insertPlace, undefined, undefined);
    this.htmlTemplate = TEMPLATES.albumImagesContainer;
    this.htmlTemplateImage = TEMPLATES.albumImage;
  }

  render (state) {
    let htmlToRender = this.htmlTemplate;
    let imagesHtml ='';

    if (state) {
      imagesHtml = state.map(image => (
        this._fillImageTemplateWithData(this.htmlTemplateImage, image)
      )).join('');
    }

    htmlToRender = htmlToRender.replaceAll(`{images}`, imagesHtml);

    return htmlToRender;

  }

  _fillImageTemplateWithData (template, image) {
    let html = template;
    const paths = new Set(html.match(/(?<={)(.+?)(?=})/g));

    paths.forEach((path) => {
      html = html.replaceAll(`{${path}}`, super.get(image, path));
    });

    return html;
  }

}