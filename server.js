// const express = require("express");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// const PORT = 3000;

// // Serve frontend files (HTML, CSS, JS)
// app.use(express.static("public"));

// // Serve PDF files
// app.use("/pdf", express.static("pdf"));


// // 🔥 API: Auto-read PDFs from folder
// app.get("/api/pdfs", (req, res) => {

//     const folderPath = path.join(__dirname, "pdf");

//     fs.readdir(folderPath, (err, files) => {

//         if (err) {
//             console.log(err);
//             return res.status(500).json({ error: "Unable to read files" });
//         }

//         // Filter only PDF files
//         const pdfFiles = files.filter(file => file.endsWith(".pdf"));

//         res.json(pdfFiles);
//     });

// });


// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // if your frontend is in public folder
app.use(session({
    secret:"secret-key",
    resave:false,
    saveUninitialized:false
}));

// 🔗 Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/pyqadda")
mongoose.connect("mongodb+srv://meetysharma15_db_user:dbEty1234@cluster0.8kkkbfx.mongodb.net/pyqadda")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 📌 Schema
const examSchema = new mongoose.Schema({
    subject: String,
    year: String,
    pdf: String
});

const Exam = mongoose.model("Exam", examSchema);
const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type:String,
        unique:true
    },
    
    password: String
});

const User = mongoose.model("User",userSchema);


// 📌 API: Get all exams
app.get("/exams", async (req, res) => {
    const exams = await Exam.find();
    res.json(exams);
});


// 📌 API: Search exams
app.get("/search", async (req, res) => {
    const query = req.query.q;

    const exams = await Exam.find({
        subject: { $regex: query, $options: "i" }
    });

    res.json(exams);
});
//Delete
app.get("/delete",async(req,res)=>{
    await Exam.deleteMany({});
    res.send("All data Deleted");
});
//login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    if (user.password !== password) {
        return res.send("Wrong password");
    }

    res.send("Login successful");
});
//signup
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.send("User already exists");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.send("Signup successful");
});
//forgot password
app.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    user.password = newPassword;
    await user.save();

    res.send("Password updated");
});

// 🚀 Server start 
// app.listen(3000, () => { 
//     console.log("Server running on port 3000"); });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});