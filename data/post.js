const db = require("../config");

const posts = db.postsCollection;
const validations = require("../validations/dataValidations");
//const validations = errorHandling.userValidations;
const { ObjectId } = require("mongodb");

/**Database function for the Post Collection */

const getPostById = async (postId) => {
  //validation of id
  validations.validateID(postId);
  postId = postId.trim();
  const postCollection = await posts();
  const postInfo = await postCollection.findOne({ _id: ObjectId(postId) });
  if (postInfo === null) {
    throw "There is no post for the given id";
  }
  postInfo._id = postInfo._id.toString();
  console.log(postInfo);
  return postInfo;
};

const createPost = async (location, description, domain, tags, jobtype, salary) => {
  const postCollection = await posts();
  var postedTime = new Date().toLocaleDateString("en-US");

  const newPost = {
    location: location,
    description: description,
    postedTime: postedTime,
    updatedTime: null,
    imageID: "123",
    domain: domain,
    tags: tags,
    reviewIDs: [],
    status: "Active",
    jobtype: jobtype,
    salary: salary,
    applicants: [],
    candidates: [],
  };

  let insertPostData = await postCollection.insertOne(newPost);
  if (!insertPostData.insertedCount === 0) throw "Job posting unsuccessful";
  const postId = insertPostData.insertedId.toString();
  const post = await postCollection.findOne({ _id: ObjectId(postId) });
  return post;
};

const getAllPosts = async () => {
  const postCollection = await posts();
  const PostList = await postCollection.find({}).toArray();
  return PostList;
};

const removePost = async (postId) => {
  //validation of id
  validations.validateID(postId);
  id = postId.trim();
  const postCollection = await posts();
  const postInfo = await postCollection.findOne({ _id: ObjectId(id) });
  if (!postInfo) {
    throw "There is no post for the given id";
  }
  const deletionInfo = await postCollection.deleteOne({ _id: ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }
  return { deleted: true };
};

module.exports = {
  getPostById,
  createPost,
  getAllPosts,
  removePost,
};
