/** main dashboard site **/

/* user menu */
const userIcon = document.querySelector(".user-btn");

userIcon.addEventListener("click", () => {
    userIcon.classList.toggle("open");
})


/* sections */
const patientTab = document.querySelector(".pat-tab");
const serviceTab = document.querySelector(".service-tab");
const patientSection = document.querySelector(".patient-main");
const serviceSection = document.querySelector(".service-main");

patientTab.addEventListener("click", () => {
    patientTab.classList.add("selected");
    serviceTab.classList.remove("selected");
    patientSection.classList.remove("hidden");
    serviceSection.classList.add("hidden");

})
serviceTab.addEventListener("click", () => {
    serviceTab.classList.add("selected");
    patientTab.classList.remove("selected");
    serviceSection.classList.remove("hidden");
    patientSection.classList.add("hidden");
    
})

/**** Main functionality ****/
const tablePatients = document.querySelector(".table-patients tbody");
const searchPatient = document.querySelector(".search-patient input");
const filterPatient = document.querySelector(".filter-patient select");
console.log(tablePatients);
console.log(searchPatient);
console.log(filterPatient);
loadPatients();
//Function to load patients table
function loadPatients() {
    console.log("the patients have loaded");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);

    xhr.onload = function() {
        if(this.status == 200){
            var patients = JSON.parse(this.responseText);
            console.log(patients);
            for(var i in patients){
                let tr = document.createElement("tr");
                tr.classList.add("hover:shadow-gray-blue-200", "hover:shadow-md", "duration-300", "rounded-lg");
                tr.innerHTML = `
                <td class="border-y-2 border-l-2 rounded-l-lg border-gray-blue-400 py-2">${patients[i].id}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].fname + " " + patients[i].lname}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].insurance}</td>
                <td class="border-y-2 border-gray-blue-400 py-2">${patients[i].service}</td>
                <td class="border-y-2 border-gray-blue-400 flex flex-row justify-center items-center py-2">
                    <button class="mr-2 group"><i class="fa-solid fa-user-pen py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                    <button class="group"><i class="fa-solid fa-trash-can py-1 px-2 text-xl group-hover:text-primary-600 duration-300"></i></button>
                </td>
                <td class="border-y-2 border-r-2 rounded-r-lg border-gray-blue-400 py-2">
                    <button>See Profile</button>
                </td>
                `;
                tablePatients.append(tr); 
            }
        }

        const rows = tablePatients.querySelectorAll('tr');
        console.log(rows);

        filterPatient.addEventListener("change", () => {
            console.log(filerPatient.options);
        })

        searchPatient.addEventListener("keyup", () => {
            var value = searchPatient.value.toLowerCase();
            console.log(value);

            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent.toLowerCase().includes(value) ? row.style.display = 'table-row' : row.style.display = 'none';
            });
        })
        
    }

    xhr.send();

    /*
    searchPatient.on('keyup', function() {
            var value = $(this).val().toLowerCase();
            console.log(value);

            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent.toLowerCase().includes(value) ? row.style.display = 'table-row' : row.style.display = 'none';
            });

        });*/


    /*
    xhr.onload = function() {
        if (this.status == 200) {
            $(".body-patient-table tr").remove();
            //alert("The patient database has loaded successfully")
            var patients = JSON.parse(this.responseText);
            console.log(patients);

            for (var i in patients) {

                $('.body-patient-table').append(`
                <tr>
                    <td>${patients[i].id}</td>
                    <td>${patients[i].fname}</td>
                    <td>${patients[i].lname}</td>
                    <td>${patients[i].gender}</td>
                    <td>${patients[i].bdate}</td>
                    <td>${patients[i].address}</td>
                    <td>${patients[i].insurance}</td>
                    <td>${patients[i].service}</td>
                    <td><div><i class="fas fa-edit edit-pat-btn mr-3"></i> <i class="fas fa-trash-alt delete-pat-btn ml-3"></i></div></td>
                    <td><button type="button" class="btn btn-outline-secondary show-profile ${patients[i].fname+patients[i].id}">See Profile</button></td>
                </tr>
                `);
            }

        }

        const rows = document.querySelectorAll('tbody.body-patient-table tr');

        $('.search-patient').on('keyup', function() {
            var value = $(this).val().toLowerCase();
            console.log(value);

            rows.forEach(row => {
                row.querySelector('td:nth-child(2)').textContent.toLowerCase().includes(value) ? row.style.display = 'table-row' : row.style.display = 'none';
            });

        });

    }
    xhr.send();
    */
}