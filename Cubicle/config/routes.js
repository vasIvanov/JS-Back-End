const cubeControllers = require('../controllers/cube');
const accessoryControllers = require('../controllers/accessory');
const userController = require('../controllers/user');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/details/:id', cubeControllers.details);

    app.get('/about', cubeControllers.about);

    app.get('/create', auth, cubeControllers.create)
    app.post('/create', auth, cubeControllers.postCreate);

    app.get('/delete/:id', cubeControllers.deleteCube);

    app.get('/search', cubeControllers.searching);

    app.get('/edit/:id', cubeControllers.edit);
    app.post('/edit/:id', cubeControllers.postEdit)

    app.get('/create/accessory', accessoryControllers.createAccessory);
    app.post('/create/accessory', accessoryControllers.postCreateAccessory);

    app.get('/delete/:id', cubeControllers.deleteCube);
    app.post('/delete/:id', cubeControllers.postDelete);

    app.get('/attach/accessory/:id', accessoryControllers.attachAccessory);
    app.post('/attach/accessory/:id', accessoryControllers.postAttachAccessory);

    app.get('/login', userController.login);
    app.post('/login', userController.postLogin);

    app.get('/register', userController.register);
    app.post('/register', userController.postRegister);

    app.get('/logout', userController.logout);

    app.get('/', cubeControllers.index);
    app.get('*', cubeControllers.notFound);

};