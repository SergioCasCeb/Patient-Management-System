/******** main dashboard site ********/

/**** user menu ****/
const userIcon = document.querySelector(".user-btn");

userIcon.addEventListener("click", () => {
    userIcon.classList.toggle("open");
})

/**** section patients ****/
const patientTab = document.querySelector(".pat-tab");
const patientSection = document.querySelector(".patient-main");
const tablePatients = document.querySelector(".table-patients tbody");
const searchPatient = document.querySelector(".search-patient input");
const filterPatient = document.querySelector(".filter-patient select");
const noResultsMsg = document.querySelector(".table-patients .no-results");
const newPatForm = document.querySelector(".new-pat-form");
const cancelBtnPat = newPatForm.querySelector(".new-pat-form .cancel-btn");
const newPatBtn = document.querySelector(".new-pat-btn");
const numPatients = document.querySelector(".num-pat");
//Profile patitent pop up elemnts
const profileId = document.querySelector(".pat-id");
const profileFirstName = document.querySelector(".patient-first-name");
const profileLastName = document.querySelector(".patient-last-name");
const profileGender = document.querySelector(".patient-gender");
const profileDateBirth = document.querySelector(".patient-date-birth");
const profileAddress = document.querySelector(".patient-address");
const profilePhone = document.querySelector(".patient-phone");
const profileMail = document.querySelector(".patient-mail");
const profileInsurance = document.querySelector(".pat-insurance");
const profileService = document.querySelector(".pat-service");
const profilePay = document.querySelector(".amount-pay");
// const profileDeadline = document.querySelector(".deadline");
// const profileNextDeadline = document.querySelector(".next-payment");
//Loading the patient list as soon as the user access the main site
loadPatients();

//Patient tab listener, removes rows to allow for an update and changes simple styles
patientTab.addEventListener("click", () => {
    removePatRows();
    patientTab.classList.add("selected");
    serviceTab.classList.remove("selected");
    patientSection.classList.remove("hidden");
    serviceSection.classList.add("hidden");
    loadPatients();
})

// Delete previous rows to add new ones
function removePatRows(){
    const rowsPat = tablePatients.querySelectorAll('tr:not(tr.no-results)');
    rowsPat.forEach(row => {
        row.remove();
    });
}

//Returns the filter options to default after changing a filter option
function returnPatDefault(){
    const rows = tablePatients.querySelectorAll('tr:not(tr.no-results)');
    searchPatient.value = '';
    noResultsMsg.classList.add("hidden");
    rows.forEach(row => {
        row.classList.add("shown");
        row.style.display = 'table-row';
    })
}

