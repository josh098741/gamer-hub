const API_URL = "http://localhost:5000/api/auth";

// Handle login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
        // Save user in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "index.html"; // redirect after login
    } else {
        alert(data.error);
    }
});

// Display user in header
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        const header = document.querySelector("header");
        header.innerHTML += `
            <div class="user-info">
                <img src="${user.avatar}" alt="avatar" width="40" height="40">
                <span>${user.username}</span>
            </div>
        `;
    }
});
