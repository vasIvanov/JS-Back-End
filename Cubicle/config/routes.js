const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/', controllers.index);
    app.get('/details/:id', controllers.details);
};