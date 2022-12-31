URLS = 'http://localhost:3000/services';

newSerForm.addEventListener("submit", (e) => {
    //Preventing the default behaviour of the submit listener
    e.preventDefault();

    //Getting all the inputs from the service form
    const serviceName = document.querySelector("#serviceName");
    const privatePrice = document.querySelector("#privatePrice");
    const pvPrice = document.querySelector("#pvPrice");

    //Getting the values for all the inputs
    let serviceNameValue = serviceName.value;
    let privatePriceValue = privatePrice.value;
    let pvPriceValue = pvPrice.value;

    //Getting the last all the patients rows
    let amountTr = tableServices.querySelectorAll('tr:not(tr.no-results)');

    //Getting the last row of the patients
    let lastTr = amountTr[amountTr.length - 1];

    //Getting the id of the last patient row
    let lastId = parseInt(lastTr.firstElementChild.innerHTML);

    //Incrementing the id by one
    lastId++;

    //function to reset the service form values
    function resetSerForm(){
        serviceName.value = "";
        privatePrice.value = "";
        pvPrice.value = "";
        newSerForm.classList.add("hidden");
    }

    //Checking for empty fields; if no empty fields the data is sent
    if (serviceNameValue == "" || privatePriceValue == "" || pvPriceValue == ""){
        popUpContainer.classList.remove("opacity-0", "pointer-events-none");
        popUpFail.innerText = "Please remember to fill all the required fields!";

        setTimeout(function(){
            popUpContainer.classList.add("opacity-0", "pointer-events-none");
            popUpFail.innerText = "";
        }, 2000); 
    }
    else{
        var dataService = {
            idSer: lastId,
            name: serviceNameValue,
            privatePrice: privatePriceValue,
            pvPrice: pvPriceValue
        }

        $.post(URLS, dataService, (res, status) =>{
            console.log(`Status: ${status}, Message: ${res.msg}\n`);
        });

        resetSerForm();
        popUpContainer.classList.remove("opacity-0", "pointer-events-none");
        popUpSuccess.innerText = "The new service has been added successfuly";

        setTimeout(function(){
            removeSerRows();
            loadServices();
            popUpContainer.classList.add("opacity-0", "pointer-events-none");
            popUpSuccess.innerText = "";
        }, 2000); 
    }
})