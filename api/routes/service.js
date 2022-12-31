const express = require('express');
const fs = require('fs');

const routerService = express.Router();

var entriesService = [];

routerService.get('/', (req, res, next) => {
    //getting all the entries as json format
    res.status(200).json(entriesService);
});

routerService.post('/', (req, res, next) =>{
    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

    //pushing the new patient entry to the array and giving a succes msg
    entriesService.push(newService);
    res.status(200).json({ msg: 'The new service has been saved successfully'});

    //Accessing the json patient list and pushing the new patient in the list
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);
    services.push(newService);
    serJson = JSON.stringify(services, null, 2);
    fs.writeFileSync("./src/services.json", serJson, "utf-8");
});

module.exports = routerService;