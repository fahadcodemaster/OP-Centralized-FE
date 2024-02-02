// import React, { useEffect, useState, useRef } from "react";
// import Footer from "../../../components/footer";
// import SellNftToMarket from "./SellNftToMarket";
// import { createGlobalStyle } from "styled-components";
// import { Link, useHistory, useParams, Redirect } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import GetNftMarketByIdAction from "../../../../Redux/Actions/NftActions/GetNftMarketById";
// import {
//   Modal,
//   Button,
//   InputGroup,
//   FormControl,
//   Form,
//   FormCheck,
//   DropdownButton,
//   Dropdown,
// } from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import { PulseLoader, RingLoader } from "react-spinners";
// import GetMyNftByIdAction from "../../../../Redux/Actions/NftActions/GetMyNftByIdAction";
// import BuyNftMarketAction from "../../../../Redux/Actions/NftActions/BuyNftMarketActions";
// import {
//   sendTransection,
//   signMessage,
//   sellNFTAmount,
//   approveContract,
//   acceptBid,
//   openForAuction,
//   cancelNft,
// } from "../../../../metamask";
// import Web3 from "web3";
// import DatePicker from "react-datepicker";
// import swal from "sweetalert";
// import axios from "axios";
// import defaultImg from "../../../../assets/images/default.png";
// import GetFavouriteNftAction from "../../../../Redux/Actions/NftActions/GetFavouriteNftAction";
// import SellNftMarketAction from "../../../../Redux/Actions/NftActions/SellNftMarketAction";
// import moment from "moment";
// import { PropagateLoader } from "react-spinners";
// import http from "../../../../Redux/Api/http";
// import https from "https";
// import GetAllNftsByCollectionIdAction, {
//   GetAllNftsByCollectionIdRequest,
// } from "../../../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
// import { GetMyNftByIdRequest } from "../../../../Redux/Actions/NftActions/GetMyNftByIdAction";


// const GlobalStyles = createGlobalStyle`
//   header#myHeader.navbar.white {
//     background: white;
//   }
// `;

// const MyNftDetails = function ({ myNftData, masterAddress, biddingsData, collectionData }) {
//   const dispatch = useDispatch();
//   const { id, accountId } = useParams();
//   const history = useHistory();
//   const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

//   const GetNftMarketById = useSelector(
//     (state) => state.GetNftMarketById?.GetNftMarketByIdResponse?.data
//   );

//   const isConnected = useSelector(
//     (state) => state.Login?.authResponse?.data?.token
//   );
//   const MyProfile = useSelector(
//     (state) => state.MyProfile?.MyProfileResponse?.data
//   );

//   const [show, setShow] = useState(false);
//   const [value, onChange] = useState(new Date());
//   const searchRef = useRef();
//   // const GetAllNftsByCollectionId = useSelector(
//   //   (state) =>
//   //     state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse?.data
//   // );
//   const [NewPrice, SetNewPrice] = useState();
//   const [inputAmount, setInputAmount] = useState();
//   const [maxInputAmount, setMaxInputAmount] = useState();
//   const [nftId, setNftId] = useState();
//   const [amountCheck, setAmounCheck] = useState(false);
//   const [amountCheck1, setAmounCheck1] = useState(false);
//   const [amountCheck2, setAmounCheck2] = useState(false);
//   const [balance, setBalance] = useState();
//   const [isLoading, setIsLoading] = useState(false);
//   const [biddingLoading, setIsBiddingLoading] = useState(false);
//   const [modalStatus, setModalStatus] = useState(false);
//   const [emptyBids, setEmptyBids] = useState(false);
//   const [filterTrigger, setFilterTrigger] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [bidError, setBidError] = useState(false);
//   const [bidError1, setBidError1] = useState(false);
//   const [biddings, setBiddings] = useState();
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [bidInProgress, setBidInProgress] = useState(false);

//   const [filter, setfilter] = useState([]);
//   const [allData, setAllData] = useState([]);
//   const [bidTrigger, setBidtrigger] = useState(false);
//   const [isInterval, setIsInterval] = useState(false);
//   const [nftmarket, setnftmarket] = useState(false);
//   const [paramsCheck, setParams] = useState();
//   const [paramsLoading, setParamsLoading] = useState(false);
//   const [payloadLoading, setPayloadLoading] = useState(true);
//   const [openBid, setOpenBid] = useState(false);
//   const [days, setDays] = useState()
//   const [hours, setHours] = useState()
//   const [minutes, setMinutes] = useState()
//   const [seconds, setSeconds] = useState()
//   const [userPayload, setMyData] = useState()
  
//   const [isSwitchOn, setIsSwitchOn] = useState(false);
//   const [cancelLoading, setCancelLoading] = useState(false);
//   const [pageLoader, setPageLoader] = useState(true);
//   const [isStacked, setIsStacked] = useState(false);
//   const [nftImage,setNftImage] = useState("")

//   const AuthConnectState = useSelector(
//     (state) => state.AuthConnect.AuthConnectResponse?.data
//   );

//   const switchStatus = () => {
//     console.log("SWITCHHHHH", !isSwitchOn);
//     setIsSwitchOn(!isSwitchOn);
//   };

//   // const myNftById = useSelector(
//   //   (state) => state.GetMyNftById?.GetMyNftByIdResponse?.data
//   // );
//   const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);
//   // const [collectionData, setCollectionData] = useState();
//   const [height, Setheight] = useState(270);
//   const WalletAddress = useSelector(
//     (state) => state.WalletConnction?.WalletResponse?.accounts
//   );
//   const WalletBalance = useSelector(
//     (state) => state.WalletConnction?.WalletResponse?.balance
//   );
//   const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

//   const handleClose1 = () => setOpenBid(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const [getMasterAddress, setGetMasterAddress] = useState();
//   const [loader, setLoader] = useState(true);

//   useEffect(()=>{
//     setTimeout(()=>{
//       setLoader(false)
//     }, 2000)
//   },[myNftData])

//   useEffect(()=>{
//     if(MyProfile){
//       console.log(MyProfile);
//       setIsStacked(MyProfile?.isStacked)
//     }
//   },[MyProfile])

//   useEffect(async () => {
//     console.log("myNftDataaaaaaaa myitems");
//     console.log(myNftData);
//     console.log(WalletAddress);
//     if (myNftData && myNftData.collectionId) {
//       // await dispatch(GetAllNftsByCollectionIdAction(myNftData.collectionId));
//       setMyData(myNftData);
//       setPayloadLoading(false);
//     }
//   }, [myNftData]);

