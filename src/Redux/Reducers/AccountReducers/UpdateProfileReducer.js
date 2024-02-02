import { handleActions } from "redux-actions";

const initialState = {
  UpdateProfileResponse: {},
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
const UpdateProfile = handleActions(
  {
    UpdateProfile_REQUEST: (state) => ({
      ...state,
      UpdateProfileResponse: {
        ...state.defaultData,
      },
    }),
    UpdateProfile_SUCCESS: (state, { payload }) => ({
      ...state,
      UpdateProfileResponse: payload,
    }),
    UpdateProfile_FAIL: (state, { payload }) => ({
      ...state,
      UpdateProfileResponse: payload.data,
    }),
    UpdateProfile_REQUEST_CLEAR: (state) => ({
      ...state,
      UpdateProfileResponse: {
        ...state.defaultData,
      },
    }),
  },
  initialState
);

export default UpdateProfile;
