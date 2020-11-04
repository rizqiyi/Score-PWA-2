document.addEventListener("DOMContentLoaded", () => {
  const footer = () => {
    let xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        let footer = document.querySelector(".page-footer");

        footer.innerHTML = xhttp.responseText;
      }
    };
    xhttp.open("GET", "../components/footer.html", true);
    xhttp.send();
  };
  footer();
});