//   useEffect(async () => {
//     if (WalletBalance) {
//       const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
//       setBalance(amount);
//       const payload = {
//         nftId: id,
//         accountId: accountId,
//       };
//       // await http
//       // .get(httpUrl + `api/v1/Nft/GetAllNftsByCollectionId?collectionId=${GetNftMarketById?.collectionId}`)
//       // .then(async (res) => {
//       //   console.log("collectionssss", res);
//       //   setCollectionData(res.data)
//       // })
//       // await dispatch(GetNftMarketByIdAction(payload))
//       // console.log("GetNftMarketById", await dispatch(GetNftMarketByIdAction(payload)));
//       // await dispatch(GetNftMarketByIdAction(payload)).then((res)=>{
//       //   console.log("ressssssssssssssssss", res);
//       // //  setNftId(res.data.id)
//       // })

//       // dispatch(GetNftMarketByIdAction(payload));
//       // setIsLoading(false)

//       // setTimeout(() => {
//       // const payload = {
//       //   nftId: id,
//       //   accountId: accountId,
//       // };

//       // dispatch(GetNftMarketByIdAction(payload)).then(async (res) => {
//       //   if(res && res.data && res.data.collectionId){
//       //     console.log("inside", res);
//       //     await dispatch(GetAllNftsByCollectionIdAction(res.data.collectionId));
//       //   }
//       // });
//     } else {
//       setBalance("0");
//       const payload = {
//         nftId: id,
//         accountId: accountId,
//       };
//       // await dispatch(GetNftMarketByIdAction(payload))
//       // console.log("GetNftMarketById", await dispatch(GetNftMarketByIdAction(payload)));
//       // await dispatch(GetNftMarketByIdAction(payload)).then((res)=>{
//       //   console.log("ressssssssssssssssss", res);
//       // //  setNftId(res.data.id)
//       // })

//       // dispatch(GetNftMarketByIdAction(payload));
//       // setIsLoading(false)

//       // setTimeout(() => {
//       // const payload = {
//       //   nftId: id,
//       //   accountId: accountId,
//       // };

//       // dispatch(GetNftMarketByIdAction(payload)).then(async (res) => {
//       //   if(res && res.data && res.data.collectionId){
//       //     console.log("inside", res);
//       //     await dispatch(GetAllNftsByCollectionIdAction(res.data.collectionId));
//       //   }
//       // });
//     }
//     // }, 2000);
//     // setNextUseEffect(true)
//   }, [id, accountId]);

//   useEffect(() => {
//     let params = window.location.pathname;
//     setParams(params.split("/")[1]);
//     setParamsLoading(false);
//     if (myNftData && !isInterval) {
//       const eventTime = moment(myNftData?.bidEndDate).unix();
      
//       const currentTime = moment().unix();
//       const diffTime = eventTime - currentTime;
//       let duration = moment.duration(diffTime * 1000, "milliseconds");
    
//       const interval = 2000;
//       setInterval(() => {
//         setIsInterval(true);
//         if (duration._milliseconds <= 0) {
          
//           setDays("0");
//           setHours("0");
//           setMinutes("0");
//           setSeconds("0");
//         } else {
//           duration = moment.duration(duration - interval, "milliseconds");
//           setDays(duration.days());
//           setHours(duration.hours());
//           setMinutes(duration.minutes());
//           setSeconds(duration.seconds());
//           // console.log(duration.days() + ":" + duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
//         }
//       }, interval);
//     }
//   }, [myNftData]);

//   // useEffect(async () => {
//   //   let params = window.location.pathname
//   //   setParams(params.split("/")[1])
//   //   setParamsLoading(false)
//   //   await http
//   //     .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
//   //     .then(async (res) => {

//   //       // console.log("USER DATAAAA",GetNftMarketById)
//   //       // console.log("GetMasterAddress", res?.data?.data.address);
//   //       if(WalletBalance){
//   //         const amount =  await Web3.utils.fromWei((WalletBalance).toString(), 'ether')
//   //         setBalance(amount)
//   //         setGetMasterAddress(res?.data?.data?.address);
//   //         await http
//   //         .get(httpUrl + `/api/v1/Nft/GetNftBids?NftId=${id}`)
//   //         .then(async (res) => {
//   //           if(!res.data.data || res.data.data === null){
//   //             setEmptyBids(true)
//   //           }
//   //           setBiddings(res.data.data)
//   //           setIsBiddingLoading(false)
//   //           setShow(false)
//   //           setIsLoading(false)
//   //         })
//   //       }
//   //       else{
//   //         setBalance("0")
//   //         setGetMasterAddress(res?.data?.data?.address);
//   //         await http
//   //         .get(httpUrl + `/api/v1/Nft/GetNftBids?NftId=${id}`)
//   //         .then(async (res) => {
//   //           if(!res.data.data || res.data.data === null){
//   //             setEmptyBids(true)
//   //           }
//   //           setBiddings(res.data.data)
//   //           setIsBiddingLoading(false)
//   //           setShow(false)
//   //           setIsLoading(false)
//   //         })
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.log(error?.message);
//   //     });
//   // }, [id, accountId]);

//   const addToFavourite = async (nftID, OwnerAddress) => {
//     await axios
//       .post(
//         httpUrl + "/api/v1/Nft/AddFavouriteNft",
//         {
//           nftId: nftID,
//           nftAddress: OwnerAddress,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${Token}`,
//           },
//         }
//       )
//       .then(async (resp) => {
//         if (resp?.data?.isSuccess === true) {
//           toast.success(`${resp?.data?.data}`, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });

//           await dispatch(GetFavouriteNftAction());
//           // setTimeout(() => window.location.reload(), 2000);
//         } else if (resp?.data?.isSuccess === false) {
//           toast.error(`${resp?.data?.data}`, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//           });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         swal({
//           icon: "error",
//           title: error?.data?.message,
//         });
//       });
//   };

