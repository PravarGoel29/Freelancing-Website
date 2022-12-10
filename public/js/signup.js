// const checkFirstName = (firstName) => {
//   if (firstName === undefined || firstName === null) {
//     throw "You must provide a firstName";
//   }
//   firstName = firstName.trim();
//   if (firstName.length === 0) {
//     throw "firstName cannot be an empty string or just spaces";
//   }
//   if (typeof firstName !== "string") {
//     throw "firstName must be a string";
//   }
//   if (!firstName.match(/^[a-zA-Z\s]+$/)) {
//     throw "firstName must be alphabetshihi";
//   }
//   return true;
// };

// const checkLastName = (lastName) => {
//   if (lastName === undefined || lastName === null) {
//     throw "You must provide a lastName";
//   }
//   if (typeof lastName !== "string") {
//     throw "lastName must be a string";
//   }
//   lastName = lastName.trim();
//   if (lastName.length === 0) {
//     throw "lastName cannot be an empty string or just spaces";
//   }
//   if (!lastName.match(/^[a-zA-Z\s]+$/)) {
//     throw "lastName must be alphabets";
//   }
//   return true;
// };

// const checkEmail = (email) => {
//   if (email === undefined || email === null) {
//     throw "emailAddress cannot be null and undefined";
//   }
//   if (typeof email !== "string") {
//     throw "emailAddress must be a string";
//   }

//   email = email.trim();
//   if (email === undefined || email === null) {
//     throw "emailAddress cannot be null and undefined";
//   }
//   if (typeof email !== "string") {
//     throw "emailAddress must be a string";
//   }

//   email = email.trim();
//   if (
//     !email.match(
//       /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/
//     )
//   ) {
//     throw "Please enter a valid emailAddress";
//   }
//   if (email.trim().length == 0) {
//     throw "Email address cannot be empty";
//   }
//   return true;
// };

// const checkUserName = (userName) => {
//   if (userName === undefined || userName === null) {
//     throw "You must provide a userName";
//   }
//   if (typeof userName !== "string") {
//     throw "userName must be a string";
//   }
//   return true;
// };

// const checkContactNumber = (contactNumber) => {
//   if (!contactNumber.match(/^\d{10}$/)) {
//     throw "Please enter a valid contact number";
//   }
//   return true;
// };

// const checkGender = (gender) => {
//   //   if (gender == undefined) {
//   //     throw `You must provide your gender`;
//   //   }
//   //   if (typeof gender !== "string" || gender.trim().length === 0) {
//   //     throw `gender is not a string or is an empty string`;
//   //   }
//   //   gender = gender.trim();
//   //   if (gender != "male" && gender != "female" && gender != "other") {
//   //     throw "gender values must be 'male','female','other'";
//   //   }
//   //   return true;
// };

// const checkDOB = (dob) => {
//   let year = "";
//   let arr = [];

//   for (let j = dob.length; j > 0; j--) {
//     if (dob[j] == undefined) {
//       continue;
//     }
//     if (dob[j] == "/") {
//       break;
//     } else {
//       arr.push(dob[j]);
//     }
//   }
//   for (let k = arr.length; k >= 0; k--) {
//     if (arr[k] == undefined) {
//       continue;
//     } else {
//       year += arr[k];
//     }
//   }
//   var currentdate = new Date();
//   var currentDate =
//     currentdate.getMonth() +
//     1 +
//     "/" +
//     currentdate.getDate() +
//     "/" +
//     currentdate.getFullYear();
//   currentDate.split("/");
//   let age;
//   age = currentdate.getFullYear() - Number(year);
//   if (age < 16) {
//     throw "You must be atleast 16 to register";
//   }
//   let isValidDate = Date.parse(dob);
//   if (isNaN(isValidDate)) {
//     throw "Not a valid date format";
//   }
//   return true;
// };

// const checkPassword = (password) => {
//   if (password === undefined || password === null) {
//     throw "Error: password cannot be null and undefined";
//   }
//   if (
//     !password.match(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/
//     )
//   ) {
//     throw "Error: Password must contain atleast one upper case,one lower case,one digit, one special character and should be  atleast eight characters long";
//   }
//   return true;
// };

// const checkConfirmPassword = (password, confirmPassword) => {
//   if (password !== confirmPassword) {
//     throw "Password does not match !";
//   }
//   return true;
// };

// (function () {
//   const Form = document.getElementById("registration-form");

//   if (Form) {
//     const input_firstname = document.getElementById("firstName");
//     const input_lastname = document.getElementById("lastName");
//     const input_email = document.getElementById("email");
//     const input_username = document.getElementById("userName");
//     const input_contactnumber = document.getElementById("contactNumber");
//     //const input_gender = document.getElementById("inp_arr");
//     const input_dob = document.getElementById("dob");
//     const input_password = document.getElementById("password");
//     const input_confirmpassword = document.getElementById("confirmPassword");

//     const errorContainer = document.getElementById("error-container");
//     const errorTextElement =
//       errorContainer.getElementsByClassName("text-goes-here")[0];

//     Form.addEventListener("submit", (event) => {
//       try {
//         errorContainer.classList.add("hidden");

//         let input_firstname_Val = input_firstname.value;
//         let input_lastname_Val = input_lastname.value;
//         let input_email_Val = input_email.value;
//         let input_username_Val = input_username.value;
//         let input_contactnumber_Val = input_contactnumber.value;
//         let input_dob_Val = input_dob.value;
//         let input_password_Val = input_password.value;
//         let input_confirmpassword_Val = input_confirmpassword.value;

//         checkUserName(input_username_Val);
//         checkFirstName(input_firstname_Val);
//         checkLastName(input_lastname_Val);
//         checkEmail(input_email_Val);
//         checkContactNumber(input_contactnumber_Val);
//         //checkGender();
//         checkDOB(input_dob_Val);
//         checkPassword(input_password_Val);
//         checkConfirmPassword(input_password_Val, input_confirmpassword_Val);

//         Form.reset();
//       } catch (e) {
//         event.preventDefault();
//         const message = typeof e === "string" ? e : e.message;
//         errorTextElement.innerHTML = "Error: " + e;
//         errorContainer.classList.remove("hidden");
//         Form.reset();
//       }
//     });
//   }
// })();
