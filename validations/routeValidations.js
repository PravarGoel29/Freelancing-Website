const { ObjectId } = require("mongodb");
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
  id = id.trim();
  if (!ObjectId.isValid(id)) {
    throw "please give a valid objectid. The object id is not valid";
  }
};

const validateReview = (inputReview) => {
  if (!inputReview) throw "Review not provided.";
  if (typeof inputReview !== "string") throw "Review should be a string.";
  if (inputReview.trim().length === 0) throw "Review is empty.";
  if (inputReview.trim().length < 10) throw "Review should contain atleast 10 characters.";
};

const validateRating = (inputRating) => {
  if (!inputRating) throw "Rating not provided.";
  if (typeof inputRating !== "string") throw "Rating should be a string.";
  if (inputRating.trim().length === 0) throw "Rating is empty.";
  const allowedRating = ["1", "2", "3", "4", "5"];

  if (!allowedRating.includes(inputRating)) {
    throw "Invalid value for Rating. Allowed values [1,2,3,4,5]";
  }
};

module.exports = { validateID, validateRating, validateReview };
