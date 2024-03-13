//#region put the value of the selected job in the array of job
let arrayOFJobs = [];
let arrayOfTr = [];

let randomId = () => {
    let id = "";
    for (let i = 0; i < 3; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

let addToArrayOFJob = () => {
    let details = {
        selectedJob: addJobFormInput.value,
        id: randomId()
    };

    arrayOFJobs.push(details);
    createTr(arrayOFJobs);
}
//#endregion



//#region create the method that take the array of job and make tr of table and add it in DOM
let tableBody = document.querySelector(".tbody");

let createTr = (array) => {
    arrayOfTr = array.map((jobValue, index) => {
        let job;
        
        addJobFormInput.childNodes.forEach(option => {
            if (option.value == jobValue.selectedJob) {
                job = option.innerHTML;
            }
        })

        return `<tr>
                    <td>${index + 1}</td>
                    <td class="id">${jobValue.id}</td>
                    <td>${job}</td>
                    <td>
                        <a type="button" class="btn btn-primary d-block detailsBtn" data-bs-toggle="modal" data-bs-target="#details">Details</a>
                    </td>
                    <td>
                        <a type="button" class="btn btn-warning d-block editBtn" data-bs-toggle="modal" data-bs-target="#edit">Edit</a>
                    </td>
                    <td>
                        <a type="button" class="btn btn-danger d-block delBtn" data-bs-toggle="modal" data-bs-target="#del">Delete</a>
                    </td>
                 </tr>`
    })

    addToDOM(arrayOfTr)
}

let addToDOM = (array) => {
    tableBody.innerHTML = array.join("")
}

let addToLocalStorage = (job) => {
    localStorage.setItem("job", JSON.stringify(job));
}
//#endregion



//#region set all about the job in the add and edit form
let addJobForm = document.getElementById("add-job");
let addJobFormInput = document.querySelector("#add-job .form-input");
let addJobFormBtn = document.getElementById("add-btn")
let detailsTableTd = document.querySelectorAll(".detailsTable .td");
let editSelected = document.getElementById("editSelected")
let deletedJobName = document.getElementById("deletedJobName")
// to add animation on the input buttons if the value of any input is null
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
// check the validation of the Inputs values
let checkAllValidation = (input) => {
    allIsValid = true;

    if (input.value == -1) {
        nullInput(input);
        defaultState(input);
        allIsValid = false;
    }
}
// get the job from the value of the editSelected input 
let getJob = (index) => {
    let job;
    addJobFormInput.childNodes.forEach(opation => {
        if (opation.value == arrayOFJobs[index].selectedJob) {
            job = opation;
        }
    })

    return job
}
// get the values of arrayOfEmp and put it in the editInputs values
let getValues = (index) => {
    let selected = arrayOFJobs[index].selectedJob
    editSelected.value = selected;
}
// take the values of the editInputs and set it in the arrayOfEmp
let setValues = (index) => {
    // let properties = ["date", "fName", "lName", "email", "num", "selectedJob"]
    // properties.forEach((prop, i) => arrayOFEmp[index][prop] = editInputs[i].value)
    arrayOFJobs[index].selectedJob = editSelected.value;
}

let getIndex = (id) => {
    return arrayOFJobs.findIndex(job => job.id == id)
}

addJobFormBtn.addEventListener("click", (e) => {
    checkAllValidation(addJobFormInput);

    if (allIsValid) {
        addToArrayOFJob()
        addToLocalStorage(arrayOFJobs);
        addJobFormInput.value = -1
    }
})
//#endregion



//#region click on the details button event
let detailsJobIndex;
let trOfDetailsJob;
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("detailsBtn")) {
        trOfDetailsJob = e.target.closest("tr");
        let id = trOfDetailsJob.querySelector(".id");
        detailsJobIndex = getIndex(id.innerHTML);

        let job = getJob(detailsJobIndex);

        detailsTableTd[0].innerHTML = arrayOFJobs[detailsJobIndex].id
        detailsTableTd[1].innerHTML = job.innerHTML;
    }
})
//#endregion



//#region click on the edit button event 
let indexOfEditJob;
let trOfEditJob;
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editBtn")) {
        trOfEditJob = e.target.closest("tr");
        let id = trOfEditJob.querySelector(".id").innerHTML;
        indexOfEditJob = getIndex(id)

        getValues(indexOfEditJob);
    }

    if (e.target.classList.contains("detailsBtn")) {
        trOfEditJob = e.target.parentElement.parentElement;
        document.addEventListener("click", (e) => {
            if (e.target.classList.contains("editDetailsBtn")) {
                let id = e.target.parentElement.previousElementSibling.querySelector("#detailsId").innerHTML;
                indexOfEditJob = getIndex(id);
                getValues(indexOfEditJob);
            }
        })
    }

    update.addEventListener("click", (e) => {
        setValues(indexOfEditJob);

        let job = getJob(indexOfEditJob);
        
        trOfEditJob.children[2].innerHTML = job.innerHTML;
        addToLocalStorage(arrayOFJobs);
    })
})
//#endregion



//#region click on the delete button event
let indexOfDeletedJob;
let trOfDeletedJob;

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("delBtn")) {
        trOfDeletedJob = e.target.closest("tr");
        let id = trOfDeletedJob.querySelector(".id").innerHTML;

        indexOfDeletedJob = getIndex(id);
        let job = getJob(indexOfDeletedJob);
        deletedJobName.innerHTML = job.innerHTML;
    }

    if (e.target.classList.contains("yes")) {
        arrayOFJobs.splice(indexOfDeletedJob, 1)
        createTr(arrayOFJobs)
        addToLocalStorage(arrayOFJobs)
    }
})
//#endregion




//#region local storage
if (localStorage.getItem("job")) {
    arrayOFJobs = JSON.parse(localStorage.getItem("job"));
    createTr(arrayOFJobs);
}
//#endregion