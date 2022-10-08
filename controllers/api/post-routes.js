const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to findAll Posts
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
        .then(PostInfo => res.json(PostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'Post not matching any ID' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST request made to create new posts
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
        .then(PostInfo => res.json(PostInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT request made to update existing posts
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'Post not matching any ID' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(PostInfo => {
            if (!PostInfo) {
                res.status(404).json({ message: 'Post not matching any ID' });
                return;
            }
            res.json(PostInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;