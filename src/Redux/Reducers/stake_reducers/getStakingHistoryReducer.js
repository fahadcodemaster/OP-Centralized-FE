import {handleActions} from 'redux-actions'

const initialState = {
}

const getStakingHistory = handleActions(
  {
    GET_STAKING_HISTORY_REQUEST: (state) => ({
      
    }),
    GET_STAKING_HISTORY_SUCCESS: (state, {payload}) => ({
      payload
    }),
    GET_STAKING_HISTORY_FAIL: (state, {payload}) => ({
        payload
    }),
  },
  initialState,
)
export default getStakingHistory

