document.getElementsByTagName("form")[0].addEventListener('submit', function (evt) {
    var inputFirstName = document.getElementById("firstName");
    var inputLastName = document.getElementById("lastName");
    var inputEmail = document.getElementById("email");
    var inputContactNumber = document.getElementById("contactNumber");
    var inputPassword = document.getElementById("password");
    var inputConfirmPassword = document.getElementById("confirmPassword");

    if (inputFirstName.value.length == 0) {
        alert("First name cannot be empty");
        evt.preventDefault();
        return;
    }
    if (inputLastName.value.length == 0) {
        alert("Last name cannot be empty");
        evt.preventDefault();
        return;
    }
    if (inputEmail.value.length == 0) {
        alert("Email cannot be empty");
        evt.preventDefault();
        return;
    }
    if (inputContactNumber.value.length == 0) {
        alert("Contact Number cannot be empty");
        evt.preventDefault();
        return;
    }
    if (inputPassword.value.length == 0) {
        alert("Please enter a password");
        evt.preventDefault();
        return;
    }
    if (inputPassword.value.length < 8) {
        alert("Password should be atleast 8 Characters long");
        evt.preventDefault();
        return;
    }
    if (inputConfirmPassword.value.length == 0) {
        alert("Please confirm your password");
        evt.preventDefault();
        return;
    }
    if (inputPassword.value !== inputConfirmPassword.value) {
        alert("Passwords does not match");
        evt.preventDefault();
        return;
    }

    const checkSpaceReg = /\s/g;
    if (inputFirstName.value.match(checkSpaceReg)) {
        alert("There should be no spaces in the First Name");
        evt.preventDefault();
        return;
    }
    if (inputLastName.value.match(checkSpaceReg)) {
        alert("There should be no spaces in the Last Name");
        evt.preventDefault();
        return;
    }

    const checkNumberReg = /[0-9]/g;
    if (inputFirstName.value.match(checkNumberReg)) {
        alert("First Name should not contain a number");
        evt.preventDefault();
        return;
    }
    if (inputLastName.value.match(checkNumberReg)) {
        alert("Last Name should not contain a number");
        evt.preventDefault();
        return;
    }

    const checkSpecialCharReg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (inputFirstName.value.match(checkSpecialCharReg)) {
        alert("Special characters are not allowed in First Name");
        evt.preventDefault();
        return;
    }
    if (inputLastName.value.match(checkSpecialCharReg)) {
        alert("Special characters are not allowed in Last Name");
        evt.preventDefault();
        return;
    }
    //work in progress
    const checkEmailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailcheker = /^([a-z0-9\.-_])$/
    if (!inputEmail.value.match(checkEmailReg)) {
        alert("Email is not a valid email");
        evt.preventDefault();
        return;
    }

    const checkContactNumberReg = /\d{3}[\-]\d{3}[\-]\d{4}/g;
    {
        if (!inputContactNumber.value.match(checkContactNumberReg)) {
            alert("Please Enter a valid Contact Number");
            evt.preventDefault();
            return;
        }
    }

    validateGender();

    var passUpperCase = /[A-Z]/g;
    if (!inputPassword.value.match(passUpperCase)) {
        alert("Password should have atleast one upper case");
        return;
    }
    var passOneNumber = /[0-9]/g;
    if (!inputPassword.value.match(passOneNumber)) {
        alert("Password should have atleast one number");
        return;
    }
})

function validateGender() {
    var valid = false;
    var x = document.signupform.gender;
    for (var i = 0; i < x.length; i++) {
        if (x[i].checked) {
            valid = true;
            break;
        }
    }
    if (!valid) {
        alert("Please select Gender");
    }

}