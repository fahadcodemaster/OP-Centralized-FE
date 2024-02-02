import { handleActions } from "redux-actions";

const initialState = {
  GetNftHistoryResponse: {},
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
const GetNftHistory = handleActions(
  {
    GetNftHistory_REQUEST: (state) => ({
      ...state,
      GetNftHistoryResponse: {
        ...state.defaultData,
      },
    }),
    GetNftHistory_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftHistoryResponse: payload,
    }),
    GetNftHistory_FAIL: (state, { payload }) => ({
      ...state,
      GetNftHistoryResponse: payload.data,
    }),
    GetNftHistory_REQUEST_CLEAR: (state) => ({
      ...state,
      GetNftHistoryResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetNftHistory;
