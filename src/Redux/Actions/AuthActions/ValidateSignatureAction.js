import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const ValidateSignatureRequest = createAction(
  "ValidateSignature_REQUEST"
);
export const ValidateSignatureSuccess = createAction(
  "ValidateSignature_SUCCESS"
);
export const ValidateSignatureFail = createAction("ValidateSignature_FAIL");

const ValidateSignatureAction =
  (body, relogin = false) =>
  (dispatch) => {
    // if (!relogin) {
    //   dispatch(ValidateSignatureRequest());
    // }
    return new Promise((resolve, reject) => {
      return Api.ValidateSignature.ValidateSignatureApi(body)
        .then(({ data }) => {
          dispatch(ValidateSignatureSuccess(data));
          resolve(data);
        })
        .catch((error) => {
          dispatch(ValidateSignatureFail(error));
          reject(error);
        });
    });
  };

export default ValidateSignatureAction;
