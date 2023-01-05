const express = require('express');
const fs = require('fs');

const routerService = express.Router();

var entriesService;

//Get request
routerService.get('/', (req, res, next) => {
    //getting all the entries as json format
    let data = fs.readFileSync('./src/services.json');
    let serviceList = JSON.parse(data);
    res.status(200).json(serviceList);
});

//Post request
routerService.post('/', (req, res, next) =>{
    //delete previous object
    entriesService = "";

    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

    //Saving the new entry in the entries service variable 
    entriesService = newService;

    //Access json list to compare with new service
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);

    //Check if the new entry is repeated
    //if repeated update the entry
    //else add the new entry
    let updateEntry = false;

    for(let i = 0; i < services.length; i++){
        if(newService.idSer == services[i].idSer){
            updateEntry = true;
            break;   
        }
        else{
            updateEntry = false;
        }
    }

    if(updateEntry == true){
        services.forEach(service => {
            if(newService.idSer == service.idSer){
                //get object keys to iterate through it while updating the entry
                const keys = Object.keys(service);
                const valuesNew = Object.values(newService);
                for(let i = 0; i < keys.length; i++){
                    service[keys[i]] = valuesNew[i];
                }
    
                //Writting it in the json file
                serJson = JSON.stringify(services, null, 2);
                fs.writeFileSync("./src/services.json", serJson, "utf-8");

                //sending a response msg when updated successfully
                res.status(200).json({ msg: 'The service has been updated successfully'});
            }
        });
    }else{
        //Adding the new entry and updating the list
        services.push(entriesService);
        console.log(services);
        serJson = JSON.stringify(services, null, 2);
        fs.writeFileSync("./src/services.json", serJson, "utf-8");

        //sending a response msg when added successfully
        res.status(200).json({ msg: 'The new service has been saved successfully'});
    }
});

//Delete request
routerService.delete('/', (req, res, next) =>{
    
    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

    //Access json list to compare with delete entry
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);
    
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
            res.status(200).json({ msg: 'This service has been deleted successfully'});
        }
    });
});

module.exports = routerService;