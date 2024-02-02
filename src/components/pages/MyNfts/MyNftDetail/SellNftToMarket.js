import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import {
  signMessage,
  sellNFTAmount,
  sendTransection,
  approveContract,
  openMarketForFixed,
} from "../../../../metamask";
import SellNftMarketAction from "../../../../Redux/Actions/NftActions/SellNftMarketAction";
import http from "../../../../Redux/Api/http";

const SellNftToMarket = ({ nftIdd, pricee, modalStatus, nftDataChunk, sellLoading }) => {
  const [NewPrice, SetNewPrice] = useState(pricee);
  const [show, setShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState();

  const history = useHistory();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const AuthConnectState = useSelector(
    (state) => state.AuthConnect.AuthConnectResponse?.data
  );

  const myNftById = useSelector(
    (state) => state.GetMyNftById?.GetMyNftByIdResponse?.data
  );
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    // modalStatus(false);
  };
  const handleShow = () => setShow(true);

  const [getMasterAddress, setGetMasterAddress] = useState();

  useEffect(async () => {
    console.log("*****************");
    console.log(nftDataChunk);
    console.log(AuthConnectState);
    console.log("*****************");
    const address = {
      address: nftDataChunk.ownerAddress,
    };
    await http
      .post(httpUrl + "/api/v1/auth/connect", address)
      .then((res) => {
        console.log("authstate", res?.data.data.message);
        setAuthState(res?.data.data.message);
      })
      .catch((error) => {
        console.log(error?.message);
      });
    await http
      .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
      .then((res) => {
        console.log("GetMasterAddress", res?.data?.data.address);
        setGetMasterAddress(res?.data?.data?.address);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, [AuthConnectState]);
  // useEffect(() => {
  //   setIsTransactionSuccess(isTransactionSuccess);
  // }, [isTransactionSuccess]);

  const marketFunction = (e) => {
    console.log("IN IT");
    const payloadMarket = {
      nftContractId: nftDataChunk.contractAddress,
      tokenId: nftDataChunk.nftTokenId,
      price: NewPrice,
    };
    dispatch(
      approveContract(payloadMarket, nftDataChunk.contractAddress).then(
        (ress) => {
          console.log("open market for fixed");
          console.log(ress);
          console.log("open market for fixed");
        }
      )
    ).catch((e) => {
      console.log("error in market", e);
    });
  };
  const inputhandler = (e) => {
    const { value } = e.target;

    SetNewPrice(value);
  };
  // /api/v1/Nft/GetMarketNftAddress
  const onsubmitHandler = async (e) => {
    console.log("authconnectstate", AuthConnectState);
    e.preventDefault();
    setIsLoading(true);

    dispatch(signMessage(authState))
      .then(async (res) => {
        toast.success(
          `Purchasing in process`,
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        console.log("dindin", res);
        await http
          .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
          .then(async (res) => {
            const payload = {
              approved: res?.data,
              tokenId: nftDataChunk.nftTokenId,
            };
            const payloadMarket = {
              nftContractId: nftDataChunk.contractAddress,
              tokenId: nftDataChunk.nftTokenId,
              price: NewPrice,
              // marketAddress: resAddress
            };
            dispatch(
              approveContract(
                payload,
                nftDataChunk.contractAddress,
                payloadMarket
              ).then(async (r) => {
                toast.success(
                  `Contract approved, wait for the last step`,
                  {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                console.log("ATLAST", r);
                let body = {
                  nftId: nftDataChunk.id,
                  price: NewPrice,
                  approvalTransactionHash: r.res.hash,
                  openOrderTransactionHash: r.response.hash,
                };
                
                console.log("BODYYYYYYYYYYYYYYYYYYYYYY", body);
                delay(12000).then(async () => {
                  console.log("I have got 5 sec delay");
                  await http
                    .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
                    .then(async (res) => {
                      console.log("STATUS");
                      console.log("STATUS", res);
                      console.log("STATUS");
                      sellLoading = false
                      toast.success(
                        `NFT Selling in process, you will be redirected shortly`,
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
                        history.push("/marketplace");
                      }, 3000);
                    });
                });
                // await http
                // .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
                // .then(async (res) => {
                //   console.log("STATUS");
                //   console.log("STATUS", res);
                //   console.log("STATUS");
                //   setTimeout(() => {
                //     history.push("/marketplace");
                //   }, 3000);
                // })
              })
            ).catch((e) => {
              console.log("error in approve", e);
            });
            marketFunction();
          });

        
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Signature Error");
      });
  };

  return (
    <>
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

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title style={{ color: "#000000" }}>Selling Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="row">
            <div className="col-md-12">
              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
                onSubmit={onsubmitHandler}
              >
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-set">
                          <label>Selling Amount:</label>
                          <input
                            type="text"
                            name="NewPrice"
                            onChange={(e) => {
                              SetNewPrice(e.target.value);
                            }}
                            id="acceptselling"
                            placeholder="Enter the sell price"
                            className="form-control  "
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div id="submit" className="pull-left">
                    {isLoading ? (
                      <button className="btn-main" disabled>
                        <PulseLoader color="white" size="11" />
                      </button>
                    ) : (
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main"
                        value="Sell NFT"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SellNftToMarket;
