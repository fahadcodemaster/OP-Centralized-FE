import React, { useEffect, useState, useRef } from "react";
import Footer from "../../../components/footer";
import { createGlobalStyle } from "styled-components";
import { Link, useHistory, useParams, Redirect } from "react-router-dom";
import BuyUserNft from "./BuyUserNftdet";
import { useDispatch, useSelector } from "react-redux";
import GetNftMarketByIdAction from "../../../../Redux/Actions/NftActions/GetNftMarketById";
import clockicon from "../../../../assets/images/clockicon-big.png";
import heart from "../../../../assets/images/heart-icon.png";
import verified from "../../../../assets/images/verified-icon.png";
import cryptocurrency from "../../../../assets/images/cryptocurrency-icon.png";
import placebid from "../../../../assets/images/placebid-icon.png";
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Form,
  FormCheck,
  Dropdown,
  DropdownButton,
  OverlayTrigger,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader, RingLoader } from "react-spinners";
import swal from "sweetalert";
import axios from "axios";
import DatePicker from "react-datepicker";
import BuyNftMarketAction from "../../../../Redux/Actions/NftActions/BuyNftMarketActions";
import MyItemDetails from "../../MyNfts/MyNftDetail/MyItemDetails";
import {
  sendTransection,
  signMessage,
  approveNft,
  buyNftMarket,
  cancelNft,
  openForAuction,
  approveContract,
  acceptBid
} from "../../../../metamask";
import Web3 from "web3";
import moment from "moment";
import GetFavouriteNftAction from "../../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import defaultImg from "../../../../assets/images/default.png";

