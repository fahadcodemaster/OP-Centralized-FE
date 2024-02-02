import { handleActions } from "redux-actions";

const initialState = {
  GetNftCollectionByIdWithOutAccountResponse: {},
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
const GetNftCollectionByIdWithOutAccount = handleActions(
  {
    GetNftCollectionByIdWithOutAccount_REQUEST: (state) => ({
      ...state,
      GetNftCollectionByIdWithOutAccountResponse: {
        ...state.defaultData,
      },
    }),
    GetNftCollectionByIdWithOutAccount_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftCollectionByIdWithOutAccountResponse: payload,
    }),
    GetNftCollectionByIdWithOutAccount_FAIL: (state, { payload }) => ({
      ...state,
      GetNftCollectionByIdWithOutAccountResponse: payload.data,
    }),
  },
  initialState
);

export default GetNftCollectionByIdWithOutAccount;
