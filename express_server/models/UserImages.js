const mongoose = require('mongoose');
const { Schema } = mongoose;

const userImagesSchema = new Schema({
  userId: { type: Schema.Types.ObjectID, ref: 'User' },
  name: String,
  date: Date,
  likedBy: [{ type: Schema.Types.ObjectID, ref: 'User' }],
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
  // return this.find({}).populate('User').sort({ 'date': -1 });
  return this.find({})
    .populate({
      'path': 'userId',
      'model': 'User'
    })
    .populate({
      'path': 'likedBy',
      'model': 'User'
    }).sort({ 'date': -1 });
};

userImagesSchema.statics.remove = function ({ userId, name }) {
  return this.findOneAndRemove(
    { userId, name },
  );
};

userImagesSchema.statics.addLike = function ({ userId, imageId }) {
  return this.updateOne(
    { _id: imageId },
    { $push: { likedBy: userId } }
  );
};

userImagesSchema.statics.deleteLike = function ({ userId, imageId }) {
  return this.updateOne(
    { _id: imageId },
    { $pull: { likedBy: { $eq: userId } } }
  );
};

const UserImages = mongoose.model('userImages', userImagesSchema);

module.exports = mongoose.models.UserImages || UserImages;