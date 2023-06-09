const { default: axios } = require("axios");
const express = require("express");
const cheerio = require("cheerio");

var cors = require("cors");

const app = express();
app.use(cors());

const port = 4000;

app.get("/", (req, res) => {
  console.log("Hello World");
  res.send("Hello World!");
});

async function fetchRaceData() {
  const url = "https://www.formula1.com/en/results.html/2023/races.html";
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const raceResults = [];

  $(".resultsarchive-table")
    .find("tbody tr")
    .each((index, element) => {
      const tds = $(element).find("td");
      const raceResult = {
        position: $(tds[0]).text().trim(),
        driver: $(tds[1]).text().trim(),
        car: $(tds[2]).text().trim(),
        laps: $(tds[3]).text().trim(),
        time: $(tds[4]).text().trim(),
        pts: $(tds[5]).text().trim(),
      };
      raceResults.push(raceResult);
    });

  console.log(raceResults);

  return raceResults;
}

app.get("/race", async (req, res) => {
  await fetchRaceData();
  res.send("Hello World!");
});

// app.get("/race", async (req, res) => {
//   await fetchRaceData();
//   return res.send("success");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
