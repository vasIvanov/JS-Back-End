const userController = require('../controllers/user');
const homeController = require('../controllers/home');
const expenseController = require('../controllers/expense');
const {auth} = require('../utils/auth');

module.exports = (app) => {
    app.get('/login', userController.get.login);
    app.post('/login', userController.post.login);

    app.get('/register', userController.get.register);
    app.post('/register', userController.post.register);

    app.get('/logout', userController.get.logout);

    app.get('/new-expense', auth(), expenseController.get.addExpense);
    app.post('/new-expense', auth(), expenseController.post.addExpense);

    app.get('/report/:id', auth(), expenseController.get.report);

    app.post('/refil', auth(), userController.post.refil);

    app.get('/user/:id', auth(), userController.get.profile);

    app.get('/delete/:id', auth(), expenseController.get.delete);

    app.get('/', auth(false), homeController.get.home);

    app.get('*', homeController.get.notFound);
};