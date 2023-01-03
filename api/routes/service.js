const express = require('express');
const fs = require('fs');

const routerService = express.Router();

var entriesService;

routerService.get('/', (req, res, next) => {
    //getting all the entries as json format
    // res.status(200).json(entriesService);
    let data = fs.readFileSync('./src/services.json');
    let serviceList = JSON.parse(data);
    res.status(200).json(serviceList);
});

routerService.post('/', (req, res, next) =>{
    //delete previous object
    entriesService = "";

    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

    //Adding a new patient to the entries
    entriesService = newService;
    res.status(200).json({ msg: 'The new service has been saved successfully'});

    //Access json list to compare with new service
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);

    //Check if the new entry is repeated
    //if repeated delete the entry
    //else add the new entry
    let deleteEntry = false;

    for(let i = 0; i < services.length; i++){
        if(newService.idSer == services[i].idSer){
            deleteEntry = true;
            break;   
        }
        else{
            deleteEntry = false;
        }
    }

    if(deleteEntry == true){
        services.forEach(service => {
            if(newService.idSer == service.idSer){
                //get object keys to iterate through it while deleting the entry
                const keys = Object.keys(service);
                keys.forEach(key => {
                    delete service[key];
                });
                //filtering the list of services to delete any empty objects
                const cleanedList = services.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                }
                return false;
                });
    
                //Writting it in the json file
                serJson = JSON.stringify(cleanedList, null, 2);
                fs.writeFileSync("./src/services.json", serJson, "utf-8");
            }
        });
    }
    else{
        services.push(entriesService);
        serJson = JSON.stringify(services, null, 2);
        fs.writeFileSync("./src/services.json", serJson, "utf-8");
    } 

    //Accessing the json patient list and pushing the new patient in the list
    /*
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);
    services.push(newService);
    serJson = JSON.stringify(services, null, 2);
    fs.writeFileSync("./src/services.json", serJson, "utf-8");*/
});

module.exports = routerService;