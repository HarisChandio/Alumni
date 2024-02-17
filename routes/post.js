const route = require("express").Router();
const Job = require("../db/models/job");
const authenticate = require("../middlewares/authenticator");
route.post("/post/job", authenticate, async (req, res) => {
  try {
    const newJob = new Job({
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      salary: req.body.salary,
      description: req.body.description,
      createdBy: req.user._id,
    });
    const job = await newJob.save();
    res.status(200).json(job);
  } catch (error) {
    return res.status(500).json(error);
  }
});

route.get("/get/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "username");
    res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json(error);
  }
});

route.get("/get/job/:id", async (req, res) => {
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

route.post("/apply/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.applicants.includes(req.user._id)) {
      return res.status(400).json("You have already applied for this job");
    }
    job.applicants.push(req.user._id);
    await job.save();
    res.status(200).json("Applied successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
});

route.get("/get/applied/jobs", authenticate, async (req, res) => {
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

route.get("/get/applicants/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("applicants", "username");
    res.status(200).json(job.applicants);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = route;
