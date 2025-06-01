const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Load saved theme on page load
window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️"; // Light mode icon
  } else {
    toggleBtn.textContent = "🌙"; // Dark mode icon
  }
});

// Toggle theme and save it
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
});

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const description = document.getElementById("descrip").value.trim();
  const button = this.querySelector("button");

  if (!email || !description) {
    alert("Please fill in all required fields.");
    return;
  }

  // UI Feedback
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, description }),
    });

    const result = await response.json();

    if (response.ok) {
      const popup = document.getElementById("success-popup");
popup.style.display = "block";
this.reset();

setTimeout(() => {
  popup.style.display = "none";
}, 3000);

    } else {
      const errorPopup = document.getElementById("error-popup");
errorPopup.textContent = result.message || "Failed to send message.";
errorPopup.style.display = "block";

setTimeout(() => {
  errorPopup.style.display = "none";
}, 3000);

    }
  } catch (error) {
    alert("An error occurred. Please try again.");
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Send Message";
  }
});
