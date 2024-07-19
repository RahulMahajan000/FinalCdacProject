const express = require("express");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");
const connectDB = require("./configs/dbConfig");
const userRoute = require("./routes/userRoute");
const { restrictToLoggedInOnly } = require("./middlewares/auth");
const cors = require("cors");
const testingRoutes = require("./routes/testingRoutes");
// process.setMaxListeners(15);
app.use(cors());

require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("hello world ");
});
app.get("/dashboard", restrictToLoggedInOnly, (req, res) => {
    res.send("dashboard");
});

app.use("/testing", testingRoutes);
app.use("/user", userRoute);

connectDB("mongodb://localhost:27017/cdacFinalProject" || process.env.MONGO_URL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log(err);
    });

app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});

app.listen(port, () => {
    console.log(`server started on port ${port} as http://localhost:${port}`);
});