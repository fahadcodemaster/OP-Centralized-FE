import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class GetNftMarketById {
  static GetNftMarketByIdApi(body) {
    return http.get(
      httpUrl +
        `/api/v1/Nft/GetNftMarketById?nftId=${body.nftId}&accountId=${body.accountId}`
    );
  }
}
