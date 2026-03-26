// const pdfFiles=[
//     "signalandsystem25.pdf",
//     "Discretemath2025.pdf",
//     "COA2025.pdf",
//     "DAA2025.pdf",
//     "Economics2025.pdf"
// ];
// //Select elements
// const container=document.getElementById("cardContainer");
// const searchInput=document.getElementById("search");
// const suggestionBox=document.getElementById("suggestions");

// //Function to create cards
// function showExams(list){
//     container.innerHTML="";
//     list.forEach(file =>{
//         const examName=file.replace(".pdf","").replace("_","");
//         const card=document.createElement("div");
//         card.classList.add("card");
//         card.innerHTML=`<div class="card-icon">📄</div>
// <h3>${examName}</h3>
// `;


// card.onclick = () => {
// window.location.href="pdf/" + file;
// };

// container.appendChild(card);

// });

// }


// // SHOW ALL CARDS FIRST

// showExams(pdfFiles);



// // SEARCH FUNCTION

// searchInput.addEventListener("keyup", function(){

// const value = this.value.toLowerCase();

// const filtered = pdfFiles.filter(file =>
// file.toLowerCase().includes(value)
// );

// showExams(filtered);


// // DROPDOWN SUGGESTIONS

// suggestionBox.innerHTML = "";

// if(value === "") return;

// filtered.forEach(file => {

// const examName = file.replace(".pdf","").replace("_"," ");

// const item = document.createElement("div");

// item.classList.add("suggestion-item");

// item.textContent = examName;

// item.onclick = () => {
// window.open("pdf/" + file , "_blank");
// };

// suggestionBox.appendChild(item);

// });

// });
// const container = document.getElementById("cardContainer");
// const searchInput = document.getElementById("search");
// const suggestionBox = document.getElementById("suggestions");

// let pdfFiles = [];


// // 🔹 Load PDFs from backend
// async function loadPDFs(){

//     try {
//         const res = await fetch("/api/pdfs");
//         pdfFiles = await res.json();

//         showExams(pdfFiles);

//     } catch (error) {
//         console.error("Error loading PDFs:", error);
//     }
// }


// // 🔹 Show Cards
// function showExams(list){

//     container.innerHTML = "";

//     list.forEach(file => {

//         const examName = file
//             .replace(".pdf","")
//             .replaceAll("_"," ");

//         const card = document.createElement("div");
//         card.classList.add("card");

//         card.innerHTML = `
//         <div class="card-icon">📄</div>
//         <h3>${examName}</h3>
//         `;

//         card.onclick = () => {
//             window.location.href = "/pdf/" + file;
//         };

//         container.appendChild(card);

//     });
// }


// // 🔹 Search + Suggestions
// searchInput.addEventListener("keyup", function(){

//     const value = this.value.toLowerCase();

//     const filtered = pdfFiles.filter(file =>
//         file.toLowerCase().includes(value)
//     );

//     // Update cards
//     showExams(filtered);

//     // Update dropdown
//     suggestionBox.innerHTML = "";

//     if(value === "") return;

//     filtered.forEach(file => {

//         const examName = file

//             .replace(".pdf","")
//             .replaceAll("_"," ");

//         const item = document.createElement("div");
//         item.classList.add("suggestion-item");

//         item.textContent = examName;

//         item.onclick = () => {
//             window.location.href = "/pdf/" + file;
//         };

//         suggestionBox.appendChild(item);

//     });

// });


// // 🔹 Load when page opens
// loadPDFs();
const container = document.getElementById("cardContainer");
const searchInput = document.getElementById("search");
const suggestionBox = document.getElementById("suggestions");

let pdfFiles = [];

// 🔹 Load data from backend
async function loadPDFs() {
    try {
        const res = await fetch("/exams"); // from server.js
        pdfFiles = await res.json();

        showExams(pdfFiles);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

// 🔹 Show cards
function showExams(list) {
    container.innerHTML = "";

    list.forEach(item => {
        const examName = item.subject + " " + item.year;

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-icon">📄</div>
            <h3>${examName}</h3>
        `;

        card.onclick = () => {
            window.location.href= item.pdf; // open PDF
        };

        container.appendChild(card);
    });
}

// 🔹 Search + Suggestions (CONNECTED TO DATABASE)
searchInput.addEventListener("keyup", async function () {

    const value = this.value.toLowerCase();

    // 🔥 fetch from backend
    const res = await fetch(`/search?q=${value}`);
    const filtered = await res.json();

    // 🔹 Update cards
    showExams(filtered);

    // 🔹 Update suggestions
    suggestionBox.innerHTML = "";

    if (value === "") return;

    filtered.forEach(item => {

        const examName = item.subject + " " + item.year;

        const div = document.createElement("div");
        div.classList.add("suggestion-item");

        div.textContent = examName;

        div.onclick = () => {
            searchInput.value = examName;
            suggestionBox.innerHTML = "";
            // window.open(item.pdf, "_blank");
             window.location.href= item.pdf;
        };

        suggestionBox.appendChild(div);
    });
});

// 🔹 Load on page open
loadPDFs();