const router = require('express').Router();
const path = require('path');
const { Blogs, User, Comment } = require('../models');

// This is the 'get' route 
router.get('/', async (req, res) => {
  // Here, index.html is rendered
  //res.sendFile(path.join(__dirname, '../views/index.html'));
  Blogs.findAll({
    attributes: [
        'id',
        'title',
        'content',
        'created_at'
    ],
    include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
    ]
})
.then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('home', { posts, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});

});

router.get('/login', (req, res) => {
  
  res.render('login');
});

router.get('/signup', (req, res) => {
  
  res.render('signup');
});

router.get('/post/:id', (req, res) => {
    Blogs.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Could not find a user with this ID' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            console.log(post);
            res.render('singlepost', { post, loggedIn: req.session.loggedIn });


        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;
