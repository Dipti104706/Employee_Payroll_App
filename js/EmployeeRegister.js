//Uc-2 for pay roll () Set eventlistener when document is loaded 
//window-class,DOM-document object model is indicated for html document,it check for document loaded or not before giving access to user give input */
let isUpdate = false;
let empPayrollObj = {}; //creating empty object

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            checkName(name.value);
            textError.textContent = "";
        }
        catch (ex) {
            textError.textContent = ex;
        }
    });

    //Uc-8 adding salary eventlistener 
    const salary = document.querySelector("#salary");
    const output = document.querySelector("#salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
        output.textContent = salary.value;
    });

    //validates the date
    const date = document.querySelector('#date');
    date.addEventListener('input', function () {
        let startDate = new Date(Date.parse(getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year')));
        try {
            checkStartDate(new Date(Date.parse(startDate)));
            setTextValue(".date-error", "");
        }
        catch (e) {
            setTextValue(".date-error", e);
        }
    });
    //document.querySelector('#cancelButton').href=site_Properties.home_page;
    checkForUpdate();
});

//Uc3- update the employee data
//checking the update
const checkForUpdate = () => {
    var empPayrollJson = localStorage.getItem('editEmp');
    isUpdate = empPayrollJson ? true : false;
    if (!isUpdate) return;
    empPayrollObj = JSON.parse(empPayrollJson);
    setForm();
}

//populate 
const setForm = () => {
    setValue('#name', empPayrollObj._name);
    setSelectedValues('[name=profile]', empPayrollObj._profilePic);
    setSelectedValues('[name=gender]', empPayrollObj._gender);
    setSelectedValues('[name=department]', empPayrollObj._department);
    setValue('#salary', empPayrollObj._salary);
    setTextValue('.salary-output', empPayrollObj._salary);
    setValue('#notes', empPayrollObj._notes);
    let date = stringifyDate(empPayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
}

const setSelectedValues = (property, value) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    });
}

//Uc5 and 7 for add and update data in json server
const save=(event)=>
{
  event.preventDefault();
  event.stopPropagation();
  try
  {
    setEmployeePayrollObject();
    if(site_Properties.use_local_storage.match("true"))
    {
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_Properties.home_page);
    }
    else
    {
        createOrUpdateEmployeePayroll();
    }
  }
  catch(e)
  {
    return;
  }
}
//for json server using AJAX
const createOrUpdateEmployeePayroll=()=>
{
  let postURL=site_Properties.server_url;
  let methodCall="POST";
  if(isUpdate)
  {
    methodCall="PUT";
    postURL=postURL + empPayrollObj.id.toString();
  }
  makeServiceCall(methodCall,postURL,true,empPayrollObj)
 .then(responseText=>
  {
      resetForm();  
      window.location.replace(site_Properties.home_page);
  })
  .catch(error=>
    {
      throw error;
    });
}

const setEmployeePayrollObject = () => {
    if (!isUpdate && site_Properties.use_local_storage.match("true")) 
    {
         empPayrollObj.id = createNewEmployeeId();
    }
    empPayrollObj._name = getInputValueById('#name');
    empPayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    empPayrollObj._gender = getSelectedValues('[name=gender]').pop();
    empPayrollObj._department = getSelectedValues('[name=department');
    empPayrollObj._salary = getInputValueById('#salary');
    empPayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    empPayrollObj._startDate = date;
}

//storing in local storage
//For creating and Update values
createAndUpdateStorage = () => {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList2"));
    if (employeePayrollList) {
        let empayrollData = employeePayrollList
            .find(empData => empData.id == empPayrollObj.id);
        if (!empayrollData) {
            employeePayrollList.push(empPayrollObj);
        }
        else {
            const index = employeePayrollList.map(empData => empData.id)
                .indexOf(empayrollData.id);
            employeePayrollList.splice(index, 1, empPayrollObj);
        }
    }
    else {
        employeePayrollList = [empPayrollObj];
    }
    localStorage.setItem("EmployeePayrollList2", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if (!id) employeePayrollData.id = createNewEmployeeId();
    else
        employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

//Setting the values
const setEmployeePayrollData = (employeePayrollData) => {
    try {
        employeePayrollData.name = empPayrollObj._name;
    }
    catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = empPayrollObj._profilePic;
    employeePayrollData.gender = empPayrollObj._gender;
    employeePayrollData.department = empPayrollObj._department;
    employeePayrollData.salary = empPayrollObj._salary;
    employeePayrollData.notes = empPayrollObj._notes;
    try {
        employeePayrollData.startDate = new Date(Date.parse(empPayrollObj._startDate));
    }
    catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

//creating a employee id
const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeId");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeId", empId);
    return empId;
}

//Uc3 of registering the employee not updating one
const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    }
    catch (e) {
        setTextValue(".text-error", e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop(); /*pop() converts array to variable(like profilepic has 4 option , the option which got checked only that is taken by pop()) */
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.notes = getInputValueById("#notes");
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    try {
        employeePayrollData.startDate = new Date(Date.parse(date));
    }
    catch (e) {
        setTextValue(".date-error", e);
        throw e;
    }
    alert(employeePayrollData.toString());
    return employeePayrollData;
}


const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

/*Uc-5 reset operation */
const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValueByClassName('.salary-output', '400000');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
    setValueByClassName('.text-error', '');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setValueByClassName = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const unsetSelectedValues = (property) => {
    let allItems = document.querySelectorAll(property);
    allItems.forEach(item => {
        item.checked = false;
    });
}
