const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', controllers.details);

    app.get('/about', controllers.about);

    app.get('/create', controllers.create)
    app.post('/create', controllers.postCreate);

    app.get('/delete/:id', controllers.deleteCube);

    app.get('/search', controllers.searching);

    app.get('/edit/:id', controllers.edit);
    app.post('/edit/:id', controllers.postEdit)

    app.get('/create/accessory', controllers.createAccessory);
    app.post('/create/accessory', controllers.postCreateAccessory);

    app.get('/attach/accessory/:id', controllers.attachAccessory);

    app.get('/', controllers.index);
    app.get('*', controllers.notFound);

};