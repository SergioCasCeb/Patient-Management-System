const express = require('express');
const fs = require('fs');

const routerPatient = express.Router();

var entriesPatient;

// routerPatient.post('/', (res, status) =>{
//     res.status(200).json({ msg: 'The new patient has been saved successfully'});
// });

//Get Request
routerPatient.get('/', (req, res, next) => {
    //getting all the entries as json file
    //res.status(200).json(entriesPatient);
    let data = fs.readFileSync('./src/patients.json');
    let patientList = JSON.parse(data);
    res.status(200).json(patientList);
});

//Post request
routerPatient.post('/', (req, res, next) =>{
    //Delete previous object
    entriesPatient = "";

    let newPatient = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        bdate: req.body.bdate,
        insurance: req.body.insurance,
        service: req.body.service,
        address: req.body.address,
        phoneNum: req.body.phoneNum,
        mail: req.body.mail
    };

    //TODO
    entriesPatient = newPatient;
    res.status(200).json({ msg: 'The new patient has been saved successfully'});

    //Access json list to compare with new patient
    let patJson = fs.readFileSync("./src/patients.json", "utf-8");
    let patients = JSON.parse(patJson);

    //Check if the new entry is repeated
    //if repeated delete the entry
    //else add the new entry
    let updateEntry = false;

    for(let i = 0; i < patients.length; i++){
        if(newPatient.id == patients[i].id){
            updateEntry = true;
            break;   
        }
        else{
            updateEntry = false;
        }
    }

    if(updateEntry == true){
        patients.forEach(patient => {
            if(newPatient.id == patient.id){
                //get object keys to iterate through it while deleting the entry
                const keys = Object.keys(patient);
                const valuesNew = Object.values(newPatient);
                for(let i = 0; i < keys.length; i++){
                    patient[keys[i]] = valuesNew[i];
                }
    
                //Writting it in the json file
                patJson = JSON.stringify(patients, null, 2);
                fs.writeFileSync("./src/patients.json", patJson, "utf-8");
            }
        });
    }
    else{
        //Adding the new entry and updating the list
        patients.push(entriesPatient);
        patJson = JSON.stringify(patients, null, 2);
        fs.writeFileSync("./src/patients.json", patJson, "utf-8");
    } 
});

//delete request
routerPatient.delete('/', (req, res, next) =>{
    res.status(200).json({ msg: 'This was a delte request for the patient list'});
    
    let deletePatient = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        bdate: req.body.bdate,
        insurance: req.body.insurance,
        service: req.body.service,
        address: req.body.address,
        phoneNum: req.body.phoneNum,
        mail: req.body.mail
    };

    //Access json list to compare with delete entry
    let patJson = fs.readFileSync("./src/patients.json", "utf-8");
    let patients = JSON.parse(patJson);
    
    patients.forEach(patient => {
        if(deletePatient.id == patient.id){
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
});

module.exports = routerPatient;