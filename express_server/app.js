const express = require('express');
const port = 8080;
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');

// const { create, authenticate, getAll, get, update, remove, removeAll } = require('./UserController');
// const { addImage, addAvatar, getImages, deleteImages} = require('./ImagesController');
const imageController = require('./ImagesController');
const userController = require('./UserController');

const app = express();

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use(fileUpload({}));
app.use(express.static('public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// => start server
const startServer = () => {
  app.listen(port, () => console.log(`App started on port ${port}`)); // => use callback function
};

// => connection mongoose
const connectDb = () => {
  mongoose.Promise = require('bluebird');
  mongoose.connect('mongodb://localhost/instagramDB');

  return mongoose.connection;
};

// => connect mongoose
connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);

app.get('/users', userController.getAll);

app.get('/user/:id', userController.get);

app.post('/authenticate', userController.authenticate);

app.post('/users', userController.create);// POST /users

app.put('/users/:id', userController.update); // PUT /users/:id

app.delete('/users/:id', userController.remove); // DELETE /users/:id

app.delete('/users', userController.removeAll); // DELETE /users

app.post('/avatars', imageController.uploadAvatarOnServer);

app.post('/users/images', imageController.add);

app.get('/users/:userId/images', imageController.get);

app.delete('/users/:userId/images', imageController.delete);

app.get('/images', imageController.getAll);

app.post('/images/:imageId/like', imageController.addLike);

app.post('/images/:imageId/unLike', imageController.deleteLike);

app.post('/images/:imageId/comments', imageController.addComment);

app.post('/images/:imageId/comments/:commentId', imageController.deleteComment);

