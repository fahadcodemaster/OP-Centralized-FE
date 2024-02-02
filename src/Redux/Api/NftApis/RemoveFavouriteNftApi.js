import http from "../http";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

export default class RemoveFavouriteNft {
  static RemoveFavouriteNftApi(body) {
    return http.put(httpUrl + "/api/v1/Nft/RemoveFavouriteNft", body);
  }
}
