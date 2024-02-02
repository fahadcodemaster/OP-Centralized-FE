import { handleActions } from "redux-actions";

const initialState = {
  WalletResponse: null,
};

const WalletConnectreducer = handleActions(
  {
    ConnectWallet_REQUEST: (state) => ({
      ...state,
      WalletResponse: {
        ...state.WalletResponse,
      },
    }),
    ConnectWallet_SUCCESS: (state, { payload }) => ({
      ...state,
      WalletResponse: {
        walletData: payload,
      },
    }),

    ConnectWallet_FAIL: (state, { payload }) => ({
      ...state,
      WalletResponse: {
        walletconnect: false,
      },
    }),

    Wallet_Disconnect: (state, { payload }) => ({
      ...state,
      WalletResponse: null,
    }),
  },
  initialState
);

export default WalletConnectreducer;
