import { handleActions } from "redux-actions";

const initialState = {
  GetAllMyCollectionsResponse: {},
};

const defaultData = {
  data: {},
  error: null,
  isSuccess: true,
  message: "",
};
const GetAllMyCollections = handleActions(
  {
    GetMyAllCollections_REQUEST: (state) => ({
      ...state,
      GetAllMyCollectionsResponse: {
        ...state.defaultData,
      },
    }),
    GetMyAllCollections_SUCCESS: (state, { payload }) => ({
      ...state,
      GetAllMyCollectionsResponse: payload,
    }),
    GetMyAllCollections_FAIL: (state, { payload }) => ({
      ...state,
      GetAllMyCollectionsResponse: payload.data,
    }),
    // GetMyAllNfts_REQUEST_CLEAR: (state) => ({
    //   ...state,
    //   GetAllMyCollectionsResponse: {
    //     ...state.defaultData,
    //   },
    // }),
  },
  initialState
);

export default GetAllMyCollections;
