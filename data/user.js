const db = require("../config");
const users = db.usersCollection;
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const errorHandling = require("../validations");
const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");
const moment = require("moment");
const Employee = require("./employee");
const Employer = require("./employer");

/**This function is for initital user signup  */
/**Database function for the Users Collection */
const createUser = async (
  userName,
  firstName,
  lastName,
  email,
  password,
  contactNumber,
  gender,
  dob,
  preferences,
  resume
) => {
  //1. validate arguments
  // if (arguments.length !== 5) throw "Incorrect number of arguments!";
  //validations.UserValidation(userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences);
  validations.validateEmail(email);
  validations.validateUsername(userName);
  validations.validateName(firstName);
  validations.validateName(lastName);
  validations.validateDOB(dob);
  validations.validatePassword(password);
  validations.validatePhoneNumber(contactNumber);
  //2. establish db connection
  const usersCollection = await users();

  //3. check if email is already in db
  const count = await usersCollection.countDocuments();
  if (count !== 0) {
    //checks if the email is already in the DB
    const findEmail = await usersCollection.findOne({
      email: email.toLowerCase(),
    });
    if (findEmail !== null) throw "Email is already in use!";
  }

  //4 check if username is already in db
  const countUserName = await usersCollection.countDocuments();
  if (countUserName !== 0) {
    //checks if the username is already in the DB
    const findUserName = await usersCollection.findOne({ userName: userName.toLowerCase() });
    if (findUserName !== null) throw "Username is already in use!";
  }

  //5. hash the password
  saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  //6. Create employee
  let employeeId = await Employee.createEmployee(userName, preferences, resume);

  //7. Create employee
  let employerId = await Employer.createEmployer(userName);

  //8. Create new user obj
  let newUser = {
    userName: userName.toLowerCase(),
    firstName: firstName,
    lastName: lastName,
    email: email.toLowerCase(),
    hashedPassword: hashedPw,
    dob: dob,
    contactNumber: contactNumber,
    gender: gender,
    createdAt: new Date().toLocaleDateString(),
    employeeId: employeeId,
    employerId: employerId,
    emailVerified: false,
  };

  //9. insert user into the db
  let insertData = await usersCollection.insertOne(newUser);
  if (insertData.acknowldeged === 0 || !insertData.insertedId === 0) throw "Could not add new user!";

  //10. get user id
  let user = await usersCollection.findOne({ userName: userName.toLowerCase() });

  let verificationSent = await sendEmailVerification(user);
  if (!verificationSent) {
    throw "Could not send email verfication mail!";
  }
  return user["_id"].toString();
};

const sendEmailVerification = async (user) => {
  const userId = user._id;
  const emailToken = "http://localhost:3000/confirmation/" + userId;
  const adminMailID = "t@gmail.com";
  let verificationSent = true;
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: adminMailID, pass: "pass" },
  });
  let details = {
    from: adminMailID,
    to: user.email,
    subject: "Welcome to Freelance " + user.userName,
    text: "Click here to verify " + emailToken,
  };

  mailTransporter.sendMail(details, (e) => {
    if (e) {
      verificationSent = false;
    } else {
      console.log("Verification  mail sent successfully!");
    }
  });
  return verificationSent;
};

/**This function is for user login  */
const checkUser = async (userName, password) => {
  //1. validate arguments
  validations.validateUsername(userName);
  validations.validatePassword(password);

  //2. establish db connection
  const usersCollection = await users();

  //3. check if username exists
  const user = await usersCollection.findOne({ userName: userName.toLowerCase() });
  if (user === null) throw "Either the username or password is invalid";

  //4. check if password is same
  const passwordCheck = await bcrypt.compare(password, user["hashedPassword"]);
  if (passwordCheck === false) throw "Either the username or password is invalid";

  let authUser = { authenticated: true, user: user };
  return authUser;
};

const getUserById = async (UserId) => {
  //1. validate argument
  validations.validateID(UserId);
  UserId = UserId.trim();

  //2. establish db connection
  const usersCollection = await users();

  //3. checks if the user with the given id is already in the DB
  const thisUser = await usersCollection.findOne({ _id: ObjectId(UserId) });
  if (thisUser === null) throw "No user with that id found";

  //4. converts objectID to a string and returns it
  thisUser._id = thisUser._id.toString();
  return thisUser;
};

