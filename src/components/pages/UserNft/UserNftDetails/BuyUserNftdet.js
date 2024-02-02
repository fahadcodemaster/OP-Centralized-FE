import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import Web3 from "web3";
import { sendTransection, signMessage } from "../../../../metamask";
import BuyNftMarketAction from "../../../../Redux/Actions/NftActions/BuyNftMarketActions";
import http from "../../../../Redux/Api/http";

const BuyUserNftdet = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const [NewPrice, SetNewPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const AuthConnectState = useSelector(
    (state) => state.AuthConnect.AuthConnectResponse?.data
  );
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

  const GetNftMarketById = useSelector(
    (state) => state.GetNftMarketById?.GetNftMarketByIdResponse?.data
  );
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [getMasterAddress, setGetMasterAddress] = useState();

  const inputhandler = (e) => {
    const { value } = e.target;

    SetNewPrice(value);
  };

  useEffect(async () => {
    await http
      .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
      .then((res) => {
        console.log("GetMasterAddress", res?.data?.data.address);
        setGetMasterAddress(res?.data?.data?.address);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signMessage(AuthConnectState?.message))
      .then(async (res) => {
        const amount = parseInt(Web3.utils.toWei(String(NewPrice))).toString(
          16
        );

        setIsLoading(false);
        const payload = [
          {
            from: WalletAddress,
            to: getMasterAddress,
            value: amount,
          },
        ];
        await dispatch(sendTransection(payload))
          .then(async (res) => {
            const payload = {
              nftId: GetNftMarketById.id,
              address: WalletAddress,
              transactionHash: res,
            };
            await dispatch(BuyNftMarketAction(payload))
              .then((res) => {
                setIsTransactionSuccess(true);
                toast.success(`${res.message}`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              })
              .catch((error) => {
                console.log(error);
              });
            console.log("selling Successfull");
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error(`${error?.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log(error);
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
      {isTransactionSuccess ? (
        <button id="btnBuy" className=" btn-main" disabled>
          NFT Purchased
        </button>
      ) : (
        <button onClick={handleShow} id="btnBuy" className=" btn-main">
          BUY NFT
        </button>
      )}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selling Amount</Modal.Title>
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
                          <label>Buying Amount:</label>
                          <input
                            value={NewPrice}
                            onChange={inputhandler}
                            type="text"
                            name="NewPrice"
                            id="acceptselling"
                            placeholder="Enter Buying Amount Here..."
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
                      <button className="btn-main">
                        <PulseLoader color="white" size="11" />
                      </button>
                    ) : (
                      <input
                        type="submit"
                        id="submit"
                        className="btn-main"
                        value="Buy NFT"
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

export default BuyUserNftdet;
