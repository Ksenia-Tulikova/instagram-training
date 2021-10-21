const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeScheme = new Schema({
  likedBy: { type: Schema.Types.ObjectID, ref: 'User' },
});

likeScheme.statics.create = function (userId) {
  const like = new Like({
    likedBy: userId,
  });

  return like.save();
};

likeScheme.statics.delete = function (userId) {
  return this.findOneAndDelete(
    { likedBy: {$eq: userId} },
  );
};

const Like = mongoose.model('Like', likeScheme);

module.exports = mongoose.models.Like || Like;