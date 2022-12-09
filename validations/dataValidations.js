// const createUserValidation = async () => {

// };
const { ObjectId } = require("mongodb");
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
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw "please give a valid objectid. The object id is not valid";
  }
};

function userNameValidation(userName) {
    if (userName == undefined|| userName == null) {
        throw 'userName cannot be undefined'
    }
    if (typeof userName !== "string") {
        throw `Error:userName must be a string`;
      }
  userName = userName.trim();
  if (userName.length === 0) {
    throw `Error: userName cannot be an empty string or just spaces`;
  }
  if (userName === undefined) {
    throw `Error: You must provide a userName`;
  }
}
function passwordValidation(password) {
    if (password === undefined || password === null) {
        throw `Error: password cannot be null and undefined`;
      }
      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)) {
       throw `Error: Password must contain atleast one upper case,one lower case,one digit, one special character and should be  atleast eight characters long`
    }
}
function UserValidation(
  userName,
  firstName,
  lastName,
  email,
  password,
  contactNumber,
  gender,
  dob,
  preferences
) {
if (userName == undefined|| userName == null) {
        throw 'userName cannot be undefined'
}
if (typeof userName !== "string") {
        throw `Error:userName must be a string`;
}
  userName = userName.trim();
  if (userName.length === 0) {
    throw `Error: userName cannot be an empty string or just spaces`;
  }
  if (firstName === undefined) {
    throw `Error: You must provide a firstName`;
  }
  if (typeof firstName !== "string") {
    throw `Error:firstName must be a string`;
  }
  firstName = firstName.trim();
  if (firstName.length === 0) {
    throw `Error:firstName cannot be an empty string or just spaces`;
  }
  if (!firstName.match(/^[a-zA-Z\s]+$/)) {
    throw "FirstName must be alphabets";
  }
  if (lastName === undefined) {
    throw `Error: You must provide a lastName`;
  }
  if (typeof lastName !== "string") {
    throw `Error:lastName must be a string`;
  }
  lastName = lastName.trim();
  if (lastName.length === 0) {
    throw `Error: lastName cannot be an empty string or just spaces`;
  }
  if (!lastName.match(/^[a-zA-Z\s]+$/)) {
    throw "lastName must be alphabets";
  }
  if (userName === undefined) {
    throw `Error: You must provide a userName`;
  }
  if (typeof userName !== "string") {
    throw `Error: userName must be a string`;
  }
  if (email === undefined || email === null) {
    throw `Error: emailAddress cannot be null and undefined`;
  }
  if (typeof email !== "string") {
    throw `Error:emailAddress must be a string`;
  }

  email = email.trim();
  if (!email.match(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)) {
    throw `Error: Please enter a valid emailAddress`;
  }
  if (email.trim().length == 0) {
    throw "Email address cannot be empty";
  }
  if (password === undefined || password === null) {
    throw `Error: password cannot be null and undefined`;
  }
  if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/)) {
   throw `Error: Password must contain atleast one upper case,one lower case,one digit, one special character and should be  atleast eight characters long`
}
  contactNumber = contactNumber.trim();
  if (!contactNumber.match(/^\d{10}$/)) {
    throw `Error:Please enter a valid contact number`;
  }
  if (gender == undefined) {
    throw `Error: You must provide your gender`;
  }
  if (typeof gender !== "string" || gender.trim().length === 0) {
    throw `gender is not a string or is an empty string`;
  }
  gender = gender.trim();

  if (gender != "male" && gender != "female" && gender != "other") {
    throw "gender values must be 'male','female','other'";
  }
  let year = "";
  let arr = [];

  for (let j = dob.length; j > 0; j--) {
    if (dob[j] == undefined) {
      continue;
    }
    if (dob[j] == "/") {
      break;
    } else {
      arr.push(dob[j]);
    }
  }
  for (let k = arr.length; k >= 0; k--) {
    if (arr[k] == undefined) {
      continue;
    } else {
      year += arr[k];
    }
  }
  var currentdate = new Date();
  var currentDate =
    currentdate.getMonth() +
    1 +
    "/" +
    currentdate.getDate() +
    "/" +
    currentdate.getFullYear();
  currentDate.split("/");
  let age;
  age = currentdate.getFullYear() - Number(year);
  if (age < 16) {
    throw "You must be atleast 16 to register";
  }
  let isValidDate = Date.parse(dob);
  if (isNaN(isValidDate)) {
    throw "Not a valid date format";
  }
  preferences = preferences.trim();
  if (preferences == undefined) throw `Error: You must provide  preferences`;
  // Need to check this
  // if (!(Array.isArray(preferences))) {
  //     throw `Error:${preferences} must be an array`;
  // }
  let invalidarrayflag = false;
  if (typeof preferences !== "string" || preferences.trim().length === 0) {
    throw `One or more elements in preferences array is not a string or is an empty string`;
  }
}
function EmployeeValidation(
  userName,
  preferences,
  resume,
  historyofJobs,
  overallRating,
  reported,
  currentJobsTaken,
  invites,
  wishlist
) {
  if (userName === undefined) {
    throw `Error: You must provide a userName`;
  }
  if (typeof userName !== "string") {
    throw `Error:userName must be a string`;
  }
  userName = userName.trim();
  if (userName.length === 0) {
    throw `Error: userName cannot be an empty string or just spaces`;
  }
  if (preferences == undefined) throw `Error: You must provide  preferences`;
  if (!Array.isArray(preferences)) {
    throw `Error:preferences must be an array`;
  }
  let arrayInvalidFlag = false;
  for (i in preferences) {
    if (
      typeof preferences[i] !== "string" ||
      preferences[i].trim().length === 0
    ) {
      arrayInvalidFlag = true;
      break;
    }
    preferences[i] = preferences[i].trim();
  }
  if (arrayInvalidFlag) {
    throw `One or more elements in preferences array is not a string or is an empty string`;
  }
  if (resume === undefined) throw `Error: You must provide a resume`;
  if (typeof resume !== "string" && !(resume === null)) {
    throw `Error:resume must be a string`;
  }
  resume = resume.trim();
  if (resume.length === 0) {
    throw `Error: resume cannot be an empty id or just spaces`;
  }
  if (!ObjectId.isValid(resume)) {
    throw `Error: resume is an invalid object ID`;
  }
  if (wishlist == undefined) throw `Error: You must provide  wishlist`;
  if (!Array.isArray(wishlist)) {
    throw `Error:wishlist must be an array`;
  }
  for (i in wishlist) {
    if (typeof wishlist[i] !== "string" || wishlist[i].trim().length === 0) {
      arrayInvalidFlag = true;
      break;
    }
    wishlist[i] = wishlist[i].trim();
  }
  if (arrayInvalidFlag) {
    throw `One or more elements in wishlist array is not a string or is an empty string`;
  }

  if (!Array.isArray(historyofJobs)) {
    throw `Error:${historyofJobs} must be an array`;
  }
  if (historyofJobs.length > 0) {
    for (i in historyofJobs) {
      if (
        typeof historyofJobs[i] !== "string" ||
        historyofJobs[i].trim().length === 0
      ) {
        arrayInvalidFlag = true;
        break;
      }
      historyofJobs[i] = historyofJobs[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in historyofJobs array is not a string or is an empty string`;
    }
  }
  overallRating = Number(overallRating);

  if (
    overallRating % 1 != 0 &&
    (overallRating < 0 || overallRating > 5) &&
    (overallRating < 1.5 || overallRating > 4.8)
  ) {
    throw "rating should be an integer in the range 1-5 or float values between 1.5 and 4.8";
  }
  if (!Array.isArray(currentJobsTaken)) {
    throw `Error:currentJobsTaken must be an array`;
  }
  if (currentJobsTaken.length > 0) {
    for (i in currentJobsTaken) {
      if (typeof reported[i] !== "string" || reported[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      reported[i] = reported[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in reported array is not a string or is an empty string`;
    }
  }

  if (!Array.isArray(reported)) {
    throw `Error:reported must be an array`;
  }
  if (reported.length > 0) {
    for (i in reported) {
      if (typeof reported[i] !== "string" || reported[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      reported[i] = reported[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in reported array is not a string or is an empty string`;
    }
  }

  if (!Array.isArray(reported)) {
    throw `Error:${reported} must be an array`;
  }
  if (invites.length > 0) {
    for (i in invites) {
      if (typeof invites[i] !== "string" || invites[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      invites[i] = invites[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in invites array is not a string or is an empty string`;
    }
  }
}
function EmployerValidation(historyOfJobs, overallRating, reported) {
  if (historyOfJobs == undefined) throw `Error: You must provide  preferences`;
  if (!Array.isArray(preferences)) {
    throw `Error:preferences must be an array`;
  }
  let arrayInvalidFlag = false;
  if (historyOfJobs.length > 0) {
    for (i in historyOfJobs) {
      if (
        typeof historyOfJobs[i] !== "string" ||
        historyOfJobs[i].trim().length === 0
      ) {
        arrayInvalidFlag = true;
        break;
      }
      historyOfJobs[i] = historyOfJobs[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in historyOfJobs array is not a string or is an empty string`;
    }
  }
  overallRating = Number(overallRating);

  if (
    (overallRating % 1 != 0 && (overallRating < 1 || overallRating > 5)) ||
    overallRating < 1.5 ||
    overallRating > 4.8
  ) {
    throw "rating should be an integer in the range 1-5 or float values between 1.5 and 4.8";
  }
  if (!Array.isArray(reported)) {
    throw `Error:${reported} must be an array`;
  }
  if (reported.length > 0) {
    for (i in reported) {
      if (typeof reported[i] !== "string" || reported[i].trim().length === 0) {
        arrayInvalidFlag = true;
        break;
      }
      reported[i] = reported[i].trim();
    }
    if (arrayInvalidFlag) {
      throw `One or more elements in reported array is not a string or is an empty string`;
    }
  }

  if (!Array.isArray(reported)) {
    throw `Error:${reported} must be an array`;
  }
}
module.exports = {
  validateID,
  UserValidation,
  EmployeeValidation,
  EmployerValidation,
  userNameValidation,
  passwordValidation,
};