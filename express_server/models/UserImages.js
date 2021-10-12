const mongoose = require('mongoose');
const { Schema } = mongoose;

const userImagesSchema = new Schema({
  userId: String,
  name: String,
  date: Date,

});

userImagesSchema.statics.create = function (imageInfo) {
  const userImagesSchema = new UserImages({
    ...imageInfo
  });

  return userImagesSchema.save();
};

userImagesSchema.statics.get = function (userId, cb) {
  return this.find({ userId }, cb);
};

userImagesSchema.statics.getAll = function () {
  return this.find({}).sort({ 'date': -1 });
};

userImagesSchema.statics.remove = function ({ userId, name }) {
  return this.findOneAndRemove(
    { userId, name },
  );
};

const UserImages = mongoose.model('userImages', userImagesSchema);

module.exports = mongoose.models.UserImages || UserImages;