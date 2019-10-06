global.__basedir = __dirname;
const dbConnector = require('./config/db');
dbConnector().then(() => {
    const app = require('express')();
    const config = require('./config/config');
    
    require('./config/express')(app);
    require('./config/routes')(app);
    
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
    
}).catch(err => {
    console.error(err);
    
})  

// const dbUrl = 'mongodb://localhost:27017';
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(dbUrl);
// client.connect(function(err) {
//     if(err) {
//         console.error(err);
//         return;
//     }

//     const db = client.db('testdb');
//     const users = db.collection('users');
//     // users.deleteMany({ name: 'test' }).then(deleted => {
//     //     console.log(deleted);
        
//     // })
//     // users.insert({name: 'test'}).then(user => {
//     //     console.log(user);
        
//     // })
// })





