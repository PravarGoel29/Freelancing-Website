document.getElementsByTagName("form")[0].addEventListener('submit', function(evt){
    evt.preventDefault();
    var inputFirstName = document.getElementById("firstName");
    var inputLastName = document.getElementById("lastName");
    var inputEmail = document.getElementById("email");
    var inputContactNumber = document.getElementById("contactNumber");
    var inputPassword = document.getElementById("password");
    var inputConfirmPassword = document.getElementById("confirmPassword");

    if(inputFirstName.value.length == 0){
        alert("First name cannot be empty")
        return;
    }
    if(inputLastName.value.length == 0){
        alert("Last name cannot be empty")
        return;
    }
    if(inputEmail.value.length == 0){
        alert("Email cannot be empty")
        return;
    }
    if(inputContactNumber.value.length == 0){
        alert("Contact Number cannot be empty")
        return;
    }
    if(inputPassword.value.length == 0){
        alert("Please enter a password");
        return;
    }
    if(inputPassword.value.length < 8){
        alert("Password should be atleast 8 Characters long");
        return;
    }
    if(inputConfirmPassword.value.length == 0){
        alert("Please confirm your password");
        return;
    }
    if(inputPassword.value !== inputConfirmPassword.value){
        alert("Passwords does not match");
        return;
    }

    const checkSpaceReg = /\s/g;
    if(inputFirstName.value.match(checkSpaceReg)){
        alert("There should be no spaces in the First Name");
        return;
    }
    if(inputLastName.value.match(checkSpaceReg)){
        alert("There should be no spaces in the Last Name");
        return;
    }

    const checkNumberReg = /[0-9]/g;
    if(inputFirstName.value.match(checkNumberReg)){
        alert("First Name should not contain a number");
        return;
    }
    if(inputLastName.value.match(checkNumberReg)){
        alert("Last Name should not contain a number");
        return;
    }

    const checkSpecialCharReg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if(inputFirstName.value.match(checkSpecialCharReg)){
        alert("Special characters are not allowed in First Name");
    }
    if(inputLastName.value.match(checkSpecialCharReg)){
        alert("Special characters are not allowed in Last Name");
    }
    //work in progress
    const checkEmailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const emailcheker = /^([a-z0-9\.-_])$/
    if(!inputEmail.value.match(checkEmailReg)){
        alert("Email is not a valid email");
    }

    const checkContactNumberReg = /\+[0-9]/g;
    if(!inputContactNumber.value.match(checkContactNumberReg)){
        alert("Please Enter a valid Contact Number")
    }
    const checkNumberForAlpha = /[a-zA-Z]/g;
    if(inputContactNumber.value.match(checkNumberForAlpha)){
        alert("Please Enter a valid Contact Number")
        return;
    }
    validateGender();

    var passUpperCase = /[A-Z]/g;
    if(!inputPassword.value.match(passUpperCase)){
        alert("Password should have atleast one upper case");
        return;
    }
    var passOneNumber = /[0-9]/g;
    if(!inputPassword.value.match(passOneNumber)){
        alert("Password should have atleast one number");
        return;
    }
})

function validateGender(){
    var valid = false;
    var x = document.signupform.gender;
    for(var i=0;i<x.length;i++){
        if(x[i].checked){
            valid = true;
            break;
        }
    }
    if(!valid){
        alert("Please select Gender");
    }

}