//   const startDateFunc = (date) => {
//     let dateNow = new Date();
//     dateNow = moment(dateNow).unix();
//     let dateEntered = moment(date).unix();
//     if (dateEntered <= dateNow) {
//       console.log("errer");
//       setBidError(true);
//     } else {
//       setBidError(false);
//       console.log(date);
//       setStartDate(date);
//     }
//   };
//   const endDateFunc = (date) => {
//     let dateNow = new Date();
//     dateNow = moment(dateNow).unix();
//     let dateEntered = moment(date).unix();
//     if (dateEntered <= dateNow) {
//       console.log("errer");
//       setBidError1(true);
//     } else {
//       setBidError1(false);
//       console.log(date);
//       setEndDate(date);
//     }
//   };
//   const cancelListing = async () => {
//     setCancelLoading(true)
//     await http
//       .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
//       .then(async (res) => {
//         const contractPayload = {
//           contractAddress: res.data.data,
//           nftContractId: myNftData?.contractAddress,
//           tokenId: myNftData?.nftTokenId,    
//         };
//         dispatch(cancelNft(contractPayload))
//           .then(async (approvedHash) => {
//             const hashPayload = {
//               nftId: myNftData?.id,
//               cancelTransactionHash: approvedHash.hash
//             }
//             console.log("objectttttttttt", hashPayload);
//             delay(8000).then(async () => {
//               await http
//               .post(httpUrl + "/api/v1/Nft/NftCancelStatus", hashPayload)
//               .then(async (res) => {
//                 console.log("back to hold", res);
//                 toast.success(
//                   `NFT has been unlisted from marketplace`,
//                   {
//                     position: "top-right",
//                     autoClose: 3000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                   }
//                 );
//                 setCancelLoading(false)
//                 setTimeout(() => {
//                   history.push("/myprofile");
//                 }, 3000);
//               })
//             })
//           }).catch(()=>{
//             setCancelLoading(false)
//           })
//       })
//   };

//   const openBidding = async () => {
//     setBidInProgress(true);

//     let params = window.location.pathname;
//     console.log("nftid", params.split("/")[2]);
//     console.log("accountid", params.split("/")[3]);
//     await http
//       .get(httpUrl + "/api/v1/Nft/GetMarketNftAddress")
//       .then(async (res) => {
//         console.log("object", res);
//         const contractPayload = {
//           nftContractId: myNftData?.contractAddress,
//           tokenId: myNftData?.nftTokenId,
//           price: inputAmount,
//           maxPrice: maxInputAmount,
//           contractAddress: res.data.data,
//         };
//         dispatch(openForAuction(contractPayload))
//           .then(async (approvedHashes) => {
//             console.log("auction response");
//             console.log(res);
//             console.log("auction response");
//             let params = window.location.pathname;
//             const payload = {
//               nftId: params.split("/")[2],
//               isBidOpen: true,
//               minimumAmount: inputAmount,
//               maximumAmount: maxInputAmount,
//               bidStartDate: startDate,
//               bidEndDate: endDate,
//             };
//             console.log(payload);
//             await http
//               .post(httpUrl + "/api/v1/Nft/OpenBid", payload)
//               .then(async (res) => {
//                 let body = {
//                   nftId: params.split("/")[2],
//                   price: maxInputAmount,
//                   approvalTransactionHash: approvedHashes.res.hash,
//                   openOrderTransactionHash: approvedHashes.response.hash,
//                 };
//                 console.log("added bid response", res);
//                 setShow(false);
//                 setBidtrigger(true);
//                 delay(5000).then(async () => {
//                   console.log("I have got 5 sec delay");
//                   await http
//                     .post(httpUrl + "/api/v1/Nft/SellNftMarket", body)
//                     .then(async (res) => {
//                       setBidInProgress(false);
//                       console.log("STATUS");
//                       console.log("STATUS", res);
//                       console.log("STATUS");
//                       toast.success(
//                         `NFT Bidding has been opened, you will be redirected shortly`,
//                         {
//                           position: "top-right",
//                           autoClose: 3000,
//                           hideProgressBar: false,
//                           closeOnClick: true,
//                           pauseOnHover: true,
//                           draggable: true,
//                           progress: undefined,
//                         }
//                       );
//                       setTimeout(() => {
//                         history.push("/marketplace");
//                       }, 3000);
//                     })
//                     .catch((err) => {
//                       console.log("SellNftMarket" + err?.message);
//                       setBidInProgress(false);
//                     });
//                 });
//               })
//               .catch((err) => {
//                 console.log("OpenBid" + err?.message);
//                 setBidInProgress(false);
//               });
//           })
//           .catch((err) => {
//             setBidInProgress(false);
//           });
//       })
//       .catch((err) => {
//         console.log("GetMarketNftAddress" + err?.message);
//         setBidInProgress(false);
//       });
//   };

//   const amountStatus = (value) => {
//     if (value > balance) {
//       setAmounCheck(true);
//     } else if (value > maxInputAmount) {
//       setAmounCheck2(true);
//     } else {
//       setAmounCheck2(false);
//       setAmounCheck(false);
//       setInputAmount(value);
//     }
//   };
//   const amountStatus1 = (value) => {
//     if (value > balance) {
//       setAmounCheck(true);
//     } else if (value < inputAmount) {
//       setAmounCheck1(true);
//     } else {
//       setAmounCheck1(false);
//       setAmounCheck(false);
//       setMaxInputAmount(value);
//     }
//   };

//   const postBidding = async () => {
//     let params = window.location.pathname;
//     const amount = Web3.utils.fromWei(WalletBalance.toString(), "ether");
//     setBalance(amount);
//     const payload = {
//       nftId: params.split("/")[2],
//       price: inputAmount,
//     };
//     console.log(payload);
//     await http
//       .post(httpUrl + "/api/v1/Nft/AddNftBid", payload)
//       .then(async (res) => {
//         console.log("added bid response", res);
//         setShow(false);
//         setBidtrigger(true);
//         window.location.reload();
//       });
//   };

//   const acceptBidOffer = async (id, price, buyerAddress, contractAddress) => {
//     console.log("accept bid");
//     console.log(id);
//     console.log("accept bid");
//     await http
//       .get(httpUrl + `/api/v1/Nft/GetMarketNftAddress`)
//       .then(async (res) => {
//         console.log("market address", res.data.data);
//         const payload = {
//           contractAddress: res.data.data,
//           tokenId: myNftData?.nftTokenId,
//           price: price,
//           buyerAddress: buyerAddress,
//           nftContractAddress: contractAddress,
//         };
//         dispatch(acceptBid(payload)).then((res) => {
//           console.log(":)))))))))", res);
//           delay(5000).then(async () => {
//             toast.success(`Bid has been accepted!`, {
//               position: "top-right",
//               autoClose: 5000,
//               hideProgressBar: false,
//               closeOnClick: true,
//               pauseOnHover: true,
//               draggable: true,
//               progress: undefined,
//             });
//             console.log("hurrayyyyyyy");
//             await http
//               .put(httpUrl + `/api/v1/Nft/bidAccepted?bidId=${id}`)
//               .then(async (res) => {
//                 console.log("added accepted response", res);
//                 delay(2000).then(async () => {
//                   history.push("/marketplace");
//                 });
//               });
//           });
//         });
//         console.log("ACCEPT BID PAYLOAD", payload);
//       });
//   };

