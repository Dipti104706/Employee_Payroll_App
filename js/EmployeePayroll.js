class EmployeePayrollData
{   
    //Uc10- add setter validation methods for name and start date
    get name()
    {
        return this._name;
    }
    set name(name)
    {
        let nameRegex=RegExp("^[A-Z]{1}[a-z]{2,}$");
        if(nameRegex.test(name))
        {
            this._name=name;
        }
       else throw "Invalid name";
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
        let now=new Date();
        if(startDate>now) 
        {
            throw "Start date is a future date";
        }
        var diff=Math.abs( now.getTime() - startDate.getTime());
        if(diff/(1000*60*60*24)>30) 
        {
            throw "Start date is beyond 30 days";
        }
        this._startDate=startDate;
    }
    
    toString()
    {
        const option = {year:'numeric', month:'long', day:'numeric'};
        const empDate=!this.startDate?"undefined":this.startDate.toLocaleDateString("en-US",option);
        return "Employee name = "+this.name+", Gender: "+this.gender+", Profile Pic: "+this.profilePic+", Salary: "+this.salary+
        ", Start Date: "+empDate + ", Department: "+this.department+  ", Notes: "+this.notes; 
    }
}