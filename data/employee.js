const db = require("../config");
const employers = db.employerCollection;
const employees = db.employeeCollection;
const bcrypt = require("bcryptjs");
const errorHandling = require("../validations");
const validations = errorHandling.dataValidations;
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

/**Exporting Modules*/
module.exports = {
  createEmployee,
  getEmployeeById,
};