//   // const OnsellNft = async (e) => {
//   //   e.preventDefault();
//   //   setIsLoading(true);
//   //   console.log("BYEBYE", AuthConnectState);
//   //   dispatch(signMessage(AuthConnectState?.message))
//   //     .then(async (res) => {

//   //       setIsLoading(false);
//   //       const payload = {
//   //         from: myNftData.contractAddress,
//   //         to: getMasterAddress,
//   //         tokenId: myNftData.nftTokenId,
//   //       };

//   //       await dispatch(sellNFTAmount(payload))
//   //         .then((res) => {
//   //           const payload = {
//   //             nftId: myNftData.id,
//   //             price: parseFloat(myNftData.price),
//   //             transactionHash: res.hash,
//   //           };
//   //           dispatch(SellNftMarketAction(payload))
//   //             .then((res) => {
//   //               if (res.isSuccess) {
//   //                 toast.success(
//   //                   `${res.message} you are going to redirect marketplace page`,
//   //                   {
//   //                     position: "top-right",
//   //                     autoClose: 3000,
//   //                     hideProgressBar: false,
//   //                     closeOnClick: true,
//   //                     pauseOnHover: true,
//   //                     draggable: true,
//   //                     progress: undefined,
//   //                   }
//   //                 );
//   //                 setTimeout(() => {
//   //                   history.push("/marketplace");
//   //                 }, 3000);
//   //               } else {
//   //                 toast.success(`${res.message}`, {
//   //                   position: "top-right",
//   //                   autoClose: 3000,
//   //                   hideProgressBar: false,
//   //                   closeOnClick: true,
//   //                   pauseOnHover: true,
//   //                   draggable: true,
//   //                   progress: undefined,
//   //                 });
//   //               }
//   //             })
//   //             .catch((error) => {
//   //               console.log(error);
//   //             });

//   //           console.log("selling Successfull");
//   //         })
//   //         .catch((error) => {
//   //           setIsLoading(false);
//   //           toast.error(`${error?.message}`, {
//   //             position: "top-right",
//   //             autoClose: 5000,
//   //             hideProgressBar: false,
//   //             closeOnClick: true,
//   //             pauseOnHover: true,
//   //             draggable: true,
//   //             progress: undefined,
//   //           });
//   //           console.log(error);
//   //         });
//   //     })
//   //     .catch((error) => {
//   //       setIsLoading(false);
//   //       console.log("Signature Error");
//   //     });

//   //   // await dispatch(
//   //   //   SellNftMarketAction({
//   //   //     nftId: nftIdd,
//   //   //     price: pricee ? pricee : NewPrice,
//   //   //   })
//   //   // )
//   //   //   .then((res) => {
//   //   //     dispatch(signMessage(AuthConnectState?.message));
//   //   //   })
//   //   //   .catch((error) => {
//   //   //     console.log(error);
//   //   //   });
//   // };

//   const onsubmitHandler = async (e) => {
//     e.preventDefault();
//     if (window.ethereum) {
//       if (!isConnected || isConnected == undefined) {
//         return history.push("/connectwallet");
//       }

//       setIsLoading(true);
//       dispatch(signMessage(AuthConnectState?.message))
//         .then(async (res) => {
//           const amount = parseInt(
//             Web3.utils.toWei(String(myNftData?.sellPrice))
//           ).toString(16);

//           setIsLoading(false);
//           const payload = [
//             {
//               from: WalletAddress,
//               to: masterAddress,
//               value: amount,
//             },
//           ];
//           await dispatch(sendTransection(payload))
//             .then(async (res) => {
//               const payload = {
//                 nftId: myNftData.id,
//                 address: WalletAddress,
//                 transactionHash: res,
//               };
//               await dispatch(BuyNftMarketAction(payload))
//                 .then((res) => {
//                   setIsTransactionSuccess(true);
//                   toast.success(`${res.message}`, {
//                     position: "top-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                   });
//                 })
//                 .catch((error) => {
//                   console.log(error);
//                 });
//               console.log("selling Successfull");
//             })
//             .catch((error) => {
//               setIsLoading(false);
//               toast.error(`${error?.message}`, {
//                 position: "top-right",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//               });
//               console.log(error);
//             });
//         })
//         .catch((error) => {
//           setIsLoading(false);
//           console.log("Signature Error");
//         });
//     } else {
//       toast.error(`Please Install Metamask Extension`, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//     }
//   };

//   const onImgLoad = ({ target: img }) => {
//     let currentHeight = height;
//     if (currentHeight < img.offsetHeight) {
//       Setheight({
//         height: img?.offsetHeight,
//       });
//     }
//   };

//   const inputhandler = (e) => {
//     const { value } = e.target;

//     SetNewPrice(value);
//   };

//   const modalOpen = () => {
//     setModalStatus(true);
//   };
  
//   useEffect(()=>{
//     setNftImage(`${httpUrl}/${userPayload?.image}`);

//     setTimeout(() => {
//       setPageLoader(false)      
//     }, 1000);
//   })



//   return (
//     <div>
//       {loader? (
//         <>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <br></br>
//         <div className="col-sm-12 d-flex justify-content-center margin-top-150">
//         <RingLoader color="black" size="60" />
//         </div>
//         </>
//       ) : (
//         <>
//           <GlobalStyles />
//           <section className="container">
//             {/* <div className="row mt-md-5 pt-md-4"> */}
//             <div className="row  pt-md-4">
//               <div className="col-md-12">
//                 <nav aria-label="breadcrumb">
//                   <ol class="breadcrumb ">
//                     <li class="breadcrumb-item">
//                       <a href="#">Home</a>
//                     </li>
//                     <li class="breadcrumb-item" aria-current="page">
//                       <a href="#">MyNftdetails</a>
//                     </li>
//                     <li class="breadcrumb-item active" aria-current="page">
//                       {userPayload?.ownerName}
//                     </li>
//                   </ol>
//                 </nav>
//                 <div className="spacer-single"></div>
//               </div>
//               <div className="col-lg-4 col-md-12 col-sm-12 text-center">
//                 <div
//                   className="my-profile-Img-pnl full-div"
//                   style={{
//                     background: `url(${
//                       httpUrl + "/" + userPayload?.image.replaceAll("\\", "/")
//                     }) no-repeat`,
//                   }}
//                 >
//                   <img
//                     src={`${httpUrl}/${userPayload?.image}`}
//                     className="img-fluid img-rounded mb-sm-30"
//                     alt="NFT.png"
//                   />
//                 </div>
//                 <div className="spacer-single"></div>
//                 <div className="my-profile-details-pnl full-div">
//                   <ul className="my-profile-details-list">
//                     <li class="head">
//                       <p>Details</p>
//                       {/* <span>
//                         <i className="fa fa-angle-down"></i>
//                       </span> */}
//                     </li>
//                     <li>
//                       <p>Contract Address</p>
//                       <span className="contract-hover"  
//                     onClick={ ()=>{
//                         const url= "https://testnet.bscscan.com/address/"+userPayload?.contractAddress;
//                         //history.push(url)
//                         window.open(url);
//                       }}
                  
