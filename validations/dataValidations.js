// const createUserValidation = async () => {

// };
const { ObjectId } = require('mongodb');
const validateID = (id) => {
    if (!id) {
        throw "All fields need to have valid values";
    }
    if (typeof id !== "string") {
        throw "Please enter a valid id. The type of id must be a string";
    }
    if (id.trim().length === 0) {
        throw "Please enter a valid id. The id field cannot be an empty string or just spaces";
    }
    id = id.trim()
    if (!ObjectId.isValid(id)) {
        throw "please give a valid objectid. The object id is not valid";
    }
}
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
const userNameValidation = async(username) => {
    username = username.trim();
    if (username.length === 0) {
      throw `Error: ${username} cannot be an empty string or just spaces`;
    }
}
const passwordValidation = async(password) => {
    password.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)
}
const UserValidation = async (userName,firstName,lastName,emailAddress,password,contactNumber,gender,dob,preferences) => {
    userName = userName.trim();
    if (userName.length === 0) {
      throw `Error: ${userName} cannot be an empty string or just spaces`;
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
   
    emailAddress = emailAddress.trim();
    if (!emailAddress.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        throw `Error: Please enter a valid emailAddress`;
    }
    if (emailAddress.trim().length == 0) {
        throw 'Email address cannot be empty'
    }
   
    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
        throw `Error: Password must contain atleast one upper case,one lower case,one digit, one special character and should be  atleast eight characters long`
    }
    if (!contactNumber.match(/^\d{10}$/)) {
        throw `Error:Please enter a valid contact number`
    }
    if ((gender == undefined)) throw `Error: You must provide your ${gender}`;
    if (!(Array.isArray(gender))) {
        throw `Error:${gender} must be an array`;
    }
    let arrayInvalidFlag = false;
    for (i in gender) {
        if (typeof gender[i] !== 'string' || gender[i].trim().length === 0) {
            arrayInvalidFlag = true;
            break;
        }
        gender[i] = gender[i].trim();
    }
    if (arrayInvalidFlag) {
        throw `One or more elements in ${gender} array is not a string or is an empty string`;
    }
    for (let j in gender) {
        if (gender[j] != 'male'&& gender[j] != 'female' && gender[j]!= 'other') {
          throw "gender values must be 'male','female','other'"
        }
    }
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
    if ((preferences == undefined)) throw `Error: You must provide  ${preferences}`;
    if (!(Array.isArray(preferences))) {
        throw `Error:${preferences} must be an array`;
    }
    let invalidarrayflag = false;
    for (i in preferences) {
        if (typeof preferences[i] !== 'string' || preferences[i].trim().length === 0) {
            invalidarrayflag = true;
            break;
        }
        preferences[i] = preferences[i].trim();
    }
    if (invalidarrayflag) {
        throw `One or more elements in ${preferences} array is not a string or is an empty string`;
    }
};
const EmployeeValidation = async (userName,preferences,resume,historyofJobs,overallRating,reported,currentJobsTaken,invites,wishlist) => {
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
    if ((preferences == undefined)) throw `Error: You must provide  ${preferences}`;
    if (!(Array.isArray(preferences))) {
        throw `Error:${preferences} must be an array`;
    }
    let arrayInvalidFlag = false;
    for (i in preferences) {
        if (typeof preferences[i] !== 'string' || preferences[i].trim().length === 0) {
            arrayInvalidFlag = true;
            break;
        }
        preferences[i] = preferences[i].trim();
    }
    if (arrayInvalidFlag) {
        throw `One or more elements in ${preferences} array is not a string or is an empty string`;
    }
    if ((resume === undefined)) throw `Error: You must provide a ${resume}`;
    if (typeof resume !== 'string' && !(resume === null)) {
        throw `Error:${resume} must be a string`;
    }
    resume = resume.trim();
    if (resume.length === 0) {
        throw `Error: ${resume} cannot be an empty id or just spaces`;
    }
    if (!ObjectId.isValid(resume)) {
        throw `Error: ${resume} is an invalid object ID`;
    }
    if ((wishlist == undefined)) throw `Error: You must provide  ${wishlist}`;
    if (!(Array.isArray(wishlist))) {
        throw `Error:${wishlist} must be an array`;
    }
    for (i in wishlist) {
        if (typeof wishlist[i] !== 'string' || wishlist[i].trim().length === 0) {
            arrayInvalidFlag = true;
            break;
        }
        wishlist[i] = wishlist[i].trim();
    }
    if (arrayInvalidFlag) {
        throw `One or more elements in ${wishlist} array is not a string or is an empty string`;
    }
    
    if (!(Array.isArray(historyofJobs))) {
        throw `Error:${historyofJobs} must be an array`;
    }
    if (historyofJobs.length>0) {
        for (i in historyofJobs) {
            if (typeof historyofJobs[i] !== 'string' || historyofJobs[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            historyofJobs[i] = historyofJobs[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${historyofJobs} array is not a string or is an empty string`;
        }
    }
    overallRating = Number(overallRating);

    if ((overallRating%1!=0 && (overallRating < 0 || overallRating>5))&&(overallRating<1.5 || overallRating>4.8)) {
            throw 'rating should be an integer in the range 1-5 or float values between 1.5 and 4.8'
    }
    if (!(Array.isArray(currentJobsTaken))) {
        throw `Error:${currentJobsTaken} must be an array`;
    }
    if (currentJobsTaken.length>0) {
        for (i in currentJobsTaken) {
            if (typeof reported[i] !== 'string' || reported[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            reported[i] = reported[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${reported} array is not a string or is an empty string`;
        }
    }
       
    if (!(Array.isArray(reported))) {
        throw `Error:${reported} must be an array`;
    }
    if (reported.length>0) {
        for (i in reported) {
            if (typeof reported[i] !== 'string' || reported[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            reported[i] = reported[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${reported} array is not a string or is an empty string`;
        }
    }
        
    if (!(Array.isArray(reported))) {
        throw `Error:${reported} must be an array`;
    }
    if (invites.length>0) {
        for (i in invites) {
            if (typeof invites[i] !== 'string' || invites[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            invites[i] = invites[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${invites} array is not a string or is an empty string`;
        }
    }
    
};
const EmployerValidation = async (historyOfJobs,overallRating,reported) => {
   
    if ((historyOfJobs == undefined)) throw `Error: You must provide  ${preferences}`;
    if (!(Array.isArray(preferences))) {
        throw `Error:${preferences} must be an array`;
    }
    let arrayInvalidFlag = false;
    if (historyOfJobs.length>0) {
        for (i in historyOfJobs) {
            if (typeof historyOfJobs[i] !== 'string' || historyOfJobs[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            historyOfJobs[i] = historyOfJobs[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${historyOfJobs} array is not a string or is an empty string`;
        }
    }
    overallRating = Number(overallRating);

    if ((overallRating%1!=0 && (overallRating < 1 || overallRating>5))||(overallRating<1.5 || overallRating>4.8)) {
            throw 'rating should be an integer in the range 1-5 or float values between 1.5 and 4.8'
    }
    if (!(Array.isArray(reported))) {
        throw `Error:${reported} must be an array`;
    }
    if (reported.length>0) {
        for (i in reported) {
            if (typeof reported[i] !== 'string' || reported[i].trim().length === 0) {
                arrayInvalidFlag = true;
                break;
            }
            reported[i] = reported[i].trim();
        }
        if (arrayInvalidFlag) {
            throw `One or more elements in ${reported} array is not a string or is an empty string`;
        }
    }
        
    if (!(Array.isArray(reported))) {
        throw `Error:${reported} must be an array`;
    }
};
module.exports = { validateID,UserValidation,EmployeeValidation,EmployerValidation,userNameValidation,passwordValidation };


