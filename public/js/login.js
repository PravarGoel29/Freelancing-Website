$("#login-form").submit(function (event) {
    event.preventDefault();
    let username = $('#usernameInput').val()
    let password = $('#passwordInput').val()
    try {
        validateUsername(username);
        validatePassword(password);
        validateTags([username, password])
    }
    catch (e) {
        event.preventDefault()
        alert(e)
        return
    }
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
        }, function (responseMessage) {
            data = JSON.parse(responseMessage.responseText)
            alert(data.error)
            return
        });
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