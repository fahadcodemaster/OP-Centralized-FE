import { handleActions } from "redux-actions";

const initialState = {
  RemoveFavouriteNftResponse: {},
};

const defaultData = {
  data: {
    token: null,
    userInfo: {},
  },
  error: null,
  isSuccess: true,
  message: "",
};
const RemoveFavouriteNft = handleActions(
  {
    RemoveFavouriteNft_REQUEST: (state) => ({
      ...state,
      RemoveFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
    RemoveFavouriteNft_SUCCESS: (state, { payload }) => ({
      ...state,
      RemoveFavouriteNftResponse: payload,
    }),
    RemoveFavouriteNft_FAIL: (state, { payload }) => ({
      ...state,
      RemoveFavouriteNftResponse: payload.data,
    }),
    RemoveFavouriteNft_REQUEST_CLEAR: (state) => ({
      ...state,
      RemoveFavouriteNftResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default RemoveFavouriteNft;
