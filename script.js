document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});
function loadPage() {
  const signInButton = document.getElementById("sign-in-button");
  const userSignInButton = document.getElementById("login-button");
  const userSignUpButton = document.getElementById("register-button");
  const addBookButton = document.getElementById("add-button");
  const userLoginPage = document.getElementById("user-signin-page");
  const userRegisterPage = document.getElementById("signup-page");
  const registerLink = document.getElementById("register-link");
  const loginLinkUser = document.getElementById("login-link");
  const bookData = localStorage.getItem("bookToUpdate");
  const userData = sessionStorage.getItem("profileToUpdate");
  if (registerLink) {
    registerLink.addEventListener("click", function (event) {
      event.preventDefault();
      userLoginPage.style.display = "none";
      userRegisterPage.style.display = "block";
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
  if (userSignInButton) {
    userSignInButton.addEventListener("click", function (e) {
      e.preventDefault();
      validateUserLoginPage();
    });
  }
  if (userSignUpButton) {
    userSignUpButton.addEventListener("click", function (e) {
      e.preventDefault();
      validateRegisterPage();
    });
  }
  if (addBookButton) {
    addBookButton.addEventListener("click", function (e) {
      e.preventDefault();
      validateAndAddBook();
    });
  }
  if (userData) {
    userLoginPage.style.display = "none";
    userRegisterPage.style.display = "block";
    document.getElementById("heading").textContent = "Update Profile";
    axios
      .get(`http://localhost:9453/singleuser/${userData}`)
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("person-name").value = response.data.name;
          document.getElementById("username-register").value =
            response.data.username;
          document.getElementById("email-register").value = response.data.email;
          document.getElementById("phone").value = response.data.phone;
          document.getElementById("password-register").value =
            response.data.password;
          document.getElementById("confirm-password").value =
            response.data.password;
          userSignUpButton.textContent = "Update";
          document.getElementById("paragraph-link").textContent = "";
        }
      });
    userSignUpButton.addEventListener("click", function (e) {
      e.preventDefault();
      updateUser(userData);
    });
  }
  if (bookData) {
    axios
      .get(`http://localhost:9453/singlebook/${bookData}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          document.getElementById("book-name").value = response.data.bookname;
          document.getElementById("author").value = response.data.author;
          document.getElementById("publication-year").value =
            response.data.publicationYear;
          document.getElementById("isbn").value = response.data.isbn;
          document.getElementById("price").value = response.data.price;
          document.getElementById("description").value =
            response.data.description;
          addBookButton.textContent = "Update";
        }
      });
    addBookButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      updateBook(bookData);
    });
  }
}
function validateRegisterPage() {
  const nameUser = document.getElementById("person-name");
  const username = document.getElementById("username-register");
  const email = document.getElementById("email-register");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password-register");
  const confirmPassword = document.getElementById("confirm-password");
  let isValid = true;
  if (nameUser.value.trim() == "") {
    document.getElementById("name-validate").textContent = "Name Is Required";
    isValid = false;
  } else {
    document.getElementById("name-validate").textContent = "";
  }
  if (username.value.trim() == "") {
    document.getElementById("username-validate").textContent =
      "Username Is Required";
    isValid = false;
  } else {
    document.getElementById("username-validate").textContent = "";
  }
  if (email.value.trim() == "") {
    document.getElementById("email-validate-register").textContent =
      "Email Is Required";
    isValid = false;
  } else {
    document.getElementById("email-validate-register").textContent = "";
  }
  if (phone.value.trim() == "") {
    document.getElementById("phone-validate").textContent =
      "Phone Number Is Required";
    isValid = false;
  } else {
    document.getElementById("phone-validate").textContent = "";
  }
  if (password.value.trim() == "") {
    document.getElementById("password-validate-register").textContent =
      "Password Is Required";
    isValid = false;
  } else {
    document.getElementById("password-validate-register").textContent = "";
    validatePasswordMatch();
  }
  function validatePasswordMatch() {
    if (password.value !== confirmPassword.value) {
      document.getElementById("confirm-password-validate").textContent =
        "Passwords Don't Match";
      isValid = false;
    } else {
      document.getElementById("confirm-password-validate").textContent = "";
    }
  }
  if (isValid) {
    const data = {
      name: nameUser.value,
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };
    axios
      .post("http://localhost:9453/register", data)
      .then((response) => {
        if (response.status === 200) {
          location.href = "signup.html";
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        alert("Registration failed. Please try again.");
      });
  }
}
function updateUser(userId) {
  const userDetails = {
    name: document.getElementById("person-name").value,
    username: document.getElementById("username-register").value,
    email: document.getElementById("email-register").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password-register").value,
  };
  axios
    .put(`http://localhost:9453/updateuser/${userId}`, userDetails)
    .then((response) => {
      alert("Profile Updated! Please Login To the Site!");
      sessionStorage.removeItem("profileToUpdate");
      location.href = "components/home.html";
    });
}
function updateBook(bookId) {
  const bookDetails = {
    bookname: document.getElementById("book-name").value,
    author: document.getElementById("author").value,
    publicationYear: document.getElementById("publication-year").value,
    isbn: document.getElementById("isbn").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
  };
  axios
    .put(`http://localhost:9453/updatebook/${bookId}`, bookDetails)
    .then((response) => {
      alert("Book updated successfully!");
      localStorage.removeItem("bookToUpdate");
      location.href = "book-list.html";
    })
    .catch((error) => {
      console.error("Error updating the book:", error);
    });
}
function validateUserLoginPage() {
  const usernameUser = document.getElementById("username-login");
  const passwordUser = document.getElementById("password-login");
  let isValid = true;
  if (usernameUser.value.trim() == "") {
    document.getElementById("email-validate-login").textContent =
      "Username Is Required!";
    isValid = false;
  } else {
    document.getElementById("email-validate-login").textContent = "";
  }
  if (passwordUser.value.trim() == "") {
    document.getElementById("password-validate-user").textContent =
      "Password Is Required!";
    isValid = false;
  } else {
    document.getElementById("password-validate-user").textContent = "";
  }
  if (isValid) {
    const data = {
      username: usernameUser.value,
      password: passwordUser.value,
    };
    axios
      .post("http://localhost:9453/login", data)
      .then((response) => {
        if (response.data.status === "ok") {
          sessionStorage.setItem("authToken", response.data.data);
          sessionStorage.setItem("userId", response.data.id);
          if (response.data.role === "user") {
            location.href = "home.html";
          } else {
            location.href = "book-list.html";
          }
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        alert("Login failed. Please try again.");
      });
  }
}
function validateAndAddBook() {
  const bookName = document.getElementById("book-name");
  const author = document.getElementById("author");
  const isbnNumber = document.getElementById("isbn");
  const publicationYear = document.getElementById("publication-year");
  const price = document.getElementById("price");
  const description = document.getElementById("description");
  let isValid = true;
  if (bookName.value.trim() === "") {
    document.getElementById("book-name-validate").textContent =
      "Book Name Is Required";
    isValid = false;
  } else {
    document.getElementById("book-name-validate").textContent = "";
  }
  if (author.value.trim() === "") {
    document.getElementById("author-name-validate").textContent =
      "Author Name Is Required";
    isValid = false;
  } else {
    document.getElementById("author-name-validate").textContent = "";
  }
  if (isbnNumber.value.trim() === "") {
    document.getElementById("isbn-validate").textContent =
      "ISBN Number Is Required";
    isValid = false;
  } else {
    document.getElementById("isbn-validate").textContent = "";
  }
  if (publicationYear.value.trim() === "") {
    document.getElementById("year-validate").textContent =
      "Publication Year Is Required";
    isValid = false;
  } else {
    document.getElementById("year-validate").textContent = "";
  }
  if (price.value.trim() === "") {
    document.getElementById("price-validate").textContent = "Price Is Required";
    isValid = false;
  } else {
    document.getElementById("price-validate").textContent = "";
  }
  if (description.value.trim() === "") {
    document.getElementById("description-validate").textContent =
      "Description Is Required";
    isValid = false;
  } else {
    document.getElementById("description-validate").textContent = "";
  }
  if (isValid) {
    const data = {
      bookname: bookName.value,
      author: author.value,
      isbn: isbnNumber.value,
      publicationYear: publicationYear.value,
      price: price.value,
      description: description.value,
    };
    axios
      .post("http://localhost:9453/createbook", data)
      .then((response) => {
        if (response.status === 200) {
          alert("Book added Successfully");
          location.href = "book-list.html";
        } else {
          alert(response.data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}