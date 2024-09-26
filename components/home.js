document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});

function loadPage() {
  const cards = document.getElementById("card-main");
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
                            <a href="single-book-view.html?id=${book._id} id="${book._id}">More Details</a>
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
}
