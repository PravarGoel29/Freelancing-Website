const db = require("../config");
const users = db.usersCollection;
const employers = db.employerCollection;
const employees = db.employeeCollection;
const bcrypt = require("bcrypt");
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const moment = require("moment");

/**This function is for initital user signup  */
/**Database function for the Users Collection */
const createUser = async (userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences) => {
  //1. validate arguments
  if (arguments.length !== 8) throw "Incorrect number of arguments!";
  validations.createUserValidation(
    userName,
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    gender,
    dob,
    preferences
  );
  validations.stringtrim(arguments);

  //2. establish db connection
  const usersCollection = await users();

  //3. check if email is already in db
  const count = await usersCollection.countDocuments();
  if (count !== 0) {
    //checks if the email is already in the DB
    const findEmail = await usersCollection.findOne({ email: email.toLowerCase() });
    if (findEmail !== null) throw "Email is already in use!";
  }

  //4 check if username is already in db
  const countUserName = await usersCollection.countDocuments();
  if (countUserName !== 0) {
    //checks if the username is already in the DB
    const findUserName = await usersCollection.findOne({ userName: userName });
    if (findUserName !== null) throw "Username is already in use!";
  }

  //5. hash the password
  saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  //6. Create employee
  let employeeId = createEmployee(userName, preferences);

  //7. Create employee
  let employerId = createEmployee(userName);

  //8. Create new user obj
  let newUser = {
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    hashedPassword: hashedPw,
    dob: new Date(dob),
    contactNumber: contactNumber,
    createdAt: new Date().toLocaleDateString(),
    employeeId: employeeId,
    employerId: employerId,
  };

  //9. insert user into the db
  let insertData = await usersCollection.insertOne(newUser);
  if (insertData.acknowldeged === 0 || !insertData.insertedId === 0) throw "Could not add new user!";

  //10. get user id
  let user = await usersCollection.findOne({ email: email.toLowerCase() });
  return user["_id"].toString();
};
/**Database function for the Employee Collection */
const createEmployee = async (userName, preferences) => {
  //0. establish db connection
  const employeeCollection = await employees();
  //1. create a new employee obj
  let newEmployee = {
    userName: userName,
    preferences: preferences,
    resume: null,
    wishList: [],
    historyOfJobs: [],
    overallRating: [],
    reported: [],
    flag: false,
    currentJobsTaken: [],
    invites: [],
  };

  //2. insert employee into the db
  let insertEmployeeData = await employeeCollection.insertOne(newEmployee);
  if (insertEmployeeData.acknowldeged === 0 || !insertEmployeeData.insertedId === 0)
    throw "Could not add new employee!";

  //3. get user id
  let employee = await employeeCollection.findOne({ userName: userName });
  return employee["_id"].toString();
};

/**Database function for the Employer Collection */
const createEmployer = async (userName) => {
  //0. establish db connection
  const employerCollection = await employers();
  //1. create a new employee obj
  let newEmployer = {
    userName: userName,
    historyOfJobs: [],
    overallRating: [],
    reported: [],
    flag: false,
  };

  //2. insert employee into the db
  let insertEmployerData = await employerCollection.insertOne(newEmployer);
  if (insertEmployerData.acknowldeged === 0 || !insertEmployerData.insertedId === 0)
    throw "Could not add new employer!";

  //3. get user id
  let employer = await employerCollection.findOne({ userName: userName });
  return employer["_id"].toString();
};

module.exports = { createUser, createEmployee, createEmployer };
