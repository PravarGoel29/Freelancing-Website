function isValidDate(str) {
    str = str.trim()
    var parts = str.split('/');
    if (parts.length < 3)
        return false;
    else {
        var month = parseInt(parts[0]);
        var day = parseInt(parts[1]);
        var year = parseInt(parts[2]);
        if (isNaN(day) || isNaN(month) || isNaN(year)) {
            return false;
        }
        if (day < 1 || year < 1)
            return false;
        if(month>12||month<1)
            return false;
        if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31)
            return false;
        if ((month == 4 || month == 6 || month == 9 || month == 11 ) && day > 30)
            return false;
        if (month == 2) {
            if (((year % 4) == 0 && (year % 100) != 0) || ((year % 400) == 0 && (year % 100) == 0)) {
                if (day > 29)
                    return false;
            } else {
                if (day > 28)
                    return false;
            }      
        }
        return true;
    }
}; 
const createUserValidation = async (userID,firstName,lastName,userName,emailAddress,password,contactNumber,dob) => {
    if ((userID === undefined)) throw `Error: You must provide a ${userID}`;
    if (typeof userID !== 'string') {
        throw `Error:${userID} must be a string`;
    }
    id = userID.trim();
    if (id.length === 0) {
        throw `Error: ${userID} cannot be an empty id or just spaces`;
    }
    if (!ObjectId.isValid(id)) {
        throw `Error: ${userID} invalid object ID`;
    }
    if (firstName === undefined) {
        throw  `Error: You must provide a ${firstName}`;
    }
    if (typeof firstName !== 'string') {
        throw `Error:${firstName} must be a string`;
    }
    firstName = firstName.trim();
    if (firstName.length === 0) {
      throw `Error: ${firstName} cannot be an empty string or just spaces`;
    }
    if (lastName === undefined) {
        throw  `Error: You must provide a ${lastName}`;
    }
    if (typeof lastName !== 'string') {
        throw `Error:${lastName} must be a string`;
    }
    lastName = lastName.trim();
    if (lastName.length === 0) {
      throw `Error: ${lastName} cannot be an empty string or just spaces`;
    }
    if (userName === undefined) {
        throw  `Error: You must provide a ${userName}`;
    }
    if (typeof userName !== 'string') {
        throw `Error:${userName} must be a string`;
    }
    userName = userName.trim();
    if (userName.length === 0) {
      throw `Error: ${userName} cannot be an empty string or just spaces`;
    }
    emailAddress = emailAddress.trim();
    if (!emailAddress.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        throw `Error: Please enter a valid email address`;
    }
    if (emailAddress.trim().length == 0) {
        throw 'Email address cannot be empty'
    }
   
    password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
    contactNumber.match(/^\d{10}$/)
    dob = dob.split('/')
    var currentdate = new Date(); 
    var currentDate = (currentdate.getMonth()+1)+"/"+currentdate.getDate()   + "/" + currentdate.getFullYear()
    currentDate.split('/')
    let age;
    age = currentdate.getFullYear() - Number(dob[2])
    if (age<16) {
        throw 'You must be atleast 16 to register'
    }
    if (!isValidDate(dob)) {
        throw 'date of birth is invalid'
    }
    if (dob[0].length<2 || dob[1].length<2 || dob[2].length<4 ||(Number(dob[0])<1 || Number(dob[0]>12))) {
        throw 'date is not of the proper type'
    }
   


};

module.exports = { createUserValidation };