//                   title={userPayload?.contractAddress}>{userPayload?.contractAddress?.length > 20 ? (
//                     userPayload.contractAddress.slice(0, 5) + ".." + userPayload.contractAddress.substr(userPayload.contractAddress.length -5)
//                   ):(
//                     userPayload?.contractAddress
//                   )}</span>
//                     </li>
//                     <li>
//                       <p>Token IDv</p>
//                       <span>{userPayload?.id}</span>
//                     </li>
//                     <li>
//                       <p>Token Standard</p>
//                       <span>BEP-20</span>
//                     </li>
//                     <li>
//                       <p>Blockchain</p>
//                       <span>BSC</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-12 col-sm-12">
//                 <div className="item_info">
//                   <p  style={{ fontSize: 13 }}>{userPayload?.collectionName}</p>

//                   <h2>{userPayload?.ownerName}</h2>

//                   {/* <div className="item_info_counts">
//                 <div className="item_info_type">
//                   <i className="fa fa-image"></i>Art
//                 </div>
//                 <div className="item_info_views">
//                   <i className="fa fa-eye"></i>250
//                 </div>
//                 <div className="item_info_like">
//                   <i className="fa fa-heart"></i>18
//                 </div>
//                 <div className="item_info_like">
//                   <i className="fa fa-dollar"></i>0.88 SOL
//                 </div>
//               </div> */}
//                   <p>{userPayload?.description}</p>

//                   <p>Price: {userPayload?.sellPrice}</p>

//                   <h6>Creator</h6>
//                   <div className="item_author">
//                     <div className="author_list_pp">
//                       <Link style={{ textDecoration: "none" }} to="author">
//                         <img
//                           className="lazy"
//                           src={`${httpUrl}/${userPayload?.ownerImage}`}
//                           // src="./images/author/author-1.jpg"
//                           alt="Author.png"
//                           className="author_sell_Nft_image"
//                         />
//                         <i className="fa fa-check"></i>
//                       </Link>
//                     </div>
//                     <div className="author_list_info">
//                       <span>{userPayload?.ownerName}</span>
//                     </div>
//                   </div>
//                   {/* <BuyUserNft /> */}
//                   <ToastContainer
//                     position="top-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover={false}
//                   />
//                   {/* <form
//                 name="contactForm"
//                 id="contact_form"
//                 className="form-border"
//                 onSubmit={onsubmitHandler}
//               >
//                 {GetNftMarketById?.staus == "ReadyForSell" &&
//                   (isTransactionSuccess ? (
//                     <button id="btnBuy" className=" btn-main" disabled>
//                       NFT Purchased
//                     </button>
//                   ) : (
//                     <button id="btnBuy" type="submit" className=" btn-main">
//                       BUY NFT
//                     </button>
//                   ))}

//                 {GetNftMarketById &&
//                   GetNftMarketById?.staus !== "ReadyForSell" && (
//                     <>
//                       <button id="btnBuy" className=" btn-main" disabled>
//                         NFT Purchased
//                       </button>
//                     </>
//                   )}
//               </form> */}
//                 </div>

