const ResultSet = require("../models/resultSetModel");
const mongoose = require("mongoose");

// ADD-EXAM-SET
exports.addResultSet = async (req, res) => {
  try {
    const studentExists = await ResultSet.findOne({
      studentId: req.body.studentId,
    });
    if (studentExists) {
      return res.send({
        success: false,
        message: `You already submit the ${req.body.subjectName} exam`,
      });
    }
    const newSemesterResult = new ResultSet(req.body);
    await newSemesterResult.save();

    return res.send({
      success: true,
      message: `Result Set added successfully for ${req.body.courseName} - ${req.body.semesterNumber} semester (${req.body.subjectName})`,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET-EXAM-SET
exports.getResultSet = async (req, res) => {
  try {
    const courseExists = await ResultSet.find({
      courseName: req.body.courseName,
    });
    if (courseExists.length == 0) {
      return res.send({
        success: false,
        message: `Invalid Course`,
      });
    }
    const semesterExists = await ResultSet.find({
      semesterNumber: req.body.semesterNumber,
      courseName: req.body.courseName,
    });
    if (semesterExists.length == 0) {
      return res.send({
        success: false,
        message: `Invalid Semester`,
      });
    }

    const resultExists = await ResultSet.find({
      semesterNumber: req.body.semesterNumber,
      courseName: req.body.courseName,
      subjectName: req.body.subjectName,
    }).distinct("studentId");
    if (resultExists.length == 0) {
      return res.send({
        success: false,
        message: `Invalid Subject`,
      });
    }

    return res.send({
      success: true,
      message: `Student IDs fetched successfully for ${req.body.courseName} - ${req.body.semesterNumber} semester (${req.body.subjectName})`,
      data: resultExists,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
