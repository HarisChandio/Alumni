const route = require("express").Router();
const Job = require("../db/models/job");
const User = require("../db/models/user");
const authenticate = require("../middlewares/authenticator");

//post job
route.post("/job/post", authenticate, async (req, res) => {
  try {
    const newJob = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      description: req.body.description,
      companyLogo: req.body.companyLogo,
      createdBy: req.user._id,
    });
    const job = await newJob.save();
    const user = await User.findById(req.body.createdBy);
    user.postedJobs.push(job._id);
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get all jobs
route.get("/get/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "username");
    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get job by id
route.get("/job/get/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "createdBy",
      "username"
    );
    res.status(200).json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
});


//apply for job with jobId, by user Id
route.post("/job/apply/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json("You have already applied for this job");
    }
    job.applicants.push(req.user._id);
    await job.save();
    //now update the user's appliedjobs
    const user = await User.findById(req.user._id);
    user.appliedJobs.push(req.params.id);
    await user.save();
    res.status(200).json("Applied successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get all jobs applied by user
route.get("/job/get/applied/jobs", authenticate, async (req, res) => {
  try {
    const jobs = await Job.find({ applicants: req.user._id }).populate(
      "createdBy",
      "username"
    );
    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//get all applicants for a job
route.get("/job/get/applicants/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "applicants",
      "username"
    );
    res.status(200).json(job.applicants);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = route;
