import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftMarketByIdRequest = createAction("GetNftMarketById_REQUEST");
export const GetNftMarketByIdSuccess = createAction("GetNftMarketById_SUCCESS");
export const GetNftMarketByIdFail = createAction("GetNftMarketById_FAIL");

const GetNftMarketByIdAction = (body) => (dispatch) => {
  dispatch(GetNftMarketByIdRequest());
  return new Promise((resolve) => {
    return Api.GetNftMarketById.GetNftMarketByIdApi(body)
      .then(({ data }) => {
        dispatch(GetNftMarketByIdSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftMarketByIdFail(error));
        resolve();
      });
  });
};
export default GetNftMarketByIdAction;
