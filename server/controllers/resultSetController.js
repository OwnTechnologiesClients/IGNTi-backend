const ResultSet = require("../models/resultSetModel");
const FinalResult = require("../models/finalResultModel");
const ExamSet = require("../models/examSetModel");
const mongoose = require("mongoose");

// ADD-EXAM-SET
exports.addResultSet = async (req, res) => {
  try {
    const studentExists = await ResultSet.findOne({
      studentId: req.body.studentId,
      subjectName: req.body.subjectName,
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

// SET-EXAM-SET-BY-ID
exports.getResultSetById = async (req, res) => {
  try {
    const resultOfStudent = await ResultSet.find({
      semesterNumber: req.body.semesterNumber,
      courseName: req.body.courseName,
      studentId: req.body.studentId,
    });
    if (resultOfStudent.length == 0) {
      return res.send({
        success: false,
        message: `Student not found!`,
      });
    }

    const examSet = await ExamSet.find({
      courseName: "Btech CSE",
      semesterNumber: resultOfStudent[0].semesterNumber,
    });

    const resultData = resultOfStudent.map((item) => ({
      subjectName: item.subjectName,
      resultSet: item.resultSet.map((result) => ({
        question: result.question,
        selectedOption: result.selectedOption,
      })),
    }));

    const resultData2 = examSet.map((item) => ({
      subjectName: item.subjectName,
      questions: item.questions.map((question) => ({
        questionText: question.questionText,
        correctOption: question.correctOption,
      })),
    }));

    const finalResult = [];

    resultData.forEach((data1Item) => {
      const matchedSubject = resultData2.find(
        (data2Item) => data2Item.subjectName === data1Item.subjectName
      );
      if (matchedSubject) {
        const result = {
          subjectName: data1Item.subjectName,
          numCorrectAnswers: 0,
          totalNumQuestions: matchedSubject.questions.length,
        };

        data1Item.resultSet.forEach((resultSetItem) => {
          const matchedQuestion = matchedSubject.questions.find(
            (question) => question.questionText === resultSetItem.question
          );
          if (
            matchedQuestion &&
            resultSetItem.selectedOption === matchedQuestion.correctOption
          ) {
            result.numCorrectAnswers += 1; 
          }
        });

        finalResult.push(result);
      }
    });

    req.body.subjectResults = finalResult

    const alreadySet = await FinalResult.find({
      semesterNumber: req.body.semesterNumber,
      studentId: req.body.studentId,
    });
    if (alreadySet.length == 0) {
      const newResult = new FinalResult(req.body);
      const result = await newResult.save();
      return res.send({
        success: true,
        message: `Final Result Set and need permission from admin to declare!`,
        data: result
      });
    }

    return res.send({
      success: true,
      message: `Final Result already set navigate for further changes in result!`,
      data: alreadySet,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
