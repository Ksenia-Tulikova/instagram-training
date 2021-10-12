const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuid } = require('uuid');

const userSchema = new Schema({
  name: String,
  country: String,
  id: String,
  dateOfBirth: String,
  login: String,
  gender: String,
  password: String,
  repeatPassword: String,
  tel: String,
  userCountry: String,
  avatarId: String
});

userSchema.statics.findById = function (id, cb) {
  return this.findOne({ id }, cb);
};

userSchema.statics.findAll = function (cb) {
  return this.find({}, cb);
};

userSchema.statics.create = function (userData, cb) {
  const user = new User({ ...userData, id: uuid()});
  return user.save(cb);
};

userSchema.statics.getUserByParam = function (param, value, cb) {
  return this.findOne({ param: new RegExp(value, 'i') }, cb);
};

userSchema.statics.modify = function (user, cb) {
  return this.findOneAndUpdate({ id: user.id}, { $set: { ...user } }, cb);
};

userSchema.statics.remove = function (id) {
  return this.findOneAndDelete({ id: new RegExp(id, 'i') });
};

userSchema.statics.removeAll = function (cb) {
  return User.remove({}, cb);
};


// const User = mongoose.model('User', userSchema);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);;