const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️"; // Light mode icon
  } else {
    toggleBtn.textContent = "🌙"; // Dark mode icon
  }
});

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");

  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);

  toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
});
