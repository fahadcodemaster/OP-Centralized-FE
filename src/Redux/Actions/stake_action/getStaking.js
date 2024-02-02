import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const getStakingRequest = createAction("GET_STAKING_REQUEST");
export const getStakingSuccess = createAction("GET_STAKING_SUCCESS");
export const getStakingFail = createAction("GET_STAKING_FAIL");

const getStakingAction = () => (dispatch) => {
  // alert(body);
  // dispatch(getStakingRequest());
  return new Promise((resolve) => {
    return Api.GetStaking.getStakingApi()
      .then(({ data }) => {
        dispatch(getStakingSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        // dispatch(getStakingFail(error));
        resolve();
      });
  });
};
export default getStakingAction;
