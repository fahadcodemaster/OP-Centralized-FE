import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const getStakingHistoryRequest = createAction("GET_STAKING_HISTORY_REQUEST");
export const getStakingHistorySuccess = createAction("GET_STAKING_HISTORY_SUCCESS");
export const getStakingHistoryFail = createAction("GET_STAKING_HISTORY_FAIL");

const getStakingHistoryAction = () => (dispatch) => {
  // alert(body);
  // dispatch(getStakingHistoryRequest());
  return new Promise((resolve) => {
    return Api.GetStakingHistory.getStakingHistoryApi()
      .then(({ data }) => {
        dispatch(getStakingHistorySuccess(data));
        resolve(data);
      })
      .catch((error) => {
        // dispatch(getStakingHistoryFail(error));
        resolve();
      });
  });
};
export default getStakingHistoryAction;
