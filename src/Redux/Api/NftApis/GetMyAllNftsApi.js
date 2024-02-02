import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetMyAllNfts {
  static GetMyAllNftsApi(body) {
    return http.get(
      httpUrl + "/api/v1/Nft/GetMyAllNfts?PageSize=" + http.pageSize
    );
  }
}
