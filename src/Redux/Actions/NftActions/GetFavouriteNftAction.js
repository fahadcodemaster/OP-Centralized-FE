import { createAction, createActions } from "redux-actions";
import Api from "../../Api";

export const GetFavouriteNftRequest = createAction("GetFavouriteNft_REQUEST");
export const GetFavouriteNftSuccess = createAction("GetFavouriteNft_SUCCESS");
export const GetFavouriteNftFail = createAction("GetFavouriteNft_FAIL");

const GetFavouriteNftAction = (body) => (dispatch) => {
  // dispatch(GetFavouriteNftRequest());
  return new Promise((resolve) => {
    return Api.GetFavouriteNft.GetFavouriteNftApi(body)
      .then(({ data }) => {
        dispatch(GetFavouriteNftSuccess(data));
        resolve(data);
      })
      .catch((error) => {
        dispatch(GetFavouriteNftFail(error));
        resolve();
      });
  });
};
export default GetFavouriteNftAction;
