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

    app.get('/all-articles', auth(false), articleController.get.allArticles);

    app.get('/article/:id', auth(false), articleController.get.article);

    app.get('/edit/:id', auth(), articleController.get.edit);
    app.post('/edit/:id', auth(), articleController.post.edit);

    app.get('/delete/:id', auth(), articleController.get.delete);

    app.get('/search', auth(false), articleController.get.search);

    app.get('/', auth(false), homeController.get.home);
};