//uc6
let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    employeePayrollList=getEmployeePayrollFromLocalStorage();
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
});
//UC6--getting the data from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    return localStorage.getItem("EmployeePayrollList2") ? JSON.parse(localStorage.getItem("EmployeePayrollList2")) : [];
}

//UC5-->employee details from json object
createInnerHtml = () => {
    let headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    if (employeePayrollList.length==0) return;
    let innerHtml = `${headerHtml}`;
    for (let employeeData of employeePayrollList) 
    {
        innerHtml = `${innerHtml}
        <tr>
        <td>
        <img class="profile" alt="" src="${employeeData._profilePic}">
        </td>
        <td>${employeeData._name}</td>
        <td>${employeeData._gender}</td>
        <td>
        ${getDeptHtml(employeeData._department)}
        </td>
        <td>${employeeData._salary}</td>
        <td>${employeeData._startDate}</td>
        <td>
        <img name="${employeeData._name}" onclick="remove(this)" src="../assets/Logo/delete-black-18dp.svg" alt="delete icon"> 
        <img name="${employeeData._name}" onclick="update(this)" src="../assets/Logo/create-black-18dp.svg" alt="create icon">
        </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

//uc5
const createEmployeePayrollJSON = () => {
    let empPayrollList = [
        {
            _name: 'Sarika',
            _gender: 'Female',
            _department: ['HR'],
            _salary: 600000,
            _startDate: '21-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profiles/Ellipse -1.png'
        },
        {
            _name: 'Debasmita',
            _gender: 'Female',
            _department: ['Engineering', 'Sales'],
            _salary: 65000,
            _startDate: '19-Aug-2021',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/Profiles/Ellipse -1.png'
        }
    ];
    return empPayrollList;
}

//Function is to display all dept, and does not forced for two dept and also does nt give undefined message
const getDeptHtml=(deptList) =>
{
    let deptHtml='';
    for(const dept of  deptList)
    {
        deptHtml=`${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