//                 <div>
//                   <div className="row">
//                     <div className="col-md-6 profiler-info">
//                       <h2>
//                         <span onClick={() => {
//                             history.push(
//                               `/nftsbycollections/${userPayload?.collectionId}`
//                             );
//                           }} className="contract-hover">{userPayload?.collectionName}</span> {"by"}{" "}
//                         <h4
//                           className="contract-hover"
//                           onClick={() => {
//                             history.push(
//                               `/profile/${userPayload.ownerAddress}`
//                             );
//                           }}
//                         >
//                           {userPayload?.ownerName}
//                         </h4>
//                       </h2>
//                       <h3>
//                         {userPayload?.name} {"#"}
//                         {userPayload?.id}
//                       </h3>
//                       <h4>
//                         Owned by{" "}
//                         <span
//                           className="contract-hover"
//                           onClick={() => {
//                             history.push(
//                               `/profile/${userPayload?.ownerAddress}`
//                             );
//                           }}
//                         >
//                           {userPayload?.ownerName}
//                         </span>
//                       </h4>
//                     </div>
//                     <div className="col-md-6 col-sm-6">
//                       <ul className="share-info-list">
//                         <li
//                           title="Refresh"
//                           onClick={() => {
//                             window.location.reload();
//                           }}
//                         >
//                           <a href="#">
//                             <i class="fa fa-refresh"></i>
//                           </a>
//                         </li>
//                         <li>
//                           <DropdownButton
//                             id="dropdown-basic-button"
//                             className="social--btn fa fa-share-alt"
//                           >
//                             <Dropdown.Item
//                               title="Share"
//                               onClick={async () => {
//                                 await navigator.clipboard.writeText(
//                                   window.location.href
//                                 );
//                                 toast.success("Link copied successfully", {
//                                   position: "top-right",
//                                   autoClose: 5000,
//                                   hideProgressBar: false,
//                                   closeOnClick: true,
//                                   pauseOnHover: false,
//                                   draggable: true,
//                                   progress: undefined,
//                                 });
//                               }}
//                             >
//                               <i class="fa fa-link"></i> Copy link
//                             </Dropdown.Item>
//                             <Dropdown.Item title="facebook">
//                               {" "}
//                               <i className="fa fa-facebook"></i> Facebook{" "}
//                             </Dropdown.Item>
//                             <Dropdown.Item title="twitter">
//                               {" "}
//                               <i className="fa fa-twitter"></i> Twitter{" "}
//                             </Dropdown.Item>
//                             {/* <Dropdown.Item href="#/action-2"><i class="fa fa-facebook"></i> Share on Facebook</Dropdown.Item>
//                   <Dropdown.Item href="#/action-3"><i class="fa fa-twitter"></i> Share on Twitter</Dropdown.Item> */}
//                           </DropdownButton>
//                         </li>
//                         {myNftData?.externalLink && (
//                           <li
//                             onClick={() => {
//                               window.open(myNftData?.externalLink);
//                             }}
//                           >
//                             <a>
//                               <i class="fa fa-external-link"></i>
//                             </a>
//                           </li>
//                         )}
//                         {/* <li><a className="share-menu-btn" href="#"><span></span><span></span><span></span></a></li> */}
//                       </ul>
//                     </div>
//                   </div>
//                   <div className="description-details-pnl full-div">
//                     <div className="description-details-head full-div">
//                       <div className="description-details-text w-100">
//                         {myNftData?.isBidOpen && (
//                           <>
//                             <span>
//                               Min price --{" "}
//                               {myNftData?.bidInitialMinimumAmount
//                                 ? myNftData?.bidInitialMinimumAmount + "$"
//                                 : "Min price not set."}
//                             </span>
//                             <span style={{ marginLeft: "10px" }}>
//                               Max price --{" "}
//                               {myNftData?.bidInitialMaximumAmount
//                                 ? myNftData?.bidInitialMaximumAmount + "$"
//                                 : "Max price not set."}
//                             </span>
//                           </>
//                         )}
//                         <p>
//                           <i title="BNB" class="fa fa-coins"></i>{" "}
//                           {userPayload?.sellPrice ? userPayload?.sellPrice: userPayload?.buyPrice}{" "}
//                           <span>
//                             [$
//                             {userPayload?.sellPrice ? userPayload?.sellPrice === 0
//                               ? "0"
//                               : (userPayload?.sellPrice * 530)
//                                   .toString()
//                                   .slice(0, 6): userPayload?.buyPrice * 530}
//                             ]
//                           </span>
//                         </p>
//                       </div>
//                       {/* <form name="contactForm" id="contact_form" class="form-border"> */}
//                       {(userPayload?.staus === 'ReadyForSell' || userPayload?.isBidOpen === true ) && (
//                         cancelLoading ? (
//                         <button
//                         disabled
//                         id="btnBuy"
//                         type="submit"
//                         class="reg-btn blue"
//                       >
//                         <PulseLoader color="white" size="11" />
//                       </button>
//                         ):(
//                           <button
//                         onClick={() => cancelListing()}
//                         id="btnBuy"
//                         type="submit"
//                         class="reg-btn blue"
//                       >
//                         Cancel listing
//                       </button>
//                         )
//                       )} 
//                       {userPayload?.staus === "ReadyForSell" ||
//                       userPayload?.isMinted === false ? (
//                         <></>
//                       ) : (
//                         <>
//                         <button
//                           onClick={() => setFilterTrigger(true)}
//                           id="btnBuy"
//                           type="submit"
//                           class="reg-btn blue"
//                         >
//                           Sell NFT
//                         </button>
                        
//                         </>
//                       )}

//                       {/* //workhere */}
//                     {(!userPayload?.freezeData && isStacked) &&(
//                         <button
//                           onClick={() =>
//                             history.push(
//                               `/createnft/${userPayload?.ownerAddress}/${userPayload?.id}/${userPayload?.accountId}`
//                             )
//                           }
//                           id="btnBuy"
//                           type="submit"
//                           class="reg-btn"
//                         >
//                           Update NFT
//                         </button>
//                       )}
//                       {!isStacked && (
//                         <>Need to stake first in order to mint NFT</>
//                       )}

//                       {!userPayload?.isBidOpen &&
//                         userPayload?.freezeData &&
//                         userPayload.staus != "ReadyForSell" && (
//                           <button
//                             onClick={() => setOpenBid(true)}
//                             id="btnBuy"
//                             type="submit"
//                             class="reg-btn blue"
//                           >
//                             Open bid
//                           </button>
//                         )}
//                       {/* {!userPayload?.isBidOpen && (
//                   <button onClick={handleShow} id="btnBuy" type="submit" class="reg-btn">Cancel Bid</button>
//                 )} */}
//                       {/* </form> */}

//                   <Modal
//                     centered show={openBid} onHide={handleClose1}>
//                     <Modal.Header>
//                       <Modal.Title style={{color:"black"}}>Open bid</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                       Price
//                       <InputGroup className="mb-3">
//                         <InputGroup.Text style={{width:'60px', height:'38px', marginTop:'0px'}}>Min</InputGroup.Text>
//                         <FormControl placeholder="Amount" type="number" onChange={(e)=> amountStatus(e.target.value)} aria-label="Amount (to the nearest dollar)" />
//                         <InputGroup.Text style={{width:'60px', height:'38px', marginTop:'0px'}}>Max</InputGroup.Text>
//                         <FormControl placeholder="Amount" type="number" onChange={(e)=> amountStatus1(e.target.value)} aria-label="Amount (to the nearest dollar)" />
                          
                        
//                         <div className='bidDates'>
//                           <div className='bidDat'>
//                             <h6 style={{color: '#000'}}>Start Date</h6>
//                             <DatePicker className='dateInput' selected={startDate} onChange={(date) => startDateFunc(date)} />
//                           </div>
//                           <div className='bidDat'>
//                             <h6 style={{color: '#000'}}>End Date</h6>
//                             <DatePicker className='dateInput' selected={endDate} onChange={(date) => endDateFunc(date)} />
//                           </div>
//                         {bidError &&(
//                         <span style={{color:'red'}}>Can't use past date for start date.</span>
//                         )}
//                         {bidError1 &&(
//                           <span style={{color:'red', marginLeft:'12.5%'}}>Can't use past date for end date.</span>
//                         )}
//                         </div>
//                       </InputGroup>
//                         {amountCheck &&(
//                           <span style={{color:"red"}}>Input value must be lower than available balance</span>
//                         )}
//                         {amountCheck1 &&(
//                           <span style={{color:"red"}}>Max value must be greater than Min value</span>
//                         )}
//                         {amountCheck2 &&(
//                           <span style={{color:"red"}}>Min value must be lower than Max value</span>
//                         )}
//                     </Modal.Body>
//                     <Modal.Body>Available balance: {balance}{" "}BNB</Modal.Body>
                    
