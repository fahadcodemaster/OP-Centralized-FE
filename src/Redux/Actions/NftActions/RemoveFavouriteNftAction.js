import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const RemoveFavouriteNftRequest = createAction("RemoveFavouriteNft_REQUEST");
export const RemoveFavouriteNftSuccess = createAction("RemoveFavouriteNft_SUCCESS");
export const RemoveFavouriteNftFail = createAction("RemoveFavouriteNft_FAIL");

const RemoveFavouriteNftAction = (body) => (dispatch) => {
  dispatch(RemoveFavouriteNftRequest());
  return new Promise((resolve) => {
    return Api.RemoveFavouriteNft.RemoveFavouriteNftApi(body)
      .then(({ data }) => {
        dispatch(RemoveFavouriteNftSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(RemoveFavouriteNftFail(error));
        resolve();
      });
  });
};
export default RemoveFavouriteNftAction;
