const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', controllers.details);
    app.get('/about', controllers.about);
    app.get('/create', controllers.create)
    app.post('/create', controllers.postCreate);
    app.get('/delete/:id', controllers.deleteCube);
    app.get('/search', controllers.search);
    app.get('/edit/:id', controllers.edit);
    app.get('/', controllers.index);
    app.get('*', controllers.notFound);

};