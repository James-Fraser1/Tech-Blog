const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to find All Users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => {
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

// GET route to find a User by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserTable => {
            if (!dbUserTable) {
                res.status(404).json({ alert: 'No User associated with that ID' });
                return;
            }
            res.json(dbUserTable);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST route to create a new User
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserTable => {
            req.session.save(() => {
                req.session.UserID = dbUserTable.id;
                req.session.username = dbUserTable.username;
                req.session.LOGIN = true;
                res.json(dbUserTable);
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// POST route used to Verify User Login with their Email and Password
router.post('/login', withAuth, (req, res) => {
    // Need a Valid Email with a Password longer than 8 characters
    User.findAll({
        where: {
            email: req.session.email
        }
    })
        // When user info doesn't work, give vague response not letting them know if username or password was incorrect
        .then(dbUserTable => {
            if (!dbUserTable) {
                res.status(400).json({ alert: 'User Credentials Not Recognized' });
                return;
            }
            const properPW = dbUserTable.comparePassword(req.body.password);
            if (!properPW) {
                res.status(400).json({ alert: 'User Credentials Not Recognized' })
            } else {
                console.log('Credentials Recognized');
            };
            req.session.save(() => {
                req.session.UserID = dbUserTable.id;
                req.session.username = dbUserTable.username;
                req.session.email = dbUserTable.email;
                req.session.LOGIN = true;
                res.json({ user: dbUserTable, message: 'You have successfully logged in!' });
            });
        });
});

// Log User Out (204 Status Message is a positive request status but requires no navigation away from the current page)
router.post('/logout', (req, res) => {
    if (req.session.LOGIN) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    };
});

// PUT route to update a User by ID
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserTable => {
            if (!dbUserTable) {
                res.status(404).json({ message: 'User Not Registered with this ID' });
                return;
            }
            res.json(dbUserTable);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        });
});

// DELTE route to remove a User by ID
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserTable => {
            if (!dbUserTable) {
                res.status(404).json({ message: 'User Not Registered to this ID' });
                return;
            }
            res.json(dbUserTable);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
});

module.exports = router;