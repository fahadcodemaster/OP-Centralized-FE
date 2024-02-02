import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const SellNftMarketRequest = createAction("SellNftMarket_REQUEST");
export const SellNftMarketSuccess = createAction("SellNftMarket_SUCCESS");
export const SellNftMarketFail = createAction("SellNftMarket_FAIL");

const SellNftMarketAction = (body) => (dispatch) => {
  dispatch(SellNftMarketRequest());
  return new Promise((resolve, reject) => {
    return Api.SellNftMarket.SellNftMarketApi(body)
      .then(({ data }) => {
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaa", data);
        dispatch(SellNftMarketSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        console.log("errorrrrrrrrrrrrrrrrrrrr", error);
        dispatch(SellNftMarketFail(error));
        reject();
      });
  });
};
export default SellNftMarketAction;
