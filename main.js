const form = document.getElementById("authForm");
const btnText = document.getElementById("btnText");
const loadingSpinner = document.getElementById("loadingSpinner");
const toggleBtn = document.getElementById("toggleBtn");
const formTitle = document.getElementById("formTitle");
const signupFields = document.getElementById("signupFields");
const confirmPasswordGroup = document.getElementById("confirmPasswordGroup");
const loginOptions = document.getElementById("loginOptions");
const toggleQuestion = document.getElementById("toggleQuestion");

let isSignup = false;

// Toggle between Sign In and Sign Up
toggleBtn.addEventListener("click", () => {
  isSignup = !isSignup;
  formTitle.textContent = isSignup ? "Create Your Account" : "Welcome Back";
  btnText.textContent = isSignup ? "Sign Up" : "Sign In";
  toggleBtn.textContent = isSignup ? "Sign In" : "Sign Up";
  toggleQuestion.textContent = isSignup
    ? "Already have an account?"
    : "Don't have an account?";
  
  signupFields.classList.toggle("show", isSignup);
  confirmPasswordGroup.classList.toggle("show", isSignup);
  loginOptions.style.display = isSignup ? "none" : "block";
});

// Password show/hide toggle
document.querySelectorAll(".password-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const input = document.getElementById(targetId);
    input.type = input.type === "password" ? "text" : "password";
  });
});

// Form submit simulation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnText.textContent = isSignup ? "Signing Up..." : "Signing In...";
  loadingSpinner.style.display = "inline-block";

  setTimeout(() => {
    loadingSpinner.style.display = "none";
    btnText.textContent = isSignup ? "Sign Up" : "Sign In";
    alert(isSignup ? "Account created successfully!" : "Login successful!");
    // Redirect example:
    // window.location.href = "home.html";
  }, 1500);
});
