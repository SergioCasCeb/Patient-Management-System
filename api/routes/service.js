const express = require('express');
const fs = require('fs');

const routerService = express.Router();

var entriesService;

//Get request
routerService.get('/', (req, res, next) => {
    //getting all the entries as json format
    // res.status(200).json(entriesService);
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

    //TODO
    entriesService = newService;
    res.status(200).json({ msg: 'The new service has been saved successfully'});

    //Access json list to compare with new service
    let serJson = fs.readFileSync("./src/services.json", "utf-8");
    let services = JSON.parse(serJson);

    //Check if the new entry is repeated
    //if repeated update the entry
    //else add the new entry
    let updateEntry = false;

    for(let i = 0; i < services.length; i++){
        if(newService.id == services[i].id){
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
            }
        });
    }else{
        //Adding the new entry and updating the list
        services.push(entriesService);
        serJson = JSON.stringify(services, null, 2);
        fs.writeFileSync("./src/services.json", serJson, "utf-8");
    }
});


//Delete request
routerService.delete('/', (req, res, next) =>{
    entriesService = "";
    res.status(200).json({ msg: 'This was a delte request'});
    let newService = {
        idSer: req.body.idSer,
        name: req.body.name,
        privatePrice: req.body.privatePrice,
        pvPrice: req.body.pvPrice
    };

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
        }
    });
});

module.exports = routerService;

/*
//Check if the new entry is repeated
    //if repeated delete the entry
    //else add the new entry
    let deleteEntry = false;

    for(let i = 0; i < patients.length; i++){
        if(newPatient.id == patients[i].id){
            deleteEntry = true;
            break;   
        }
        else{
            deleteEntry = false;
        }
    }

    if(deleteEntry == true){
        patients.forEach(patient => {
            if(newPatient.id == patient.id){
                //get object keys to iterate through it while deleting the entry
                const keys = Object.keys(patient);
                keys.forEach(key => {
                    delete patient[key];
                });
                //filtering the list of patients to delete any empty objects
                const cleanedList = patients.filter(element => {
                if (Object.keys(element).length !== 0) {
                    return true;
                }
                return false;
                });
    
                //Writting it in the json file
                patJson = JSON.stringify(cleanedList, null, 2);
                fs.writeFileSync("./src/patients.json", patJson, "utf-8");
            }
        });
    }
    else{
        patients.push(entriesPatient);
        patJson = JSON.stringify(patients, null, 2);
        fs.writeFileSync("./src/patients.json", patJson, "utf-8");
    } 
*/