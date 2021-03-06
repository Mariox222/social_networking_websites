var express = require('express') //express app
const path = require('path'); //path
const db = require('./db'); //database object
const fs = require('fs') //filesystem
const { PythonShell } = require('python-shell');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const http = require('https');
//const cache = require ('./cache.json')
let cache = {}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

let download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    http.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    });
}

var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//public directory
app.use(express.static('public'));

//send index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

//send datatable.html
app.get('/datatable', (req, res) => {
    res.sendFile(path.join(__dirname + '/datatable.html'))
})

app.get('/data', async (req, res) => {

    //get parameters from the HTTP request
    let value = req.query.value
    let searchType = req.query.searchType
    console.log('value = ' + value + ' searchType = ' + searchType)

    //get data from the database
    let text = 'SELECT * FROM socials'
    let rows = await db.query(text);

    //create filtered array of json objects
    let result = []
    rows.rows.forEach(async (item, i) => {
        try {
            if (value == '') {
                result.push(item.info)
                return
            }
            if (searchType == 'wildcard') {
                let values = Object.values(item.info)
                for (let i = 0; i < values.length - 1; i++) {
                    if (values[i].toLowerCase() == value) {
                        result.push(item.info)
                        return
                    }
                }
                let founders = values[values.length - 1]
                try {
                    founders.forEach((founder, i) => {
                        if (value == founder.first_name.toLowerCase() + ' ' + founder.last_name.toLowerCase()) {
                            result.push(item.info)
                            //console.log("pushed" + JSON.stringify(item.info))
                            throw 1;
                        }
                    })
                } catch (err) {

                    return
                }
            } else {
                try {
                    if (item.info[searchType].toLowerCase() == value) {
                        result.push(item.info)
                        return
                    } else {
                        return
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    });

    //create filtered json file
    let stringifiedResult = JSON.stringify(result)
    fs.writeFile(path.join(__dirname + '/public/filteredJson.json'), stringifiedResult, (err) => {
        if (!err) {
            console.log('created filtered json')
        }
    })

    //create csv file for the filtered json using python script
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time 
        args: [''] //An argument which can be accessed in the script using sys.argv[1] 
    };
    PythonShell.run('JSON_to_csv.py', options, (err, result) => {
        if (err) {
            console.log(err)
        }
    });

    //console.log(result)
    res.send(JSON.stringify(result))
})

app.get('/api/id/:id', async (req, res) => {

    //get parameters from the HTTP request
    let networkID = req.params.id

    //get data from the database
    let text = 'SELECT * FROM socials'
    let data = await db.query(text);

    //create response JSON object. item.info contains the object from database
    let result = undefined
    data.rows.forEach(async (item, i) => {
        if (networkID == item.id) {
            result = {
                "status": "OK",
                "message": "Fetched social networking webiste object",
                "response": item.info
            }
            let links = [
                {
                    "href": "openapidoc",
                    "rel": "Open api documentation",
                    "type": "GET"
                },
                {
                    "href": "api/" + item.id + "/wiki",
                    "rel": "Wiki handle of the social networking website",
                    "type": "GET"
                }
            ]

            result.response.links = links
            result.response["@context"] = {
                "@vocab": "http://schema.org/",
                "employees": "numberOfEmployees",
                "name": "https://schema.org/name"
                }

            res.type('json')
            res.status('200')
            res.send(JSON.stringify(result))
            res.end()
        }


    })
    if (result == undefined) {
        result = {
            "status": "Not Found",
            "message": "Social networking website with the provided ID doesn't exist",
            "reponse": null
        }
        res.type('json')
        res.status('404')
        res.send(JSON.stringify(result))
        res.end()
    }
})

app.get('/openapidoc', async (req, res) => {
    //send openapi documentation
    res.type('json')
    res.status('200')
    res.sendFile(path.join(__dirname + '/public/openapi.json'))
})

app.get('/api/:id/wiki', async (req, res) => {
    //get parameters from the HTTP request
    let networkID = req.params.id

    //get data from the database
    let text = 'SELECT * FROM socials'
    let data = await db.query(text);

    //create response JSON object. item.info contains the object from database
    let result = undefined
    data.rows.forEach(async (item, i) => {
        if (networkID == item.id) {
            result = {
                "status": "OK",
                "message": "Fetched social networking webiste wiki handle object",
                "response": {
                    "wiki_handle": item.info.wiki_handle
                }
            }
            let links = [
                {
                    "href": "openapidoc",
                    "rel": "Open api documentation",
                    "type": "GET"
                },
            ]

            result.response.links = links

            res.type('json')
            res.status('200')
            res.send(JSON.stringify(result))
            res.end()
        }


    })
    if (result == undefined) {
        result = {
            "status": "Not Found",
            "message": "Social networking website with the provided ID doesn't exist",
            "reponse": null
        }
        res.type('json')
        res.status('404')
        res.send(JSON.stringify(result))
        res.end()
    }
})

app.get('/api/:id/founders', async (req, res) => {
    //get parameters from the HTTP request
    let networkID = req.params.id

    //get data from the database
    let text = 'SELECT * FROM socials'
    let data = await db.query(text);

    //create response JSON object. item.info contains the object from database
    let result = undefined
    data.rows.forEach(async (item, i) => {
        if (networkID == item.id) {
            result = {
                "status": "OK",
                "message": "Fetched social networking webiste founders object",
                "response": {
                    "founders": item.info.founders
                }
            }
            let links = [
                {
                    "href": "openapidoc",
                    "rel": "Open api documentation",
                    "type": "GET"
                },
            ]

            result.response.links = links

            res.type('json')
            res.status('200')
            res.send(JSON.stringify(result))
            res.end()
        }


    })
    if (result == undefined) {
        result = {
            "status": "Not Found",
            "message": "Social networking website with the provided ID doesn't exist",
            "reponse": null
        }
        res.type('json')
        res.status('404')
        res.send(JSON.stringify(result))
        res.end()
    }
})

app.get('/api/:id/website', async (req, res) => {
    //get parameters from the HTTP request
    let networkID = req.params.id

    //get data from the database
    let text = 'SELECT * FROM socials'
    let data = await db.query(text);

    //create response JSON object. item.info contains the object from database
    let result = undefined
    data.rows.forEach(async (item, i) => {
        if (networkID == item.id) {
            result = {
                "status": "OK",
                "message": "Fetched social networking webiste URL object",
                "response": {
                    "website": item.info.website
                }
            }
            let links = [
                {
                    "href": "openapidoc",
                    "rel": "Open api documentation",
                    "type": "GET"
                },
            ]

            result.response.links = links

            res.type('json')
            res.status('200')
            res.send(JSON.stringify(result))
            res.end()
        }


    })
    if (result == undefined) {
        result = {
            "status": "Not Found",
            "message": "Social networking website with the provided ID doesn't exist",
            "reponse": null
        }
        res.type('json')
        res.status('404')
        res.send(JSON.stringify(result))
        res.end()
    }
})

app.post('/api', async (req, res) => {
    //get HTTP request body
    let body = req.body
    if (Object.entries(body).length === 0) {
        res.status('400')
        res.send("couldn't get request body")
        res.end()
    }

    //inssert data to the database
    let InsertText = `INSERT INTO socials (info) VALUES('${JSON.stringify(body)}')`
    let dbResponse = await db.query(InsertText);

    //get data from the database
    let text = 'SELECT * FROM socials'
    let data = await db.query(text);

    //check if added
    let result = undefined
    try {
        data.rows.forEach(async (item, i) => {
            if (JSON.stringify(body) == JSON.stringify(item.info)) {
                result = {
                    "status": "OK",
                    "message": "Added social networking webiste to database",
                    "response": {
                        "newID": item.id,
                        "added Object": body
                    }
                }
                let links = [
                    {
                        "href": "openapidoc",
                        "rel": "Open api documentation",
                        "type": "GET"
                    },
                ]

                result.response.links = links

                res.type('json')
                res.status('200')
                res.send(JSON.stringify(result))
                res.end()
            }
        })
        if (result == undefined) {
            result = {
                "status": "Not Implemented",
                "message": "Couldn't add object to database",
                "reponse": null
            }
            res.type('json')
            res.status('501')
            res.send(JSON.stringify(result))
            res.end()
        }
    } catch (err) {
        console.log("caught error")
    }
})

app.put('/api/:id', async (req, res) => {

    //get parameters from the HTTP request
    let networkID = req.params.id

    //get HTTP request body
    let body = req.body
    if (Object.entries(body).length === 0) {
        res.status('400')
        res.send("couldn't get request body")
        res.end()
    }
    let result = undefined

    //get data from the database
    let text = `SELECT * FROM socials WHERE socials.id = ${networkID}`
    let data = await db.query(text);

    if (!(data.rows === undefined || data.rows.length == 0)) {
        //success
        item = data.rows[0].info
        for (const key in body) {
            item[key] = body[key]
        }

        //update data in the database
        let updateText = `  UPDATE socials
                            SET info = '${JSON.stringify(item)}' 
                            WHERE socials.id = ${networkID};`
        let updateResponse = await db.query(updateText);

        result = {
            "status": "OK",
            "message": "Updated social networking webiste from database",
            "response": {
                "ID of updated website": networkID,
            }
        }
        let links = [
            {
                "href": "openapidoc",
                "rel": "Open api documentation",
                "type": "GET"
            },
        ]

        result.response.links = links

        res.type('json')
        res.status('200')
        res.send(JSON.stringify(result))
        res.end()

    } else {
        result = {
            "status": "Not Implemented",
            "message": "Couldn find object to database",
            "reponse": null
        }
        res.type('json')
        res.status('501')
        res.send(JSON.stringify(result))
        res.end()
    }

})

app.delete('/api/:id', async (req, res) => {

    //get parameters from the HTTP request
    let networkID = req.params.id

    //delete data from the database
    let text = `DELETE FROM socials
                WHERE id = ${networkID}
                RETURNING *;`
    let data = await db.query(text);

    //check if deleted
    let result = undefined
    if (!(data.rows === undefined || data.rows.length == 0)) {
        //success
        result = {
            "status": "OK",
            "message": "Deleted social networking webiste from database",
            "response": {
                "ID of deleted website": networkID,
            }
        }
        let links = [
            {
                "href": "openapidoc",
                "rel": "Open api documentation",
                "type": "GET"
            },
        ]

        result.response.links = links

        res.type('json')
        res.status('200')
        res.send(JSON.stringify(result))
        res.end()
    } else {
        result = {
            "status": "Not Implemented",
            "message": "Couldn't delete object to database",
            "reponse": null
        }
        res.type('json')
        res.status('501')
        res.send(JSON.stringify(result))
        res.end()
    }
})

app.get('/api/:id/picture', async (req, res, next) => {
    //get parameters from the HTTP request
    let networkID = req.params.id

    //get data from the database
    let text = `SELECT * FROM socials WHERE id = ${networkID}`
    let data = await db.query(text);

    let wikiHandle = data?.rows[0]?.info.wiki_handle
    if (!wikiHandle) {
        console.log("wikiHandle nije dohvacen")
        console.log(wikiHandle);
        console.log(data)
        return;
    }

    let url = `https://en.wikipedia.org/api/rest_v1/page/media-list/${wikiHandle}`;
    console.log(url)
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response)

            let partialLink = response.items[0].srcset[0].src
            let link = "https:" + partialLink;
            console.log(link);
            let parts = partialLink.split("/");
            let imageName = parts[parts.length - 1];
            let dest = path.join(__dirname + '/public/' + imageName)
            console.log(dest)

            if (cache[link] === undefined) {
                // not in cache
                console.log("not in cache")
                // set expire date
                cache[link] = addDays(new Date(), 1); // 1 dan
                console.log(cache[link]);

                // download and send
                download(link, dest, () => {
                    // downloaded
                    console.log("downloaded " + dest)
                    res.set('Content-Type', 'image/png')
                    res.set('Content-Disposition', `attachment; filename="${imageName}"`)
                    res.sendFile(dest)
                    return;
                })

            } else {
                if (cache[link] > new Date()) {
                    //nije isteklo
                    console.log("nije isteklo")
                    res.set('Content-Type', 'image/png')
                    res.set('Content-Disposition', `attachment; filename="${imageName}"`)
                    res.sendFile(dest)
                    return;
                } else {
                    // isteklo
                    console.log("isteklo")
                    // set expire date
                    cache[link] = addDays(new Date(), 1); // 1 dan
                    console.log(cache[link]);

                    // download and send
                    download(link, dest, () => {
                        // downloaded
                        console.log("downloaded " + dest)
                        res.set('Content-Type', 'image/png')
                        res.set('Content-Disposition', `attachment; filename="${imageName}"`)
                        res.sendFile(dest)
                        return;
                    })
                }
            }

        })
        .catch(err => console.log(err));
    return

})

app.use((req, response, next) => {
    response.status(501)
    response.json({
        status: 'Not Implemented',
        message: 'Method not implemented for requested resource',
        response: null
    });
    response.end()
});

var server = app.listen(3000, function () { })


// https://en.wikipedia.org/api/rest_v1/page/media-list/Facebook

// let link= api.items[0].srcset[0].src
// link = "https:" + link