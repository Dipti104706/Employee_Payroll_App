class EmployeePayrollData
{   
    get name()
    {
        return this._name;
    }
    set name(name)
    {
        return this._name=name;
    }

    get profilePic()
    {
        return this._profilePic;
    }
    set profilePic(profilePic)
    {
        this._profilePic=profilePic;
    }

    get gender()
    {
        return this._gender;
    }
    set gender(gender)
    {
        this._gender=gender;
    }

    get department()
    {
        return this._department;
    }
    set department(department)
    {
        this._department=department;
    }
    
    get salary()
    {
        return this._salary;
    }
    set salary(salary)
    {
        this._salary=salary;
    }

    get notes()
    {
        return this._notes;
    }
    set notes(notes)
    {
        this._notes=notes;
    }

    get startDate()
    {
        return this._startDate;
    }
    set startDate(startDate)
    {
        return this._startDate=startDate;
    }
    
    toString()
    {
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate=!this.startDate?"undefined":this.startDate.toLocaleDateString("en-US",option);
        return "Employee name = "+this.name+", Gender: "+this.gender+", Profile Pic: "+this.profilePic+", Salary: "+this.salary+
        ", Start Date: "+empDate + ", Department: "+this.department+  ", Notes: "+this.notes; 
    }
}