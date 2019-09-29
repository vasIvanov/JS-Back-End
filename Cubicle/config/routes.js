const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/details/:id', controllers.details);
    app.get('/about', controllers.about);
    app.get('/', controllers.index);
    app.get('*', controllers.notFound);

};