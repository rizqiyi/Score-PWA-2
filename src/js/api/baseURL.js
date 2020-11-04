export const baseURL = "https://api.football-data.org/v2/";

export const baseURLStandings =
  "https://api.football-data.org/v2/competitions/BL1/standings";

export const baseURLTeams =
  "https://api.football-data.org/v2/competitions/BL1/teams";

export const baseURLSchedule =
  "https://api.football-data.org/v2/competitions/BL1/matches?status=SCHEDULED&dateFrom=2020-11-01&dateTo=2020-11-30";

export const baseURLgetTeamByID = (id) =>
  `https://api.football-data.org/v2/teams/${id}`;
