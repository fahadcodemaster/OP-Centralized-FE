import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetMyNftById {
  static GetMyNftByIdApi(body) {
    return http.get(httpUrl + "/api/v1/Nft/GetMyNftById?nftId=" + body);
  }
}
