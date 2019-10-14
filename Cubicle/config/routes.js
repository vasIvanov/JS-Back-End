const cubeControllers = require('../controllers/cube');
const accessoryControllers = require('../controllers/accessory');
const userController = require('../controllers/user');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/details/:id', auth(false),  cubeControllers.details);

    app.get('/about', auth(false), cubeControllers.about);

    app.get('/create', auth(), cubeControllers.create)
    app.post('/create', auth(), cubeControllers.postCreate);


    app.get('/search', cubeControllers.searching);

    app.get('/edit/:id', auth(), cubeControllers.edit);
    app.post('/edit/:id', auth(), cubeControllers.postEdit)

    app.get('/create/accessory', auth(), accessoryControllers.createAccessory);
    app.post('/create/accessory', auth(),accessoryControllers.postCreateAccessory);

    app.get('/delete/:id', auth(), cubeControllers.deleteCube);
    app.post('/delete/:id', auth(), cubeControllers.postDelete);

    app.get('/attach/accessory/:id', auth(), accessoryControllers.attachAccessory);
    app.post('/attach/accessory/:id', auth(), accessoryControllers.postAttachAccessory);

    app.get('/login', userController.login);
    app.post('/login', userController.postLogin);

    app.get('/register', userController.register);
    app.post('/register', userController.postRegister);

    app.get('/logout', userController.logout);

    app.get('/', auth(false), cubeControllers.index);
    app.get('*', cubeControllers.notFound);

};