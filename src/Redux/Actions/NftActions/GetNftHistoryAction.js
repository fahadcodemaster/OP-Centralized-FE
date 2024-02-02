import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetNftHistoryRequest = createAction("GetNftHistory_REQUEST");
export const GetNftHistorySuccess = createAction("GetNftHistory_SUCCESS");
export const GetNftHistoryFail = createAction("GetNftHistory_FAIL");

const GetNftHistoryAction = (body) => (dispatch) => {
  dispatch(GetNftHistoryRequest());
  return new Promise((resolve) => {
    return Api.GetNftHistory.GetNftHistoryApi(body)
      .then(({ data }) => {
        dispatch(GetNftHistorySuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetNftHistoryFail(error));
        resolve();
      });
  });
};
export default GetNftHistoryAction;
