import { getData } from "./fetchAPI.js";
import { baseURLStandings, baseURLTeams, baseURLSchedule } from "./baseURL.js";
import moment from "../main/moment.js";

const getDataTable = () => {
  if ("caches" in window) {
    caches.match(baseURLStandings).then((res) => {
      if (res) {
        res.json().then((data) => {
          console.log(data);
          let articlesHTML = "";
          data.standings[0].table.forEach((a, idx) => {
            articlesHTML += `
          <tr>
              <td class="center-align">${++idx}</td>
              <td class="left-align" id="team-name">
              <img src="${a.team.crestUrl}" width="35px" height="20px">
                ${a.team.name}
              </td>
              <td class="left-align">${a.playedGames}</td>
              <td class="left-align">${a.won}</td>
              <td class="left-align">${a.draw}</td>
              <td class="left-align">${a.lost}</td>
              <td class="left-align">${a.points}</td>
          </tr>
          `;
            document.getElementById("api-data").innerHTML = articlesHTML;
          });
        });
      }
    });
  }

  getData(baseURLStandings).then((data) => {
    document.getElementById("linear-progress").style.display = "none";
    document.getElementById("league-name").style.display = "block";
    let articlesHTML = "";

    data.standings[0].table.forEach((a, idx) => {
      articlesHTML += `
          <tr>
              <td class="center-align">${++idx}</td>
              <td class="left-align" id="team-name">
              <img src="${a.team.crestUrl}" width="35px" height="20px">
                ${a.team.name}
              </td>
              <td class="left-align">${a.playedGames}</td>
              <td class="left-align">${a.won}</td>
              <td class="left-align">${a.draw}</td>
              <td class="left-align">${a.lost}</td>
              <td class="left-align">${a.points}</td>
          </tr>
        `;
    });
    document.getElementById("api-data").innerHTML = articlesHTML;
  });
};

const getTeams = () => {
  if ("caches" in window) {
    caches.match(baseURLTeams).then((res) => {
      if (res) {
        res.json().then((data) => {
          let teamCollapsible = "";

          data.teams.map((team) => {
            teamCollapsible += `
                <li>
                    <div class="collapsible-header"><img src="${team.crestUrl}" style="margin-right: 10px" width="30px" height="auto">${team.name}</div>
                    <div class="collapsible-body">
                      <p>
                        Warna tim : ${team.clubColors}
                      </p>
                      <p>
                        Tim terbentuk : ${team.founded}
                      </p>
                      <p>
                        Alamat : ${team.address}
                      </p>
                      <p>
                        Website : ${team.website}
                      </p>
                      <a class="orange-text text-darken-2" href="../../details.html?id=${team.id}">See Details</a>
                    </div>
                </li>
              `;
          });
          document.querySelector(".collapsible").innerHTML = teamCollapsible;
        });
      }
    });
  }

  getData(baseURLTeams).then((data) => {
    document.getElementById("linear-progress").style.display = "none";
    document.querySelector(".text-team").style.display = "block";

    let teamCollapsible = "";

    data.teams.map((team) => {
      teamCollapsible += `
        <li>
            <div class="collapsible-header"><img src="${team.crestUrl}" style="margin-right: 10px" width="30px" height="auto">${team.name}</div>
            <div class="collapsible-body">
              <p>
                Warna tim : ${team.clubColors}
              </p>
              <p>
                Tim terbentuk : ${team.founded}
              </p>
              <p>
                Alamat : ${team.address}
              </p>
              <p>
                Website : ${team.website}
              </p>
              <a class="orange-text text-darken-2" href="../../details.html?id=${team.id}">See Details</a>
            </div>
        </li>
      `;
    });
    document.querySelector(".collapsible").innerHTML = teamCollapsible;
  });
};

const getSchedule = () => {
  if ("caches" in window) {
    caches.match(baseURLSchedule).then((res) => {
      if (res) {
        res.json().then((data) => {
          let scheduledTeams = "";
          document.getElementById("linear-progress").style.display = "none";
          data.matches.map((team) => {
            scheduledTeams += `
                <li class="collection-item">
                    <h6 class="center-align" style="margin: 30px 0px;">${moment(
                      team.utcDate
                    )
                      .utc()
                      .format("YYYY/MM/DD h:mm:ss a")}</h6>
                    <div class="center-align text-center centering-vs">
                        <p class="">VS</p>
                    </div>
                    <div class="content-team-schedule center center-align control-center">
                        <div class="home-team left-align" style="width: 115px;">
                            <p>${team.homeTeam.name}</p>
                        </div>
                        <div class="away-team right-align" style="width: 115px;">
                            <p>${team.awayTeam.name}</p>
                        </div>
                    </div>
                </li>
              `;
          });

          document.querySelector(".collection").innerHTML = scheduledTeams;
        });
      }
    });
  }
  getData(baseURLSchedule).then((data) => {
    document.getElementById("linear-progress").style.display = "none";
    document.getElementById("mb-space").style.display = "block";

    let scheduledTeams = "";

    data.matches.map((team) => {
      console.log(team);
      scheduledTeams += `
        <li class="collection-item">
            <h6 class="center-align" style="margin: 30px 0px;">${moment(
              team.utcDate
            )
              .utc()
              .format("YYYY/MM/DD h:mm:ss a")}</h6>
            <div class="center-align text-center centering-vs">
                <p class="">VS</p>
            </div>
            <div class="content-team-schedule center center-align control-center">
                <div class="home-team left-align" style="width: 115px;">
                    <img width="50px" class="responsive-img center-align" src="https://crests.football-data.org/${
                      team.homeTeam.id
                    }.svg" />
                    <p>${team.homeTeam.name}</p>
                </div>
                <div class="away-team right-align" style="width: 115px;">
                    <img width="50px" class="responsive-img center-align" src="https://crests.football-data.org/${
                      team.awayTeam.id
                    }.svg" />
                    <p>${team.awayTeam.name}</p>
                </div>
            </div>
        </li>
      `;
    });

    document.querySelector(".collection").innerHTML = scheduledTeams;
  });
};

export { getDataTable, getTeams, getSchedule };
