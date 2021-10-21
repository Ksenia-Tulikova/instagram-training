const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuid } = require('uuid');

const userSchema = new Schema({
  name: String,
  country: String,
  // id: String,
  dateOfBirth: String,
  login: String,
  gender: String,
  password: String,
  repeatPassword: String,
  tel: String,
  userCountry: String,
  avatarId: String
});

userSchema.statics.findUser = function (_id, cb) {
  return this.findById(_id , cb);
};

userSchema.statics.findAll = function (cb) {
  return this.find({}, cb);
};

userSchema.statics.create = function (userData, cb) {
  console.log(userData);
  const user = new User({ ...userData});
  return user.save(cb);
};

userSchema.statics.getUserByParam = function (userLogin , cb) {
  return this.findOne({ login: userLogin }, cb);
};

userSchema.statics.modify = function (user, cb) {
  return this.findOneAndUpdate({ _id: user._id}, { $set: { ...user } }, cb);
};

userSchema.statics.remove = function (_id) {
  return this.findOneAndDelete({ _id});
};

userSchema.statics.removeAll = function (cb) {
  return this.remove({}, cb);
};


// const User = mongoose.model('User', userSchema);

const User = (module.exports = mongoose.models.User || mongoose.model('User', userSchema));