//Function to load patients table
function loadPatients() {
    returnPatDefault();
    filterPatient.options[0].selected= true;
    searchPatient.disabled = true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);
    xhr.onload = function() {
        if(this.status == 200){
            var patients = JSON.parse(this.responseText);
            //console.log(patients);
            for(var i in patients){
                let tr = document.createElement("tr");
                tr.classList.add("hover:shadow-gray-blue-200", "hover:shadow-md", "duration-300", "rounded-lg");
                tr.setAttribute("id","patient-row");
                tr.innerHTML = `
                <td class="border-y-2 border-l-2 rounded-l-lg border-gray-blue-400 py-2">${patients[i].id}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].fname + " " + patients[i].lname}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].insurance}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].service}</td>
                <td class="border-y-2 border-gray-blue-400 flex flex-row justify-center items-center py-2">
                    <button class="mr-2 group edit-pat-btn"><i class="fa-solid fa-user-pen py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                    <button class="group delete-pat-btn"><i class="fa-solid fa-trash-can py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                </td>
                <td class="border-y-2 border-r-2 rounded-r-lg border-gray-blue-400 py-2">
                    <button class="profile-btn">See Profile</button>
                </td>
                `;
                tablePatients.append(tr); 
            }
        }

        //Get all row that not include the class no-results
        const rows = tablePatients.querySelectorAll('tr:not(tr.no-results)');
        //Get number of patients and append it
        let patTotal = rows.length;
        numPatients.innerText = patTotal;

        //Get all the profile btns
        const profileBtn = document.querySelectorAll(".profile-btn");
        profileBtn.forEach(profile => {
            profile.addEventListener("click", () => {
                profilePopUp.classList.remove("opacity-0", "pointer-events-none");
                patId = (((profile.parentElement).parentElement).children[0].innerText);
                showProfile(patId);
            })
        });

        
        //Get all delete btns
        const deletePatBtn = document.querySelectorAll(".delete-pat-btn");
        let patId;
        deletePatBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", () => {
                patId = (((deleteBtn.parentElement).parentElement).children[0].innerText);
                let deletePatient = {
                    id: patId,
                    fname: "",
                    lname: "",
                    gender: "",
                    bdate: "",
                    insurance: "",
                    service: "",
                    address: "",
                    phoneNum: "",
                    mail: ""
                }
                $.post('http://localhost:3000/patients', deletePatient, (res, status) =>{
                    console.log(`Status: ${status}, Message: The patient has been deleted\n`);
                });

                popUpContainer.classList.remove("opacity-0", "pointer-events-none");
                popUpFail.innerText = "The Patient entry has been deleted";

                setTimeout(function(){
                    removePatRows();
                    loadPatients();
                    popUpContainer.classList.add("opacity-0", "pointer-events-none");
                    popUpFail.innerText = "";
                }, 2000); 
            })
        })

        //Checks for a change in the filter dropdown menu
        filterPatient.addEventListener("change", () => {
            let filterVal = filterPatient.options[filterPatient.selectedIndex].value;
            searchPatient.disabled = false;
            returnPatDefault();

            //Filters rows base on the given filter and the inputed key
            searchPatient.addEventListener("keyup", () => {
                let value = searchPatient.value.toLowerCase();
                rows.forEach(row => {
                    if(row.querySelector(`td:nth-child(${filterVal})`).textContent.toLowerCase().includes(value)){
                        row.classList.add("shown");
                        row.style.display = 'table-row';
                    }
                    else{
                        row.style.display = 'none';
                        row.classList.remove("shown");
                    }
                });

                //Checks for all the current rows showing on the screen and if there are none show the "no results found text"
                let shownRows = document.querySelectorAll(".table-patients tbody .shown");
                if(shownRows.length == 0){
                    noResultsMsg.classList.remove("hidden");
                }
                else{
                    noResultsMsg.classList.add("hidden");
                }
            }) 
        })
    }
    xhr.send();
}

//New patient form submit and cancel  buttons
cancelBtnPat.addEventListener("click", () => {
    newPatForm.classList.add("hidden");
})
newPatBtn.addEventListener("click", () => {
    newPatForm.classList.remove("hidden");
})

/**** section services ****/
const serviceTab = document.querySelector(".service-tab");
const serviceSection = document.querySelector(".service-main");
const tableServices = document.querySelector(".table-services tbody");
const searchService = document.querySelector(".search-service input");
const filterService = document.querySelector(".filter-service select");
const noResultsSer = document.querySelector(".table-services .no-results");
const newSerForm = document.querySelector(".new-ser-form");
const submitBtnSer = newSerForm.querySelector(".submit-btn");
const cancelBtnSer = newSerForm.querySelector(".cancel-btn");
const newSerBtn = document.querySelector(".new-service-btn");
const numServices = document.querySelector(".num-ser");
//update form elements
const updateSerForm = document.querySelector(".update-ser-form");
const newSerName = document.querySelector("#newServiceName");
const newSerPrivate = document.querySelector("#newPrivatePrice");
const newSerPv = document.querySelector("#newPvPrice");
const oldServiceId = document.querySelector("#serviceId");
const cancelUpdaterSer = updateSerForm.querySelector(".cancel-btn");

