import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetAllBlockChainRequest = createAction("GetAllBlockChain_REQUEST");
export const GetAllBlockChainSuccess = createAction("GetAllBlockChain_SUCCESS");
export const GetAllBlockChainFail = createAction("GetAllBlockChain_FAIL");

const GetAllBlockChainAction = (body) => (dispatch) => {
  dispatch(GetAllBlockChainRequest());
  return new Promise((resolve, reject) => {
    return Api.GetAllBlockChain.GetAllBlockChainApi(body)
      .then(({ data }) => {
        dispatch(GetAllBlockChainSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetAllBlockChainFail(error));
        reject(error);
      });
  });
};
export default GetAllBlockChainAction;
