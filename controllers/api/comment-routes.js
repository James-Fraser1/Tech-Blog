const router = require('express').Router();
<<<<<<< HEAD
const { Comment, User } = require('../../models');
=======
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
>>>>>>> 6dd3117b391204df1e339a6c70bd3ef51d29fd20

router.get('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
        .then(CommentInfo => res.json(CommentInfo))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    console.log('All Comments have been received');
    Comment.create({
        ...req.body,
        user_id:
        req.session.UserID
    })
        .then(CommentInfo => res.json(CommentInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

<<<<<<< HEAD
// router.delete('/:id', (req, res) => {
//     Comment.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//         .then(CommentInfo => {
//             if (!CommentInfo) {
//                 res.status(404).json({ message: 'Comment not matching any ID' });
//                 return;
//             }
//             res.json(CommentInfo);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });
=======
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(CommentInfo => {
            if (!CommentInfo) {
                res.status(404).json({ message: 'Comment not matching any ID' });
                return;
            }
            res.json(CommentInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
>>>>>>> 6dd3117b391204df1e339a6c70bd3ef51d29fd20

module.exports = router;