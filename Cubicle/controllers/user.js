


function login(req, res) {
    res.render('loginPage.hbs');
}

function register(req, res) {
    res.render('registerPage.hbs');
}

module.exports = {
    login,
    register
}