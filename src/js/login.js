document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("login-btn");
  const emailInput = document.getElementById("Email");
  const passwordInput = document.getElementById("Password");
  const errorMsg = document.getElementById("error_msg");

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === "" || passwordValue === "") {
      showError("Please enter both email and password.");
      loginBtn.disabled = true;
    } else {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (user) => user.Email === emailValue && user.Password === passwordValue
      );

      if (!user) {
        showError("Invalid Email or Password");
      } else {
        localStorage.setItem("currentUser", JSON.stringify(user));
        errorMsg.style.display = "none";
        loginBtn.disabled = false;
        window.location.href = "index.html";
      }
    }

    emailInput.value = "";
    passwordInput.value = "";
  });

  function showError(message) {
    errorMsg.style.display = "block";
    errorMsg.textContent = message;
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 2000);
  }
});
