import { handleActions } from "redux-actions";

const initialState = {
  GetNftMarketByIdResponse: {},
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
const GetNftMarketById = handleActions(
  {
    GetNftMarketById_REQUEST: (state) => ({
      ...state,
      GetNftMarketByIdResponse: {
        ...state.defaultData,
      },
    }),
    GetNftMarketById_SUCCESS: (state, { payload }) => ({
      ...state,
      GetNftMarketByIdResponse: payload,
    }),
    GetNftMarketById_FAIL: (state, { payload }) => ({
      ...state,
      GetNftMarketByIdResponse: payload.data,
    }),
    GetNftMarketById_REQUEST_CLEAR: (state) => ({
      ...state,
      GetNftMarketByIdResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetNftMarketById;
