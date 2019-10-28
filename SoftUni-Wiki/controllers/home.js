const acritleModel = require('../models/article');

module.exports = {
    get: {
        home: function(req, res) {
            const user = req.user;
            acritleModel.find().sort({ _id: -1 }).limit(3).then(articles => {
                for (let article of articles) {
                    article.description = article.description.split(' ').slice(0, 50).join(' ');
                }
                res.render('index.hbs', { user, articles });

            })
        } 
    }
}