var customerForm = document.getElementById("customerForm");
var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var phoneNumber = document.getElementById("phoneNumber");
var city = document.getElementById("city");
var submitButton = document.getElementById("submitButton");
var buttonSpinner = document.getElementById("buttonSpinner");
var buttonText = document.getElementById("buttonText");
var unknownError = document.getElementById("unknownError");


function afterSubmit(e){

    e.preventDefault();

    if (customerForm.checkValidity() === false) {
        e.stopPropagation();
        for(let field of customerForm.elements) {
            if(!field.checkValidity()){
                field.classList.add("is-invalid");
            }
        }
        return;
    }

    for(let field of customerForm.elements) {
            field.classList.remove("is-invalid");
    }

    var info = {
        first: firstName.value,
        last: lastName.value,
        phone: phoneNumber.value,
        city: city.value,
    };

    var url = "https://script.googleusercontent.com/macros/echo?user_content_key=N4KbqltncBNKp_qPJOeVm-ChWXrsM0PijcMuwrDwFQ2QXkWx-ul7_nfkkLrlC-QsBMETv8RB1CLTAiybO21ZqHElTmVFe2TBm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnA3puq2BYbE7rV7oWIl31Xq-i5AhQYBwWyEbddyrwKPJ0on5HHmRh9toLyd0geonWDHYlvxnKr4OGGaU2pP6Ntk&lib=MBNzBteGq5n9YUmnt-nME9dUj6pQy2WoH";

    buttonText.textContent = "Saving..";
    buttonSpinner.classList.remove("d-none");
    submitButton.disabled = true;

    fetch(url,{
        method: 'POST',
        cache: 'no-cache',
        redirect: 'follow',
        body: JSON.stringify(info)
      })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        customerForm.reset();
        buttonText.textContent = "Send";
        buttonSpinner.classList.add("d-none");
        submitButton.disabled = false;
      })
      .catch(err => {
        console.log(err);
        console.log("Something Went Wrong");
        unknownError.classList.remove("d-none");
        setTimeout(function(){
            unknownError.classList.add("d-none");
            buttonText.textContent = "Send";
            buttonSpinner.classList.add("d-none");
            submitButton.disabled = false;
        },3000);
      });

}

customerForm.addEventListener("submit",afterSubmit);