//Open and show the services tab
serviceTab.addEventListener("click", () => {
    removeSerRows();
    serviceTab.classList.add("selected");
    patientTab.classList.remove("selected");
    serviceSection.classList.remove("hidden");
    patientSection.classList.add("hidden");  
    loadServices();
})

// Delete previous rows to add new ones
function removeSerRows(){
    const rowsSer = tableServices.querySelectorAll('tr:not(tr.no-results)');
    rowsSer.forEach(row => {
        row.remove();
    });
}

//return service tab to defaults
function returnSerDefault(){
    const rows = tableServices.querySelectorAll('tr:not(tr.no-results)');
    searchService.value = '';
    noResultsSer.classList.add("hidden");
    rows.forEach(row => {
        row.classList.add("shown");
        row.style.display = 'table-row';
    })
}

//Function to load services table
function loadServices() {
    returnSerDefault();
    searchService.disabled = true;
    filterService.options[0].selected= true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'services.json', true);
    xhr.onload = function() {
        if(this.status == 200){
            var services = JSON.parse(this.responseText);
            //console.log(services);
            for(var i in services){
                let tr = document.createElement("tr");
                tr.classList.add("hover:shadow-gray-blue-200", "hover:shadow-md", "duration-300", "rounded-lg");
                tr.innerHTML = `
                <td class="border-y-2 border-l-2 rounded-l-lg border-gray-blue-400 py-2">${services[i].idSer}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${services[i].name}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${services[i].privatePrice}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${services[i].pvPrice}</td>
                <td class="border-y-2 border-r-2 rounded-r-lg border-gray-blue-400 flex flex-row justify-center items-center py-2">
                    <button class="mr-2 group edit-ser-btn"><i class="fa-solid fa-file-pen py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                    <button class="group delete-ser-btn"><i class="fa-solid fa-trash-can py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                </td>
                `;
                tableServices.append(tr); 
            }
        }

        //Get all rows that not include the class no-results
        const rows = tableServices.querySelectorAll('tr:not(tr.no-results)');
        //Get number of services and append it
        let serTotal = rows.length;
        numServices.innerText = serTotal;

        //Get all delete btns and input an empty object with the id to then be removed
        const deleteSerBtn = document.querySelectorAll(".delete-ser-btn");
        let serId;
        deleteSerBtn.forEach(deleteBtn => {
            deleteBtn.addEventListener("click", () => {
                serId = (((deleteBtn.parentElement).parentElement).children[0].innerText);
                
                $.ajax({
                    url: 'http://localhost:3000/services',
                    type: 'DELETE',
                    dataType: 'json',
                    data : {
                        idSer: serId,
                        name: "",
                        privatePrice: "",
                        pvPrice: ""
                    },
                    success: function(response) {
                        console.log(response);
                    },
                    error: function(response) {
                        console.log(response);
                    }
                });

                popUpContainer.classList.remove("opacity-0", "pointer-events-none");
                popUpFail.innerText = "The Service entry has been deleted";

                setTimeout(function(){
                    removeSerRows();
                    loadServices();
                    popUpContainer.classList.add("opacity-0", "pointer-events-none");
                    popUpFail.innerText = "";
                }, 2000); 
            })
        });
        
        //Get all edit btns
        const editSerBtn = document.querySelectorAll(".edit-ser-btn");
        editSerBtn.forEach(editBtn => {
            editBtn.addEventListener("click", () => {
                serId = (((editBtn.parentElement).parentElement).children[0].innerText);
                const nameSerRow = (((editBtn.parentElement).parentElement).children[1].innerText);
                const privatePriceRow = (((editBtn.parentElement).parentElement).children[2].innerText);
                const pvPriceRow = (((editBtn.parentElement).parentElement).children[3].innerText);

                //Add the values to the update form
                newSerName.value = nameSerRow;
                newSerPrivate.value = privatePriceRow;
                newSerPv.value = pvPriceRow;
                oldServiceId.value = serId;
                //show the update service form
                updateSerForm.classList.remove("hidden");
                /*
                let deleteService = {
                    idSer: serId,
                    name: "",
                    privatePrice: "",
                    pvPrice: ""
                }

                $.post('http://localhost:3000/services', deleteService, (res, status) =>{
                    console.log(`Status: ${status}, Message: The service has been deleted\n`);
                });*/
            })
        });

        //Checks for a change in the filter dropdown menu
        filterService.addEventListener("change", () => {
            searchService.disabled = false;
            let filterVal = filterService.options[filterService.selectedIndex].value;
            returnSerDefault();

            //Filters rows base on the given filter and the inputed key
            searchService.addEventListener("keyup", () => {
                let value = searchService.value.toLowerCase();
                rows.forEach(row => {
                    if(row.querySelector(`td:nth-child(${filterVal})`).textContent.toLowerCase().includes(value)){
                        row.classList.add("shown");
                        row.style.display = 'table-row';
                    }
                    else{
                        row.style.display = 'none';
                        row.classList.remove("shown");
                    }
                });

                //Checks for all the current rows showing on the screen and if there are none show the "no results found text"
                let shownRows = document.querySelectorAll(".table-services tbody .shown");
                if(shownRows.length == 0){
                    noResultsSer.classList.remove("hidden");
                }
                else{
                    noResultsSer.classList.add("hidden");
                }
            }) 
        })
    }
    xhr.send();
}

