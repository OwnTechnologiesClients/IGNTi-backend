const express = require("express");
const { registerStudent, loginStudent, getStudent } = require("../controllers/studentController");
const router = express.Router();


// STUDENT-REGISTRATION
router.route("/register").post(registerStudent);

// STUDENT_LOGIN
router.route("/login").post(loginStudent);

// GET-STUDENT-DETAILS-BY-TOKEN
router.route("/get-student").get(getStudent);

module.exports = router;