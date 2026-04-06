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
            subject: "Discrete Math 2025",
            year: "2025",
            pdf: "/pdf/Discretemath2025.pdf"
        },
        {
            subject: "Computer organisation and architecture",
            year: "2025",
            pdf: "/pdf/COA2025.pdf" 
        },
        {
            subject: "DAA 2025",
            year: "2025",
            pdf: "/pdf/DAA2025.pdf" 
        },
        {
            subject: "Computer Network",
            year: "2022,23,24,25",
            pdf: "/pdf/Computer Network.pdf" 
        },
         {
            subject: "cyber law and ethics",
            year: "2022,23,24",
            pdf: "/pdf/Cyber Law and Ethics22,23,24.pdf" 
        },
         {
            subject: "DAA",
            year: "2019,20,23,24",
            pdf: "/pdf/Design & analysis20,23,24,19.pdf" 
        },
         {
            subject: "ICT",
            year: "2022,23,24,25",
            pdf: "/pdf/ICT 22,23,24.pdf" 
        },
        {
            subject: "Distributed Systems",
            year: "2022,23,24,25",
            pdf: "/pdf/Distributed systems.pdf" 
        },
        {
            subject: "Message of Bhagvad Gita",
            year: "2024",
            pdf: "/pdf/Message of Bhagvad Gita.pdf" 
        },
         {
            subject: "Software Engineering",
            year: "2024",
            pdf: "/pdf/Software Engineering.pdf" 
        },
         {
            subject: "Intelligent System",
            year: "2022,23,24,25",
            pdf: "/pdf/Intelligent Systems.pdf" 
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