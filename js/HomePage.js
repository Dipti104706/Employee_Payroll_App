//UC4-->using template literals ES6 features
window.addEventListener('DOMContentLoaded',(event)=>
{
    createInnerHtml();
});

//UC5-->employee details from json object
createInnerHtml = () => {
    let headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>"
    let empPayrollObject = createEmployeePayrollJSON(); //[0]it only display zeroth index object & removing [0] it display list, but use for to display all 
    let innerHtml = `${headerHtml}`;
    for (let employeeData of empPayrollObject) 
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
        <img id="${employeeData._name}" onclick="remove(this)" src="../assets/Logo/delete-black-18dp.svg" alt="delete icon">
        <img id="${employeeData._name}" onclick="remove(this)" src="../assets/Logo/create-black-18dp.svg" alt="create icon">
        </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml;
}

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

const getDeptHtml=(deptList) =>
{
    let deptHtml='';
    for(const dept of  deptList)
    {
        deptHtml=`${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}
