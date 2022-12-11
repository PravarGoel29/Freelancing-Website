const db = require("../config");
const employers = db.employerCollection;
const employees = db.employeeCollection;
const bcrypt = require("bcryptjs");
const validations = require("../validations/dataValidations");
const { ObjectId } = require("mongodb");
const moment = require("moment");

/**Database function for the Employees Collection */
const createEmployee = async (userName, preferences) => {
  //0. establish db connection
  const employeeCollection = await employees();

  //1. create a new employee obj
  let newEmployee = {
    userName: userName,
    preferences: preferences,
    resume: ObjectId(),
    wishList: [],
    historyOfJobs: [],
    overallRating: 0,
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

const getEmployeeById = async (employeeId) => {
  //0. validate arguments
  validations.validateID(employeeId);
  employeeId = employeeId.trim();

  //1. establish db connection
  const employeeCollection = await employees();

  //2. checks if the employee with the given employeeID is already in the DB
  const thisEmployee = await employeeCollection.findOne({ _id: ObjectId(employeeId) });
  if (thisEmployee === null) throw "No employee with that id found";

  //3. converts objectID to a string and returns it
  thisEmployee._id = thisEmployee._id.toString();
  return thisEmployee;
};

const savePosttoWishList = async (employeeId, postID) => {
  validations.validateID(employeeId);
  const employeeCollection = await employees();

  //2. checks if the employer with the given employerID is already in the DB
  const thisEmployee = await employeeCollection.findOne({ _id: ObjectId(employeeId) });
  if (thisEmployee === null) throw "No employer with that id found";

  console.log(thisEmployee);
  let wishList_ = thisEmployee.wishList;
  if (wishList_.includes(postID)) {
    throw "You have already saved to this job to your wishlist";
  }

  wishList_.push(postID);

  const updatedEmployee = await employeeCollection.updateOne(
    { _id: ObjectId(employeeId) },
    {
      $set: {
        userName: thisEmployee.userName,
        preferences: thisEmployee.preferences,
        resume: thisEmployee.resume,
        wishList: wishList_,
        historyOfJobs: thisEmployee.historyOfJobs,
        overallRating: thisEmployee.overallRating,
        reported: thisEmployee.reported,
        flag: thisEmployee.flag,
        currentJobsTaken: thisEmployee.flag,
        invites: thisEmployee.invites,
      },
    }
  );

  if (updatedEmployee.modifiedCount === 0) {
    throw "Employee not modified!";
  }

  return await getEmployeeById(employeeId);
};

const getAllJobsinWishList = async (employeeId) => {
  validations.validateID(employeeId);
  const employee = await getEmployeeById(employeeId);

  return employee.wishList;
};

/**Exporting Modules*/
module.exports = {
  createEmployee,
  getEmployeeById,
  savePosttoWishList,
  getAllJobsinWishList,
};
