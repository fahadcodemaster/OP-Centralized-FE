import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetAllCurrencyRequest = createAction("GetAllCurrency_REQUEST");
export const GetAllCurrencySuccess = createAction("GetAllCurrency_SUCCESS");
export const GetAllCurrencyFail = createAction("GetAllCurrency_FAIL");

const GetAllCurrencyAction = (body) => (dispatch) => {
  dispatch(GetAllCurrencyRequest());
  return new Promise((resolve, reject) => {
    return Api.GetAllCurrency.GetAllCurrencyApi(body)
      .then(({ data }) => {
        dispatch(GetAllCurrencySuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetAllCurrencyFail(error));
        reject(error);
      });
  });
};
export default GetAllCurrencyAction;
