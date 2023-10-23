const express = require("express");
const { addResultSet, getResultSet } = require("../controllers/resultSetController");
const router = express.Router();


// ADD-RESULT-SET
router.route("/add-result-set").post(addResultSet);

// GET-RESULT-SET
router.route("/get-result-set").post(getResultSet);


module.exports = router;