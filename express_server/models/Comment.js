const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentScheme = new Schema({
  commentedBy: { type: Schema.Types.ObjectID, ref: 'User' },
  value: Schema.Types.String
});

commentScheme.statics.create = function ({userId, value}) {
  const comment = new Comment({
    commentedBy: userId,
    value
  });

  return comment.save();
};

commentScheme.statics.delete = function (commentId) {
  return this.findOneAndDelete(
    { _id: {$eq: commentId} },
  );
};

const Comment = mongoose.model('Comment', commentScheme);

module.exports = mongoose.models.Comment || Comment;