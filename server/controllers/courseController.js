const Course = require("../models/courseModel");
const ExtraCourse = require("../models/extraCourseModel");

// ADD-COURSE
exports.addCourse = async (req, res) => {
  try {
    const courseExists = await Course.findOne({
      courseName: req.body.courseName,
    });
    if (courseExists) {
      return res.send({
        success: false,
        message: "This Course is already present in database!",
      });
    }

    const course = new Course(req.body);
    await course.save();

    return res.send({
      success: true,
      message: "Course added Successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courseExists = await Course.findOne({
      courseName: req.body.courseName,
    });
    if (!courseExists) {
      return res.send({
        success: false,
        message: "Course not found",
      });
    }
    return res.send({
      success: true,
      message: "Course fetched successfully",
      data: courseExists,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

// GET-ALL-COURSE-NAME
exports.getCourseName = async (req, res) => {
  try {
    const courses = await Course.find({}, "courseName"); // Only retrieve the courseName field

    const courseNames = courses.map((course) => course.courseName);
    // const courseExists = await Course.findOne({ courseName: req.body.courseName });
    // if (!courseExists) {
    //   return res.send({
    //     success: false,
    //     message: "Course not found",
    //   });
    // }
    return res.send({
      success: true,
      message: "Courses fetched successfully",
      data: courseNames,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        noOfSemester: req.body.noOfSemester,
        duration: req.body.duration,
        fees: req.body.fees,
        coursePassword: req.body.coursePassword
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.send({
        success: false,
        message: "Course not found",
      });
    }

    const course = await Course.findById(courseId);

    if (req.body.noOfSemester < course.semesters.length) {
      const semestersToRemove = course.semesters.length - req.body.noOfSemester;
      course.semesters.splice(-semestersToRemove);
    }
    if (req.body.noOfSemester > course.semesters.length) {
      const semestersToAdd = req.body.noOfSemester - course.semesters.length;
      const lastSemesterNumber = course.semesters.length + 1;
    
      for (let i = 0; i < semestersToAdd; i++) {
        const newSemester = {
          semesterNumber: (lastSemesterNumber + i).toString(),
          subjects: [],
        };
        course.semesters.push(newSemester);
      }
    }


    await course.save();

    return res.send({
      success: true,
      message: "Course updated successfully",
      // data: updatedCourse,
      data: course
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.send({
        success: false,
        message: "Course not found",
      });
    }
    return res.send({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
