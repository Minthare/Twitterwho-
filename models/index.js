const User = require('./User');
const Blogs = require('./Blogs');
const Comment = require('./Comment');

User.hasMany(Blogs, {
    foreignKey: 'user_id'
});
Blogs.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(Blogs, {
    foreignKey: 'blog_id',
    onDelete: "cascade"
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Blogs.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: "cascade"
})
module.exports = { User, Blogs, Comment };