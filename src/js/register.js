document.addEventListener("DOMContentLoaded", function () {
  const signupBtn = document.getElementById("Signup");
  const fnameInput = document.getElementById("Fname");
  const lnameInput = document.getElementById("Lname");
  const emailInput = document.getElementById("Email");
  const passwordInput = document.getElementById("Password");
  const confirmPasswordInput = document.getElementById("Confirm-password");

  signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    register();
  });

  function register() {
    const newUser = {
      Fname: fnameInput.value.trim(),
      Lname: lnameInput.value.trim(),
      Email: emailInput.value.trim(),
      Password: passwordInput.value.trim(),
      Confirm_password: confirmPasswordInput.value.trim(),
    };

    // Validate form inputs
    if (!validateInputs(newUser)) {
      return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exists
    if (users.some((user) => user.Email === newUser.Email)) {
      alert("User already exists");
    } else {
      // Add new user to the users array
      users.push(newUser);

      // Save users to localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("User registered successfully");
      window.location.href = "login.html";

      // Clear form inputs
      clearForm();
    }
  }

  function validateInputs(user) {
    if (
      !user.Fname ||
      !user.Lname ||
      !user.Email ||
      !user.Password ||
      !user.Confirm_password
    ) {
      alert("All fields are required.");
      return false;
    }

    if (user.Password !== user.Confirm_password) {
      alert("Passwords do not match.");
      return false;
    }

    return true;
  }

  function clearForm() {
    fnameInput.value = "";
    lnameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
    confirmPasswordInput.value = "";
  }
});
