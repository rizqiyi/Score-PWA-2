import { loadPage } from "../data/loadPage.js";
document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".sidenav");

  M.Sidenav.init(elems);

  let page = window.location.hash.substr(1);

  if (page === "") page = "klasemen";
  loadPage(page);

  const loadNav = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              const sideNav = document.querySelector(".sidenav");

              M.Sidenav.getInstance(sideNav).close();

              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "../../components/nav.html", true);
    xhttp.send();
  };
  loadNav();
});
