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