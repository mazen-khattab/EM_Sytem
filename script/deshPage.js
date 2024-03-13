let empList;
let jobList;
let empCount = document.querySelector(".empCount");
let jobCount = document.querySelector(".jobCount");

if (localStorage.getItem("emp")) {
    empList = JSON.parse(localStorage.getItem("emp"));
    empCount.innerHTML = empList.length;
}

if (localStorage.getItem("job")) {
    jobList = JSON.parse(localStorage.getItem("job"));
    jobCount.innerHTML = jobList.length
}