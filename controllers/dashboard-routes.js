const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('sequelize');

// main route
router.get('/', withAuth, (req, res) => {
    console.log('Dashboard route properly redirected with login authorization')
    res.render('dashboard');
});

router.get('/edit/:id', withAuth, (req, res) => {
    console.log('edits rendered');
    Post.findByPk(req.params.id, {
        attributes: [
            'id',
            'post_url',
            'title',
            'created_at',
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

module.exports = router;