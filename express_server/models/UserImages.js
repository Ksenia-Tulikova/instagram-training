const mongoose = require('mongoose');
const path = require('path');
const { ObjectId } = require('mongodb');
const { Schema } = mongoose;

const userImagesSchema = new Schema({
  userId: { type: Schema.Types.ObjectID, ref: 'User' },
  name: String,
  date: Date,
  likes: [{ type: Schema.Types.ObjectID, ref: 'Like' }],
  comments: [{ type: Schema.Types.ObjectID, ref: 'Comment' }],

});

userImagesSchema.statics.create = function (imageInfo) {
  const userImagesSchema = new UserImages({
    ...imageInfo
  });

  return userImagesSchema.save();
};

userImagesSchema.statics.get = function (userId, cb) {
  // return this.find({ userId }, cb);
  return this.find({ userId }, cb).populate({
    'path': 'userId',
    'model': 'User'
  }).sort({ 'date': -1 });

};

userImagesSchema.statics.getAll = function () {
  return this.find({})
    .populate({
      'path': 'userId',
      'model': 'User'
    })
    .populate({
      'path': 'comments',
      'model': 'Comment',
      populate: {
        path: 'commentedBy'
      }
    })
    .populate({
      'path': 'likes',
      'model': 'Like',
      populate: {
        path: 'likedBy'
      }
    })

    .sort({ 'date': -1 });
};

userImagesSchema.statics.remove = function ({ userId, name }) {
  return this.findOneAndRemove(
    { userId, name },
  );
};

userImagesSchema.statics.addLike = function ({ likeId, imageId }) {
  return this.updateOne(
    { _id: imageId },
    { $push: { likes: likeId } }
  );
};

userImagesSchema.statics.deleteLike = function ({ likeId, imageId }) {
  return this.updateOne(
    { _id: imageId },
    {
      $pull: {
        likes: { $eq: likeId }
      }
    }).populate({
    'path': 'likes',
    'model': 'Like',
  });
};

userImagesSchema.statics.addComment = function ({ commentId, imageId }) {
  console.log({ commentId, imageId });
  return this.updateOne(
    { _id: imageId },
    { $push: { comments: commentId } }
  );
};

userImagesSchema.statics.deleteComment = function ({ commentId, imageId }) {
  return this.updateOne(
    { _id: imageId },
    {
      $pull: {
        comments: { $eq: commentId }
      }
    }).populate({
    'path': 'comments',
    'model': 'Comment',
  });
};

const UserImages = mongoose.model('userImages', userImagesSchema);

module.exports = mongoose.models.UserImages || UserImages;