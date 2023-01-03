const express = require('express');
const fs = require('fs');

const routerPatient = express.Router();

var entriesPatient;

// routerPatient.post('/', (res, status) =>{
//     res.status(200).json({ msg: 'The new patient has been saved successfully'});
// });

routerPatient.get('/', (req, res, next) => {
    //getting all the entries as json file
    //res.status(200).json(entriesPatient);
    let data = fs.readFileSync('./src/patients.json');
    let patientList = JSON.parse(data);
    res.status(200).json(patientList);
});

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

    //adding the new patient to the entries
    entriesPatient = newPatient;
    res.status(200).json({ msg: 'The new patient has been saved successfully'});

    //Access json list to compare with new patient
    let patJson = fs.readFileSync("./src/patients.json", "utf-8");
    let patients = JSON.parse(patJson);

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
});

module.exports = routerPatient;