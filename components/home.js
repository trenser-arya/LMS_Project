document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});
function loadPage() {
  const cards = document.getElementById("card-main");
  const updateUser = document.getElementById("update-user");
  const userId = sessionStorage.getItem("userId");
  axios
    .get("http://localhost:9453/viewbook")
    .then((response) => {
      cards.innerHTML = "";
      if (response.status === 200) {
        response.data.forEach((book) => {
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                        <img src="../assests/book.jpg"/>
                        <div class="container">
                            <h4><b>${book.bookname}</b></h4>
                            <p>${book.author}</p>
                            <a href="single-book-view.html?id=${book._id}">More Details</a>
                        </div>
                    `;
          cards.appendChild(card);
        });
      } else {
        alert(response.data.error);
      }
    })
    .catch((error) => {
      console.log("Failed To Load The Page", error);
    });
  
  document.getElementById("logout").addEventListener("click", function () {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "signup.html";
  });
  const params = new URLSearchParams(location.search);
  const bookId = params.get("id");
  if (bookId) {
    axios
      .get(`http://localhost:9453/singlebook/${bookId}`)
      .then((response) => {
        if (response.status === 200) {
          const book = response.data;
          document.getElementById("book").textContent = book.bookname;
          document.getElementById(
            "author"
          ).textContent = `Author : ${book.author}`;
          document.getElementById(
            "isbn"
          ).textContent = `ISBN No. : ${book.isbn}`;
          document.getElementById(
            "year"
          ).textContent = `Publication Year : ${book.publicationYear}`;
          document.getElementById(
            "price"
          ).textContent = `Price : ${book.price}`;
          document.getElementById(
            "description"
          ).textContent = `Description : ${book.description}`;
        } else {
          alert("Book not found");
        }
      })
      .catch((error) => {
        console.log("Error fetching book details", error);
      });
  }
  const searchButton = document.getElementById("search-button");
  const searchInput = document.getElementById("search-input");
  searchButton.addEventListener("click", function () {
    const searchTerm = searchInput.value.toLowerCase();
    axios
      .get("http://localhost:9453/viewbook")
      .then((response) => {
        cards.innerHTML = "";
        if (response.status === 200) {
          const filteredBooks = response.data.filter((book) =>
            book.bookname.toLowerCase().includes(searchTerm)
          );
          if (filteredBooks.length > 0) {
            filteredBooks.forEach((book) => {
              const card = document.createElement("div");
              card.classList.add("card");
              card.innerHTML = `
                <img src="../assests/book.jpg"/>
                <div class="container">
                    <h4><b>${book.bookname}</b></h4>
                    <p>${book.author}</p>
                    <a href="single-book-view.html?id=${book._id}">More Details</a>
                </div>
            `;
              cards.appendChild(card);
            });
          } else {
            cards.innerHTML = `<p>No books found for "${searchTerm}".</p>`;
          }
        }
      })
      .catch((error) => {
        console.log("Failed To Search Books", error);
      });
  });
  if (updateUser) {
    updateUser.addEventListener("click", (event) => {
      event.preventDefault();
      sessionStorage.setItem("profileToUpdate", userId);
      location.href = "signup.html";
    });
  }
}
