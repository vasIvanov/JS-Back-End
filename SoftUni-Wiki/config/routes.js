const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const articleController = require('../controllers/article');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/login', userController.get.login);
    app.post('/login', userController.post.login);

    app.get('/register', userController.get.register);
    app.post('/register', userController.post.register);

    app.get('/logout', userController.get.logout);

    app.get('/create',  auth(), articleController.get.create);
    app.post('/create', auth(), articleController.post.create);

    app.get('/all-articles', articleController.get.allArticles);

    app.get('/article/:id', articleController.get.article);

    app.get('/', auth(false), homeController.get.home);
};