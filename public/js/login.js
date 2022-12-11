const loginSuccess = document.getElementById("login-success");
const loginError = document.getElementById("login-failure");
loginSuccess.hidden = true;
loginError.hidden = true;
$("#login-form").submit(function (event) {
    event.preventDefault();
    $("login-error").hide()
    try {
        let username = $('#usernameInput').val()
        let password = $('#passwordInput').val()
        validateUsername(username);
        validatePassword(password);
        validateTags([username, password])
        console.log(username)
        if (username && password) {
            var requestConfig = {
                method: 'POST',
                url: '/login',
                contentType: 'application/json',
                data: JSON.stringify({
                    usernameInput: username,
                    passwordInput: password
                })
            };
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                window.location.href = "/home";
                loginSuccess.hidden = false
                loginError.hidden = true;
            }, function (responseMessage) {
                console.log(responseMessage)
                loginSuccess.hidden = true
                loginError.hidden = false;
                loginError.show()
            });
        }
    }
    catch (e) {
        console.log(e)
        event.preventDefault()
        loginError.hidden = false
        $('#login-error').show()
        $('#login-error').empty()
        $('#login-error').append(e)
    }
});

const validateTags = (str) => {
    str.forEach(s => {
        if (s.match(/(<([^>]+)>)/ig)) {
            throw "Input contains html tags"
        }
    })
}

const validateUsername = (inputUsername) => {
    if (!inputUsername) throw "Username not provided.";
    if (typeof inputUsername !== "string") throw "Username is not of valid input type.";
    if (inputUsername.trim().length === 0) throw "Username is empty.";
};

const validatePassword = (inputPassword) => {
    if (!inputPassword) throw "Password not provided.";
    if (typeof inputPassword !== "string") throw "Password is not of valid input type.";
    if (inputPassword.trim().length === 0) throw "Password contains only whitespaces.";
};