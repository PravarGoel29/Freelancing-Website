const postSuccess = document.getElementById("createpost-success");
const postError = document.getElementById("createpost-failure");
postSuccess.hidden = true;
postError.hidden = true;
$("createpost-error").hide()
$("#createpost-form").submit(function (event) {
    event.preventDefault();
    let url = window.location.href
    userName = url.split('/')
    userName = userName[4]
    console.log(userName)
    try {

        let location = $('#location').val()
        let description = $('#description').val()
        let title = $('#title').val()
        let domain = $('#domain').val()
        let tags = $('#tags').val()
        let jobtype = $('#jobtype').val()
        let salary = $('#salary').val()
        validateLocation(location)
        validateDescription(description)
        validateTitle(title)
        validateDomain(domain)
        validateTags(tags)
        validateJobType(jobtype)
        validateSalary(salary)

        if (location && description && title && domain && tags && jobtype && salary) {
            var requestConfig = {
                method: 'POST',
                url: `/post`,
                contentType: 'application/json',
                data: JSON.stringify({
                    location: location,
                    description: description,
                    title: title,
                    domain: domain,
                    tags: tags,
                    jobtype: jobtype,
                    salary: salary
                })
            };
            console.log(url)
            $.ajax(requestConfig).then(function (responseMessage) {
                console.log(responseMessage)
                window.location.href = `/profile/${userName}`;
                postSuccess.hidden = false
                postErrorr.hidden = true;
            }, function (responseMessage) {
                console.log(responseMessage)
                postSuccess.hidden = true
                postError.hidden = false;
            });
        }
    }
    catch (e) {
        console.log(e)
        event.preventDefault()
        postError.hidden = false
        $('#createpost-error').show()
        $('#createpost-error').empty()
        $('#createpost-error').append(e)
    }
});

const validateLocation = (inputLocation) => {
    if (!inputLocation) throw "Location not provided.";
    if (typeof inputLocation !== "string") throw "Location is not of valid input type.";
    if (inputLocation.trim().length === 0) throw "Location is empty.";
};

const validateDescription = (inputDescription) => {
    if (!inputDescription) throw "Description not provided.";
    if (typeof inputDescription !== "string") throw "Description is not of valid input type.";
    if (inputDescription.trim().length === 0) throw "Description is empty.";
};

const validateTitle = (inputTitle) => {
    if (!inputTitle) throw "Title not provided.";
    if (typeof inputTitle !== "string") throw "Title is not of valid input type.";
    if (inputTitle.trim().length === 0) throw "Title is empty.";
};

const validateDomain = (inputDomain) => {
    if (!inputDomain) throw "Domain not provided.";
    if (typeof inputDomain !== "string") throw "Domain is not of valid input type.";
    if (inputDomain.trim().length === 0) throw "Domain is empty.";
};

const validateJobType = (inputJobType) => {
    if (!inputJobType) throw "Job Type not provided.";
    if (typeof inputJobType !== "string") throw "Job Type is not of valid input type.";
    if (inputJobType.trim().length === 0) throw "Job Type is empty.";
    if (!(inputJobType === "Remote" || inputJobType === "In-Person" || inputJobType === "Hybrid")) {
        throw "Invalid Job Type";
    }
};
const validateTags = (inputTags) => {
    if (!inputTags) throw "Tags not provided.";
    if (typeof inputTags !== "string") throw "Tags is not of valid input type.";
    if (inputTags.trim().length === 0) throw "Tags is empty.";
};
const validateSalary = (inputSalary) => {
    if (!inputSalary) throw "Salary not provided.";
    if (typeof inputSalary !== "string") throw "Salary is not of valid input type.";
    if (inputSalary.trim().length === 0) throw "Salary is empty.";
    const regex = new RegExp("^[0-9]*$");
    if (!regex.test(inputSalary)) throw "Salary field must only have digits.";
};

