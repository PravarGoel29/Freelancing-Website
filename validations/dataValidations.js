// const createUserValidation = async () => {

// };
const { ObjectId } = require("mongodb");
const emailValidate = require("email-validator");

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

const validateUsername = (inputUsername) => {
  if (!inputUsername) throw "Username not provided.";
  if (typeof inputUsername !== "string") throw "Username is not of valid input type.";
  if (inputUsername.trim().length === 0) throw "Username is empty.";
  if (inputUsername.includes(" ")) throw "Username should not contain spaces.";
  if (inputUsername.length < 4) throw "Username must contain at least 4 characters.";
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  if (!regex.test(inputUsername)) throw "Username should contain only alphanumeric characters.";
};

const validatePassword = (inputPassword) => {
  if (!inputPassword) throw "Password not provided.";
  if (typeof inputPassword !== "string") throw "Password is not of valid input type.";
  if (inputPassword.trim().length === 0) throw "Password contains only whitespaces.";
  if (inputPassword.includes(" ")) throw "Password should not contain spaces.";
  if (inputPassword.length < 6) throw "Password should contain at least 6 characters.";
  const regexDigit = /[0-9]/;
  if (inputPassword.search(regexDigit) < 0) {
    throw "Password should contain at least one number";
  }
  const regexUppercase = /[A-Z]/;
  if (inputPassword.search(regexUppercase) < 0) {
    throw "Password should contain at least one uppercase character";
  }
  const regexSpecialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (inputPassword.search(regexSpecialCharacter) < 0) {
    throw "Password should contain at least one special character";
  }
};

const validateName = (inputName) => {
  if (!inputName) throw "Name not provided.";
  if (typeof inputName !== "string") throw "Name is not of valid input type.";
  if (inputName.trim().length === 0) throw "Name is empty.";
  if (inputName.includes(" ")) throw "Name should not contain spaces.";
  if (inputName.length < 2) throw "Name must contain at least 4 characters.";
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  if (!regex.test(inputName)) throw "Name should contain only alphanumeric characters.";
};

const validateEmail = (inputEmail) => {
  email = inputEmail.trim();
  let checkEmail = emailValidate.validate(email);
  if (checkEmail === false) throw "Invalid email format!";
};

const validateNumber = (inputNum) => {
  if (isNaN(inputNum)) throw "The given data is not a valid number";
  if (inputNum % 1 !== 0) throw "The values in the date cannot be decimal";
  return inputNum;
};

const validateDOB = (inputdate) => {
  if (!inputdate) {
    throw "All fields need to have valid values";
  }
  date = inputdate.trim();
  if (date.length !== 10) throw "The date format is incorrect";
  if (date.charAt(4) !== "-" || date.charAt(7) !== "-") throw "The date format is incorrect";
  const currentYear = new Date().getFullYear();
  const monthObj = { 1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31 };
  let year = parseInt(validateNumber(date.slice(0, 4)));
  let month = parseInt(validateNumber(date.slice(5, 7)));
  let day = parseInt(validateNumber(date.slice(8)));
  if (day > monthObj[month] || day < 1) {
    throw "Please enter a valid day, The given day is not valid";
  }
  if (month < 1 || month > 12) throw "Please enter a valid month, The given month is not valid";
  if (year < 1900 || year > currentYear) throw "Please enter a valid year, The given year is not valid";
  let currentDay = new Date();
  let birth = new Date(date);
  let years = Math.abs(currentDay.getTime() - birth.getTime()) / 1000 / 60 / 60 / 24 / 365;
  if (years < 16) throw "The user must be atleast 16 years old";
};

const validatePhoneNumber = (inputPhoneNumber) => {
  if (!inputPhoneNumber) {
    throw "Input Phone number is empty";
  }
  inputPhoneNumber = inputPhoneNumber.trim();
  if (inputPhoneNumber.length !== 10) {
    throw "Phone number must contain 10 digits";
  }
  const regex = new RegExp("^[0-9]*$");
  if (!regex.test(inputPhoneNumber)) throw "Phone number should contain only digits.";
};

module.exports = {
  validateID,
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
  validateDOB,
  validatePhoneNumber,
};
