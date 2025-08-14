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

toggleBtn.addEventListener("click", () => {
    isSignup = !isSignup;
    if (isSignup) {
        formTitle.textContent = "Create Your Account";
        btnText.textContent = "Sign Up";
        toggleBtn.textContent = "Sign In";
        toggleQuestion.textContent = "Already have an account?";
        signupFields.classList.add("show");
        confirmPasswordGroup.classList.add("show");
        loginOptions.style.display = "none";
    } else {
        formTitle.textContent = "Welcome Back";
        btnText.textContent = "Sign In";
        toggleBtn.textContent = "Sign Up";
        toggleQuestion.textContent = "Don't have an account?";
        signupFields.classList.remove("show");
        confirmPasswordGroup.classList.remove("show");
        loginOptions.style.display = "block";
    }
});

document.querySelectorAll(".password-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const input = document.getElementById(targetId);
        input.type = input.type === "password" ? "text" : "password";
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    btnText.textContent = isSignup ? "Signing Up..." : "Signing In...";
    loadingSpinner.style.display = "inline-block";

    setTimeout(() => {
        loadingSpinner.style.display = "none";
        btnText.textContent = isSignup ? "Sign Up" : "Sign In";

        window.location.href = "home.html";
    }, 2000);
});
