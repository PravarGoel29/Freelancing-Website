const emailValidate = require("email-validator");
$("#registration-form").submit(function (event) {
  let username = $("#userName").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let contactNumber = $("#contactNumber").val();
  let preferences = $("#preferences").val();
  let email = $("#email").val();
  let dob = $("#dob").val();
  let password = $("#password").val();
  let confirmPassword = $("#confirmPassword").val();
  let gender = document.querySelector('input[name="gender"]:checked').value;
  try {
    if (gender === null) {
      throw "Please select gender";
    }

    validateUserName(username);
    validatePassword(password);
    validateName(firstName);
    validateName(lastName);
    validateContactNumber(contactNumber);
    validateDOB(dob);
    validateEmail(email);
    validateConfirmPassword(password, confirmPassword);
    validatePreferences(preferences);
  } catch (e) {
    event.preventDefault();
    alert(e);
    return;
  }
});

const validateUsername = (inputUsername) => {
  if (!inputUsername) throw "Username not provided.";
  if (typeof inputUsername !== "string") throw "Username is not of valid input type.";
  if (inputUsername.trim().length === 0) throw "Username is empty.";
  if (inputUsername.includes(" ")) throw "Username should not contain spaces.";
  if (inputUsername.length < 4) throw "Username must contain at least 4 characters.";
  const regexLetters = /[a-zA-Z]/;
  if (inputUsername.search(regexLetters) < 0) {
    throw "Username must contains alaphabets.";
  }
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  if (!regex.test(inputUsername)) throw "Username should contain only alphanumeric characters.";
};

const validateName = (inputName) => {
  if (!inputName) throw "Name not provided.";
  if (typeof inputName !== "string") throw "Name is not of valid input type.";
  if (inputName.trim().length === 0) throw "Name is empty.";
  if (inputName.includes(" ")) throw "Name should not contain spaces.";
  if (inputName.length < 2) throw "Name must contain at least 2 characters.";
  const regexLetters = /[a-zA-Z]/;
  if (inputName.search(regexLetters) < 0) {
    throw "Name must contains alaphabets.";
  }
  const regex = new RegExp("^[a-zA-Z0-9]*$");
  if (!regex.test(inputName)) throw "Name should contain only alphanumeric characters.";
};

const validatePassword = (inputPassword) => {
  if (!inputPassword) throw "Password not provided.";
  if (typeof inputPassword !== "string") throw "Password is not of valid input type.";
  if (inputPassword.trim().length === 0) throw "Password contains only whitespaces.";
  if (inputPassword.includes(" ")) throw "Either the userName or Password is incorrect.";
  if (inputPassword.length < 6) throw "Either the userName or Password is incorrect.";
  const regexDigit = /[0-9]/;
  if (inputPassword.search(regexDigit) < 0) {
    throw "Either the userName or Password is incorrect.";
  }
  const regexUppercase = /[A-Z]/;
  if (inputPassword.search(regexUppercase) < 0) {
    throw "Either the userName or Password is incorrect.";
  }
  const regexSpecialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (inputPassword.search(regexSpecialCharacter) < 0) {
    throw "Either the userName or Password is incorrect.";
  }
}

const validateEmail = (inputEmail) => {
  if (!inputEmail) throw "Email not provided.";
  if (typeof inputEmail !== "string") throw "Email is not of valid input type.";
  if (inputEmail.trim().length === 0) throw "Email is empty.";
  email = inputEmail.trim();
  let checkEmail = emailValidate.validate(email);
  if (checkEmail === false) throw "Invalid email format!";
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

const validateContactNumber = (inputContactNumber) => {
  if (!inputContactNumber) throw "ContactNumber not provided.";
  if (typeof inputContactNumber !== "string") throw "ContactNumber is not of valid input type.";
  if (inputContactNumber.trim().length === 0) throw "ContactNumber is empty.";
  inputContactNumber = inputContactNumber.trim();
  if (inputContactNumber.length !== 10) {
    throw "Phone number must contain 10 digits";
  }
  const regex = new RegExp("^[0-9]*$");
  if (!regex.test(inputContactNumber)) throw "Phone number should contain only digits.";
};

const validatePreferences = (inputPreferences) => {
  if (!inputPreferences) throw "Preferences not provided.";
  if (typeof inputPreferences !== "string") throw "Preferences is not of valid input type.";
  if (inputPreferences.trim().length === 0) throw "Preferences is empty.";
};

const validateConfirmPassword = (inputPassword, inputConfirmPassword) => {
  if (!inputConfirmPassword) throw "Confirm Password not provided.";
  if (typeof inputConfirmPassword !== "string") throw "Confirm Password is not of valid input type.";
  if (inputConfirmPassword.trim().length === 0) throw "Confirm Password contains only whitespaces.";

  if (inputPassword !== inputConfirmPassword) {
    throw "Password and Confirm Password doesnt match";
  }
};


