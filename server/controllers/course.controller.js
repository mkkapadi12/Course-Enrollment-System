const asyncHandler = require("../utils/asyncHandler");
const COURSE = require("../models/course.model");
const { getIO } = require("../socket/socket");

const createCourse = asyncHandler(async (req, res, next) => {
  console.log("controller:", req.body);
  const { title, description, instructor, duration } = req.body;
  if (!title || !description || !instructor || !duration) {
    const error = new Error("All fields are required");
    return next(error);
  }

  const existingCourse = await COURSE.findOne({ title });
  if (existingCourse) {
    const error = new Error("Course already exists");
    return next(error);
  }

  const course = await COURSE.create({
    title,
    description,
    instructor,
    duration,
    createdBy: req.admin.id,
  });

  // Notify ALL connected students in real-time
  getIO()
    .to("studentRoom")
    .emit("newCourseAvailable", {
      course,
      message: `New course available: ${title}`,
    });

  return res.status(201).json({ msg: "Course created successfully", course });
});

const getAllCourses = asyncHandler(async (req, res, next) => {
  const courses = await COURSE.find();
  return res.status(200).json({ courses });
});

const deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await COURSE.findByIdAndDelete(id);
  return res.status(200).json({ course });
});

module.exports = { createCourse, getAllCourses, deleteCourse };
