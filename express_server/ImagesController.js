const UserImages = require('./models/userImages');
const Like = require('./models/Like');
const Comment = require('./models/Comment');

const fs = require('fs');
const User = require('./models/User');

class UserImagesController {
  constructor () {
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);

    this._addImage = this._addImage.bind(this);
    this._moveImageIntoFolder = this._moveImageIntoFolder.bind(this);
    this._deleteImage = this._deleteImage.bind(this);
  }

  async add (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No file were uploaded.');
    }

    const userId = req.body.userId;

    const image = {
      name: req.files.image.name,
      file: req.files.image,
    };

    this._moveImageIntoFolder(image);

    await this._addImage(userId, image.name, res);
  }

  get (req, res) {

    UserImages.get((req.params.userId), (err, images) => {
      if (err) {
        return res.status(400).send('Something got wrong');
      }

      images ? res.json(images) : res.end('');
    });
  }

  async delete (req, res) {
    const userId = req.body.userId;
    const name = req.body.name;

    await this._deleteImage(userId, name);
    this._deleteImageFromFolder(name);

    res.status(200).send('Image was deleted.');
  }

  async getAll (req, res) {
    const images = await UserImages.getAll();

    res.json(images);
  }

  async addLike (req, res) {
    const userId = req.body.userId;
    const imageId = req.params.imageId;
    const like = await Like.create(userId);

    await UserImages.addLike({ likeId: like._id, imageId });

    res.status(200).send(`Like was added`);
  }

  async deleteLike (req, res) {
    const userId = req.body.userId;
    const imageId = req.params.imageId;

    const like = await Like.delete(userId);
    const likeId = like._id;

    await UserImages.deleteLike({ likeId, imageId });

    res.status(200).send(like);

  }

  async addComment (req, res) {
    const imageId = req.params.imageId;
    const commentData = {
      userId: req.body.userId,
      value: req.body.comment,
    };

    const comment = await Comment.create(commentData);
    await UserImages.addComment({ commentId: comment._id, imageId });

    res.status(200).send(comment);
  }

  async deleteComment (req, res) {
    const commentId = req.params.commentId;
    const imageId = req.params.imageId;

    await Comment.delete(commentId);
    await UserImages.deleteComment({ commentId, imageId });

    res.status(200).send('Comment was deleted!');

  }

  uploadAvatarOnServer (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const serverAvatarName = `${req.body.login}_${req.files.avatar.name}`;
    req.files.avatar.mv(`public/avatars/${serverAvatarName}`);
    res.end(serverAvatarName);
  }

  _moveImageIntoFolder (image) {
    const dirPath = `public/userImages/`;
    if (!fs.existsSync(dirPath)) {    //check if folder already exists
      fs.mkdirSync(dirPath, err => {     //creating folder
        if (err) throw err; // не удалось создать папку
        console.log('Папка успешно создана');
      });
    }
    image.file.mv(`${dirPath}/${image.name}`);//move file
  }

  async _addImage (userId, name, res) {
    try {
      const imageInfo = {
        userId,
        likedBy: [],
        name,
        date: Date.now(),
      };

      await UserImages.create(imageInfo);

      res.status(201).send(imageInfo);
    } catch (error) {
      res.status(500);
    }
  }

  _deleteImageFromFolder (name) {
    const imagePath = `public/userImages/${name}`;

    fs.unlink(imagePath, err => {
      if (err) throw err;
      console.log('Image was deleted');
    });

  }

  async _deleteImage (userId, name) {
    const imageInfo = {
      userId,
      name,
    };
    await UserImages.remove(imageInfo);
  }
}

module.exports = new UserImagesController();
