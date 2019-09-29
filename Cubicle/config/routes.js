const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', controllers.details);
    app.get('/about', controllers.about);
    app.get('/create', controllers.create)
    app.post('/create', controllers.postCreate);
    app.get('/delete/:id', controllers.deleteCube);
    app.get('/', controllers.index);
    app.get('*', controllers.notFound);


};