//                     <Modal.Body className="d-flex justify-content-center w-30">
//                           <Form>
//                             {["checkbox"].map((type) => (
//                               <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check
//                                   inline
//                                   label="By checking this, I agree Defi Marketplace Terms of Service"
//                                   name="group1"
//                                   type={type}
//                                   checked={isSwitchOn}
//                                   id={`inline-${type}-1`}
//                                   onChange={() => {
//                                     switchStatus();
//                                   }}
//                                 />
//                               </div>
//                             ))}
//                           </Form>
//                         </Modal.Body>

//                         <Modal.Footer>
//                           <Button variant="secondary" onClick={handleClose1}>
//                             Close
//                           </Button>

//                           {!bidInProgress ? (
//                             <Button
//                               variant="primary"
//                               disabled={!isSwitchOn}
//                               onClick={openBidding}
//                             >
//                               Open bid
//                             </Button>
//                           ) : (
//                             <Button variant="primary" disabled>
//                               <PulseLoader color="white" size="11" />
//                             </Button>
//                           )}
//                         </Modal.Footer>
//                       </Modal>
//                     </div>
//                     <div className="description-details-bottom full-div">
//                       <div className="head full-div">
//                         <p>Description</p>
//                       </div>
//                       <div className="description full-div">
//                         <p> {userPayload?.description}</p>
//                         <a
//                           className="contract-hover"
//                           onClick={() =>
//                             history.push(
//                               myNftData?.creatorAddress === WalletAddress
//                                 ? `/myprofile`
//                                 : `/profile/${myNftData?.creatorAddress}`
//                             )
//                           }
//                         >
//                           Created By {userPayload?.creatorName}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {filterTrigger && (
//                   <SellNftToMarket
//                     nftDataChunk={myNftData}
//                     nftIdd={userPayload.id}
//                     pricee={userPayload.buyPrice}
//                     modalStatus={true}
//                   />
//                 )}
//                 <div className="spacer-single"></div>
//                 <div className="my-profile-details-pnl full-div">
//                   <ul className="my-profile-details-list list-view">
//                     <li class="head">
//                       <p>Listing</p>
//                       {/* <span>
//                         <i className="fa fa-angle-down"></i>
//                       </span> */}
//                     </li>
//                     <li className="brdr">
//                       <div className="row">
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           Price
//                         </div>
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           US Price
//                         </div>
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           Expiration
//                         </div>
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           From
//                         </div>
//                       </div>
//                     </li>
//                     <li>
//                       {/* <BuyUserNft /> */}
//                       <ToastContainer
//                         position="top-right"
//                         autoClose={5000}
//                         hideProgressBar={false}
//                         newestOnTop={false}
//                         closeOnClick
//                         rtl={false}
//                         pauseOnFocusLoss
//                         draggable
//                         pauseOnHover={false}
//                       />

//                       <br></br>
//                     </li>
//                   </ul>
//                   <ul className="my-profile-details-list list-view">
//                     <li class="head">
//                       <p>Offers</p>
//                       {/* <span>
//                         <i className="fa fa-angle-down"></i>
//                       </span> */}
//                     </li>
//                     <li className="brdr">
//                       <div className="row">
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           Price
//                         </div>
//                         <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                           US Price
//                         </div>
//                         <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                           Expiration
//                         </div>
//                         <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                           From
//                         </div>

//                         <div className="col-md-2 col-lg-2 col-sm-2 col-2"></div>
//                       </div>
//                     </li>
//                     <li>
//                       {biddingLoading && emptyBids ? (
//                         <>No bids added so far</>
//                       ) : (
//                         <>
//                           <>
//                             {biddingsData?.map((nft, index) => (
//                               <div className="row">
//                                 <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                                   <i title="BNB" class="fa fa-coins"></i>{" "}
//                                   {nft.price + "BNB"}
//                                 </div>
//                                 <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                                   {"$" +
//                                     (nft.price * 530).toString().slice(0, 6)}
//                                 </div>
//                                 <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                                   in 19 hours
//                                 </div>
//                                 <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                                   {nft.accountViewModel.username}
//                                 </div>
//                                 <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                                   <button
//                                     onClick={() =>
//                                       acceptBidOffer(
//                                         nft.id,
//                                         nft.price,
//                                         nft.accountViewModel.address,
//                                         nft.nftResponseModel.contractAddress
//                                       )
//                                     }
//                                     id="btnBuy"
//                                     type="submit"
//                                     class="reg-btn blue small"
//                                   >
//                                     Accept
//                                   </button>
//                                 </div>
//                               </div>
//                             ))}
//                           </>
//                         </>
//                       )}

//                       {/* <div className="row">
//                     <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                     <i title="BNB" class="fa fa-coins"></i> 0.7Eth
//                     </div>
//                     <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                       $2,886.97
//                     </div>
//                     <div className="col-md-3 col-lg-3 col-sm-3 col-3">
//                       in 19 hours
//                     </div>
//                     <div className="col-md-2 col-lg-2 col-sm-2 col-2">
//                       paul
//                     </div>
//                     <div className="author_list_info">
//                       <span>{GetNftMarketById?.ownerName}</span>
//                     </div>
//                   </div> */}

//                       {/* <BuyUserNft /> */}
//                       <ToastContainer
//                         position="top-right"
//                         autoClose={5000}
//                         hideProgressBar={false}
//                         newestOnTop={false}
//                         closeOnClick
//                         rtl={false}
//                         pauseOnFocusLoss
//                         draggable
//                         pauseOnHover={false}
//                       />
//                       <Modal centered show={show} onHide={handleClose}>
//                         <Modal.Header>
//                           <Modal.Title style={{ color: "black" }}>
//                             Make an offer
//                           </Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                           Price
//                           <InputGroup className="mb-3">
//                             <InputGroup.Text>BNB</InputGroup.Text>
//                             <FormControl
//                               placeholder="Amount"
//                               type="number"
//                               onChange={(e) => amountStatus(e.target.value)}
//                               aria-label="Amount (to the nearest dollar)"
//                             />
//                           </InputGroup>
//                           {amountCheck && (
//                             <span style={{ color: "red" }}>
//                               Input value must be lower than available balance
//                             </span>
//                           )}
//                         </Modal.Body>
//                         <Modal.Body>
//                           Available balance: {balance} BNB
//                         </Modal.Body>

//                         <Modal.Body className="d-flex justify-content-center w-30">
//                           <Form>
//                             {["radio"].map((type) => (
//                               <div key={`inline-${type}`} className="mb-3">
//                                 <Form.Check
//                                   inline
//                                   label="By checking this, I agree Defi Marketplace Terms of Service"
//                                   name="group1"
//                                   type={type}
//                                   id={`inline-${type}-1`}
//                                 />
//                               </div>
//                             ))}
//                           </Form>
//                         </Modal.Body>

