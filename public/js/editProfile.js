$("#profileEdit-form").submit(function (event) {
    
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let contactNumber = $("#contactNumber").val();
   
    let gender = document.querySelector('input[name="gender"]:checked').value;
    try {
      if (gender === null) {
        throw "Please select gender";
      }
  
    
      validateName(firstName);
      validateName(lastName);
      validateContactNumber(contactNumber);
    
    } catch (e) {
      event.preventDefault();
      alert(e);
      return;
    }
  
    //   if (
    //     username &&
    //     password &&
    //     firstName &&
    //     lastName &&
    //     contactNumber &&
    //     dob &&
    //     confirmPassword &&
    //     email &&
    //     preferences &&
    //     gender
    //   ) {
    //     var requestConfig = {
    //       method: "POST",
    //       url: "/signup",
    //       contentType: "application/json",
    //       data: JSON.stringify({
    //         userName: username,
    //         firstName: firstName,
    //         lastName: lastName,
    //         email: email,
    //         password: password,
    //         confirmPassword: confirmPassword,
    //         contactNumber: contactNumber,
    //         gender: gender,
    //         dob: dob,
    //         preferences: preferences,
    //       }),
    //     };
    //   }
    //   $.ajax(requestConfig).then(
    //     function (responseMessage) {
    //       window.location.href = "/";
    //     },
    //     function (responseMessage) {
    //       data = JSON.parse(responseMessage.responseText);
    //       alert(data.error);
    //       return;
    //     }
    //   );
  });
  
 
  
  const validateName = (inputName) => {
    if (!inputName) throw "Name not provided.";
    if (typeof inputName !== "string") throw "Name is not of valid input type.";
    if (inputName.trim().length === 0) throw "Name is empty.";
    let regex = /^[a-zA-Z]+$/
if (!regex.test(inputName)) {
    throw "name cannot have any digits."
}
  };
  
  const validateContactNumber = (inputContactNumber) => {
    if (!inputContactNumber) throw "ContactNumber not provided.";
    if (typeof inputContactNumber !== "string") throw "ContactNumber is not of valid input type.";
    if (inputContactNumber.trim().length === 0) throw "ContactNumber is empty.";
    if (!/^\d+$/.test(inputContactNumber)) {
        throw "Enter a valid number."
    }
    if (inputContactNumber.trim().length !== 10) {
        throw "Enter a valid number."
    }
  };
  
  const validatePreferences = (inputPreferences) => {
    if (!inputPreferences) throw "Preferences not provided.";
    if (typeof inputPreferences !== "string") throw "Preferences is not of valid input type.";
    if (inputPreferences.trim().length === 0) throw "Preferences is empty.";
  };
  
 
  