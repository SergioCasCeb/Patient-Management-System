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
const noResultsMsg = document.querySelector(".table-patients .no-results");
loadPatients();

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
    //console.log("the patients have loaded");
    filterPatient.options[0].selected= true;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'patients.json', true);
    xhr.onload = function() {
        if(this.status == 200){
            var patients = JSON.parse(this.responseText);
            //console.log(patients);
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

        const rows = tablePatients.querySelectorAll('tr:not(tr.no-results)');

        filterPatient.addEventListener("change", () => {
            var filterVal = filterPatient.options[filterPatient.selectedIndex].value;
            returnPatDefault();
            searchPatient.addEventListener("keyup", () => {
                var value = searchPatient.value.toLowerCase();
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