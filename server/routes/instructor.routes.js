const express = require("express");
const {
  loginInstructor,
  registerInstructor,
  getInstructorProfile,
  getMyCourses,
} = require("../controllers/instructor.controller");
const instructorMiddleware = require("../middlewares/instructor.middleware");
const router = express.Router();

router.post("/register", registerInstructor);
router.post("/login", loginInstructor);
router.get("/profile", instructorMiddleware, getInstructorProfile);
router.get("/my-courses", instructorMiddleware, getMyCourses);

module.exports = router;
