import { deleteById, getAll } from "../idb/idb.js";

const getSavedTeam = () => {
  getAll().then((teams) => {
    let teamSaved = "";
    if (teams.length !== 0) {
      document.querySelector("#linear-progress").style.display = "none";
      document.querySelector("#mb-space").style.display = "block";
      teams.map((team) => {
        teamSaved += `
            <div class="col s12 m6 l6 xl4">
                <div class="card white darken-1" id="card__space">
                <a class="btn-floating halfway-fab waves-effect waves-light orange darken-3 delete-btn">
                        <i class="medium material-icons" 
                        data-id="${team.id}" 
                        data-name="${team.name}" 
                        data-venue="${team.venue}" 
                        data-website="${team.website}">delete</i>
                </a>
                    <div class="card-content black-text center-align" id="hover-card">
                        <img class="responsive-img" alt="Logo ${team.name}" width="100px" src="${team.crestUrl}" />
                        <h6 class="truncate card-title">${team.name}</h6>
                        <p class="left-align">${team.venue}</p>
                        <p class="left-align">${team.website}</p>
                    </div>
                </div>
            </div>
            `;

        document.querySelector("#favorit-card").innerHTML = teamSaved;
        handleDelete();
      });
    } else {
      document.querySelector("#linear-progress").style.display = "none";
      document.querySelector("#mb-space").style.display = "block";
      document.querySelector("#favorit-card").innerHTML =
        "<p>Tidak ada Tim, Silakan tambahkan tim pada Halaman Detail Tim.</p>";
    }
  });
};

const handleDelete = () => {
  Array.from(document.getElementsByClassName("delete-btn")).forEach((elm) =>
    elm.addEventListener("click", (event) => {
      deleteById(
        parseInt(event.target.getAttribute("data-id")),
        event.target.getAttribute("data-name")
      ).then(getSavedTeam());
    })
  );
};

export { getSavedTeam };
