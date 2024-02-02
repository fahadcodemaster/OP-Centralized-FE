import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BuyUserNft from "./BuyUserNft";
import http from "../../../Redux/Api/http";
import { PulseLoader } from "react-spinners";
import bnbimg from "../../../assets/images/bnb.png";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import defaultImg from "../../../assets/images/default.png";
import { useDispatch, useSelector } from "react-redux";

function OnSaleUserNfts() {
  const dispatch = useDispatch();

  const [userNftData, setUserNftData] = useState();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [loading, setLoading] = useState(true);
  const [numItems, setNumItems] = useState(8)
  const history = useHistory();
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);


  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  useEffect(async ()=>{
    if (isConnected) {
      await dispatch(GetFavouriteNftAction());
    }
  },[])
  
  useEffect(async () => {
    let params = window.location.pathname;

    await http
      .get(
        httpUrl +
          `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}`
      )
      .then((res) => {
        console.log("res", res.data.data.nftRequestModelList);
        setUserNftData(res.data.data.nftRequestModelList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  // const [nfts, Setnfts] = useState([userNftData?.slice(0, 4)]);
  const [height, Setheight] = useState(270);


  const addToFavourite = async (nftID, OwnerAddress) => {
    if (!isConnected) {
      toast.success(`Please connect to wallet first`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!favouriteInProgress) {
      await axios
        .post(
          httpUrl + "/api/v1/Nft/AddFavouriteNft",
          {
            nftId: nftID,
            nftAddress: OwnerAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        )
        .then(async (resp) => {
          setFavouriteInProgress(false);
          if (resp?.data?.isSuccess === true) {
            toast.success(`${resp?.data?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            await dispatch(GetFavouriteNftAction());
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.data?.isSuccess === false) {
            toast.error(`NFT already liked`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const removeToFavourite = async (nftId, OwnerAddress) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.success(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            await dispatch(GetFavouriteNftAction());
            // setTimeout(() => window.location.reload(), 2000);
          } else if (resp?.isSuccess === false) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch((error) => {
          setFavouriteInProgress(false);
          toast.error(`${error?.data?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  const loadMore = () => {
    if(userNftData?.length > numItems){
        setNumItems( (prev) => prev + 4 )
    }
    // console.log("useer Data", userNftData)
    // let nftState = nfts;
    // let start = nftState.length;
    // let end = nftState.length + 4;
    // Setnfts([...nftState, ...userNftData?.slice(start, end)]);
  };
  
  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };
  return (
    <div className="row">
      {loading ? (
        <PulseLoader color="white" size="11" />
      ) : (
        <>
          {/* {console.log("user created nfts", nfts.length)} */}
          {/* //workhere */}
          {userNftData?.slice(0, numItems).map((nft, index) => (
            <>
              {nft.staus ==='ReadyForSell' && (
              <>
              <div
                key={index}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 cursor-pointor"
              >
                <div className="nft__item m-0">
                  <div className="author_list_pp bg">
                    <Link
                      to={
                        nft.ownerAddress === WalletAddress
                          ? "/myprofile"
                          : "/profile"
                      }
                    >
                      <img
                        className="lazy"
                        src={
                          nft?.ownerImage
                            ? httpUrl + "/" + nft?.ownerImage
                            : defaultImg
                        }
                        alt=""
                      />
                     
                    </Link>
                  </div>

                  <div
                    className="nft__item_wrap"
                    onClick={() =>
                      history.push(`/usernftdetail/${nft.id}/${nft.accountId}`)
                    }
                  >
                    <span>
                      <img
                        onLoad={onImgLoad}
                        src={httpUrl + "/" + nft?.image}
                        className="lazy "
                        alt="NFT Pic"
                        style={{
                          width: "100%",
                          height: 200,
                          borderRadius: 8,
                          objectFit: "contain",
                        }}
                      />
                    </span>
                  </div>

                  <div
                    className="nft__item_info d-flex justify-content-between"
                    style={{ margin: 0 }}
                  >
                    <span
                      onClick={() => window.open(nft.nftLink, "_self")}
                      className="d-flex flex-column"
                    >
                      <p
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          history.push(
                            `/nftsbycollections/${nft.collectionId}`
                          );
                        }}
                      >
                        {nft?.collectionName.length > 15 ? nft?.collectionName.slice(0, 14)+'...': nft?.collectionName}
                      </p>
                      <h4>{nft?.name.length > 10 ? nft?.name.slice(0, 9)+'...': nft?.name}</h4>
                      {/* <span>{nft.blockChainName}</span> */}
                    </span>
                    <div className="nft__item_price d-flex align-items-end flex-column">
                      <span style={{ whiteSpace: "nowrap" }}>
                        {/* Price: {(nft.buyPrice ? nft.buyPrice.length > 5 ? nft.buyPrice.slice(0,4): nft.buyPrice: 0) +" "+ nft.blockChainName} */}
                        Price: { nft?.sellPrice ? nft?.sellPrice: nft?.buyPrice } {nft.blockChainName}
                      </span>
                      <div class="full-divv">
                        {GetFavouriteNft?.some((item, index) => {
                          return item.nftTokenId == nft.nftTokenId;
                        }) ? (
                          <>
                          <i
                            onClick={() => {
                              setFavouriteInProgress(true);

                              removeToFavourite(nft.id, nft.ownerAddress);
                            }}
                            className="fa fa-heart nft-heart-space"
                            style={{ color: "red" }}
                          ></i>
                          <span className="nft-favourit-count">{nft?.nftFavouritesCount}</span></>
                        ) : (
                          <>
                          
                          
                          
                          <i
                            onClick={() => {
                              setFavouriteInProgress(true);

                              addToFavourite(nft?.id, nft.ownerAddress);
                            }}
                            className="fa fa-heart nft-heart-space"
                          >
                           </i>
                            <span className="nft-favourit-count">{nft?.nftFavouritesCount}</span>
                           </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )}
            </>
          ))}

          
          {userNftData?.length > numItems && (
            <div className="col-lg-12">
              <div className="spacer-single"></div>
              <span onClick={loadMore} className="btn-main lead m-auto">
                Load More
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default OnSaleUserNfts;
