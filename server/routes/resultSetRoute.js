const express = require("express");
const { addResultSet, getResultSet, getResultSetById } = require("../controllers/resultSetController");
const router = express.Router();


// ADD-RESULT-SET
router.route("/add-result-set").post(addResultSet);

// GET-RESULT-SET
router.route("/get-result-set").post(getResultSet);

// SET-RESULT-SET-BY-ID
router.route("/get-result-set-id").post(getResultSetById);


module.exports = router;