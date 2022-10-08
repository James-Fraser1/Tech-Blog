const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('login')
});

// router.get('/', withAuth, (req, res) => {
//     console.log('Dashboard route properly redirected with login authorization')
//     res.render('dashboard');
// });

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render('edit-post', {
                    post,
                    loggedIn: true
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    console.log('Login route properly redirected!')
    res.redirect('/dashboard')
});

router.get('/dashboard', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }))
    res.render('dashboard', {
        layouts: "main",
        posts
    })
});

router.get('/register', (req, res) => {
    console.log('Register route properly redirected!')
    res.render('register')
});

module.exports = router;