URLP = 'http://localhost:3000/patients';

newPatForm.addEventListener("submit", (e) => {
    //Preventing the default behaviour of the submit listener
    e.preventDefault();

    //Getting all the inputs
    const patFName = document.querySelector("#patFirstName");
    const patLName = document.querySelector("#patLastName");
    const patGender = document.querySelector("#patGender");
    const patInsurance = document.querySelector("#insuranceType");
    const patService = document.querySelector("#serviceNum");
    const patAddress = document.querySelector("#patAddress");
    const patPhone = document.querySelector("#patPhoneNum");
    const patMail = document.querySelector("#patEmail");

    //Input values
    let patFNameValue = patFName.value;
    let patLNameValue = patLName.value;
    let patGenderValue = patGender.value;
    let patInsuranceValue = patInsurance.value;
    let patServiceValue = patService.value;
    let patAddressValue = patAddress.value;
    let patPhoneValue = patPhone.value;
    let patMailValue = patMail.value;

    //Getting the date and setting the format to dd.mm.yy
    let patDate = new Date(document.querySelector("#dateBirth").value);
    let day = patDate.getDate();
    let month = patDate.getMonth() + 1;
    let year = patDate.getFullYear();
    let fullDate = day + "." + month + "." + year;

    //Getting the last all the patients rows
    let amountTr = tablePatients.querySelectorAll('tr:not(tr.no-results)');

    //Getting the last row of the patients
    let lastTr = amountTr[amountTr.length - 1];

    //Getting the id of the last patient row
    let lastId = parseInt(lastTr.firstElementChild.innerHTML);

    //Incrementing the id by one
    lastId++;

    //function to reset form
    function resetPatForm(){
        patFName.value = "";
        patLName.value = "";
        patGender.value = "";
        patDate.value = "";
        patInsurance.value = "";
        patService.value = "";
        patAddress.value = "";
        patPhone.value = "";
        patMail.value = "";
        document.querySelector("#dateBirth").value = "";
        newPatForm.classList.add("hidden");
    }

    //Checking for empty fields; if no empty fields the data is sent
    if (patFNameValue == "" || patLNameValue == "" || patGenderValue == "" || patDate == "" || patInsuranceValue == "" || patServiceValue == "" || patAddressValue == "" || patPhoneValue == "" || patMailValue == ""){
        popUpContainer.classList.remove("opacity-0", "pointer-events-none");
        popUpFail.innerText = "Please remember to fill all the required fields!";

        setTimeout(function(){
            popUpContainer.classList.add("opacity-0", "pointer-events-none");
            popUpFail.innerText = "";
        }, 2000); 
    }
    else{
        var dataPatient = {
            id: lastId,
            fname: patFNameValue,
            lname: patLNameValue,
            gender: patGenderValue,
            bdate: fullDate,
            insurance: patInsuranceValue,
            service: patServiceValue,
            address: patAddressValue,
            phoneNum: patPhoneValue,
            mail: patMailValue
        }

        $.post(URLP, dataPatient, (res, status) =>{
            console.log(`Status: ${status}, Message: ${res.msg}\n`);
        });

        resetPatForm();
        popUpContainer.classList.remove("opacity-0", "pointer-events-none");
        popUpSuccess.innerText = "The new patient has been added successfuly";

        setTimeout(function(){
            removePatRows();
            loadPatients();
            popUpContainer.classList.add("opacity-0", "pointer-events-none");
            popUpSuccess.innerText = "";
        }, 2000); 
    }
})