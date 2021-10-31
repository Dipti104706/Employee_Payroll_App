//UC4-->using template literals ES6 features
window.addEventListener('DOMContentLoaded',(event)=>
{
    createInnerHtml();
});

const createInnerHtml=()=>
{
    const headerHtml="<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
    "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    const tableContent=` ${headerHtml}   
        <tr>
            <td>
                <img class="profile" alt="" src="../assets/Profiles/Ellipse -1.png">
            </td>
            <td>Debasmita</td>
            <td>Female</td>
            <td>
                <div class="dept-label">HR</div>
                <div class="dept-label">Finance</div>
            </td>
            <td>500000</td>
            <td>11-Aug-2021</td>
            <td>
                <img src="../assets/Logo/delete-black-18dp.svg" alt="delete icon">
                <img src="../assets/Logo/create-black-18dp.svg" alt="create icon">
            </td>
        </tr>
    `;
    document.querySelector('#display').innerHTML=tableContent;
}
