document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});

function loadPage() {
  const tableBody = document.getElementById("table-body");
  const addBook = document.getElementById("add-book");
  const userListButton = document.getElementById("user-list-button");
  if (userListButton) {
    userListButton.addEventListener("click", function () {
      location.href = "user-list.html";
    })
  }

   if (addBook) {
     addBook.addEventListener("click", function (event) {
       location.href = "create-book-page.html";
     });
   }

  axios
    .get("http://localhost:9453/viewbook")
    .then((response) => {
      tableBody.innerHTML = "";
      if (response.status === 200) {
        response.data.forEach((book) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                        <td>${book.isbn}</td>
                        <td>${book.bookname}</td>
                        <td>${book.author}</td>
                        <td>${book.publicationYear}</td>
                        <td>${book.price}/-</td>
                        <td><button class="buttons update-button">Update</button></td>
                        <td><button class="buttons delete-button" data-id="${book._id}">Delete</button></td>
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
}

function attachDeleteHandlers() {
  const deleteButtons = document.querySelectorAll(".delete-button");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const bookId = this.getAttribute("data-id");
      deleteBook(bookId);
    });
  });
}

function deleteBook(bookId) {
  if (confirm("Are you sure you want to delete this book?")) {
    axios
      .delete(`http://localhost:9453/deletebook/${bookId}`)
      .then((response) => {
        if (response.status === 200) {
          loadPage();
        } else {
          alert("Failed to delete the book");
        }
      })
      .catch((error) => {
        console.error("Error deleting the book:", error);
      });
  }
}
