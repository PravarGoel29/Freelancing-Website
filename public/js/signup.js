const signupSuccess = document.getElementById("signup-success");
const signupError = document.getElementById("signup-failure");
signupSuccess.hidden = true;
signupError.hidden = true;
$("signup-error").hide()
$("#registration-form").submit(function (event) {
    event.preventDefault();
    try {
        let username = $('#userName').val()
        let firstName = $('#firstName').val()
        let lastName = $('#lastName').val()
        let contactNumber = $('#contactNumber').val()
        let preferences = $('#preferences').val()
        let email = $('#email').val()
        let dob = $('#dob').val()
        let password = $('#password').val()
        let confirmPassword = $('#confirmPassword').val()
        let gender = document.querySelector('input[name="gender"]:checked').value;
        if (gender === null) {
            throw 'Please select gender'
        }

        validateUserName(username);
        validatePassword(password);
        validateName(firstName);
        validateName(lastName)
        validateContactNumber(contactNumber)
        validateDOB(dob)
        validateEmail(email)
        validateConfirmPassword(password, confirmPassword)
        validatePreferences(preferences)
        console.log(username)
        if (username && password && firstName && lastName && contactNumber && dob && confirmPassword && email && preferences && gender) {
            var requestConfig = {
                method: 'POST',
                url: '/signup',
                contentType: 'application/json',
                data: JSON.stringify({
                    userName: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    contactNumber: contactNumber,
                    gender: gender,
                    dob: dob,
                    preferences: preferences
                })
            };
            console.log(requestConfig)
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                window.location.href = "/";
                signupSuccess.hidden = false
                signupError.hidden = true;
            }, function (responseMessage) {
                console.log(responseMessage)
                signupSuccess.hidden = true
                signupError.hidden = false;
            });
        }
    }
    catch (e) {
        console.log(e)
        event.preventDefault()
        signupError.hidden = false
        $('#signup-error').show()
        $('#signup-error').empty()
        $('#signup-error').append(e)
    }
});

const validateUserName = (inputName) => {
    if (!inputName) throw "Username not provided.";
    if (typeof inputName !== "string") throw "Username is not of valid input type.";
    if (inputName.trim().length === 0) throw "Username is empty.";
};

const validateName = (inputName) => {
    if (!inputName) throw "Name not provided.";
    if (typeof inputName !== "string") throw "Name is not of valid input type.";
    if (inputName.trim().length === 0) throw "Name is empty.";
};

const validatePassword = (inputPassword) => {
    if (!inputPassword) throw "Password not provided.";
    if (typeof inputPassword !== "string") throw "Password is not of valid input type.";
    if (inputPassword.trim().length === 0) throw "Password contains only whitespaces.";
};



const validateEmail = (inputEmail) => {
    if (!inputEmail) throw "Email not provided.";
    if (typeof inputEmail !== "string") throw "Email is not of valid input type.";
    if (inputEmail.trim().length === 0) throw "Email is empty.";
};

const validateDOB = (inputDOB) => {
    if (!inputDOB) throw "DOB not provided.";
    if (typeof inputDOB !== "string") throw "DOB is not of valid input type.";
    if (inputDOB.trim().length === 0) throw "DOB contains only whitespaces.";
};

const validateContactNumber = (inputContactNumber) => {
    if (!inputContactNumber) throw "ContactNumber not provided.";
    if (typeof inputContactNumber !== "string") throw "ContactNumber is not of valid input type.";
    if (inputContactNumber.trim().length === 0) throw "ContactNumber is empty.";
};

const validatePreferences = (inputPreferences) => {
    if (!inputPreferences) throw "Preferences not provided.";
    if (typeof inputPreferences !== "string") throw "Preferences is not of valid input type.";
    if (inputPreferences.trim().length === 0) throw "Preferences is empty.";
};

const validateConfirmPassword = (inputPassword, inputConfirmPassword) => {
    // if (!inputConfirmPassword) throw "Confirm Password not provided.";
    if (typeof inputConfirmPassword !== "string") throw "Confirm Password is not of valid input type.";
    if (inputConfirmPassword.trim().length === 0) throw "Confirm Password contains only whitespaces.";

    if (inputPassword !== inputConfirmPassword) {
        throw "Password and Confirm Password doesnt match";
    }
};

