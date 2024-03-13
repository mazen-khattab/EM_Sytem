//#region create object and put it in the array of emp
let arrayOFEmp = [];
let arrayOfTr = [];

let randomId = () => {
    let id = "";
    // Generate a random 3-digit number
    for (let i = 0; i < 3; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

let addToArrayOFEmp = () => {
    let details = {
        date: dateInput.value,
        fName: firstName.value,
        lName: lastName.value,
        email: email.value,
        num: numInput.value,
        selectedJob: select.value,
        id: randomId()
    };

    arrayOFEmp.push(details);
    createTr(arrayOFEmp);
}
//#endregion



//#region create the method that take the array of emp and make tr of table and add it in DOM
let tableBody = document.querySelector(".bodyTable");

let createTr = (array) => {
    arrayOfTr = array.map((emp, index) => {
        return `<tr>
        <td>${index + 1}</td>
        <td class="id">${emp.id}</td>
        <td id="name">${emp.fName}</td>
        <td id="email">${emp.email}</td>
        <td>
            <a type="button" class="btn btn-primary d-block detailsBtn" data-bs-toggle="modal"
                data-bs-target="#details">Details</a>
        </td>

        <td>
            <a type="button" class="btn btn-warning d-block editBtn" data-bs-toggle="modal"
                data-bs-target="#edit-details">Edit</a>
        </td>

        <td>
            <a type="button" class="btn btn-danger d-block delBtn" data-bs-toggle="modal"
                data-bs-target="#del">Delete</a>

        </td>

    </tr>`
    })

    addToDOM(arrayOfTr)
}

let addToDOM = (array) => {
    tableBody.innerHTML = array.join("")
}

let addToLocalStorage = (emp) => {
    localStorage.setItem("emp", JSON.stringify(emp));
}
//#endregion



//#region set all about the emp in the add and edit form
let addEmpForm = document.getElementById("add-emp");
let addEmpFormInputs = document.querySelectorAll("#add-emp .form-input");
let addEmpFormBtn = document.getElementById("add-btn")
let dateInput = document.querySelector('#add-emp input[type="date"]');
let email = document.querySelector('#add-emp input[type="email"]');
let firstName = document.getElementById("fname");
let lastName = document.getElementById('lname');
let numInput = document.getElementById('num');
let select = document.getElementById('select');
let detailsTableTd = document.querySelectorAll(".detailsTable .td");
let deletedEmpName = document.getElementById("deletedEmpName");
let editInputs = document.querySelectorAll(".edit-form .edit-input");
let update = document.getElementById("update")
let validEmail = false;
let validDate = false;
let validDate2 = false;
let validNum = false;
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

let allIsDone = (inputs) => {
    inputs.forEach(input => {
        input.style.cssText = "border: 1px solid green";

        defaultState(input)
    })
}
// check the validation of the Inputs values
let checkAllValidation = (array) => {
    allIsValid = true
    array.forEach(input => {
        if (!input.value || input.value == -1) {
            nullInput(input);
            defaultState(input);
            allIsValid = false;
        }
    })
}
// to check the syntax
let checkSyntax = (syntax, inputValue) => {
    let experssion = inputValue.match(syntax);
    return experssion;
}
// to check the validation of the date
let checkDateValidation = (value) => {
    if (Date.now() < Date.parse(value)) {
        return true;
    } else {
        return false
    }
}
// to display any message in any where
let dispalyMessage = (message, value) => {
    let valid
    if (!value) {
        message.style.display = "block";
        valid = false;
    } else {
        message.style.display = "none";
        valid = true;
    }
    return valid;
}
// check if the age of the emp is < 18 or > 18
let checkIfSmall = (value) => {
    let birthDate = new Date(value);
    let age = new Date().getFullYear() - birthDate.getFullYear();

    if (birthDate.getMonth() > new Date().getMonth() || (birthDate.getMonth() === new Date().getMonth() && birthDate.getDate() > new Date().getDate())) {
        age--;
    }
    return age;
}
// to display the message of the age
let displayAgeMessage = (age, message) => {
    if (age < 18 && age >= 0) {
        message.style.display = "block";
        validDate = false;
    } else {
        message.style.display = "none"
        validDate = true;
    }
}
// get the values of arrayOfEmp and put it in the editInputs values
let getValues = (index) => {
    const { date, fName, lName, email, num, selectedJob } = arrayOFEmp[index];
    editInputs.forEach((input, i) => input.value = [date, fName, lName, email, num, selectedJob][i]);
}
// take the values of the editInputs and set it in the arrayOfEmp
let setValues = (index) => {
    let properties = ["date", "fName", "lName", "email", "num", "selectedJob"]
    properties.forEach((prop, i) => arrayOFEmp[index][prop] = editInputs[i].value)
}
// get the index of an emp from the arrayOfEmp 
let getIndex = (id) => {
    return arrayOFEmp.findIndex(emp => emp.id == id)
}

let allEditInputsValidation = () => {
    let bigger = checkDateValidation(editInputs[0].value);
    validDate2 = dispalyMessage(document.querySelector(".biggerEdit"), !bigger)

    let age = checkIfSmall(editInputs[0].value);
    displayAgeMessage(age, document.querySelector(".youngEdit"));

    if (editInputs[3].value) {
        let emailExperssion = checkSyntax(/\w+@\w+\.[a-zA-z]+$/ig, editInputs[3].value);
        validEmail = dispalyMessage(document.querySelector(".invaildEmailEdit"), emailExperssion);
    }

    if (editInputs[4].value) {
        let numExperssion = checkSyntax(/\d+/ig, editInputs[4].value);
        validNum = dispalyMessage(document.querySelector(".invaildNumEdit"), numExperssion)
    }
}
//event of click on the add button
addEmpFormBtn.addEventListener("click", (e) => {
    checkAllValidation(addEmpFormInputs);

    // the validation of the date
    if (dateInput.value) {
        let bigger = checkDateValidation(dateInput.value);
        validDate2 = dispalyMessage(document.querySelector(".bigger"), !bigger)

        let age = checkIfSmall(dateInput.value);
        displayAgeMessage(age, document.querySelector(".young"));
    }
    // the validation of the email
    if (email.value) {
        let experssion = checkSyntax(/\w+@\w+\.[a-zA-z]+$/ig, email.value);
        validEmail = dispalyMessage(document.querySelector(".invaildEmail"), experssion);
    }
    // the validation of the phone number
    if (numInput.value) {
        let experssion = checkSyntax(/\d+/ig, numInput.value);
        validNum = dispalyMessage(document.querySelector(".invaildNum"), experssion)
    }

    if (validDate && validEmail && validNum && validDate2 && allIsValid) {
        addToArrayOFEmp()
        addToLocalStorage(arrayOFEmp);
        addEmpFormInputs.forEach(input => {
            input.value = ''
        })
        select.value = -1
        detailsBtn = document.querySelectorAll(".detailsBtn");
    }
})
//#endregion



//#region click on the details button event
let detailsEmpIndex;
let trOfDetailsEmp;
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("detailsBtn")) {
        trOfDetailsEmp = e.target.closest("tr");
        let id = trOfDetailsEmp.querySelector(".id");
        detailsEmpIndex = getIndex(id.innerHTML);

        let job;
        select.childNodes.forEach(opation => {
            if (opation.value == arrayOFEmp[detailsEmpIndex].selectedJob) {
                job = opation;
            }
        })

        detailsTableTd[0].innerHTML = detailsEmpIndex + 1

        const properties = ["id", "fName", "lName", "email", "num", "date"]
        properties.forEach((prop, i) => detailsTableTd[i + 1].innerHTML = arrayOFEmp[detailsEmpIndex][prop])

        detailsTableTd[7].innerHTML = job.innerHTML;
    }
})
//#endregion



