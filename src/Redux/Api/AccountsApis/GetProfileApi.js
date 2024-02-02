import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetProfile {
  static GetProfileApi(body) {
    return http.get(httpUrl + "/api/v1/Account/GetAccount", body);
  }
}
