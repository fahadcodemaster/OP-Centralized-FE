import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const LogoutRequest = createAction("Logout_REQUEST");
export const LogoutSuccess = createAction("Logout_SUCCESS");
export const LogoutFail = createAction("Logout_FAIL");

export const LogoutAction = (body) => (dispatch) => {
  dispatch(LogoutRequest());
  return new Promise((resolve, reject) => {
    return Api.Logout.LogoutApi(body);
    // .then(({ data }) => {
    //   dispatch(LogoutSuccess(data));
    //   resolve(data);
    // })
    // .catch((error) => {
    //   dispatch(LogoutFail(error));
    //   reject(error);
    // });
  });
};
