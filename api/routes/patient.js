const express = require('express');
const fs = require('fs');

const routerPatient = express.Router();

var entriesPatient = [];

routerPatient.get('/', (req, res, next) => {
    //getting all the entries as json format
    res.status(200).json(entriesPatient);
});

routerPatient.post('/', (req, res, next) =>{
    let newPatient = {
        id: req.body.id,
        fname: req.body.fname,
        lname: req.body.lname,
        gender: req.body.gender,
        bdate: req.body.bdate,
        insurance: req.body.insurance,
        service: req.body.service,
        address: req.body.address,
        mail: req.body.mail
    };

    //pushing the new patient entry to the array and giving a succes msg
    entriesPatient.push(newPatient);
    res.status(200).json({ msg: 'The new patient has been saved successfully'});

    //Accessing the json patient list and pushing the new patient in the list
    let patJson = fs.readFileSync("./src/patients.json", "utf-8");
    let patients = JSON.parse(patJson);
    patients.push(newPatient);
    patJson = JSON.stringify(patients, null, 2);
    fs.writeFileSync("./src/patients.json", patJson, "utf-8")
});

module.exports = routerPatient;