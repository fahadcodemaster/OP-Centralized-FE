import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const BuyNftMarketRequest = createAction("BuyNftMarket_REQUEST");
export const BuyNftMarketSuccess = createAction("BuyNftMarket_SUCCESS");
export const BuyNftMarketFail = createAction("BuyNftMarket_FAIL");

const BuyNftMarketAction = (body) => (dispatch) => {
  dispatch(BuyNftMarketRequest());
  return new Promise((resolve) => {
    return Api.BuyNftMarket.BuyNftMarketApi(body)
      .then(({ data }) => {
        dispatch(BuyNftMarketSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(BuyNftMarketFail(error));
        resolve();
      });
  });
};
export default BuyNftMarketAction;
