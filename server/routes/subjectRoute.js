const express = require("express");
const { getSubject, updateSubject, addSubject, deleteSubject } = require("../controllers/subjectController");
const router = express.Router();

// GET-SUBJECT
router.route("/get-subject").post(getSubject);

// UPDATE-SUBJECT
router.route("/update-subject").post(updateSubject);

// ADD-SUBJECT
router.route("/add-subject").post(addSubject);

// DELETE-SUBJECT
router.route("/delete-subject").delete(deleteSubject);

module.exports = router;