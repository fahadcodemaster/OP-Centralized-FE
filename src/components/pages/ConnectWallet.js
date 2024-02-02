import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Metamask from "../../assets/images/metamask.png";
import connectcircle from "../../assets/images/wallet.png";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { PulseLoader } from "react-spinners";
import connectMetaMaskaction from "../../Redux/Actions/WalletActions/WalletAction";
import AuthConnectAction from "../../Redux/Actions/AuthActions/AuthConnectAction";
import ValidateSignatureAction from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { ToastContainer, toast } from "react-toastify";
import lottie from "lottie-web";
import connectionAnimation from "../../assets/animation/connection/data.json";
function ConnectWallet() {
  const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    
  }
  .box-login p{
    color: #a2a2a2 !important;
  }
  .box-login{
    border-radius: 3px;
    padding: 40px 50px;
  }
`;

  const history = useHistory();
  const dispatch = useDispatch();
  const AuthConnectState = useSelector((state) => state.AuthConnect);
  const AuthConnect = AuthConnectState?.AuthConnectResponse?.data;
  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  const [isLoading, setIsLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [chain, setChain] = useState(false);
  const [SigError, SetSigError] = useState();
  const dispatchConnect = () => dispatch(connectMetaMaskaction());
  var isUserLogedIn = false;
  const User = useSelector((state) => state.Login);
  const Tokenn = User.authResponse?.data?.token;
  const GetAllBlockChain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );

  if (
    User.authResponse &&
    User.authResponse.data &&
    User.authResponse?.data?.token
  ) {
    isUserLogedIn = true;
  } else {
    isUserLogedIn = false;
  }

  useEffect(() => {
    if (GetAllBlockChain) {
      console.log("GetAllBlockChain", GetAllBlockChain[0].id)
      if (GetAllBlockChain[0].chainID == 97) {
        setChain(true)
      }
    }
  }, [GetAllBlockChain])

  const connnectwallet = async () => {

    setTrigger(true);
    setIsLoading(true);
    if (window.ethereum) {
      await window.ethereum.enable().then(async (res) => {
        setTimeout(async () => {
          await dispatchConnect().then(async (res) => {
            connectionFunc(res)
          }).catch(() => {
            setIsLoading(false)
          });
        }, 1000);
      });

    } else {
      setIsLoading(false);
      toast.error(`Please Install Metamask Extension`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const connectionFunc = async (res) => {
    await dispatch(AuthConnectAction({ address: res }))
      .then(async (response) => {
        // console.log(response);
        // setTimeout(async () => {
        if (response?.data?.message && !Tokenn) {

          await signMessage(response?.data?.message);
          setTrigger(false);
        }
        // }, 1000);
      })
      .catch((error) => {
        if (error.code == 4001 || error.status == 500) {
          console.log("noooo");
          connectionFunc(res)
        }
        // setIsLoading(false)
        console.log("error", error);
      });
  }

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#connectionCircle"),
      animationData: connectionAnimation,
      renderer: "svg", // "canvas", "html"
      loop: true, // boolean
      autoplay: true, // boolean
    });
  }, []);

  // const animate = () =>{
  //         lottie.loadAnimation({
  //           container: document.querySelector("#connectionCircle"),
  //           animationData: connectionAnimation,
  //           renderer: "svg", // "canvas", "html"
  //           loop: trigger ? true: false, // boolean
  //           autoplay: trigger ? true: false, // boolean
  //         });
  //       }

  const signMessage = async (message) => {
    // try {
    //   if (!window.ethereum)
    //     throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    await dispatch(
      ValidateSignatureAction({
        address: address,
        signature: signature,
      })
    )
      .then((res) => {
        const chainCheck = GetAllBlockChain?.some((item, index) => {
          console.log("kuch be")

          return item.chainID == parseInt(window.ethereum.chainId);
        });

        if (chainCheck) {

          toast.success(
            `${res.message} you are going to redirect to profile page`,
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );


          setTimeout(() => {
            history.push("/myprofile");
          }, 3000);
        }

        setIsLoading(false);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        toast.error(`${err.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    // } catch (err) {
    //   setIsLoading(false);

    //   toast.error(`${err.message}`, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   SetSigError(err.message);
    // }
  };

  // if (AuthConnect?.message) {
  //   signMessage(AuthConnect?.message);
  // }

  // useEffect(() => {

  //   // if (AuthConnectState?.AuthConnectResponse?.data?.message && !Tokenn) {
  //   //   signMessage(AuthConnect?.message);
  //   // }
  // }, []);
  return (
    <div>
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <section className="jumbotron breadcumb no-bg">
        <div className="small-pnl secnd-anime"></div>
        <div className="mainbreadcumb">
          <div className="container">
            {GetAllBlockChain &&
              isConnected && chain &&
              !GetAllBlockChain?.some((item, index) => {
                console.log("*************************", item);
                console.log(
                  "*************************",
                  parseInt(window.ethereum.chainId)
                );
                return item.chainID == parseInt(window.ethereum.chainId);
              }) ? (
              <div className="row align-items-center px-0 mb-4">
                {console.log("&*&*&*&*&&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*&*")}
                <div className="col-lg-4 offset-lg-4 m-auto px-0">
                  <div className="box-login text-center">
                    <h3 style={{ color: "black" }}>
                      Wrong blockchain selected make sure that you are in
                      Binance Smart Chain Network
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row align-items-center px-0">
               
                <div className="col-lg-12  col-md-12">
                  <h1 class="text-center">Wallet</h1>
                  {/* <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item"><a href="/">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Wallet</li>
                    </ol>
                  </nav> */}
                </div>

                <div className="col-lg-4 offset-lg-4 col-md-6  offset-md-3  col-sm-8 offset-sm-2">
                  <div class="wallet-panel">
                    <div className="wallet-panel-inner">
                      <div className="wallet-img">
                        <img src={Metamask} />
                      </div>
                      <h4>Metamask</h4>
                      <p>This ship alone, endeavours for or motyrannize. Every forest are findings.</p>
                      {isLoading ? (
                        <div className="w-100">
                          <button
                            className="btn w-100"
                            style={{
                              backgroundColor: "#1D5CBC",
                              borderRadius: "30px",
                              fontWeight: "bold",
                            }}
                          >
                            <PulseLoader color="white" size="11" />
                          </button>
                        </div>
                      ) : isConnected ? (
                        <div className="field-set">
                          <input
                            type="submit"
                            id="send_message"
                            value="Connected"
                            className="btn btn-main btn-fullwidth color-2"
                            disabled
                          />
                        </div>
                      ) : (
                        <div className="field-set">
                          <input
                            type="submit"
                            id="send_message"
                            value="Connect Wallet "
                            className="btn btn-main btn-fullwidth color-2 trans"
                            onClick={connnectwallet}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-10 offset-lg-1  col-md-6  offset-md-3  col-sm-12">
                  <h2 className="mrg">How to connect Metamask to Binance Smart Chain.</h2>
                  <div className="full-div youtube-pnl">
                    <iframe 
                      src="https://www.youtube.com/embed/8JZSUv40Tx0">
                    </iframe>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ConnectWallet;
