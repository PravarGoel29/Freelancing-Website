const { ObjectId } = require('mongodb');
const validateID = (id) => {
    if (!id) {
        throw "All fields need to have valid values";
    }
    if (typeof id !== "string") {
        throw "Please enter a valid id. The type of id must be a string";
    }
    if (id.trim().length === 0) {
        throw "Please enter a valid id. The id field cannot be an empty string or just spaces";
    }
    id = id.trim()
    if (!ObjectId.isValid(id)) {
        throw "please give a valid objectid. The object id is not valid";
    }
}

module.exports = { validateID };
