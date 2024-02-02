import {handleActions} from 'redux-actions'

const initialState = {
}

const getStaking = handleActions(
  {
    GET_STAKING_REQUEST: (state) => ({
      
    }),
    GET_PROFIGET_STAKING_SUCCESSLE_SUCCESS: (state, {payload}) => ({

      payload
      
    }),
    GET_STAKING_SUCCESS: (state, {payload}) => ({
        payload
    }),
  },
  initialState,
)
export default getStaking