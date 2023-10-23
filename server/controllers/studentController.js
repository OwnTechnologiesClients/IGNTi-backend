const Student = require("../models/studentModel");
const jwt = require("jsonwebtoken");

// STUDENT-REGISTRATION
exports.registerStudent = async (req, res) => {
  try {
    const studentExists = await Student.findOne({ email: req.body.email });
    if (studentExists) {
      return res.send({
        success: false,
        message: "Email is already registered with us!",
      });
    }

    const student = new Student(req.body);
    await student.save();

    return res.send({
      success: true,
      message: "Student registered Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// LOGIN-STUDENT
exports.loginStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.body.email });
    if (!student) {
      return res.send({
        success: false,
        message: "Student not found! For Registration Contact Administration",
      });
    }

    if (req.body.dateOfBirth !== student.dateOfBirth) {
      return res.send({
        success: false,
        message: "Invalid DOB",
      });
    }

    const token = jwt.sign(
      { userId: student._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    return res.send({
      success: true,
      message: "Student logged successfully",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET-STUDENT-DETAILS-BY-TOKEN
exports.getStudent = async (req, res) => {
    try {
        req.body.userId = "653374fa12383679b1411abb"
      const student = await Student.findOne({_id: req.body.userId});
      if (!student) {
        return res.send({
          success: false,
          message: "Student not found",
        });
      }
      return res.send({
        success: true,
        message: "Student details fetched successfully",
        data: student,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error.message,
      });
    }
  };
