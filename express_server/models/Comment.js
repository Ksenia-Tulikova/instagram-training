const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentScheme = new Schema({
  commentedBy: { type: Schema.Types.ObjectID, ref: 'User' },
  value: Schema.Types.String,
  parent_id: Schema.Types.String,
  image_id: Schema.Types.String
});

commentScheme.statics.create = function ({userId, value, parent_id, image_id}) {
  const comment = new Comment({
    commentedBy: userId,
    value,
    parent_id,
    image_id
  });

  return comment.save();
};

commentScheme.statics.delete = function (commentId) {
  return this.findOneAndDelete(
    { _id: {$eq: commentId} },
  );
};

commentScheme.statics.getAll = function () {
  return this.find({})
    .populate({
    'path': 'commentedBy',
    'model': 'User',
  });
}

const Comment = mongoose.model('Comment', commentScheme);

module.exports = mongoose.models.Comment || Comment;