document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});
function loadPage() {
  const signInButton = document.getElementById("sign-in-button");
  const signUpButton = document.getElementById("sign-up-button");
  const userLoginPage = document.getElementById("user-signin-page");
  const adminLoginPage = document.getElementById("admin-signin-page");
  const userRegisterPage = document.getElementById("signup-page");
  const registerLink = document.getElementById("register-link");
  const adminLoginLink = document.getElementById("admin-login-link");
  const userLoginLink = document.getElementById("user-login-link");
  const loginLinkUser = document.getElementById("login-link");
  if (registerLink) {
    registerLink.addEventListener("click", function (event) {
      event.preventDefault();
      userLoginPage.style.display = "none";
      userRegisterPage.style.display = "block";
    });
  }

  if (adminLoginLink) {
    adminLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      adminLoginPage.style.display = "block";
      userLoginPage.style.display = "none";
    });
  }

  if (userLoginLink) {
    userLoginLink.addEventListener("click", function (event) {
      event.preventDefault();
      userLoginPage.style.display = "block";
      adminLoginPage.style.display = "none";
    });
  }
  if (loginLinkUser) {
    loginLinkUser.addEventListener("click", function (event) {
      event.preventDefault();
      userLoginPage.style.display = "block";
      userRegisterPage.style.display = "none";
    });
  }
  if (signInButton) {
    signInButton.addEventListener("click", function () {
      location.href = "components/signup.html";
    });
  }

  if (signUpButton) {
    signUpButton.addEventListener("click", function (event) {
      location.href = "components/signup.html";
    });
  }
}
