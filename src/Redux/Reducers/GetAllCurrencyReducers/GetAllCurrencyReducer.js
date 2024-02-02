import { handleActions } from "redux-actions";

const initialState = {
  GetAllCurrencyResponse: {},
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
const GetAllCurrency = handleActions(
  {
    GetAllCurrency_REQUEST: (state) => ({
      ...state,
      GetAllCurrencyResponse: {
        ...state.defaultData,
      },
    }),
    GetAllCurrency_SUCCESS: (state, { payload }) => ({
      ...state,
      GetAllCurrencyResponse: payload,
    }),
    GetAllCurrency_FAIL: (state, { payload }) => ({
      ...state,
      GetAllCurrencyResponse: payload.data,
    }),
    GetAllCurrency_REQUEST_CLEAR: (state) => ({
      ...state,
      GetAllCurrencyResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default GetAllCurrency;