//#region click on the edit button event 
let indexOfEditEmp;
let trOfEditEmp;
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editBtn")) {
        trOfEditEmp = e.target.closest("tr");
        let id = trOfEditEmp.querySelector(".id").innerHTML;
        indexOfEditEmp = getIndex(id)

        getValues(indexOfEditEmp);
        allEditInputsValidation();
    }

    if (e.target.classList.contains("detailsBtn")) {
        trOfEditEmp = e.target.parentElement.parentElement;
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("editDetailsBtn")) {
                let id = e.target.parentElement.previousElementSibling.querySelector("#detailsId").innerHTML;
                indexOfEditEmp = getIndex(id);
                getValues(indexOfEditEmp);
                allEditInputsValidation();
            }
        })
    }

    update.addEventListener("click", (e) => {
        
        checkAllValidation(editInputs);
        allEditInputsValidation();
        
        if (validDate && validEmail && validNum && validDate2 && allIsValid) {
            setValues(indexOfEditEmp);
            
            allIsDone(editInputs);
            
            trOfEditEmp.children[2].innerHTML = editInputs[1].value;
            trOfEditEmp.children[3].innerHTML = editInputs[3].value;
            addToLocalStorage(arrayOFEmp);
        }
    })
})
//#endregion



//#region click on the delete button event
let indexOfDeletedEmp;
let trOfDeletedEmp;

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delBtn")) {
        trOfDeletedEmp = e.target.closest("tr");
        let id = trOfDeletedEmp.querySelector(".id").innerHTML;

        indexOfDeletedEmp = getIndex(id);
        deletedEmpName.innerHTML = arrayOFEmp[indexOfDeletedEmp].fName + " " + arrayOFEmp[indexOfDeletedEmp].lName;

    }

    if (e.target.classList.contains("yes")) {
        arrayOFEmp.splice(indexOfDeletedEmp, 1)
        createTr(arrayOFEmp)
        addToLocalStorage(arrayOFEmp)
    }
})
//#endregion



//#region search bar 
let search = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let emptyMessage = document.querySelector(".empty");
let emptyMessageName = document.querySelector(".empty span");

search.addEventListener("keyup", (e) => {
    let filterdArray = arrayOFEmp.filter((emp) => {
        let fullName = emp.fName + " " + emp.lName;
        return fullName.toLowerCase().includes(search.value); 
    })

    if (search.value && filterdArray.length ==0) {
        emptyMessage.style.display = "block"
        emptyMessageName.innerHTML = `"${search.value}"`;
    } else {
        emptyMessage.style.display = "none"
    }
    
    createTr(filterdArray)
})
//#endregion



//#region local storage
if (localStorage.getItem("emp")) {
    arrayOFEmp = JSON.parse(localStorage.getItem("emp"));
    createTr(arrayOFEmp);
}
//#endregion