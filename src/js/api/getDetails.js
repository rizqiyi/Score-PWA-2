import { getData } from "./fetchAPI.js";
import { baseURLgetTeamByID } from "./baseURL.js";
import { saveForLater } from "../idb/idb.js";

const getDetailsTeam = () => {
  let urlParamsId = new URLSearchParams(window.location.search).get("id");
  if ("caches" in window) {
    caches.match(baseURLgetTeamByID(urlParamsId)).then((res) => {
      if (res) {
        res.json().then((data) => {
          console.log(data);
          let contentDetailTeam = "";
          contentDetailTeam += `
                  <div class="control__image__details">
                      <img class="materialboxed control__image" width="300"
                          src="${data.crestUrl}" data-caption="Bayern Munchen">
                  </div>
                  <div class="text-details">
                      <hr>
                      <div class="control__content__details">
                          <h3 id="text-team">${data.name}</h3>
                          <a
                              data-id="${data.id}" 
                              data-name="${data.name}" 
                              data-venue="${data.venue}" 
                              data-website="${data.website}" 
                              class="waves-effect waves-light btn btn-small orange darken-3 white-text inherit-text btn-add">
                          <i class="material-icons left">add</i>
                          Add To Favourite</a>
                          <h6>Color : ${data.clubColors}</h6>
                          <h6>Founded : ${data.founded}</h6>
                          <h6>Short Name : ${data.shortName}</h6>
                          <h6>Venue : ${data.venue}</h6>
                          <h6>Email : ${data.email}</h6>
                          <h6>Phone : ${data.phone}</h6>
                          <h6>Website : ${data.website}</h6>
                      </div>
                  </div>
                  `;

          document.querySelector(".team-details").innerHTML = contentDetailTeam;

          clickedButton();
        });
      }
    });
  }

  getData(baseURLgetTeamByID(urlParamsId)).then((data) => {
    document.getElementById("linear-progress").style.display = "none";
    let contentDetailTeam = "";
    contentDetailTeam += `
          <div class="control__image__details">
              <img class="materialboxed control__image" width="300"
                  src="${data.crestUrl}" data-caption="Bayern Munchen">
          </div>
          <div class="text-details">
              <hr>
              <div class="control__content__details">
                  <h3 id="text-team">${data.name}</h3>
                  <a 
                      data-id="${data.id}" 
                      data-crestUrl="${data.crestUrl}" 
                      data-name="${data.name}" 
                      data-venue="${data.venue}" 
                      data-website="${data.website}"  
                      class="waves-effect waves-light btn btn-small orange darken-3 white-text inherit-text btn-add">
                    <i class="material-icons left">add</i>
                    Add To Favourite
                  </a>
                  <h6>Color : ${data.clubColors}</h6>
                  <h6>Founded : ${data.founded}</h6>
                  <h6>Short Name : ${data.shortName}</h6>
                  <h6>Venue : ${data.venue}</h6>
                  <h6>Email : ${data.email}</h6>
                  <h6>Phone : ${data.phone}</h6>
                  <h6>Website : ${data.website}</h6>
              </div>
          </div>
          `;

    document.querySelector(".team-details").innerHTML = contentDetailTeam;
    clickedButton();
  });
};

const clickedButton = () => {
  Array.from(document.getElementsByClassName("btn-add")).forEach((elm) => {
    elm.addEventListener("click", (event) => {
      saveForLater({
        id: parseInt(event.target.getAttribute("data-id")),
        name: event.target.getAttribute("data-name"),
        crestUrl: event.target.getAttribute("data-crestUrl"),
        venue: event.target.getAttribute("data-venue"),
        website: event.target.getAttribute("data-website"),
      });
    });
  });
};

export { getDetailsTeam, clickedButton };
