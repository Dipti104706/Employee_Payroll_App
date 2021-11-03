//format the string date
const stringifyDate=(date)=>
{
    const option = {day:'numeric', month:'long', year:'numeric'};
    const newDate=!date?"undefined":new Date(Date.parse(date)).toLocaleDateString("en-GB",option);
    return newDate;
}