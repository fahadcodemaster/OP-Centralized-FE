import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetStakingHistory {
  static getStakingHistoryApi() {
    return http.get(httpUrl + "/api/v1/stacking/getStackingHistory");
  }
}
