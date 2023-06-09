import HttpClient from "../plugins/httpClient";
import { ApiGateway } from "../plugins/gateway";

var httpClient = new HttpClient(ApiGateway.NodeServer);

const RaceService = {
  fetchRaceLocations() {
    return httpClient.get(`/locations`);
  },

  fetchRaceData(url = "") {
    var query = {
      url,
    };
    return httpClient.get(`/race`, query);
  },
};

export default RaceService;
