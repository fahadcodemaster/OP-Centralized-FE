import { handleActions } from "redux-actions";

const initialState = {
  GetMyNftByIdResponse: {},
};

const defaultData = {
  data: {},
  error: null,
  isSuccess: true,
  message: "",
};
const GetMyNftById = handleActions(
  {
    GetMyNftById_REQUEST: (state) => ({
      ...state,
      GetMyNftByIdResponse: {
        ...state.defaultData,
      },
    }),
    GetMyNftById_SUCCESS: (state, { payload }) => ({
      ...state,
      GetMyNftByIdResponse: payload,
    }),
    GetMyNftById_FAIL: (state, { payload }) => ({
      ...state,
      GetMyNftByIdResponse: payload.data,
    }),
  },
  initialState
);

export default GetMyNftById;
