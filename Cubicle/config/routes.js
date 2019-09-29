const controllers = require('../controllers/cube');

module.exports = (app) => {
    app.get('/', controllers.index);
};