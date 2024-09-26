document.addEventListener("DOMContentLoaded", function () {
  loadPage();
});

function loadPage() {
  const tableBody = document.getElementById("table-body");
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
                        <td><button class="buttons delete-button" data-id="${user._id}">Block</button></td>
                    `;
          tableBody.appendChild(row);
        });
      } else {
        alert(response.data.error);
      }
    })
    .catch((error) => {
      console.error("Failed to load the page:", error);
    });
}