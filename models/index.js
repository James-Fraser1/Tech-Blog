const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Users will have many posts, so the models have to be linked with a "hasMany" to define that relationship
User.hasMany(Post, {
  foreignKey: 'user_id'
});

// A mirror of the first model association. The "belongsTo" defines that a Post can only belong to a single User
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: "CASCADE"
});


Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: "CASCADE"
});

module.exports = { User, Post, Comment };

// Look up sequelize 'onDelete -> attribute: cascade' to prevent database errors