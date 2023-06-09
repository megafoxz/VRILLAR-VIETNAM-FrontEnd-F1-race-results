import HttpClient from "../plugins/httpClient";
const url = "https://www.formula1.com/en/results.html/";

var httpClient = new HttpClient(url);

// export function fetchRaceData() {
//   return axios
//     .get(url, {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//       },
//     })
//     .then((response) => {
//       const html = response.data;
//       console.log(html);
//       //   const $ = cheerio.load(html);

//       //   const title = $("title").text();
//       //   console.log("Title:", title);

//       //   const raceNames: string[] = [];
//       //   $(".listing-item__title").each((index, element) => {
//       //     raceNames.push($(element).text());
//       //   });

//       //   console.log("Race Names:");
//       //   raceNames.forEach((name) => {
//       //     console.log(name);
//       //   });

//       //   const specificRaceUrl =
//       //     "https://www.formula1.com/en/results.html/2023/races/1088/saudi-arabia.html";
//       //   return axios
//       //     .get(specificRaceUrl)
//       //     .then((specificRaceResponse) => {
//       //       const specificRaceHtml = specificRaceResponse.data;
//       //       const specificRace$ = cheerio.load(specificRaceHtml);

//       //       const resultsTable = specificRace$(".resultsarchive-table");
//       //     })
//       //     .catch((error) => {
//       //       console.error("Error fetching specific race:", error);
//       //     });
//     })
//     .catch((error) => {
//       console.error("Error fetching webpage:", error);
//     });
// }

export default {
  fetchRaceData() {
    return httpClient.get(`/2023/races.html`);
  },
};
