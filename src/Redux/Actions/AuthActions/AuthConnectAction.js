import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const AuthConnectRequest = createAction("AuthConnect_REQUEST");
export const AuthConnectSuccess = createAction("AuthConnect_SUCCESS");
export const AuthConnectFail = createAction("AuthConnect_FAIL");

const AuthConnectAction = (body) => (dispatch) => {
  dispatch(AuthConnectRequest());
  return new Promise((resolve, reject) => {
    return Api.AuthConnect.AuthConnectApi(body)
      .then(({ data }) => {
        dispatch(AuthConnectSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(AuthConnectFail(error));
        reject(error);
      });
  });
};

export default AuthConnectAction;
