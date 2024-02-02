// @ts-ignore
// @ts-ignore
import { createAction, createActions } from "redux-actions";
import Web3 from "web3";
// @ts-ignore
// import { ethers } from "ethers";
// import {
//   defaultAcceptToken,
//   formatUnits,
//   getBlockchain,
// } from "../constants/web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { MyProfileRequest } from "../Account/MyProfileAction";
import { ValidateSignatureRequest } from "../AuthActions/ValidateSignatureAction";
import AuthConnectAction, {
  AuthConnectRequest,
} from "../AuthActions/AuthConnectAction";
import localforage from "localforage";

export const ConnectWalletRequest = createAction("ConnectWallet_REQUEST");
export const ConnectWalletSuccess = createAction("ConnectWallet_SUCCESS");
export const ConnectWalletFail = createAction("ConnectWallet_FAIL");
export const WalletDisconnect = createAction("Wallet_Disconnect");

export const ConnectWalletRequestClear = createAction(
  "ConnectWallet_REQUEST_CLEAR"
);

const connectMetaMaskaction = (address) => async (dispatch) => {
  dispatch(ConnectWalletRequest());

  // Check metamask is install or not
  if (window.ethereum) {
    const provider = await detectEthereumProvider();
    if (provider !== window.ethereum) {
      console.log("top provider");
      // @ts-ignore
      window.web3 = new Web3(provider);
    } else {
      console.log("bottom provider");
      // @ts-ignore

      window.web3 = new Web3(window.ethereum);
      //window.open("https://support.wwf.org.uk", "_blank");
    }
    window.ethereum &&
      window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
        dispatch(AuthConnectAction({ address })).then((res) => {
          // window.location.reload();
        });
      });
    window.ethereum &&
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        const chainId = window.ethereum.chainId;

        // if (window.ethereum) {
        dispatch(AuthConnectAction({ address })).then((res) => {
          // window.location.reload();
        });
        // }
      });

    window.ethereum &&
      window.ethereum.on("accountsChanged", async (accounts) => {
        console.log(accounts);

        await dispatch(MyProfileRequest());
        await dispatch(WalletDisconnect());
        await dispatch(ValidateSignatureRequest());
        await dispatch(AuthConnectRequest());
        await localforage.clear();
        await localStorage.clear();
        console.clear();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
    window.ethereum &&
      window.ethereum.on("chainChanged", async (chainId) => {
        console.log("chainChanged............");

        await dispatch(MyProfileRequest());
        await dispatch(WalletDisconnect());
        await dispatch(ValidateSignatureRequest());
        await dispatch(AuthConnectRequest());
        await localforage.clear();
        await localStorage.clear();
        console.clear();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

    return (
      window.ethereum
        // @ts-ignore
        .request({ method: "eth_requestAccounts" })
        .then(async () => {
          // @ts-ignore
          const chainId = window.ethereum.chainId;
          // @ts-ignore
          const accounts = await window.web3.eth.getAccounts();
          // @ts-ignore
          const balance = await window.web3.eth.getBalance(accounts[0]);
          dispatch(
            ConnectWalletSuccess({
              chainId: chainId,
              accounts: accounts[0],
              balance: balance,
            })
          );

          if (balance) {
            return accounts[0];
          } else {
            return false;
          }
        })
        .catch((error) => {
          console.log("error::::", error);
          dispatch(ConnectWalletFail(error));
          return false;
        })
    );
  }
};
// @ts-ignore
export async function sendToken(payload) {
  const provider = await detectEthereumProvider()
  if (provider !== window.ethereum) {
    window.web3 = new Web3(provider)
  } else {
    window.web3 = new Web3(window.ethereum)
  }

  return new Promise((res, rej) => {
    let minABI = [
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        type: 'function',
      },
    ]
    let decimals = window.web3.utils.toBN(18)
    // const amount1 = Web3.utils.toWei(String(payload.value))
    const amount1 = window.web3.utils.toWei(payload.value, "ether");
    console.log("dataaaaaa", amount1);
    console.log("payload", payload);
    const tokenAddress = payload.tokenAddress
    let contract = new window.web3.eth.Contract(minABI, tokenAddress)
    // let value = amount.mul(window.web3.utils.toBN(10).pow(decimals))
    contract.methods
      .transfer(payload.to, amount1)
      .send({from: payload.from})
      .on('transactionHash', function (hash) {
        res(hash)
      })
      .catch((error) => {
        console.log('error::::', error)
        rej(error)
      })
  })
}
// @ts-ignore
export const autoConnect = () => async (dispatch) => {
  // console.log("auto connect working")
  if (window.ethereum) {
    const provider = await detectEthereumProvider();
    // If the provider returned by detectEthereumProvider is not the same as
    // window.ethereum, something is overwriting it, perhaps another wallet.
    if (provider !== window.ethereum) {
      // @ts-ignore
      window.web3 = new Web3(provider);
    } else {
      // @ts-ignore
      window.web3 = new Web3(window.ethereum);
    }

    // @ts-ignore
    window.ethereum.request({ method: "eth_chainId" }).then((chainId) => {
      // Set network when first time enter page
      //dispatch(setNetwork(chainId));
    });

    // window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
    //   const chainId = window.ethereum.chainId;
    //   if (chainId == "0x61" || chainId == "0x38") {
    //     console.log("chain iddd acc", chainId);
    //     const listenProjects = get(window, "listenProjects", {});
    //     if (!isEmpty(listenProjects)) {
    //       Object.keys(listenProjects).forEach(
    //         (key) => delete listenProjects[key]
    //       );
    //     }
    //     if (isEmpty(accounts)) {
    //       dispatch(setUserAccounts({ accounts: [], balance: 0 }));
    //     } else {
    //       dispatch(setUserAccounts({ accounts }));
    //       window.web3.eth
    //         .getBalance(accounts[0])
    //         .then((balance) => dispatch(setUserAccounts({ balance })));
    //     }

    //     dispatch(listenChangeProjects());
    //     // check if user loged in. if not login user
    //   } else {
    //     console.log("change chainID error");
    //   }
    // });

    // window.ethereum &&
    //   window.ethereum.on("accountsChanged", (accounts) => {
    //     console.log("account changing", accounts);
    //     const chainId = window.ethereum.chainId;
    //     if (chainId == "0x61" || chainId == "0x38") {

    //       dispatch(setUserAccounts({ accounts }));
    //       if (!accounts || !accounts[0]) {
    //         dispatch(clearUserDataOnDisconnectMetamask());
    //       } else {
    //         dispatch(reconnectProject());
    //       }

    //       dispatch(listenChangeProjects());
    //     }
    //   });

    // window.ethereum &&
    //   window.ethereum.on("chainChanged", async (chainId) => {
    //     if (chainId == "0x61" || chainId == "0x38") {
    //       console.log("chain iddd", chainId);
    //       window.web3 = new Web3(window.ethereum);
    //       const listenProjects = get(window, "listenProjects", {});
    //       if (!isEmpty(listenProjects)) {
    //         Object.keys(listenProjects).forEach(
    //           (key) => delete listenProjects[key]
    //         );
    //       }
    //       const accounts = await window.web3.eth.getAccounts();
    //       let balance;

    //       dispatch(setNetwork(chainId));

    //       if (accounts && accounts[0]) {
    //         balance = await window.web3.eth.getBalance(accounts[0]);
    //         const acceptToken = defaultAcceptToken(chainId);
    //         const { address: acceptTokenAddress, symbol: acceptTokenSymbol } =
    //           acceptToken;

    //         const acceptTokenBalance = await Api.User.fetchUserTokenBalance(
    //           acceptTokenAddress,
    //           accounts[0]
    //         );
    //         const decimals = await Api.User.fetchTokenDecimals(
    //           acceptTokenAddress
    //         );

    //         dispatch(
    //           setUserAccounts({
    //             accounts,
    //             balance,
    //             chainId,
    //             acceptTokenBalance: ethers.utils.formatUnits(
    //               String(acceptTokenBalance),
    //               decimals
    //             ),
    //             acceptTokenAddress,
    //             acceptTokenSymbol,
    //             acceptTokenDecimals: decimals,
    //           })
    //         );

    //         dispatch(reconnectProject());
    //       }

    //       dispatch(listenChangeProjects());
    //     }
    //   });
  }
};

export default connectMetaMaskaction;
