const url = require('url');
const fs = require('fs');
const path = require('path');
const cats = require('../data/cats');
const formidable = require('formidable');

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if(pathname === '/' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/home/index.html')
        );

        fs.readFile(filePath, (err, data) => {
            if(err) {
                console.log(err);
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            let modifiedCats = cats.map((cat) => `<li>
                <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
                <h3>${cat.name}</h3>
                <p><span>Breed: </span>${cat.breed}</p>
                <p><span>Description: </span>${cat.description}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                </ul>
            </li>`);
            let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
            res.write(modifiedData);
            res.end();
        });
    } else if(pathname === '/search' && req.method === 'POST') {
        
        let form = new formidable.IncomingForm();
       
        form.parse(req, (err ,fields, files) => {
            if(err) {throw err};

            let searchedItem = fields.search;
                
            fs.readFile('./data/cats.json', 'utf-8', (err, data) => {
                if(err) {throw err};

                let allCats = JSON.parse(data);
                let searchedCats = allCats.filter((cat) => cat.name.includes(searchedItem));
                let filePath = path.normalize(
                    path.join(__dirname, '../views/home/index.html')
                );
        
                fs.readFile(filePath, (err, data) => {
                    if(err) {
                        console.log(err);
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        });
        
                        res.write('404 Not found');
                        res.end();
                        return;
                    }
        
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    let modifiedCats = searchedCats.map((cat) => `<li>
                        <img src="${path.join('./content/images/' + cat.image)}" alt="${cat.name}">
                        <h3>${cat.name}</h3>
                        <p><span>Breed: </span>${cat.breed}</p>
                        <p><span>Description: </span>${cat.description}</p>
                        <ul class="buttons">
                            <li class="btn edit"><a href="/cats-edit/${cat.id}">Change Info</a></li>
                            <li class="btn delete"><a href="/cats-find-new-home/${cat.id}">New Home</a></li>
                        </ul>
                    </li>`);
                    let modifiedData = data.toString().replace('{{cats}}', modifiedCats);
                    res.write(modifiedData);
                    res.end();
                });
            })
            
        })
    } else {
        return true;
    }
}