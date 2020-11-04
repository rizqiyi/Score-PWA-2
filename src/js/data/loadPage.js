import { getDataTable, getTeams, getSchedule } from "../api/api.js";
import { getSavedTeam } from "../api/getSaved.js";

const loadPage = (page) => {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let content = document.querySelector("#body-content");

      page === "klasemen"
        ? getDataTable()
        : page === "tim"
        ? getTeams()
        : page === "jadwal"
        ? getSchedule()
        : page === "favorit"
        ? getSavedTeam()
        : null;

      this.status === 200
        ? (content.innerHTML = xhttp.responseText)
        : this.status === 404
        ? (content.innerHTML = "<p>Halaman tidak ditemukan</p>")
        : (content.innerHTML = "<p>Halaman tidak tidak bisa diakses</p>");

      const scrollSpy = document.querySelectorAll(".scrollspy");
      M.ScrollSpy.init(scrollSpy, {
        scrollOffset: 70,
        throttle: 50,
      });

      const collapsible = document.querySelectorAll(".collapsible");
      M.Collapsible.init(collapsible);
    }
  };
  xhttp.open("GET", `../../pages/${page}.html`, true);
  xhttp.send();
};

export { loadPage };
