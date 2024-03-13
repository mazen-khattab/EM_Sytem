let inputs = document.querySelectorAll(".inputDiv");
let form = document.getElementById("form")
let loginBtn = document.getElementById("login");
let allIsValid = false;

// to add animation on the input buttons if the value of any is null
let nullInput = (input) => {
    input.style.cssText = "border: 1px solid red";
    input.classList.add("wrong");
}
// to reutrn the input buttons to the original state
let defaultState = (input) => {
    setTimeout(() => {
        input.style.cssText = "border: 1px solid #dee2e6"
        input.classList.remove("wrong");
    }, 1000);
}
// check the validation of the editInputs values
let checkAllValidation = (array) => {
    allIsValid = true;
    array.forEach(input => {
        if (!input.children[0].value) {
            nullInput(input);
            defaultState(input);
            allIsValid = false;
        }
    })
}

// click on the login button event 
form.addEventListener("submit", (e) => {
    checkAllValidation(inputs);
    
    if (!allIsValid) {
        e.preventDefault()
    }
})