require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose"); // ✅ הוספת Mongoose
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 2000;

app.use(express.json());

connectDB(); // התחברות למסד הנתונים
mongoose.connection.once('open', () => console.log(' Connected to MongoDB'));
mongoose.connection.on('error', err => console.log(' MongoDB connection error:', err));
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); 

const userRout = require("./routes/userRout");
const todosRout = require("./routes/todosRout");
const postRout = require("./routes/postRout");
const photoRout = require("./routes/photoRout");

app.use("/api/users", userRout);
app.use("/api/todos", todosRout);
app.use("/api/posts", postRout);
app.use("/api/photos", photoRout);

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
