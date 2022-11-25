document.getElementsByTagName("form")[0].addEventListener('submit', function(evt){
    evt.preventDefault();
    var inputFirstName = document.getElementById("firstName");
    if(inputFirstName.value.length == 0){
        alert("First name cannot be empty")
    }
    const checkSpaceReg = /\s/g;
    if(inputFirstName.value.match(checkSpaceReg)){
        alert("There should be no spaces in the First Name")
    }
})