//                         <Modal.Footer>
//                           <Button variant="secondary" onClick={handleClose}>
//                             Close
//                           </Button>
//                           <Button variant="primary" onClick={postBidding}>
//                             Make Offer
//                           </Button>
//                         </Modal.Footer>
//                       </Modal>
//                       <br></br>
//                       {/* {bidTrigger && (
//                     <Redirect to="/usernftdetail/288/18" />
//                   )} */}
//                       {/* <div className="row">
//                     <h2>Total biddings:</h2>
//                       <div className="col-sm-12">
//                       {biddingLoading ? (
//                         <div className="col-sm-12 text-center">
//                           <PropagateLoader color="white" size="30" />
//                         </div>  
//                       ):(
//                         <>
//                         {emptyBids ? (
//                           <>
//                           No bids added so far
//                           </>
//                         ):(
//                           <>
//                           {biddings?.map((nft, index) => (
//                           <>

//                           <div className="col-md-10 text-center d-flex justify-content-between">
//                           <img
//                             className="img-fluid img-rounded mb-sm-30"

//                             width={50}
//                             height={50}
//                             src={`${httpUrl}/${nft.accountViewModel.profileImage}`}
//                             alt="NFT.png"
//                           />
//                           <h3 style={{paddingLeft:'10px'}}>{nft.accountViewModel.username}</h3>
//                           <h3 style={{paddingLeft:'10px'}}>{nft.price +" "+'BNB'}</h3>
//                           </div>
//                           </>
//                         ))}
//                           </>
//                         )}
//                         </>
//                       )} 
//                       </div>
//                   </div> */}
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="col-lg-2 col-md-12 col-sm-12">
//                 <div className="time-pnl">
//                   <ul className="timer">
//                     <li>
//                       <p>{days ? days: days === 0 ?  0: <RingLoader color="black" size="20" width="10"/>}</p>
//                       <span>Days</span>
//                     </li>
//                     <li>
//                       <p>{hours ? hours: hours === 0 ? 0: <RingLoader color="black" size="20" width="10" />}</p>
//                       <span>Hours</span>
//                     </li>
//                     <li>
//                       <p>{minutes ? minutes: minutes === 0 ? 0: <RingLoader color="black" size="20" width="10" />}</p>
//                       <span>Min</span>
//                     </li>
//                     <li>
//                       <p>{seconds ? seconds: seconds === 0 ? 0: <RingLoader color="black" size="20" width="10" />}</p>
//                       <span>Sec</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
            
//               <div className="row">
//                 <div class="col-lg-6 col-xl-6 col-sm-6 col-sm-6 onStep css-keef6k">
//                   <h2 class="style-2">More From This Collection </h2>
//                 </div>
//                 <div class="col-lg-6 col-xl-6 col-sm-6 col-sm-6 text-right onStep css-keef6k">
//                   <a  to="/marketplace" href="#" class="nav-link" role="button">
//                     <a href="#" class="view-all-btn">
//                       See More{" "}
//                       <i class="fa fa-angle-right" aria-hidden="true"></i>
//                     </a>
//                   </a>
//                 </div>
//               </div>
            
            
//               <div className="mt-5">
//                 <div className="row">
//                         {collectionData?.map((nft, index) => {
//                           return (
//                             <>
//                               <div
//                                 key={index}
//                                 className="d-item col-lg-4 col-md-6 col-sm-6 col-xs-12 mb-4 txti"
//                               >
//                                 <div className="nft__item m-0 nft-custome">
//                                   <div className="author_list_pp">
//                                     <Link
//                                       to={
//                                         nft.ownerAddress === WalletAddress
//                                           ? "/myprofile"
//                                           : `/profile/${nft.ownerAddress}`
//                                       }
//                                     >
//                                       <img
//                                         className="lazy"
//                                         src={
//                                           nft?.ownerImage
//                                             ? httpUrl + "/" + nft?.ownerImage
//                                             : defaultImg
//                                         }
//                                         alt=""
//                                       />
//                                     </Link>
//                                   </div>
//                                   <div
//                                     className="nft__item_wrap"
//                                     onClick={() => {
//                                       history.push(`/usernftdetail/${nft.id}/${nft.accountId}`);
//                                     }}
//                                   >
//                                     <span
//                                       className="nft-bg"
//                                       style={{
//                                         background: `url(${
//                                           httpUrl +
//                                           "/" +
//                                           nft?.image.replaceAll("\\", "/")
//                                         }) no-repeat`,
//                                       }}
//                                     >
//                                       <img
//                                         onClick={() => {
//                                           history.push(`/usernftdetail/${nft.id}/${nft.accountId}`);
//                                         }}
//                                         onLoad={onImgLoad}
//                                         src={httpUrl + "/" + nft?.image}
//                                         className="lazy "
//                                         alt="Nft Pic"
//                                         style={{
//                                           width: "100%",
//                                           borderRadius: 15,
//                                           objectFit: "contain",
//                                         }}
//                                       />
//                                     </span>
//                                   </div>

//                                   <div
//                                     className="nft__item_info"
//                                     style={{ margin: 0 }}
//                                   >
//                                     <span
//                                       onClick={() =>
//                                         window.open(nft.nftLink, "_self")
//                                       }
//                                       className="d-flex flex-column"
//                                     >
//                                       <h4>{nft.collectionName}</h4>
//                                       <h4>{nft.name}</h4>
//                                       <span>{nft.buyPrice +" BNB"}</span>
//                                     </span>

//                                     <a
//                                       onClick={() => {
//                                         history.push(`/usernftdetail/${nft.id}/${nft.accountId}`);
//                                       }}
//                                       class="view-all-btn white"
//                                     >
//                                       Detail{" "}
//                                       <i
//                                         class="fa fa-angle-right"
//                                         aria-hidden="true"
//                                       ></i>
//                                     </a>
//                                   </div>
//                                   <span class="heart-icon">
//                                     <i
//                                       class="fa fa-heart"
//                                       aria-hidden="true"
//                                     ></i>
//                                   </span>
//                                 </div>
//                               </div>
//                             </>
//                           );
//                           // );
//                         })}
//                 </div>
//               </div>
            
//             <Footer />
//           </section>
//         </>
//       )}
//     </div>
//   );
// };
// export default MyNftDetails;

// const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