const getUserByUserName = async (userName) => {
  //1. validate argument
  //validations.validateID(userName);
  userName = userName.trim();

  //2. establish db connection
  const usersCollection = await users();

  //3. checks if the user with the given id is already in the DB
  const thisUser = await usersCollection.findOne({ userName: userName.toLowerCase() });
  if (thisUser === null) throw "No user with that id found";

  //4. converts objectID to a string and returns it
  thisUser._id = thisUser._id.toString();
  return thisUser;
};

const getEmployeeIdByUserName = async (userName) => {
  //1. validate argument
  //validations.validateID(userName);
  userName = userName.trim();

  //2. establish db connection
  const usersCollection = await users();

  //3. checks if the user with the given id is already in the DB
  const thisUser = await usersCollection.findOne({ userName: userName.toLowerCase() });
  if (thisUser === null) throw "No user with that id found";

  return thisUser.employeeId;
};

const getEmployerIdByUserName = async (userName) => {
  //1. validate argument
  //validations.validateID(userName);
  userName = userName.trim();

  //2. establish db connection
  const usersCollection = await users();

  //3. checks if the user with the given id is already in the DB
  const thisUser = await usersCollection.findOne({ userName: userName.toLowerCase() });
  if (thisUser === null) throw "No user with that id found";

  return thisUser.employerId;
};

const updateUser = async (
  UserId,
  userName,
  firstName,
  lastName,
  email,
  password,
  contactNumber,
  gender,
  dob,
  preferences
) => {
  //1. get user's data with the given id and assign the previously stored values to individually update the fields
  let user_var = await getUserById(UserId);
  if (firstName === undefined) firstName = user_var.firstName;
  if (lastName === undefined) lastName = user_var.lastName;
  if (email === undefined) email = user_var.email;
  if (password === undefined) password = user_var.password;
  if (contactNumber === undefined) email = user_var.contactNumber;
  if (gender === undefined) email = user_var.gender;
  if (preferences === undefined) preferences = user_var.preferences;

  //2. validate the input arguments
  validations.validateID(UserId);
  //validations.UserValidation(userName, firstName, lastName, email, password, contactNumber, gender, dob, preferences);

  validations.validateEmail(email);
  validations.validateUsername(userName);
  validations.validateName(firstName);
  validations.validateName(lastName);
  validations.validateDOB(dob);
  validations.validatePassword(password);
  validations.validatePhoneNumber(contactNumber);
  //3. establish db connection
  const usersCollection = await users();

  //4. Updating user obj
  const updatedUser = {
    userName: userName.trim(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password.trim(),
    contactNumber: contactNumber.trim(),
    gender: gender,
    dob: dob,
    preferences: preferences,
    emailVerified: user_var.emailVerified,
  };

  //5. Storing the updated user in DB
  const updatedInfo = await usersCollection.updateOne({ _id: ObjectId(UserId) }, { $set: updatedUser });

  //6. checks if the user was successfully updated and stored in the DB
  if (updatedInfo.modifiedCount === 0) {
    throw "could not update the user successfully";
  }

  //7. returns the updated user's id
  return await getUserById(UserId);
};

const updateEmailVerificationStatus = async (userId) => {
  //1. get user's data with the given id and assign the previously stored values to individually update the fields
  const user = await getUserById(userId);
  const usersCollection = await users();
  //4. Updating user obj
  const updatedUser = {
    userName: user.userName.toLowerCase(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email.toLowerCase(),
    hashedPassword: user.hashedPassword,
    dob: user.dob,
    contactNumber: user.contactNumber,
    gender: user.gender,
    createdAt: user.createdAt,
    employeeId: user.employeeId,
    employerId: user.employerId,
    emailVerified: true,
  };

  //5. Storing the updated user in DB
  const updatedInfo = await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedUser });

  //6. checks if the user was successfully updated and stored in the DB
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update the user successfully";
  }

  return await getUserById(userId);
};

const getAllUsers = async () => {
  //1. establish db connection
  const usersCollection = await users();

  //2. get all the users in an array
  const usersList = await usersCollection.find({}).toArray();

  //3. checking if all the data has been fetched
  if (!usersList) throw "Could not get all users";
  return usersList;
};

/**Exporting Modules*/
module.exports = {
  createUser,
  getUserById,
  updateUser,
  getAllUsers,
  checkUser,
  getUserByUserName,
  getEmployeeIdByUserName,
  getEmployerIdByUserName,
  updateEmailVerificationStatus,
};
