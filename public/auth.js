function showMessage(message) {
    const msg = document.getElementById("msg");
    msg.innerText = message;
    msg.style.top = "20px";

    setTimeout(() => {
        msg.style.top = "-100px";
    }, 3000);
}

// LOGIN
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        showMessage("Fill all fields");
        return;
    }
    // ✅ Email validation
if (!email.includes("@") || !email.includes(".")) {
    showMessage("Enter a valid email");
    return;
}

// ✅ Password validation
if (password.length < 4) {
    showMessage("Password must be at least 4 characters");
    return;
}

    try {
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const text = await res.text();

        if (text === "Login successful") {
            showMessage("Login successful");

            window.location.href = "dashboard.html";
        } else {
            showMessage(text); // shows "Wrong password" or "User not found"
        }

    } catch (err) {
        alert("Error occurred");
    }
}
// SIGNUP
async function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        showMessage("Fill all fields");
        return;
    }
     // ✅ Email validation
if (!email.includes("@") || !email.includes(".")) {
    showMessage("Enter a valid email");
    return;
}

// ✅ Password validation
if (password.length < 4) {
    showMessage("Password must be at least 4 characters");
    return;
}

    try {
        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const text = await res.text();
        if (text === "Signup successful") {
    showMessage("Account created successfully! Redirecting...");
    
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 1500);
}
 else {

            showMessage(text); // user already exists
        }

    } catch (err) {
        alert("Error occurred");
    }
}
//Forgot Password
async function forgotPassword() {
    const email = document.getElementById("email").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    const newPassword = prompt("Enter new password");

    if (!newPassword) return;

    try {
        const res = await fetch("/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, newPassword })
        });

        const text = await res.text();
        showMessage(text, "green");

    } catch (err) {
        showMessage("Error occurred");
    }
}