const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({plain: true})) 
        res.render('home', {
            layouts: "main",
            posts
        })
});

router.get('/login', (req, res) => {
    console.log('Login route properly redirected!')
    res.render('login')
});

router.get('/dashboard', async (req, res) => {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({plain: true})) 
        res.render('home', {
            layouts: "main",
            posts
        })
});

router.get('/register', (req, res) => {
    console.log('Register route properly redirected!')
    res.render('login')
});

module.exports = router;