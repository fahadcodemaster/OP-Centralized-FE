import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
export default class GetStaking {
  static getStakingApi() {
    return http.get(httpUrl + "/api/v1/stacking/getStaking");
  }
}
