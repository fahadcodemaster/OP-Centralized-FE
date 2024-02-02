import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class MyProfile {
  static MyProfileApi() {
    return http.get(httpUrl + "/api/v1/auth/current");
  }
}