//New service form submit and cancel buttons
cancelBtnSer.addEventListener("click", () => {
    newSerForm.classList.add("hidden");
})
newSerBtn.addEventListener("click", () => {
    newSerForm.classList.remove("hidden");
})

//Update service from cancel btn
cancelUpdaterSer.addEventListener("click", () => {
    updateSerForm.classList.add("hidden");
})

/****** success and fail pop ups ******/
const popUpContainer = document.querySelector(".popup-container");
const popUpContent = document.querySelector(".popup-content");
const popUpSuccess = document.querySelector(".popup-success");
const popUpFail = document.querySelector(".popup-fail");

/****** profile pop up ******/
const profilePopUp = document.querySelector(".pat-profile-container");
const exitProfile = document.querySelector(".exit-profile");

exitProfile.addEventListener("click", () => {
    profilePopUp.classList.add("opacity-0", "pointer-events-none");
});

/****** Function load profile for each patient ******/
function showProfile(id){
    var xhrPat = new XMLHttpRequest();
    var xhrSer = new XMLHttpRequest();
    xhrPat.open('GET', 'patients.json', true);
    xhrSer.open('GET', 'services.json', true);
    xhrPat.onload = function() {
        if(this.status == 200){
            let patients = JSON.parse(this.responseText);
            patients.forEach(patient => {
                if(id == patient.id){
                    profileId.innerText = patient.id;
                    profileFirstName.innerText = patient.fname;
                    profileLastName.innerText = patient.lname;
                    profileGender.innerText = patient.gender;
                    profileDateBirth.innerText = patient.bdate;
                    profileAddress.innerText = patient.address;
                    profilePhone.innerText = patient.phoneNum;
                    profileMail.innerText = patient.mail;
                    profileInsurance.innerText = patient.insurance;

                    xhrSer.onload = function(){
                        if(this.status == 200){
                            let services = JSON.parse(this.responseText);
                            services.forEach(service => {
                                if(patient.service == service.idSer){
                                    profileService.innerText = service.name;
                                }
                                if(patient.insurance == "private" && patient.service == service.idSer){
                                    profilePay.innerText = service.privatePrice;
                                }
                                if(patient.insurance == "pv" && patient.service == service.idSer){
                                    profilePay.innerText = service.pvPrice;
                                }
                            });
                        }  
                    }
                    xhrSer.send();
                }
            });
        }   
    }
    xhrPat.send();
}