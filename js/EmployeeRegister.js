//Uc-2 for pay roll () Set eventlistener when document is loaded 
//window-class,DOM-document object model is indicated for html document,it check for document loaded or not before giving access to user give input */
window.addEventListener('DOMContentLoaded',(event)=>
{
    const name=document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function () 
    {
        if(name.value.length==0)
        {
            textError.textContent="";
            return;
        }
        try
        {
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }
        catch(ex)
        {
            textError.textContent=ex;
        }
    });

    //Uc-8 adding salary eventlistener 
    const salary = document.querySelector("#salary");
    const output = document.querySelector("#salary-output");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
    output.textContent = salary.value;
    });

});

/*Uc3 - create employee payroll object on doing save operation */
const save=()=>
{
    try
    {
        let employeePayrollData=createEmployeePayroll();
        if(employeePayrollData!=null)
        {
            createAndUpdateStorage(employeePayrollData); /*Uc 4*/
        }
    }
    catch(ex)
    {
        return;
    }
}

const createEmployeePayroll=() =>
{
    let employeePayrollData=new EmployeePayrollData();
    try
    {
        employeePayrollData.name=getInputValueById("#name");
    }
    catch(e)
    {
        setTextValue(".text-error",e);
        throw e;
    }
    employeePayrollData.profilePic=getSelectedValues('[name=profile]').pop(); /*pop() converts array to variable(like profilepic has 4 option , the option which got checked only that is taken by pop()) */
    employeePayrollData.gender=getSelectedValues('[name=gender]').pop();
    employeePayrollData.department=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById("#salary");
    employeePayrollData.notes=getInputValueById("#notes");
    let date=getInputValueById("#day")+ " "+getInputValueById("#month") + " "+getInputValueById("#year");
    try
    {
        employeePayrollData.startDate=new Date(Date.parse(date));
    }
    catch(e)
    {
        setTextValue(".date-error",e);
        throw e;  
    }
    alert(employeePayrollData.toString());
    return employeePayrollData;
}


const getSelectedValues=(propertyValue)=>
{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>
    {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}

const getInputValueById=(id) =>
{
    let value=document.querySelector(id).value;
    return value;
}

const setTextValue=(id,value) =>
{
    const element=document.querySelector(id);
    element.textContent=value;
}

/*Uc 4 storing in local storage*/
function createAndUpdateStorage(employeePayrollData)
{
    let employeePayrollList=JSON.parse(localStorage.getItem("EmployeePayrollList2"));/*Json parse used to convert json to object format */
    if(employeePayrollList!=undefined)
    {
        employeePayrollList.push(employeePayrollData);
    }
    else
    {
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList2",JSON.stringify(employeePayrollList));/* json.stringify used to convert object to json */
}

/*Uc-5 reset operation */
const resetForm=() =>
{
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValueByClassName('.salary-output','400000');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','January');
  setValue('#year','2021');
  setValueByClassName('.text-error','');
}

const setValue=(id,value)=>
{
  const element = document.querySelector(id);
  element.value=value;
}

const setValueByClassName=(id,value)=>
{
  const element = document.querySelector(id);
  element.textContent=value;
}

const unsetSelectedValues=(property)=>
{
  let allItems = document.querySelectorAll(property);
  allItems.forEach(item=>{
      item.checked=false;
  });
}