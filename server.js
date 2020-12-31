var express = require('express') //express app
const path = require('path'); //path
const db = require('./db'); //database object
const fs = require('fs') //filesystem
const { PythonShell } = require('python-shell');

var app = express()

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

            res.type('json')
            res.status('200')
            res.send(JSON.stringify(result))
        }

        if (result == undefined) {
            result = {
                "status": "Not Found",
                "message": "Social networking website with the provided ID doesn't exist",
                "reponse": null
            }
            res.type('json')
            res.status('404')
            res.send(JSON.stringify(result))
        }
    })
})

app.get('/openapidoc', async (req, res) => {
    //send openapi documentation
    res.type('json')
    res.status('404')
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
        }

        if (result == undefined) {
            result = {
                "status": "Not Found",
                "message": "Social networking website with the provided ID doesn't exist",
                "reponse": null
            }
            res.type('json')
            res.status('404')
            res.send(JSON.stringify(result))
        }
    })
})

var server = app.listen(3000, function () { })