const express = require("express");
const { addResultSet, getResultSet, getResultSetById, updateResultSetById } = require("../controllers/resultSetController");
const router = express.Router();


// ADD-RESULT-SET
router.route("/add-result-set").post(addResultSet);

// GET-RESULT-SET
router.route("/get-result-set").post(getResultSet);

// SET-RESULT-SET-BY-ID
router.route("/get-result-set-id").post(getResultSetById);

// UPDATE-RESULT-SET-BY-ID
router.route("/update-result-set-id").post(updateResultSetById);


module.exports = router;