import http from "../http";
import localforage from "localforage";

const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class Logout {
  static async LogoutApi(body) {
    localforage.clear();
    localStorage.clear();
    console.clear();

    window.location.replace("/connectwallet");
    // hisotry.pust("/connectwallet");

    //return http.get(httpUrl + "/api/v1/auth/connect", body);
  }
}
