const express = require("express");
const { loginAdmin } = require("../controllers/adminController");
const router = express.Router();


// LOGIN-ADMIN
router.route("/login").post(loginAdmin);

module.exports = router;