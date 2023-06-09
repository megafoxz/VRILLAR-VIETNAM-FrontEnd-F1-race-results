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

async function fetchRaceLocations(url) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const raceLocations = [];

    $(".resultsarchive-filter-wrap")
      .eq(2)
      .find(".resultsarchive-filter-item a")
      .each((index, element) => {
        const href = $(element).attr("href");
        const name = $(element).text().trim();
        const raceLocation = {
          name,
          url: `https://www.formula1.com${href}`,
        };
        raceLocations.push(raceLocation);
      });

    return raceLocations;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function fetchRaceData(raceURL) {
  try {
    const response = await axios.get(raceURL);
    const html = response.data;
    const $ = cheerio.load(html);

    const raceResults = [];

    const keys = [];
    $(".resultsarchive-table")
      .find("thead tr th")
      .each((index, element) => {
        const key = $(element).text().trim();
        keys.push(key);
      });

    $(".resultsarchive-table")
      .find("tbody tr")
      .each((index, element) => {
        const tds = $(element).find("td");

        const raceResult = {};

        tds.each((i, td) => {
          if (keys[i]) {
            raceResult[keys[i]] = $(td).text().replace(/\s+/g, " ").trim();
          }
        });

        raceResults.push(raceResult);
      });

    return raceResults;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/race", async (req, res) => {
  try {
    console.log(req.query);
    const raceURL = decodeURIComponent(req.query.url);
    const raceData = await fetchRaceData(raceURL);
    res.send(raceData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/locations", async (req, res) => {
  try {
    const locations = await fetchRaceLocations(
      "https://www.formula1.com/en/results.html/2023/races.html"
    );
    res.send(locations);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
