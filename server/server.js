const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
var cors = require("cors");
const connectionDB = require("./config/dbConnection");
const adminRoute = require("./routes/adminRoute");
const studentRoute = require("./routes/studentRoute");
const courseRoute = require("./routes/courseRoute");
const subjectRoute = require("./routes/subjectRoute");
const examSetRoute = require("./routes/examSetRoute");
const resultSetRoute = require("./routes/resultSetRoute");
const notificationRoute = require("./routes/notificationRoute");
const app = express();

// Allow cross-origin-policy
app.use(cors());


//Get req.body in JSON format
app.use(express.json());

app.use(cors({
  origin: '*',  // Replace with your frontend's URL
}));


// Secret Info
dotenv.config({ path: "./server/config.env" });

const PORT = process.env.PORT || 9000;
const AWS_URI = process.env.AWS_URI;

// Database connection
connectionDB();


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

// Routes
app.use("/api/students", studentRoute);
app.use("/api/admins", adminRoute);
app.use("/api/courses", courseRoute);
app.use("/api/subjects", subjectRoute);
app.use("/api/examSets", examSetRoute);
app.use("/api/resultSets", resultSetRoute);
app.use("/api/notification", notificationRoute);

const dirname = path.resolve();
app.use('/public', express.static(path.join(dirname, '/public')))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
