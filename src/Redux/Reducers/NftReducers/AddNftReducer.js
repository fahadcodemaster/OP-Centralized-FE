import { handleActions } from "redux-actions";

const initialState = {
  AddNftResponse: {},
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
const AddNft = handleActions(
  {
    AddNft_REQUEST: (state) => ({
      ...state,
      AddNftResponse: {
        ...state.defaultData,
      },
    }),
    AddNft_SUCCESS: (state, { payload }) => ({
      ...state,
      AddNftResponse: payload,
    }),
    AddNft_FAIL: (state, { payload }) => ({
      ...state,
      AddNftResponse: payload.data,
    }),
    AddNft_REQUEST_CLEAR: (state) => ({
      ...state,
      AddNftResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default AddNft;
