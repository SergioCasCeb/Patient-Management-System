const username = "user";
const password = "user";

const logForm = document.querySelector(".log-in-form");
const userInput = document.querySelector("input[name='username']");
const passInput = document.querySelector("input[name='password']");
const errorUserPass = document.querySelector(".error-u-p");
const errorUser = document.querySelector(".error-u");
const errorPass = document.querySelector(".error-p");
console.log(logForm);
console.log(userInput);
console.log(passInput);

logForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //get input values
    let userValue = userInput.value;
    let passValue = passInput.value;
    //make sure all erros messages are hidden if not necessary
    errorUser.classList.add("hidden");
    errorPass.classList.add("hidden");
    errorUserPass.classList.add("hidden");

    //check for the input cases
    if(userValue === username && passValue === password){
        window.location.href = "dashboard.html";
        userInput.value = "";
        passInput.value = "";
    }
    else if(userValue != username && passValue === password){
        errorUser.classList.remove("hidden");
    }
    else if(passValue != password && userValue === username){
        errorPass.classList.remove("hidden");
    }
    else{
        errorUserPass.classList.remove("hidden");
    }
});