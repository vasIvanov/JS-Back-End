const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/login', userController.get.login);
    app.post('/login', userController.post.login);

    app.get('/register', userController.get.register);
    app.post('/register', userController.post.register);

    app.get('/logout', userController.get.logout);


    app.get('/', auth(false), homeController.get.home);
};