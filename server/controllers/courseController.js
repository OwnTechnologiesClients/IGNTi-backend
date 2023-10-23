const Course = require("../models/courseModel");

// ADD-COURSE
exports.addCourse = async (req, res) => {
  try {
    const courseExists = await Course.findOne({ courseName: req.body.courseName });
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
        const courseExists = await Course.findOne({ courseName: req.body.courseName });
        if (!courseExists) {
          return res.send({
            success: false,
            message: "Course not found",
          });
        }
        return res.send({
          success: true,
          message: "Course fetched successfully",
          data: courseExists
        });
      } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
      }
}


exports.updateCourse = async (req, res) => {
    try {
        const courseId = req.params.id;
        const updatedCourse = await Course.findByIdAndUpdate(courseId, {
            noOfSemester: req.body.noOfSemester,
            duration: req.body.duration,
            fees: req.body.fees
        }, { new: true });
        if (!updatedCourse) {
          return res.send({
            success: false,
            message: "Course not found",
          });
        }
        return res.send({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse
        });
      } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
      }
}

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
}