import { PropagateLoader } from "react-spinners";
import http from "../../../../Redux/Api/http";
import https from "https";
import GetAllNftsByCollectionIdAction, {
  GetAllNftsByCollectionIdRequest,
} from "../../../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
import { GetMyNftByIdRequest } from "../../../../Redux/Actions/NftActions/GetMyNftByIdAction";
import { slice } from "lodash";
const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const UserNftDetails = function () {
  const dispatch = useDispatch();
  const { id, accountId } = useParams();
  const history = useHistory();
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const GetNftMarketById = useSelector(
    (state) => state.myData?.GetNftMarketByIdResponse?.data
  );

  const AuthConnectState = useSelector(
    (state) => state.AuthConnect.AuthConnectResponse?.data
  );

  const myNftById = useSelector(
    (state) => state.GetMyNftById?.GetMyNftByIdResponse?.data
  );
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const isConnected = useSelector(
    (state) => state.Login?.authResponse?.data?.token
  );
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const [show, setShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const searchRef = useRef();
  // const GetAllNftsByCollectionId = useSelector(
  //   (state) =>
  //     state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse.data
  // );
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [NewPrice, SetNewPrice] = useState();
  const [inputAmount, setInputAmount] = useState();
  const [maxInputAmount, setMaxInputAmount] = useState();
  const [nftId, setNftId] = useState();
  const [amountCheck, setAmounCheck] = useState(false);
  const [amountCheck1, setAmounCheck1] = useState(false);
  const [balance, setBalance] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [biddingLoading, setIsBiddingLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [emptyBids, setEmptyBids] = useState(false);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [rating, setRating] = useState(0);
  const [biddings, setBiddings] = useState();
  const [myData, setMyData] = useState();
  const [filterData, setFilterData] = useState([]);

  const [filter, setfilter] = useState([]);
  const [allData, setAllData] = useState([]);
  const [bidTrigger, setBidtrigger] = useState(false);
  const [isInterval, setIsInterval] = useState(false);
  const [collectionLoading, setCollectionLoading] = useState(false);

  const [paramsCheck, setParams] = useState();
  const [paramsLoading, setParamsLoading] = useState(true);
  const [imageShow, setImageShow] = useState(false);
  const [timer, setTimer] = useState(false);
  const [bidInProgress, setBidInProgress] = useState(false);
  const [isOfferInProgress, setIsOfferInProgress] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [bidError, setBidError] = useState(false);
  const [bidError1, setBidError1] = useState(false);
  const [expiryError, setExpiryError] = useState(false);
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [myDataLoader, setmyDataLoader] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [isStacked, setIsStacked] = useState(false);
  const [amountCheck2, setAmounCheck2] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [collectionData, setCollectionData] = useState();
  const [numItems, setNumItems] = useState(4)



  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const WalletBalance = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.balance
  );

  const sellingModal = () => {
    setFilterTrigger(false)
  }


  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(true);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    // document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(true);
    setOpenMenu2(false);
    setOpenMenu(false);

    // document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(true);
    setOpenMenu(false);
    setOpenMenu1(false);

    document.getElementById("Mainbtn").classList.remove("active");
    // document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.add("active");
  };


  // const loadMore = () => {
  //   let collectionDataState = collectionData;
  //   let start = collectionDataState?.length;
  //   let end = collectionDataState?.length + 4;
  //   if (filterData.length) {
  //     setCollectionData([...collectionDataState, ...filterData?.slice(start, end)]);
  //   } else {
  //     setCollectionData([
  //       ...collectionDataState,
  //       ...collectionData?.slice(start, end),
  //     ]);
  //   }
  // };
  const loadMore = () => {
    if (collectionData?.length > numItems) {
      console.log(numItems);
      console.log(collectionData?.length);
      setNumItems((prev) => prev + 3)
    }
  };

  const handleClose = () => {
    setShow(false);
    setAmounCheck1(false);
    setAmounCheck(false);
    setInputAmount(null);
  };

  const handleShow = () => {
    if (!isConnected || isConnected === undefined) {
      return history.push("/connectwallet");
    } else {
      setShow(true);
    }
  }


  const handleImageShow = () => setImageShow(true);
  const handleImageClose = () => setImageShow(false);
  const handleClose1 = () => setOpenBid(false);


  const [getMasterAddress, setGetMasterAddress] = useState();
  const [loader, setLoader] = useState(true);
  const [openBid, setOpenBid] = useState(false);
  const [sellingIsLoading, setSellingIsLoading] = useState(false);
  const [openBidCheck, setOpenBidCheck] = useState(false);
  const [openBidCheck1, setOpenBidCheck1] = useState(false);



  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 2000)
  }, [myData])

  useEffect(() => {
    getMarketByid()
  }, [id, accountId]);

  useEffect(async () => {
    if (myData && myData.collectionId) {
      getNftCollection()
    }
  }, [myData]);

  const getNftCollection = async () => {
    setCollectionLoading(true)
    // viewsCount()
    console.log(myData);
    await http
      .get(
        httpUrl +
        `/api/v1/Nft/GetAllNftsByCollectionId?collectionId=${myData.collectionId}&PageSize=9999&CurrentPage=1`
      )
      .then(async (res) => {
        console.log("object", res.data.data);
        setCollectionData(res.data.data);
        setCollectionLoading(false)
      })
      .catch((error) => {
        getNftCollection()
        console.log(error);
      });
  }

  useEffect(async () => {
    if (WalletBalance) {
      const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
      setBalance(amount);
      const payload = {
        nftId: id,
        accountId: accountId,
      };

    } else {
      setBalance("0");
      const payload = {
        nftId: id,
        accountId: accountId,
      };

    }

  }, [id, accountId]);

  useEffect(() => {
    if (myData) {
      console.log(MyProfile);
      profileData()
    }
  }, [myData])


  useEffect(() => {
    // setTimer(true)
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    setParamsLoading(false);
    if (myData && !isInterval) {
      console.log("myData.bidEndDate", myData.bidEndDate);
      const eventTime = moment(myData?.bidEndDate).unix();
      console.log("eventTime", eventTime);
      const currentTime = moment().unix();
      console.log("currentTime", currentTime);


      const diffTime = eventTime - currentTime;
      console.log("difftime", diffTime);
      let duration = moment.duration(diffTime * 1000, "milliseconds");
      console.log("duration", duration);
      const interval = 1000;
      var timerID = setInterval(() => {

        setIsInterval(true);
        if (duration._milliseconds <= 0) {
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
          setTimer(true);
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          // console.log("timestamp", duration);
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
          setTimer(true);
        }
      }, interval);
      return () => clearInterval(timerID);
    }
  }, [myData?.bidEndDate]);

  useEffect(() => {

    if (myData) {
      AllBids()
    }
  }, [myData])


  useEffect(async () => {
    if (isConnected) {
      await dispatch(GetFavouriteNftAction());
    }
  }, [])


  const AllBids = async () => {
    let params = window.location.pathname;
    setParams(params.split("/")[1]);
    setParamsLoading(false);
    if (WalletBalance) {
      const amount = await Web3.utils.fromWei(
        WalletBalance.toString(),
        "ether"
      );
      setBalance(amount);
      http
        .get(
          httpUrl + `/api/v1/Nft/GetNftBids?NftId=${params.split("/")[2]}`
        )
        .then(async (res) => {
          if (!res.data.data || res.data.data === null) {
            setEmptyBids(true);
            setIsLoading(false);
            setShow(false);
            setIsBiddingLoading(false);
          }
          else {
            setBiddings(res.data.data);
            setIsBiddingLoading(false);
            setShow(false);
            setIsLoading(false);
          }
        }).catch(() => {
          AllBids()
        });
    } else {
      http
        .get(
          httpUrl + `/api/v1/Nft/GetNftBids?NftId=${params.split("/")[2]}`
        )
        .then(async (res) => {
          if (!res.data.data || res.data.data === null) {
            setEmptyBids(true);
            setIsLoading(false);
            setShow(false);
            setIsBiddingLoading(false);
          }
          else {
            setBiddings(res.data.data);
            setIsBiddingLoading(false);
            setShow(false);
            setIsLoading(false);
          }
        }).catch(() => {
          AllBids()
        });
    }
  }

  useEffect(() => {
    if (myData) {
      viewsCount()
    }
  }, [myData])

  useEffect(() => {
    if (myData) {
      MasterAddressFunc()
    }
  }, [myData])

  const MasterAddressFunc = async () => {
    http
      .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
      .then(async (res) => {
        // console.log("GetMasterAddress", res?.data?.data.address);
        if (WalletBalance) {
          const amount = await Web3.utils.fromWei(
            WalletBalance.toString(),
            "ether"
          );
          setBalance(amount);
          setGetMasterAddress(res?.data?.data?.address);
        } else {
          setBalance("0");
          setGetMasterAddress(res?.data?.data?.address);
        }
      })
      .catch((error) => {
        // MasterAddressFunc()
        console.log("master add");
        console.log(error?.message);
      });
  }

  const viewsCount = async (e) => {
    await http
      .post(httpUrl + `/api/v1/Nft/AddViewNft?NftId=${myData?.id}`)
      .then((res) => {
        console.log("view added", res);
      }).catch((e) => {
        console.log("er", e);
      })
  }
  const profileData = async (e) => {
    if (WalletAddress) {
      console.log("WalletAddress", WalletAddress);
      await http
        .get(httpUrl + `/api/v1/Account/GetAccount?address=${WalletAddress}`)
        .then((res) => {
          setIsStacked(res.data.data.isStacked)
          setStakeLoading(false)
        }).catch((e) => {
          profileData()
          console.log("er stackingggg", e);
        })
    }
    else {
      setStakeLoading(false)

    }
  }

  const removeToFavourite = async (nftId, OwnerAddress, favCount) => {
    if (!favouriteInProgress) {
      const payload = {
        nftId: nftId,
        nftAddress: OwnerAddress,
      };

      await dispatch(RemoveFavouriteNftAction(payload))
        .then(async (resp) => {
          setFavouriteInProgress(false);

          if (resp?.isSuccess === true) {
            toast.error(`${resp?.data}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log("favcount --", favCount);

            await dispatch(GetFavouriteNftAction());
            // setFavCount((favcount) => favcount - 1);
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

  const sellingHandler = async (e) => {
    console.log("authconnectstate", AuthConnectState);
    e.preventDefault();
    setSellingIsLoading(true);
    const address = {
      address: myData.ownerAddress,
    };
    await http
      .post(httpUrl + "/api/v1/auth/connect", address)
      .then(async (res) => {
        console.log("authstate", res?.data.data.message);

        toast.success(
          `Selling in process`,
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

        await http
          .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
          .then(async (res) => {
            const payload = {
              approved: res?.data,
              tokenId: myData?.nftTokenId,
            };
            const payloadMarket = {
              nftContractId: myData?.contractAddress,
              tokenId: myData?.nftTokenId,
              price: NewPrice,
              isUnderOrgnization: myData?.organizationName ? true : false,
              orgnizationAddress: myData?.organizationWalletAddress ? myData?.organizationWalletAddress : '0x0000000000000000000000000000000000000000',
              orgnizationPercentage: myData?.organizationPercentAmount ? (myData?.organizationPercentAmount) : '0',
              // marketAddress: resAddress
            };
            dispatch(
              approveContract(
                payload,
                myData?.contractAddress,
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

                let body = {
                  nftId: myData?.id,
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
              }).catch((e) => {
                // toast.error(
                //   `Transaction Rejected`,
                //   {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //   }
                // );
                setSellingIsLoading(false)

                console.log("error in approve", e);
              })
            )
            marketFunction();
            setSellingIsLoading(false)
          });

      })
      .catch((error) => {

      });

  };

  const marketFunction = (e) => {
    console.log("IN IT");
    const payloadMarket = {
      nftContractId: myData?.contractAddress,
      tokenId: myData?.nftTokenId,
      price: NewPrice,
    };
    dispatch(
      approveContract(payloadMarket, myData?.contractAddress).then(
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

  async function getMarketByid() {
    await http
      .get(
        httpUrl +
        `/api/v1/Nft/GetNftMarketById?nftId=${id}&accountId=${accountId}`
      )
      .then(async (res) => {
        setMyData(res.data.data);
        setmyDataLoader(false)
      })
      .catch((error) => {
        getMarketByid()
        console.log(error);
      });
  }

  const acceptBidOffer = async (id, price, buyerAddress, contractAddress) => {
    console.log("accept bid");
    console.log(id);
    console.log("accept bid");
    await http
      .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
      .then(async (res) => {
        console.log("market address", res.data.data);
        const payload = {
          contractAddress: res.data.data,
          tokenId: myData?.nftTokenId,
          price: price,
          buyerAddress: buyerAddress,
          nftContractAddress: contractAddress,
        };
        dispatch(acceptBid(payload)).then((res) => {
          delay(5000).then(async () => {
            toast.success(`Bid has been accepted!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            await http
              .put(httpUrl + `/api/v1/Nft/bidAccepted?bidId=${id}&TransactionHash=${res.hash}`)
              .then(async (res) => {
                console.log("added accepted response", res);
                delay(2000).then(async () => {
                  history.push("/marketplace");
                });
              });
          });
        }).catch(() => {
          toast.error(`Transaction rejected`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
        console.log("ACCEPT BID PAYLOAD", payload);
      });
  };


  const amountStatus = (value) => {
    if (value > balance) {
      setAmounCheck(true);
      setOpenBidCheck(false)
    } else if (value > maxInputAmount) {
      setAmounCheck2(true);
      setOpenBidCheck(false)
    } else {
      setOpenBidCheck(true)
      setAmounCheck2(false);
      setAmounCheck(false);
      setInputAmount(value);
    }
  };
  const amountStatus1 = (value) => {
    if (value < inputAmount) {
      setAmounCheck1(true);
      setOpenBidCheck1(false)
    }
    else {
      setAmounCheck1(false);
      setOpenBidCheck1(true)
      setAmounCheck(false);
      setMaxInputAmount(value);
    }
  };


  const openBidding = async () => {
    setBidInProgress(true);

    let params = window.location.pathname;
    console.log("nftid", params.split("/")[2]);
    console.log("accountid", params.split("/")[3]);
    await http
      .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
      .then(async (res) => {
        console.log("object", res);
        const contractPayload = {
          nftContractId: myData?.contractAddress,
          tokenId: myData?.nftTokenId,
          price: inputAmount,
          maxPrice: maxInputAmount,
          contractAddress: res.data.data,
          isUnderOrgnization: myData?.organizationName ? true : false,
          orgnizationAddress: myData?.organizationWalletAddress,
          orgnizationPercentage: myData?.organizationPercentAmount ? (myData?.organizationPercentAmount) : '0'
        };
        dispatch(openForAuction(contractPayload))
          .then(async (approvedHashes) => {
            console.log("auction response");
            console.log(res);
            console.log("auction response");
            let params = window.location.pathname;
            const payload = {
              nftId: params.split("/")[2],
              isBidOpen: true,
              minimumAmount: inputAmount,
              maximumAmount: maxInputAmount,
              bidStartDate: startDate,
              bidEndDate: endDate,
            };
            console.log(payload);
            await http
              .post(httpUrl + "/api/v1/Nft/OpenBid", payload)
              .then(async (res) => {
                let body = {
                  nftId: params.split("/")[2],
                  price: maxInputAmount,
                  approvalTransactionHash: approvedHashes.res.hash,
                  openOrderTransactionHash: approvedHashes.response.hash,
                };
                console.log("added bid response", res);
                setShow(false);
                setBidtrigger(true);
                delay(5000).then(async () => {
                  console.log("I have got 5 sec delay");
                  await http
                    .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
                    .then(async (res) => {
                      setBidInProgress(false);
                      console.log("STATUS");
                      console.log("STATUS", res);
                      console.log("STATUS");
                      toast.success(
                        `NFT Bidding has been opened, you will be redirected shortly`,
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
                    })
                    .catch((err) => {
                      console.log("SellNftMarket" + err?.message);
                      setBidInProgress(false);
                    });
                });
              })
              .catch((err) => {
                console.log("OpenBid" + err?.message);
                setBidInProgress(false);
              });
          })
          .catch((err) => {
            toast.error(
              `Transaction Rejected`,
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
            setBidInProgress(false);
          });
      })
      .catch((err) => {
        console.log("GetMarketNftAddress" + err?.message);
        setBidInProgress(false);
      });
  };


  const cancelListing = async () => {
    setCancelLoading(true)
    await http
      .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
      .then(async (res) => {
        const contractPayload = {
          contractAddress: res.data.data,
          nftContractId: myData?.contractAddress,
          tokenId: myData?.nftTokenId,
        };
        dispatch(cancelNft(contractPayload))
          .then(async (approvedHash) => {
            const hashPayload = {
              nftId: myData?.id,
              cancelTransactionHash: approvedHash.hash
            }
            console.log("objectttttttttt", hashPayload);
            delay(8000).then(async () => {
              await http
                .post(httpUrl + "/api/v1/Nft/NftCancelStatus", hashPayload)
                .then(async (res) => {
                  console.log("back to hold", res);
                  toast.success(
                    `NFT has been unlisted from marketplace`,
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
                  setCancelLoading(false)
                  setTimeout(() => {
                    history.push("/myprofile");
                  }, 3000);
                })
            })
          }).catch(() => {
            toast.error(
              `Transaction Rejected`,
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
            setCancelLoading(false)
          })
      })
  };



  const expiryDateFunc = (date) => {
    let dateNow = new Date();
    dateNow = moment(dateNow).unix();
    let dateEntered = moment(date).unix();
    if (dateEntered <= dateNow) {
      console.log("errer");
      setExpiryError(true);
    } else {
      setExpiryError(false);
      console.log(date);
      setExpiryDate(date);
    }
  };
  const startDateFunc = (date) => {
    let dateNow = new Date();
    dateNow = moment(dateNow).unix();
    let dateEntered = moment(date).unix();
    if (dateEntered <= dateNow) {
      console.log("errer");
      setBidError(true);
    } else {
      setBidError(false);
      console.log(date);
      setStartDate(date);
    }
  };

  const endDateFunc = (date) => {
    let dateNow = new Date();
    dateNow = moment(dateNow).unix();
    let dateEntered = moment(date).unix();
    if (dateEntered <= dateNow) {
      console.log("errer");
      setBidError1(true);
    } else {
      setBidError1(false);
      console.log(date);
      setEndDate(date);
    }
  };

  const switchStatus = () => {
    console.log("SWITCHHHHH", !isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  };

  const postBidding = async () => {
    setIsOfferInProgress(true);

    if (inputAmount == undefined) {
      setIsOfferInProgress(false);
      return;
    }

    let params = window.location.pathname;
    const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
    setBalance(amount);

    await http
      .get(httpUrl + "/api/v1/Nft/GetWBNBAddress")
      .then(async (response) => {
        console.log("WBNB address", response);
        await http
          .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
          .then(async (res) => {
            console.log("marketplacecontractaddress", res.data);
            const contractPayload = {
              marketPlaceContract: res.data.data,
              ownerAddress: myData?.ownerAddress,
              contractAddress: response?.data?.data,
              id: myData?.nftTokenId,
              price: inputAmount,
            };
            console.log(contractPayload);
            setBidtrigger(false);
            dispatch(approveNft(contractPayload)).then((res) => {
              toast.success(`Bidding is in process!`, {
                position: "top-right",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              delay(15000).then(async () => {
                console.log("hashhhdqdidnqiudnqwidnw", res);
                biddingPosting(res.hash)

              });
            }).catch(() => {
              toast.error(`Transaction rejected`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setIsOfferInProgress(false);
            });
          });
      });
  };

  const biddingPosting = async (hash) => {
    let params = window.location.pathname;
    console.log("hashhhhhhh", hash);
    let expp = moment(expiryDate).unix()
    let current = moment(expiryDate).unix()
    let diff = expp - current
    let duration = moment.duration(diff * 1000, "milliseconds");

    const payload = {
      nftId: params.split("/")[2],
      price: inputAmount,
      bidApprovalHash: hash,
      expiryDate: expiryDate
    };
    console.log("payload bid", payload);
    await http
      .post(httpUrl + "/api/v1/Nft/AddNftBid", payload)
      .then(async (res) => {
        toast.success(`Bid has been added!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("ADDED BID", res);
        setIsOfferInProgress(false);
        getBiddings(payload)
      })
      .catch((error) => {
        biddingPosting()
        setIsOfferInProgress(false);
      });
  }

  const getBiddings = async (payload) => {
    await http
      .get(
        httpUrl +
        `/api/v1/Nft/GetNftBids?NftId=${payload.nftId}`
      )
      .then(async (res) => {
        console.log("#######################", res.data.data);
        if (!res.data.data || res.data.data === null) {
          setEmptyBids(true);
        }
        setEmptyBids(false);
        setBiddings(res.data.data);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        console.log(res.data.data);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
        setIsLoading(false);
        setIsBiddingLoading(false);
        setShow(false);
        setBidtrigger(true);
      }).catch(() => {
        getBiddings(payload)
      });
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      if (!isConnected || isConnected == undefined) {
        return history.push("/connectwallet");
      }

      setIsLoading(false);
      dispatch(signMessage(AuthConnectState?.message))
        .then(async (res) => {
          const amount = parseInt(
            Web3.utils.toWei(String(myData?.sellPrice))
          ).toString(16);

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
                nftId: myData.id,
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
    } else {
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

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
  };

  const inputhandler = (e) => {
    const { value } = e.target;

    SetNewPrice(value);
  };

  const buyNft = async () => {
    if (!isConnected || isConnected == undefined) {
      return history.push("/connectwallet");
    } else {
      setBidInProgress(true);
      console.log("in");
      await http
        .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
        .then(async (res) => {
          const payload = {
            contractAddress: res.data.data,
            nftContractId: myData?.contractAddress,
            tokenId: myData?.nftTokenId,
            price: myData?.sellPrice,
          };
          console.log("object", payload);
          dispatch(buyNftMarket(payload))
            .then((res) => {
              toast.success(`NFT purchasing in process. Please wait.`, {
                position: "top-right",
                autoClose: 15000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              delay(22000).then(async () => {
                console.log("bought nft", res);
                toast.success(`NFT bought!`, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                console.log("hurrayyyyyyy");
                const payload1 = {
                  address: "",
                  transactionHash: res.hash,
                  nftId: myData?.id,
                };
                console.log("payload buy nft", payload1);
                buyNftMarketFunc(payload1)

              });
            })
            .catch((err) => {
              toast.error(`Transaction rejected`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setBidInProgress(false);
            });
        });
    }
  };


  const buyNftMarketFunc = async (payload) => {
    await http
      .post(httpUrl + "/api/v1/Nft/BuyNftMarket", payload)
      .then(async (response) => {
        setBidInProgress(false);
        console.log(
          "responseeeeeeeeeeeeeeeeeeeeeeeeeeee",
          response
        );
        setTimeout(() => {
          history.push("/myprofile");
        }, 1000);
      })
      .catch((err) => {
        buyNftMarketFunc(payload)
        // setBidInProgress(false);
      });
  }

  const addToFavourite = async (nftID, OwnerAddress) => {
    console.log("user token ", Token)
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
          toast.error(`NFT Already Liked`, {
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
        console.log(error);
        swal({
          icon: "error",
          title: error?.data?.message,
        });
      });
  };

  const modalOpen = () => {
    setModalStatus(true);
  };


  return (
    <div>
      <GlobalStyles />
      {(loader && myDataLoader) ? (
        <>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="col-sm-12 d-flex justify-content-center margin-top-150">
            <RingLoader color="black" size="60" />
          </div>
        </>
      ) : (
        <>
          <div className="spacer-double"></div>
          <section className="container user-nft-head">
            <div className="small-pnl secnd-anime"></div>
            <div className="row  pt-md-4">
              <div className="col-lg-5 col-md-12 col-sm-12">
                <div className="my-profile-Img-pnl full-div" style={{ background: `url(${httpUrl + "/" + myData?.image.replaceAll("\\", "/")}) no-repeat`, }}>
                  <img src={`${httpUrl}/${myData?.image}`} className="img-fluid img-rounded mb-sm-30" alt="NFT.png" />
                  <span className="heart-span hanging"><i className="fa fa-heart"></i></span>
                </div>
                <div className="spacer-single"></div>

                {/* <div className="my-profile-details-pnl full-div">
                  <ul className="my-profile-details-list">

                    <li className="head">
                      <p>Details </p>

                    </li>
                    <li>
                      <p>Contract Address</p>

                      <span className="contract-hover"
                        onClick={() => { window.open(`https://testnet.bscscan.com/address/${myData?.contractAddress}`) }}
                        title={myData?.contractAddress}>
                        {myData?.contractAddress && (
                          myData.contractAddress.slice(0, 5) + ".." + myData.contractAddress.substr(myData.contractAddress.length - 5)
                        )}
                      </span>
                    </li>
                    <li>
                      <p>Token IDv</p>
                      <span>{myData?.id}</span>
                    </li>
                    <li>
                      <p>Token Standard</p>
                      <span>BEP-20</span>
                    </li>
                    <li>
                      <p>Blockchain</p>
                      <span>BSC</span>
                    </li>
                  </ul>
                </div>
                <div className="my-profile-details-pnl full-div">
                  <ul className="my-profile-details-list">
                    <>
                      <li className="head">
                        <p>Properties </p>

                      </li>
                      {myData?.nftProperties.length == 0 && (
                        <span className="my-profile-details-pnl full-div">No properties added.</span>
                      )}
                      {myData?.nftProperties.map((item) => (
                        <>
                          <li className="d-flex col-4">
                            <div
                              className="properties-box"

                            >
                              <p>{item?.name ? item?.name : "Name not Defined"}</p>
                              <h4 className="text-dark">
                                <strong>{item?.type ? item?.type : "Type not Defined"} </strong>
                              </h4>
                            </div>
                          </li>
                        </>
                      ))}
                    </>
                  </ul>
                </div> */}
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <h1>{myData?.name}</h1>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <ul className="share-info-list">
                      <li>Share</li>
                      <li title="Refresh" onClick={() => { window.location.reload(); }}>
                        <a href="#"><i class="fa fa-refresh"></i></a>
                      </li>
                      <li>
                        <a href="#" onClick={async () => {
                          await navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied successfully", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                          });
                        }}>
                          <i class="fa fa-link"></i>
                        </a>
                      </li>
                      {myData?.externalLink && (
                        <li onClick={() => { window.open(myData?.externalLink); }} title="Open NFT" >
                          <a href="#">
                            <i class="fa fa-external-link"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="time-pnl">
                      <h6>Current Bid</h6>
                      {myData?.isBidOpen && (
                        <>
                          <span>
                            Min price --{" "}
                            {myData?.bidInitialMinimumAmount
                              ? myData?.bidInitialMinimumAmount
                              : "Min price not set."}
                          </span>
                          <span style={{ marginLeft: "10px" }}>
                            Max price --{" "}
                            {myData?.bidInitialMaximumAmount
                              ? myData?.bidInitialMaximumAmount
                              : "Max price not set."}
                          </span>
                        </>
                      )}

                      <p>
                        <i title="BNB" class="fa fa-coins"></i>{" "}
                        {myData?.sellPrice ? myData?.sellPrice : myData?.buyPrice}{" "}
                        <span>
                          [$
                          {myData?.sellPrice ? (myData?.sellPrice * 530)
                            .toString()
                            .slice(0, 5) : (myData?.buyPrice * 530)
                              .toString()
                              .slice(0, 5)}
                          ]
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="time-pnl">
                      <h6>Auction Ending In</h6>
                      <ul className="timer">
                        <>
                          <li>
                            <p>{days ? days : days === 0 ? 0 : <RingLoader color="black" size="20" width="10" />}</p>
                          </li>
                          <li>
                            <p>:</p>
                          </li>
                          <li>
                            <p>{hours ? hours : hours === 0 ? 0 : <RingLoader color="black" size="20" width="10" />}</p>
                          </li>
                          <li>
                            <p>:</p>
                          </li>
                          <li>
                            <p>{minutes ? minutes : minutes === 0 ? 0 : <RingLoader color="black" size="20" width="10" />}</p>
                          </li>
                          <li>
                            <p>:</p>
                          </li>
                          <li>
                            <p>{seconds ? seconds : seconds === 0 ? 0 : <RingLoader color="black" size="20" width="10" />}</p>
                          </li>
                        </>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="item_info">
                  {/* <p>{myData?.description}</p> */}
                  {/* <div className="item_creator">
                    <div className="pic-post">
                      <div className="creator_list_pp">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/profile/${myData.creatorAddress}`}
                        >
                          <img
                            className="lazy"
                            src={myData?.ownerImage ? `${httpUrl}/${myData?.ownerImage}` : defaultImg}
                         
                            alt="Author.png"
                            className="author_sell_Nft_image"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="creator_list_info">
                        <h6>Creator</h6>
                        <span>
                          {myData?.ownerName
                            ? myData?.ownerName
                            : "Unnamed"}
                        </span>
                      </div>
                    </div>
                    <div className="pic-post">
                      <div className="creator_list_pp ">
                        <Link
                          style={{ textDecoration: "none" }}
                          to={myData?.creatorAddress === WalletAddress ? `/myprofile` : `/profile/${myData.ownerAddress}`}
                        >
                          <img
                            className="lazy"
                            src={myData?.ownerImage ? `${httpUrl}/${myData?.ownerImage}` : defaultImg}
                        
                            alt="Author.png"
                            className="author_sell_Nft_image"
                          />
                        </Link>
                      </div>
                      <div className="creator_list_info right">
                        <h6>Owner</h6>
                        <span>
                          {myData?.ownerName
                            ? myData?.ownerName
                            : "Unnamed"}
                        </span>
                      </div>
                    </div>
                  </div> */}
                  <ul className="coin-bid-list">
                    <li>
                      <h6>{myData?.organizationName}</h6>
                      <p>Organization Name</p>
                    </li>
                    <li>
                      <h6>{'Binance Smart Chain'}</h6>
                      <p>Block Chain</p>
                    </li>
                  </ul>
                  {/* <p style={{ fontSize: 13 }}>{myData?.collectionName}</p> */}
                  {/* <h1>{myData?.name}</h1> */}
                  {/* <p>Price: {myData?.sellPrice}</p> */}
                  {/* <BuyUserNft /> */}
                  {/* <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                  />*/}
                  {/* <form name="contactForm" id="contact_form" className="form-border" onSubmit={onsubmitHandler}></form> */}
                </div>


                <div className="row">
                  {/* <div className="col-md-12 profiler-info">
                    <h2>
                      <h2
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            `/nftsbycollections/${myData.collectionId}`
                          );
                        }}
                      >
                        {myData?.collectionName}
                      </h2>{" "}
                      {"by"}{" "}
                      <h4
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            myData?.creatorAddress === WalletAddress ?
                              `/myprofile` :
                              `/profile/${myData.creatorAddress}`
                          );
                        }}
                      >
                        {myData?.creatorName
                          ? myData?.creatorName
                          : "Unnamed"}
                      </h4>
                    </h2>
                    <h3>
                      {myData?.name} {"#"}
                      {myData?.id}
                    </h3>
                    <h4>
                      Owned by{" "}
                      <span
                        className="contract-hover"
                        onClick={() => {
                          history.push(
                            `/profile/${myData.ownerAddress}`
                          );
                        }}
                      >
                        {myData?.ownerName
                          ? myData?.ownerName
                          : "Unnamed"}
                      </span>
                    </h4>
                    <div style={{ paddsingLeft: "10px" }}>
                      <i class="fa fa-eye"></i> {myData?.viewCount + " "}

                      {GetFavouriteNft?.some(
                        (item, index) => {
                          return (
                            item.nftTokenId === myData?.nftTokenId
                          );
                        }
                      ) ? (
                        <>
                          <i
                            onClick={() => addToFavourite(myData?.id, myData.ownerAddress)}
                            className="fa fa-heart"
                            style={{ color: "red" }}
                          ></i>{" " + myData?.nftFavouritesCount}
                        </>
                      ) : (
                        <>
                          <i
                            onClick={() => addToFavourite(myData?.id, myData.ownerAddress)}
                            className="fa fa-heart"
                          ></i>{" " + myData?.nftFavouritesCount}
                        </>
                      )}
                    </div>
                  </div> */}
                </div>
                <div className="full-div">

                  <Modal
                    centered show={openBid} onHide={handleClose1}>
                    <Modal.Header>
                      <Modal.Title style={{ color: "black" }}>Open bid</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Price
                      <InputGroup className="mb-3">
                        <InputGroup.Text style={{ width: '60px', height: '38px', marginTop: '0px' }}>Min</InputGroup.Text>
                        <FormControl placeholder="Amount" type="number" onChange={(e) => amountStatus(e.target.value)} aria-label="Amount (to the nearest dollar)" />
                        <InputGroup.Text style={{ width: '60px', height: '38px', marginTop: '0px' }}>Max</InputGroup.Text>
                        <FormControl placeholder="Amount" type="number" onChange={(e) => amountStatus1(e.target.value)} aria-label="Amount (to the nearest dollar)" />


                      </InputGroup>
                      <div className='bidDates'>
                        <div className='bidDat'>
                          <h6 style={{ color: '#000' }}>Start Date</h6>
                          <DatePicker className='dateInput' selected={startDate} onChange={(date) => startDateFunc(date)} />
                        </div>
                        <div className='bidDat'>
                          <h6 style={{ color: '#000' }}>End Date</h6>
                          <DatePicker className='dateInput' selected={endDate} onChange={(date) => endDateFunc(date)} />
                        </div>
                        {bidError && (
                          <span style={{ color: 'red', display: 'inline-block', float: 'left', width: '50%' }}>Can't use past date for start date.</span>
                        )}
                        {bidError1 && (
                          <span style={{ color: 'red', display: 'inline-block', float: 'right', width: '50%' }}>Can't use past date for end date.</span>
                        )}
                      </div>
                      {amountCheck && (
                        <span style={{ color: 'red', display: 'inline-block', float: 'left', width: '50%' }}>Input value must be lower than available balance</span>
                      )}
                      {amountCheck1 && (
                        <span style={{ color: 'red', display: 'inline-block', float: 'left', width: '50%' }}>Max value must be greater than Min value</span>
                      )}
                      {amountCheck2 && (
                        <span style={{ color: 'red', display: 'inline-block', float: 'left', width: '50%' }}>Min value must be lower than Max value</span>
                      )}
                    </Modal.Body>
                    <Modal.Body>Available balance: {balance}{" "}BNB</Modal.Body>

                    <Modal.Body className="d-flex justify-content-center">

                      <Form>
                        {["checkbox"].map((type) => (
                          <div key={`inline-${type}`} className="mb-0">
                            <Form.Check
                              inline
                              label="By checking this, I agree Fine Original Terms of Service"
                              name="group1"
                              style={{ marginBottom: '0px' }}
                              type={type}
                              checked={isSwitchOn}
                              id={`inline-${type}-1`}
                              onChange={() => {
                                switchStatus();
                              }}
                            />
                          </div>
                        ))}
                      </Form>
                    </Modal.Body>

                    <Modal.Footer>
                      <button className="reg-btn-green2" onClick={handleClose1}>
                        Close
                      </button>

                      {!bidInProgress ? (
                        <>
                          {openBidCheck && openBidCheck1 ? (
                            <button
                              // variant="primary"
                              className="reg-btn-green1"
                              disabled={!isSwitchOn}
                              onClick={openBidding}
                            >
                              Open bid
                            </button>
                          ) : (
                            <button
                              // variant="primary"

                              className="reg-btn-green1"

                              disabled={true}
                            // onClick={ openBidding}
                            >
                              Open bid
                            </button>
                          )}

                        </>
                      ) : (
                        <button className="reg-btn-green1" disabled>
                          <PulseLoader color="white" size="11" />
                        </button>
                      )}
                    </Modal.Footer>
                  </Modal>

                  {isConnected ? (
                    <>
                      {(myData?.ownerAddress != WalletAddress && !myData?.isBidOpen && myData?.staus !== "Hold") && (
                        <>
                          {!bidInProgress ? (
                            <button
                              onClick={buyNft}
                              id="btnBuy"
                              type="submit"
                              class="reg-btn-green"
                            >
                              BUY
                            </button>
                          ) : (
                            <button
                              id="btnBuy"
                              class="reg-btn-green"
                              disabled
                            >
                              <PulseLoader color="white" size="15" />
                            </button>
                          )}
                        </>
                      )}

                    </>
                  ) : (
                    <></>
                  )}
                  {isConnected ? (
                    <>
                      {(myData?.ownerAddress != WalletAddress && myData?.isBidOpen) && (
                        <button
                          onClick={handleShow}
                          id="btnBuy"
                          type="submit"
                          class="reg-btn-green"
                        >
                          <i className="fa fa-shopping-cart"></i> Place Bid
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                    </>
                  )}
                  {/* </form> */}
                </div>
                <div className="description-details-pnl full-div">
                  <div style={{ position: 'relative', paddingBottom: '35px' }} className="description-details-head full-div">
                    <div className="description-details-text w-100">

                    </div>
                    {((myData?.staus === 'ReadyForSell' || myData?.isBidOpen === true) && (myData?.ownerAddress === WalletAddress)) && (
                      cancelLoading ? (
                        <button
                          disabled
                          id="btnBuy"
                          type="submit"
                          class="reg-btn-green"
                        >
                          <PulseLoader color="white" size="11" />
                        </button>
                      ) : (
                        <button
                          onClick={() => cancelListing()}
                          id="btnBuy"
                          type="submit"
                          class="reg-btn-green"
                        >
                          Cancel listing
                        </button>
                      )
                    )}
                    {((myData?.staus != "ReadyForSell" &&
                      myData?.isMinted === true) && (myData?.ownerAddress === WalletAddress)) && (
                        <>
                          <button
                            onClick={() => setFilterTrigger(true)}
                            id="btnBuy"
                            type="submit"
                            class="reg-btn-green"
                          >
                            Sell NFT
                          </button>
                        </>
                      )}
                    {myData?.ownerAddress === WalletAddress && !myData?.isBidOpen &&
                      myData?.freezeData &&
                      myData.staus != "ReadyForSell" && (
                        <button
                          onClick={() => setOpenBid(true)}
                          id="btnBuy"
                          type="submit"
                          class="reg-btn-green"
                        >
                          Open bid
                        </button>
                      )}
                    {(!myData?.freezeData) && (myData?.ownerAddress === WalletAddress) && (
                      <button
                        onClick={() =>
                          history.push(
                            `/createnft/${myData?.ownerAddress}/${myData?.id}/${myData?.accountId}`
                          )
                        }
                        id="btnBuy"
                        type="submit"
                        class="reg-btn-green"
                      >
                        Update NFT
                      </button>
                    )}



                    {/* {isConnected ? (
                      <>
                        {!isStacked && !stakeLoading && (
                          <>
                            <span className="des-col-red">Need to stake first in order to mint and sell NFT.</span>

                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="des-col-red">Need to login first in order to buy/sell.</span>

                      </>
                    )} */}
                  </div>

                  {/* <div className="description-details-bottom full-div">
                    <div className="head full-div">
                      <p>Description</p>
                    </div>
                    <div className="description full-div">
                      <p>
                        {showMore ? myData?.description : `${myData?.description?.substring(0, 300)}`}
                        {myData?.description?.length > 300 ? (
                          <span className="btn-more-less" onClick={() => setShowMore(!showMore)}>
                            {showMore ? " view less" : "...view more"}
                          </span>
                        ) : null
                        }
                      </p>
                      <a
                        className="contract-hover"
                        onClick={() =>
                          history.push(
                            myData?.creatorAddress === WalletAddress
                              ? `/myprofile`
                              : `/profile/${myData?.creatorAddress}`
                          )}>
                        Created By {myData?.creatorName ? myData?.creatorName : "Unnamed"}
                      </a>
                    </div>
                  </div> */}
                </div>


                <section className="container no-top">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="items_filter">
                        <ul className="de_nav de_nav left-align">
                          <li id="Mainbtn" className="active">
                            <span onClick={handleBtnClick}>Details</span>
                          </li>
                          <li id="Mainbtn2" className="">
                            <span onClick={handleBtnClick2}>Additional Info</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {openMenu && (

                    <div id="zero1" className="onStep fadeIn">

                      <ul className="user-visitor-list">
                        {emptyBids ? (
                          <>No bids added so far</>
                        ) : (
                          <>
                            {biddings?.map((nft, index) => (
                              <>
                              <h3>Description</h3>
                                <p>{myData?.description}</p>
                                <li>

                                  <div>
                                    <div className="img-pnl">
                                      <img src={myData?.ownerImage ? `${httpUrl}/${myData?.ownerImage}` : defaultImg} alt="Eth" />
                                    </div>
                                    <div className="txt-pnl">
                                      <h5>{nft.accountViewModel.username ? nft.accountViewModel.username : 'Unnamed'}</h5>
                                      <p>

                                        <span>{moment.duration(nft.expiryDate.split("T")[0]).humanize() + ' ago'}</span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="price-eth">
                                    <p>
                                      <b>{nft.price + "BNB"}</b>
                                      ~${(nft.price * 530)
                                        .toString()
                                        .slice(0, 6)}
                                    </p>
                                  </div>
                                  {myData?.ownerAddress === WalletAddress && (
                                    <div className="col-md-3 col-lg-3 col-sm-3 col-3">
                                      <button
                                        onClick={() =>
                                          acceptBidOffer(
                                            nft.id,
                                            nft.price,
                                            nft.accountViewModel.address,
                                            nft.nftResponseModel.contractAddress
                                          )
                                        }
                                        id="btnBuy1"
                                        type="submit"
                                        class="reg-btn-green"
                                      >
                                        Accept
                                      </button>
                                    </div>
                                  )}
                                </li>
                              </>
                            ))}

                          </>
                        )}

                        {/* <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p>
                                Place A Bid
                                <span>15 mins ago</span>
                              </p>
                            </div>
                          </div>
                          <div className="price-eth">
                            <p>
                              <img src={cryptocurrency} alt="Eth" />
                              <b>0.060 ETH</b>
                              ~$98.11
                            </p>
                          </div>
                        </li> */}
                        {/* <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p>
                                Place A Bid
                                <span>15 mins ago</span>
                              </p>
                            </div>
                          </div>
                          <div className="price-eth">
                            <p>
                              <img src={cryptocurrency} alt="Eth" />
                              <b>0.060 ETH</b>
                              ~$98.11
                            </p>
                          </div>
                        </li> */}
                        {/* <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p>
                                Place A Bid
                                <span>15 mins ago</span>
                              </p>
                            </div>
                          </div>
                          <div className="price-eth">
                            <p>
                              <img src={cryptocurrency} alt="Eth" />
                              <b>0.060 ETH</b>
                              ~$98.11
                            </p>
                          </div>
                        </li> */}
                      </ul>
                    </div>
                  )}
                  {openMenu1 && (
                    <div id="zero2" className="onStep fadeIn">
                      <ul className="user-visitor-list">
                        <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p className="time-p">
                                45 mins ago
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p className="time-p">
                                45 mins ago
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div>
                            <div className="img-pnl">
                              <img src={`${httpUrl}/${myData?.ownerImage}`} alt="Eth" />
                            </div>
                            <div className="txt-pnl">
                              <h5>Richerd Willson SR</h5>
                              <p className="time-p">
                                45 mins ago
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                  {openMenu2 && (
                    <div id="zero3" className="onStep fadeIn">
                      <p className="clrd">
                        <b>Contract Address :</b> {myData?.contractAddress}
                      </p>
                      <p>
                        <b>Token ID : </b>
                        {myData?.nftTokenId}
                      </p>
                      <p>
                        <b>Metadata :</b>
                        {myData?.isMinted ? 'Not editable' : 'Editable'}
                      </p>
                      <p>
                        <b>File Size : </b>
                        2048 x 2048 px.IMAGE(1.27MB)
                      </p>
                    </div>
                  )}

                </section>

                <Modal centered show={filterTrigger} onHide={sellingModal}>
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
                          onSubmit={sellingHandler}
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
                              {sellingIsLoading ? (
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




                <Modal centered show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>
                      Make an offer
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Price
                    <InputGroup className="mb-3">
                      <InputGroup.Text className="h-100">
                        BNB
                      </InputGroup.Text>
                      <FormControl
                        placeholder="Amount"
                        type="number"
                        onChange={(e) =>
                          amountStatus(e.target.value)
                        }
                        aria-label="Amount (to the nearest dollar)"
                      />
                    </InputGroup>
                    <div className=''>
                      <h6 style={{ color: '#000' }}>Expiry date</h6>
                      <DatePicker selected={expiryDate} onChange={(date) => expiryDateFunc(date)} />
                    </div>
                    {expiryError && (
                      <span style={{ color: 'red', display: 'inline-block', float: 'left', width: '50%' }}>Can't use past date for expiry date.</span>
                    )}
                    {amountCheck && (
                      <p style={{ color: "red" }}>
                        Input value must be lower than available
                        balance
                      </p>
                    )}
                    {inputAmount > myData?.bidInitialMaximumAmount && (
                      <p style={{ color: "red" }}>
                        Input value must be lower or equal than maximum bid
                        price
                      </p>

                    )}
                    {inputAmount < myData?.bidInitialMinimumAmount && (
                      <p style={{ color: "red" }}>
                        Input value must be greater or equal to minimum bid
                        price
                      </p>

                    )}
                  </Modal.Body>
                  <Modal.Body>
                    Min bidding price: {myData?.bidInitialMinimumAmount} BNB
                  </Modal.Body>
                  <Modal.Body>
                    Max bidding price: {myData?.bidInitialMaximumAmount} BNB
                  </Modal.Body>

                  <Modal.Body>
                    Available balance: {balance} BNB
                  </Modal.Body>

                  <Modal.Body className="d-flex justify-content-center w-30">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div
                          key={`inline-${type}`}
                          className="mb-3"
                        >
                          <Form.Check
                            inline
                            label="By checking this, I agree Fine Original Terms of Service "
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                            checked={isSwitchOn}
                            onChange={() => {
                              switchStatus();
                            }}
                          />
                        </div>
                      ))}
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <button
                      className="reg-btn-green2"
                      onClick={handleClose}
                    >
                      Close
                    </button>

                    {expiryError ? (
                      <>
                        <button
                          className="reg-btn-green1"
                          disabled={true}
                        >
                          Make Offer
                        </button>
                      </>

                    ) : (
                      <>

                        {!isOfferInProgress ? (
                          <>
                            {inputAmount >= myData?.bidInitialMinimumAmount && inputAmount <= myData?.bidInitialMaximumAmount && inputAmount <= balance
                              ? <button
                                className="reg-btn-green1"
                                onClick={postBidding}
                                disabled={!isSwitchOn}
                              >
                                Make Offer
                              </button> : (<button
                                className="reg-btn-green1"
                                disabled={true}
                              >
                                Make Offer
                              </button>)


                            }</>) : (
                          <button className="reg-btn-green1" disabled>
                            <PulseLoader color="white" size="11" />
                          </button>
                        )}
                      </>
                    )}

                  </Modal.Footer>
                </Modal>

                <Modal
                  centered
                  show={imageShow}
                  onHide={handleImageClose}
                >
                  <Modal.Header>
                    <Modal.Title style={{ color: "black" }}>
                      <img
                        src={`${httpUrl}/${myData?.image}`}
                        className="img-fluid img-rounded mb-sm-30"
                        alt="NFT.png"
                      />
                    </Modal.Title>
                  </Modal.Header>
                </Modal>
                <br></br>
              </div>
            </div>
            <section className="related-item-section">
              <div className="mt-5">
                <div className="row">
                  <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 onStep css-keef6k">
                    <h2>Related Items</h2>
                    <h3 class="style-brder">RELATED</h3>
                  </div>
                  <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 text-right onStep css-keef6k">
                    <a href="#" role="button" onClick={() => history.push('/marketplace')} className="viewall-btn">
                      <span>See More{" "} </span>
                    </a>
                  </div>
                </div>

                <div className="spacer-40"></div>
                <div className="row">
                  {collectionLoading ? (
                    <>
                      <div className="col-sm-12 d-flex justify-content-center margin-top-150">
                        <RingLoader color="black" size="60" />
                      </div>
                    </>
                  ) : (
                    <>
                      {collectionData?.slice(0, numItems).map((nft, index) => {
                        return (
                          <>
                            <div
                              key={index}
                              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                            >
                              <div className="nft">

                                <div className="nft_coll">
                                  <div className="nft_wrap">
                                    <div className="flex-div">
                                      <ul className="post-creatr-list">
                                        <li>
                                          <a href="javascript:void(0);"><img className="lazy" src={nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg} alt="Image" /></a>
                                        </li>
                                        <li>
                                          <a href="javascript:void(0);"><img className="lazy" src={nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg} alt="Image" /></a>
                                        </li>
                                        <li>
                                          <a href="javascript:void(0);"><img className="lazy" src={nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg} alt="Image" /></a>
                                        </li>
                                      </ul>
                                      <span className="heart-span"><i className="fa fa-heart-o"></i></span>
                                    </div>
                                    <span
                                      className=" pic-demo"
                                      onClick={() => {
                                        history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                      }}>
                                      <a href="#" className="cart-btn" onClick={() =>
                                        history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                      }> <i className="fa fa-shopping-cart"></i></a>

                                      <img
                                        src={httpUrl + "/" + nft?.image}
                                        className="lazy img-fluid"
                                        alt=""
                                      />
                                    </span>
                                  </div>
                                  {/* <div className="nft_coll_pp">
                                    <span
                                      onClick={() => {
                                        history.push(
                                          nft.ownerAddress === WalletAddress
                                            ? `/myprofile`
                                            : `/profile/${nft.ownerAddress}`
                                        );
                                      }}
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
                                    </span>
                                  </div> */}
                                  <div className="nft_coll_info">
                                    <span
                                      onClick={() => {
                                        history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                      }}
                                    >
                                      <h4> {nft?.name}</h4>
                                    </span>
                                    <div className="full-div currancy-show">
                                      {" " + nft?.sellPrice + " "} ETH
                                    </div>

                                    {/* <span
                                      onClick={() => {
                                        history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                      }}
                                    >
                                      Price {" " + nft?.sellPrice + " "}BNB
                                    </span> */}
                                    {/* <div class="full-div">
                                      <a
                                        onClick={() => {
                                          history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                        }}
                                        class="view-all-btn"
                                      >
                                        Detail{" "}
                                        <i
                                          class="fa fa-angle-right"
                                          aria-hidden="true"
                                        ></i>
                                      </a>


                                      {GetFavouriteNft?.some(
                                        (item, index) => {
                                          return (
                                            item.nftTokenId == nft.nftTokenId
                                          );
                                        }
                                      ) ? (
                                        <i
                                          onClick={() => {
                                            setFavouriteInProgress(true);

                                            removeToFavourite(
                                              nft.id,
                                              nft.ownerAddress,
                                            );
                                          }}
                                          className="fa fa-heart"
                                          style={{ color: "red" }}
                                        >
                                          {" "}
                                          {nft?.nftFavouritesCount}
                                        </i>
                                      ) : (
                                        <i
                                          onClick={() => {
                                            setFavouriteInProgress(true);
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress,
                                            );
                                          }}
                                          className="fa fa-heart"
                                        >
                                          {" "}
                                          {nft?.nftFavouritesCount}
                                        </i>
                                      )}
                                    </div> */}
                                  </div>
                                </div>

                              </div>
                            </div>
                          </>
                        );
                        // );


                      })}
                      {collectionData?.length > numItems &&
                        !filterTrigger && (
                          <div className="col-lg-12">
                            <div className="spacer-single"></div>
                            <span
                              onClick={loadMore}
                              className="btn-main lead m-auto"
                            >
                              Load More
                            </span>
                          </div>
                        )}
                    </>
                  )}

                </div>
              </div>
            </section>
          </section>

          <Footer />


        </>
      )}
    </div>
  );
};
export default UserNftDetails;

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
