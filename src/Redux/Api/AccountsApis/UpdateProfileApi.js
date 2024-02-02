import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class UpdateProfile {
  static UpdateProfileApi(body) {
    return http.post(httpUrl + "/api/v1/Account/UpdateAccount", body);
  }
}
