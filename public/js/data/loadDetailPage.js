import { getDetailsTeam } from "../api/getDetails.js";

document.addEventListener("DOMContentLoaded", () => {
  const loadDetailPage = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        getDetailsTeam();
        let content = document.querySelector("#content-details");

        if (this.status === 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan</p>";
        } else {
          content.innerHTML = "<p>Halaman tidak tidak bisa diakses</p>";
        }
      }
    };

    xhttp.open("GET", `../../pages/details-team.html`, true);
    xhttp.send();
  };
  loadDetailPage();
});
