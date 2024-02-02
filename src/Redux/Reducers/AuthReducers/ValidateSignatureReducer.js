import { handleActions } from "redux-actions";

const initialState = {
  authResponse: {},
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
const ValidateSignature = handleActions(
  {
    ValidateSignature_REQUEST: (state) => ({
      ...state,
      authResponse: {
        ...state.defaultData,
      },
    }),
    ValidateSignature_SUCCESS: (state, { payload }) => ({
      ...state,
      authResponse: payload,
    }),
    ValidateSignature_FAIL: (state, { payload }) => ({
      ...state,
      authResponse: payload.data,
    }),
    ValidateSignature_REQUEST_CLEAR: (state) => ({
      ...state,
      authResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default ValidateSignature;
