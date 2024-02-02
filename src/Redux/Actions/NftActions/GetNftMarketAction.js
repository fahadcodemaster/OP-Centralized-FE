import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftMarketRequest = createAction("GetNftMarket_REQUEST");
export const GetNftMarketSuccess = createAction("GetNftMarket_SUCCESS");
export const GetNftMarketFail = createAction("GetNftMarket_FAIL");

const GetNftMarketAction = (body) => (dispatch) => {
  dispatch(GetNftMarketRequest());
  return new Promise((resolve) => {
    return Api.GetNftMarket.GetNftMarketApi(body)
      .then(({ data }) => {
        dispatch(GetNftMarketSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftMarketFail(error));
        resolve();
      });
  });
};
export default GetNftMarketAction;
