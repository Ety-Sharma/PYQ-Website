const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/pyqadda");
mongoose.connect("mongodb+srv://meetysharma15_db_user:dbEty1234@cluster0.8kkkbfx.mongodb.net/pyqadda")

const examSchema = new mongoose.Schema({
    subject: String,
    year: String,
    pdf: String
});

const Exam = mongoose.model("Exam", examSchema);

async function insert() {
    await Exam.insertMany([
        {
            subject: "Signals and system",
            year: "2025",
            pdf: "/pdf/signalandsystem25.pdf"
        },
        {
            subject: "Discrete Math",
            year: "2025",
            pdf: "/pdf/Discretemath2025.pdf"
        },
        {
            subject: "Computer organisation and architecture",
            year: "2025",
            pdf: "/pdf/COA2025.pdf" 
        },
        {
            subject: "DAA",
            year: "2025",
            pdf: "/pdf/DAA2025.pdf" 
        },
        {
            subject: "Economics For Engineers",
            year: "2025",
            pdf: "/pdf/Economics2025.pdf" 
        }
    ]);

    console.log("Data Inserted");
    mongoose.connection.close();
}

insert();