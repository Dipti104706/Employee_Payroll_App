//uc6
let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_Properties.use_local_storage.match("true"))
    {
        getEmployeePayrollFromLocalStorage();
    }
    else
    {
        getEmployeePayrollDataFromServer();
    }
});

const processEmployeePayrollDataResponse=()=>
{
    document.querySelector(".emp-count").textContent=employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

//Retrieving data from json server
const getEmployeePayrollDataFromServer=()=>
{
    makeServiceCall("GET",site_Properties.server_url,true)
    .then(responseText=>
    {
        employeePayrollList=JSON.parse(responseText);
        processEmployeePayrollDataResponse();
    })
    .catch(error=>
    {
        console.log("GET Error status: "+JSON.stringify(error));
        employeePayrollList=[];
        processEmployeePayrollDataResponse();
    });
}

//UC6--getting the data from local storage
const getEmployeePayrollFromLocalStorage=()=>
{
    employeePayrollList=localStorage.getItem("EmployeePayrollList2") ? JSON.parse(localStorage.getItem("EmployeePayrollList2")) : [];
    processEmployeePayrollDataResponse();
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
        <img id="${employeeData.id}" onclick="remove(this)" src="../assets/Logo/delete-black-18dp.svg" alt="delete icon"> 
        <img id="${employeeData.id}" onclick="update(this)" src="../assets/Logo/create-black-18dp.svg" alt="edit icon">
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
            id: new Date().getTime(),
            _profilePic: '../assets/Profiles/Ellipse -1.png'
        },
        {
            _name: 'Debasmita',
            _gender: 'Female',
            _department: ['Engineering', 'Sales'],
            _salary: 65000,
            _startDate: '19-Aug-2021',
            _note: '',
            id: new Date().getTime(),
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

//delete operation in home page
const remove=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id)
    if(!employeePayrollData) return;
    const index=employeePayrollList.map(empData=>empData.id)
                               .indexOf(employeePayrollData.id);
    employeePayrollList.splice(index,1);
    if(site_Properties.use_local_storage.match("true"))
    {
        localStorage.setItem("EmployeePayrollList2",JSON.stringify(employeePayrollList));
        document.querySelector(".emp-count").textContent=employeePayrollList.length;
        createInnerHtml();
    }
    else
    {
        const deleteURL=site_Properties.server_url + employeePayrollData.id.toString();
        makeServiceCall("DELETE",deleteURL,false)
        .then(responseText=>
        {
            createInnerHtml();
        })
        .catch(error=>
        {
            console.log("DELETE Error Status:"+JSON.stringify(error));
        });
    }
}

//uc2 
//update operation and store it in local
const update=(node)=>
{
    let employeePayrollData=employeePayrollList.find(empData=>empData.id==node.id)
    if(!employeePayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
    //editEmp is the new local storage created
    window.location.replace(site_Properties.add_emp_payroll_page); //this is for redirecting to the register page as add_emp variable holds that address
}