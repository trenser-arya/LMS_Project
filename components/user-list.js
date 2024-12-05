document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});
function loadPage() {
  const tableBody = document.getElementById("table-body");
  const bookListButton = document.getElementById("book-list-button");
  const userListButton = document.getElementById("user-list-button");
  axios
    .get("http://localhost:9453/viewuser")
    .then((response) => {
      tableBody.innerHTML = "";
      if (response.status === 200) {
        response.data.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.phone}</td>
                        <td><button class="buttons delete-button" data-id="${user._id}">Delete User</button></td>
                    `;
          tableBody.appendChild(row);
        });
        attachDeleteHandlers();
      } else {
        alert(response.data.error);
      }
    })
    .catch((error) => {
      console.error("Failed to load the page:", error);
    });
  if (bookListButton) {
    bookListButton.addEventListener("click", function () {
      location.href = "book-list.html";
    });
  }
  if (userListButton) {
    userListButton.addEventListener("click", function () {
      location.href = "user-list.html";
    });
  }
}
function attachDeleteHandlers() {
  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data-id");
      deleteUser(userId);
    });
  });
}

function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this User?")) {
    axios
      .delete(`http://localhost:9453/deleteuser/${userId}`)
      .then((response) => {
        if (response.status === 200) {
          loadPage();
        } else {
          alert("Failed to delete the User");
        }
      })
      .catch((error) => {
        console.error("Error deleting the User:", error);
      });
  }
}