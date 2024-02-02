import { handleActions } from "redux-actions";

const initialState = {
  LogoutResponse: {},
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
const Logout = handleActions(
  {
    Logout_REQUEST: (state) => ({
      ...state,
      LogoutResponse: {
        ...state.defaultData,
      },
    }),
    Logout_SUCCESS: (state, { payload }) => ({
      ...state,
      LogoutResponse: payload,
    }),
    Logout_FAIL: (state, { payload }) => ({
      ...state,
      LogoutResponse: payload.data,
    }),
    Logout_REQUEST_CLEAR: (state) => ({
      ...state,
      LogoutResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default Logout;
