const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const ApiFetaures = require("../utils/apiFeatures");
const Project = require("../models/project-model/projectModel");
const Proposal = require("../models/project-model/proposalModel");
const cloudinary = require("cloudinary").v2;

//Create Project
exports.createProject = catchAsyncError(async (req, res, next) => {
  const newProjectData = {
    name: req.body.caption,
    about: req.body.about,
    time: req.body.time,
    owner: req.user,
    label: req.body.label,
    price: req.body.price,
    priceType: req.body.priceType,
    location: req.body.location,
    type: req.body.type,
    category: req.body.category,
    length: req.body.length,
    skills: req.body.skills,
  };
  const newProject = await Project.create(newProjectData);
  const user = await User.findById(req.user._id);
  user.myProjects.push(newProject._id);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Successfully Project created",
    project: newProject,
  });
});

//Get All Project
exports.getAllPrjects = catchAsyncError(async (req, res, next) => {
  const apifeatures = new ApiFetaures(
    Project.find().sort({ createdAt: -1 }).populate("owner"),
    req.query
  ).search();

  const projects = await apifeatures.query;

  res.status(200).json({
    success: true,
    projects: projects,
  });
});

//Get Single Project
exports.getProject = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate("owner");

  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  res.status(200).json({
    success: true,
    project: project,
  });
});

//Apply Project
exports.applyProject = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }

  const proposalData = {
    user: req.user._id,
    projectId: req.params.id,
    projectTime: req.body.projectTime,
    coverLetter: req.body.coverLetter,
    bidPrice: req.body.bidPrice,
  };

  const newApply = await Proposal.create(proposalData);
  await project.proposers.push(newApply._id);
  await project.save();
  await user.projects.push(req.params.id);
  await user.save();
  const newProject = await Project.findById(req.params.id)
    .populate("owner")
    .populate("proposers");
  res.status(200).json({
    success: true,
    project: newProject,
  });
});

//Hire A Developer
exports.hireDeveloper = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.body.projectId);
  if (!project) {
    return next(new ErrorHandler("Project Not Found", 404));
  }
  res.status(200).json({
    success: true,
  });
});
