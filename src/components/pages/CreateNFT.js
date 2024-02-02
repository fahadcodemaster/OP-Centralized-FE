import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/footer";
import AddNftAction from "../../Redux/Actions/NftActions/AddNftAction";
import defaultImg from "../../assets/images/default.png";
import {
  Modal,
  Row,
  Col,
  Form as Formm,
} from "react-bootstrap";
import axios from "axios";
import http from "../../Redux/Api/http";
import moment from "moment";
import { PulseLoader, RingLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import GetMyAllNftsAction from "../../Redux/Actions/NftActions/GetMyAllNftsAction";
import Web3 from "web3";
import "react-datepicker/dist/react-datepicker.css";
import GetNftMarketAction from "../../Redux/Actions/NftActions/GetNftMarketAction";
import { useHistory, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  mint
} from "../../../src/metamask/index";
import GetMyNftByIdAction, {
  GetMyNftByIdRequest,
} from "../../Redux/Actions/NftActions/GetMyNftByIdAction";
import GetAllBlockChainAction from "../../Redux/Actions/Blockchain/GetAllBlockChainAction";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import GetAllCurrencyAction from "../../Redux/Actions/CurrencyAction/GetAllCurrencyAction";

const CreateSchema = Yup.object().shape({
  fileupload: Yup.mixed().required("File is required"),
  item_title: Yup.string().required("Title Required"),
  item_extLink: Yup.string().url().nullable(),
  item_desc: Yup.string().required("Description Required"),
  item_price: Yup.number()
    .min(0.000000000000000001)
    .required("Item Price Required"),
  blockchain: Yup.string().required("Select Blockchain"),
  item_contactAddress: Yup.string(),
  item_tokenId: Yup.string().when("item_contactAddress", {
    is: true,
    then: Yup.string().required("Must enter Token Id"),
  }),
  collection: Yup.string().required("Collection Required"),
  bidStartDate: Yup.string(),
  bidEndDate: Yup.string(),
  payment_token: Yup.string().required("Payment Token Required"),
});

function CreateNFT() {
  const { id } = useParams();

  const formRef = useRef();
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const getAllBlockchain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );

  const getAllCollection = useSelector(
    (state) => state?.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );

  const getAllCurrency = useSelector(
    (state) => state?.GetAllCurrency?.GetAllCurrencyResponse?.data
  );

  const history = useHistory();

  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  const [isLoading, setIsLoading] = useState(false);

  const [UnlockAbleContentt, SetUnlockAbleContentt] = useState(false);
  const [SensitiveContentt, SetSensitiveContentt] = useState(false);
  const [isBidOn, setIsBidOn] = useState(false);
  const [bidError, setBidError] = useState(false);
  const [bidError1, setBidError1] = useState(false);
  const [collectionLoader, setCollectionLoader] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [finalCreatedProperties, setFinalCreatedProperties] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const [collectionId, setCollectionId] = useState("");
  // const [currencyId, setCurrencyId] = useState();
  const [getAllCollectionData, setGetAllCollection] = useState();
  // const [allBlockchain, setAllBlockchain] = useState([]);
  const [showTokenId, setShowTokenId] = useState(false);
  const [getMasterAddress, setGetMasterAddress] = useState();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const [addPropertiesList, setAddPropertiesList] = useState([
    { name: "", type: "" },
  ]);

  const [addLevelsList, setAddLevelsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [addStatsList, setAddStatsList] = useState([
    { speed: "", value: 3, of: 5 },
  ]);

  const [files, SetFiles] = useState();
  const [FileError, SetFileError] = useState("");
  const fileschange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {
      SetFileError(null);
      SetFiles(file);
    } else {
      SetFileError("Invalid File Format ");
      SetFiles(null);
    }
  };
  // const Logoutt = async () => {
  //   await dispatch(WalletDisconnect());
  //   await dispatch(AuthConnectRequest());
  //   await dispatch(LogoutAction());
  //   await dispatch(ValidateSignatureRequest());
  // };
  const [show, setShow] = useState(false);
  const [levelShow, setLevelShow] = useState(false);
  const [statsShow, setStatsShow] = useState(false);
  const [pageLoader, setPageLoader] = useState(true);
  const [nftImage, setNftImage] = useState("")
  const [params, setParams] = useState();
  const [orgCheck, setOrgCheck] = useState(true);
  const [organization, setOrganization] = useState();
  const [profileData, setProfileData] = useState();

  // useEffect(()=>{
  //   setNftImage(`${httpUrl}/${MyProfile?.profileImage}`)
  // },[])

  useEffect(() => {
    if (getAllCollection) {
      setcollectiondata()
    }
  }, [getAllCollection])

  const setcollectiondata = async (e) => {
    setGetAllCollection(getAllCollection)
    setCollectionLoader(false)
  }

  const handleClose = () => setShow(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleBidding = () => {
    setIsBidOn(true);
  };
  const handleBiddingClose = () => {
    setIsBidOn(false);
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

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 3000);
  });
  useEffect(() => {
    setTimeout(() => {
      setPageLoader(false);
    }, 2000);
  });

  const [NFTData, SetNFTData] = useState({
    fileupload: "",
    item_title: "",
    item_desc: "",
    item_extLink: "",
    item_price: "",
    item_supply: 1,
    blockchain: "",
    item_Freezemetadata: "",
    item_UnlockAbleContent: "",
    item_PropertyList: addPropertiesList,
    item_LevelsList: addLevelsList,
    item_StatsList: addStatsList,
    item_contactAddress: "",
    item_tokenId: "",
    collection: "",
    payment_token: "",
    bidStart: "",
    bidEnd: "",
  });
  const inputhandler = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    SetNFTData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const addMoreProperty = () => {
    setAddPropertiesList((prev) => {
      return [...prev, { name: "", type: "" }];
    });
  };
  const getOrganizations = async (e) => {
    await axios
    .get(
      httpUrl + `/api/v1/Account/GetUserAccount?address=${WalletAddress}`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    )
    .then((resp) => {
      // console.log("objectobjectobject", resp.data.data);
      setOrganization(resp.data.data.accountViewModel.organizationName)
      setOrgCheck(false)
    })

  };

  useEffect(async () => {
  getOrganizations()
  },[])

  useEffect(async () => {
    console.log("edit id", id);
    let params = window.location.pathname;
    console.log("paramssssssssssssss", params.split("/")[2]);
    setParams(params.split("/")[2]);

    if (id) {
      await dispatch(GetAllBlockChainAction()).then(
        async (blockchainApiData) => {
          await dispatch(GetMyAllCollectionsAction()).then(
            async (CollectionApiData) => {
              await dispatch(GetAllCurrencyAction()).then(
                async (allCurrencyApiData) => {
                  await dispatch(GetMyNftByIdAction(id))
                    .then(async (res) => {
                      const data = res.data;
                      // fileschange(data.image);
                      const extractedBlockchain =
                        await blockchainApiData?.data?.find((item, index) => {
                          return item?.shortName == data?.blockChainName;
                        });
                      setSelectedBlockchain(extractedBlockchain);

                      // console.log(selectedBlockchain);

                      const collectionExtracted =
                        await CollectionApiData?.data?.find((item, index) => {
                          return data.collectionId == item.id;
                        });
                      const paymentExtracted =
                        await allCurrencyApiData?.data?.find((item, index) => {
                          return data.currencyId == item.id;
                        });

                      SetNFTData((prev) => {
                        return {
                          ...prev,
                          fileupload: data.image,
                          item_title: data?.name,
                          item_desc: data?.description,
                          item_extLink: data?.externalLink,
                          item_price: data?.buyPrice,
                          item_supply: 1,
                          item_PropertyList: addPropertiesList,
                          item_LevelsList: addLevelsList,
                          item_StatsList: addStatsList,
                          item_contactAddress: data?.contractAddress,
                          item_tokenId: data?.nftTokenId,
                          collection: data?.collectionId,
                          payment_token: data?.currencyId,
                          bidStartTime: startDate,
                          bidEndTime: endDate,
                          blockchain: extractedBlockchain?.chainID,
                        };
                      });
                      setCollectionId(data?.collectionId);
                      // setCurrencyId(data?.currencyId);

                      // await setTimeout(() => {

                      formRef.current.setValues({
                        fileupload: data?.image,
                        item_title: data?.name,
                        item_desc: data?.description,
                        item_extLink: data?.externalLink,
                        item_price: data?.buyPrice,
                        item_supply: 1,
                        blockchain: extractedBlockchain?.chainID,
                        item_PropertyList: "",
                        item_contactAddress: data?.contractAddress,
                        item_tokenId: "",
                        collection: data?.collectionId,
                        payment_token: data?.currencyId,
                        bidStartDate: startDate,
                        bidEndDate: endDate,
                      });

                      SetFiles(data?.image);
                      // }, 2000);
                    })
                    .catch((error) => { });
                }
              );
            }
          );
        }
      );
    } else {
      dispatch(GetMyNftByIdRequest());

    }
  }, [id]);

  useEffect(async () => {
    setTimeout(async () => {
      // await http
      //   .get(httpUrl + "/api/v1/BlockChain/GetAllBlockChain")
      //   .then((res) => {
      //     // console.log("GetAllBlockchain", res?.data?.data);
      //     setAllBlockchain(res?.data?.data);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });

      // await http
      //   .get(httpUrl + "/api/v1/Nft/GetMyAllCollections")
      //   .then((res) => {
      //     console.log("GetAllBlockchain", res?.data?.data);
      //     setGetAllCollection(res?.data?.data);
      //   })
      //   .catch((error) => {
      //     console.log(error.message);
      //   });

      await http
        .get(httpUrl + "/api/v1/Nft/GetMasterAddress")
        .then((res) => {
          console.log("GetMasterAddress", res?.data?.data.address);
          setGetMasterAddress(res?.data?.data?.address);
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }, 2000);
  }, []);

  const handleCollection = (e) => {
    const { name, value } = e.target;

    setCollectionId((prev) => value);
  };

  const handleBlockchain = (chainId) => {
    console.log(id);
    setSelectedBlockchain((prev) =>
      getAllBlockchain.find((item, index) => item.chainID == chainId)
    );
    console.log(selectedBlockchain);
  };

  const removeProperty = (index) => {
    if (addPropertiesList.length == 0) return;
    else {
      let filteredList = [...addPropertiesList.filter((item, i) => i != index)];
      setAddPropertiesList(filteredList);
    }
  };

  const characterCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].name = e.target.value;
    const data = [...addPropertiesList];
    console.log("itemToChange", data);
    setAddPropertiesList(data);
  };

  const maleCahngeHandler = (e, index) => {
    const itemToChange = addPropertiesList.find((item, i) => index === i);
    const ind = addPropertiesList.indexOf(itemToChange);
    addPropertiesList[ind].type = e.target.value;
    const data = [...addPropertiesList];
    console.log("itemToChange", data);

    setAddPropertiesList(data);
  };

  const toggleLevelModal = () => {
    setLevelShow(!levelShow);
  };

  const toggleOnPropertiesModal = () => {
    setShow(true);
  };
  const switchStatus = () => {
    console.log("SWITCHHHHH", !isSwitchOn);
    setIsSwitchOn(!isSwitchOn);
  };

  const addMoreLevel = () => {
    setAddLevelsList((prev) => {
      return [...prev, { speed: "", value: 3, of: 5 }];
    });
  };
  const speedCahngeHandler = (e, index) => {
    const itemToChange = addLevelsList.filter((item, i) => index === i);
    const remainingItems = addLevelsList.filter((item, i) => index !== i);
    itemToChange[0].speed = e.target.value;
    setAddLevelsList([...remainingItems, itemToChange[0]]);
  };
  const removeLevel = (index) => {
    if (addLevelsList.length == 1) return;
    else {
      let filteredList = [...addLevelsList.filter((item, i) => i != index)];
      setAddLevelsList(filteredList);
    }
  };
  const speedValueChangeHandler = (e, index) => {
    const itemToChange = addLevelsList.filter((item, i) => index === i);
    const remainingItems = addLevelsList.filter((item, i) => index !== i);
    if (e.target.value < 0) return;
    if (e.target.value > itemToChange[0].of) return;
    itemToChange[0].value = e.target.value;
    setAddLevelsList([...remainingItems, itemToChange[0]]);
  };
  const speedOfChangeHandler = (e, index) => {
    const itemToChange = addLevelsList.filter((item, i) => index === i);
    const remainingItems = addLevelsList.filter((item, i) => index !== i);
    if (e.target.value < 0) return;
    if (e.target.value < itemToChange[0].value) return;
    itemToChange[0].of = e.target.value;
    setAddLevelsList([...remainingItems, itemToChange[0]]);
  };

  const toggleStatModal = () => {
    setStatsShow(!statsShow);
  };

  const addMoreStats = () => {
    setAddStatsList((prev) => {
      return [...prev, { speed: "", value: 3, of: 5 }];
    });
  };
  const speedOfStatsCahngeHandler = (e, index) => {
    const itemToChange = addStatsList.filter((item, i) => index === i);
    const remainingItems = addStatsList.filter((item, i) => index !== i);
    itemToChange[0].speed = e.target.value;
    setAddStatsList([...remainingItems, itemToChange[0]]);
  };
  const removeStats = (index) => {
    if (addStatsList.length == 1) return;
    else {
      let filteredList = [...addStatsList.filter((item, i) => i != index)];
      setAddStatsList(filteredList);
    }
  };
  const speedValueOfStatsChangeHandler = (e, index) => {
    const itemToChange = addStatsList.filter((item, i) => index === i);
    const remainingItems = addStatsList.filter((item, i) => index !== i);
    if (e.target.value < 0) return;
    if (e.target.value > itemToChange[0].of) return;
    itemToChange[0].value = e.target.value;
    setAddStatsList([...remainingItems, itemToChange[0]]);
  };
  const speedOfOfStatsChangeHandler = (e, index) => {
    const itemToChange = addStatsList.filter((item, i) => index === i);
    const remainingItems = addStatsList.filter((item, i) => index !== i);
    if (e.target.value < 0) return;
    if (e.target.value < itemToChange[0].value) return;
    itemToChange[0].of = e.target.value;
    setAddStatsList([...remainingItems, itemToChange[0]]);
  };

  const UnlockAbleContent = (e) => {
    SetUnlockAbleContentt(e.target.checked);
  };

  const SensitiveContent = (e) => {
    SetSensitiveContentt(e.target.checked);
  };

  const savePropertiesList = () => {
    // console.log(addPropertiesList);
    console.log("prooopertttieeeeess", addPropertiesList);

    const filter = addPropertiesList?.filter((item, index) => {
      return item?.name && item?.type;
    });

    setAddPropertiesList([...filter]);

    setShow(false);
    setFinalCreatedProperties([...filter]);
    console.log("final properties", finalCreatedProperties);
  };

  const onsubmitHandler = async (e) => {
    setIsLoading(true);

    // e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append("OwnerAddress", WalletAddress);
    bodyFormData.append("Name", NFTData.item_title);

    bodyFormData.append("ExternalLink", NFTData.item_extLink);
    bodyFormData.append("Description", NFTData.item_desc);
    // bodyFormData.append("SellPrice", 2);
    // bodyFormData.append("BuyPrice", 3);
    bodyFormData.append("UnlockableContent", UnlockAbleContentt);

    bodyFormData.append("CurrencyId", NFTData?.payment_token);
    // bodyFormData.append("bidStartDate", NFTData?.bidStart);
    // bodyFormData.append("bidEndDate", NFTData?.bidEnd);
    bodyFormData.append(
      "UnlockableContentNote",
      NFTData.item_UnlockAbleContent
    );
    bodyFormData.append("ChainId", selectedBlockchain?.chainID);
    bodyFormData.append("SensitiveContent", SensitiveContentt);
    // bodyFormData.append("Supply", NFTData.item_supply);
    bodyFormData.append("CollectionId", collectionId);
    bodyFormData.append("BlockChainName", selectedBlockchain?.shortName);

    bodyFormData.append(
      "NftProperties",
      JSON.stringify(finalCreatedProperties)
    );
    bodyFormData.append("NftLevels", []);
    bodyFormData.append("NftStats", []);

    if (NFTData.item_contactAddress) {
      bodyFormData.append("ContractAddress", NFTData.item_contactAddress);
      bodyFormData.append("TokenId", NFTData.item_tokenId);
    }

    bodyFormData.append("Image", files);
    // bodyFormData.append("FreezeData", NFTData.item_Freezemetadata);
    bodyFormData.append("Price", NFTData.item_price);
    console.log(selectedBlockchain);

    if (id) {
      console.log("()()()()())", id);
      bodyFormData.append("NftId", id);
      // console.log("*&*&*&**&*&*&*&*", isSwitchOn);
      // console.log("NFT ID", id);
      bodyFormData.append("freezeData", isSwitchOn);
      if (isSwitchOn === true) {
        console.log("true");
        let params = window.location.pathname;
        await http
          .get(
            httpUrl + `/api/v1/Nft/GetMyNftById?nftId=${params.split("/")[3]}`
          )
          .then(async (nftData) => {
            // console.log("CONTRACT ADDRESS", nftData?.data.data.contractAddress);
            var payload;
            // console.log("WalletAddress", WalletAddress);
            // console.log("NFTData.item_contactAddress", NFTData.item_contactAddress);
            const amount = parseInt(
              Web3.utils.toWei(String(NFTData.item_price))
            ).toString(16);
            console.log("BALANCE", amount);
            payload = [
              {
                to: nftData.data.data.ownerAddress,
                uri: nftData.data.data.ownerImage
                  ? nftData.data.data.ownerImage
                  : nftData.data.data.ownerAddress,
                tokenId: nftData.data.data.nftTokenId,
              },
            ];
            // console.log("()()()()()()()()()()()())");
            // console.log(payload);
            // console.log("()()()()()()()()()()()())");
            await dispatch(
              mint(payload, nftData.data.data.contractAddress)
                .then(async (response) => {
                  setIsLoading(true);


                  bodyFormData.append("FeeTransactionHash", response.hash);

                  const str = response.hash;
                  console.log("transaction IN FREEZE", str);

                  toast.success(
                    `NFT Updating in process`,
                    {
                      position: "top-right",
                      autoClose: false,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }
                  );
                  var postBody = {
                    nftId: id,
                    transactionHash: str,
                  };
                  delay(12000).then(async () => {
                    console.log("I have got 8 sec delay");
                    http.put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData).then(async (res) => {
                      await http
                        .post(
                          httpUrl +
                          `/api/v1/Nft/FreezeNft?NftId=${id.toString()}&TransactionHash=${str}`,
                          postBody
                        )
                        .then((res) => {
                          setIsLoading(false);
                          setTimeout(async () => {
                            await dispatch(GetMyAllNftsAction()).then(
                              (response) => {
                                return history.push(
                                  `/usernftdetail/${id}/${response?.data[0].accountId}`
                                );
                              }
                            );
                            await dispatch(GetNftMarketAction());
                          }, 2000);
                          console.log("nft freeze response", res);
                          toast.success(`NFT Updated successfully`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        })
                        .catch((err) => {
                          // setIsLoading(false);
                        });

                    })
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
                  setIsLoading(false);
                })
            ).catch((e) => {
              setIsLoading(false);
              console.log("ERROR IN RES", e);
            });
          })
          .catch((error) => {
            setIsLoading(false);
            console.log("NFTData" + error);
          });
      } else if (isSwitchOn === false) {
        console.log("false");
        http.put(httpUrl + "/api/v1/Nft/EditNft", bodyFormData).then((res) => {
          console.log("edited form", res);
          setTimeout(async () => {
            await dispatch(GetMyAllNftsAction()).then((response) => {
              console.log("&*&**&*&&*&*&*&");
              console.log(id, response?.data[0].accountId);
              console.log("&*&**&*&&*&*&*&");
              return history.push(
                `/usernftdetail/${id}/${response?.data[0].accountId}`
              );
            });
            await dispatch(GetNftMarketAction());
          }, 2000);
          console.log("nft freeze response", res);
          toast.success(`NFT Updated successfully`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
        });
      }
    } else {
      console.log("CONTRACT");
      console.log(NFTData.item_contactAddress);
      console.log("CONTRACT");
      http
        .get(httpUrl + "/api/v1/Nft/GetNftMintingFee")
        .then((res) => {
          console.log("GetNftMintingFee", res?.data?.data.nftFee);
          const amount = parseInt(
            Web3.utils.toWei(String(res?.data?.data.nftFee))
          ).toString(16);
          var payload;
          if (NFTData.item_contactAddress) {
            payload = [
              {
                from: WalletAddress,
                to: NFTData.item_contactAddress,
                value: amount,
              },
            ];
          } else {
            payload = [
              {
                from: WalletAddress,
                to: getMasterAddress,
                value: amount,
              },
            ];
          }


          // console.table([...bodyFormData])
          dispatch(AddNftAction(bodyFormData))
            .then((res) => {


              setIsLoading(false);
              toast.success(
                `${res.message} you are going to be redirected to created NFT`,
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

              setTimeout(async () => {
                await dispatch(GetMyAllNftsAction()).then((response) => {
                  return history.push(
                    `/usernftdetail/${response?.data[0].id}/${response?.data[0].accountId}`
                  );
                });
                await dispatch(GetNftMarketAction());
              }, 2000);
            })
            .catch((error) => {
              setIsLoading(false);
              toast.error(`${error?.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error?.message);
        });
    }
    console.log(bodyFormData);
  };

  return (
    <div>
      {pageLoader ? (
        <div className="spacer-10">
          <br />
          <br />
          <br />
          <br />
          <div className="col-sm-12 d-flex justify-content-center">
            <RingLoader color="black" size="80" />
          </div>
        </div>
      ) : (
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

          <section className="jumbotron breadcumb no-bg">
            <div className="small-pnl secnd-anime"></div>
            <div className="mainbreadcumb">
              <div className="container">
                <div className="row m-10-hor">
                  <div className="col-12">
                    <h1 className="text-center">
                      {id ? "Update" : "Create"} New NFT
                    </h1>
                    {/* <nav aria-label="breadcrumb">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Create New NFT</li>
                      </ol>
                    </nav> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-8 mb-5">
                <Formik
                  validationSchema={CreateSchema}
                  innerRef={formRef}
                  onSubmit={() => onsubmitHandler()}
                  validator={() => ({})}
                  initialValues={{
                    item_title: "",
                    item_extLink: "",
                    item_desc: "",
                    item_price: "",
                    blockchain: "",
                    fileupload: "",
                    collection: "",
                    payment_token: "",
                    item_contactAddress: "",
                    item_tokenId: "",
                    bidStartDate: "",
                    bidEndDate: "",
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    handleChange,
                    setFieldValue,
                  }) => (
                    <Form
                      id="form-create-item"
                      className="form-border"
                      onSubmit={handleSubmit}
                    >
                      {console.log(errors)}
                      {/* {id ? setFieldValue(values?.blockchain) : ""} */}
                      <div className="field-set">
                        <h5 className="text-dark">Name of the NFT</h5>
                        <input
                          type="text"
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                          }}
                          value={values.item_title}
                          name="item_title"
                          id="item_title"
                          className="form-control"
                          placeholder="NFT Name"
                        />

                        {errors.item_title && touched.item_title && (
                          <div className="text-red">{errors.item_title}</div>
                        )}
                        <div className="spacer-10"></div>
                        <h5 className="text-dark">Organization Name (Optional)</h5>
                        {orgCheck ? (
                                    <PulseLoader color="white" size="11" />

                                    ): (
                                      <>
                                        <input disabled={organization ? true: false} value={organization} className="form-control" autoComplete="off" placeholder="Organization Name" />
                                      </>
                                    )}
                        <div className="spacer-10"></div>
                        <h5 className="text-dark">External Link</h5>
                        <input
                          type="text"
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                          }}
                          value={values.item_extLink}
                          name="item_extLink"
                          id="item_extLink"
                          className="form-control"
                          placeholder="e.g. 'https://www.yoursite.com/item/123'"
                        />
                        {errors.item_extLink && touched.item_extLink && (
                          <div className="text-red">{errors.item_extLink}</div>
                        )}

                        <div className="spacer-10"></div>
                        <h5 className="text-dark">Description</h5>
                        <textarea
                          data-autoresize
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                          }}
                          value={values.item_desc}
                          name="item_desc"
                          id="item_desc"
                          className="form-control"
                          placeholder="e.g. 'This is very limited item'"
                        ></textarea>

                        {errors.item_desc && touched.item_desc && (
                          <div className="text-red">{errors.item_desc}</div>
                        )}
                        <div className="spacer-10"></div>
                        <h5 className="text-dark">Upload file</h5>
                        <div className="d-create-file">
                          <p
                            id="file_name"
                            className={FileError ? "text-danger" : ""}
                          >
                            {FileError && FileError}
                            {/* @ts-ignore */}
                            {files
                              ? //  @ts-ignore
                              files?.name || files
                              : "Please Select PNG, JPG, JPEG Or GIF"}
                          </p>
                          {/* {files.map((x) => (
                    <p key="{index}">{x.name}</p>
                  ))} */}
                          <div className="browse">
                            <input
                              type="button"
                              id="get_file"
                              name="fileupload"
                              className="btn-main whiter"
                              value="Choose File"
                            />
                            <input
                              id="upload_file"
                              type="file"
                              name="fileupload"
                              onChange={(e) => {
                                fileschange(e);
                                handleChange(e);
                              }}
                            />
                          </div>
                        </div>
                        {errors.fileupload && touched.fileupload && (
                          <div className="text-red">{errors.fileupload}</div>
                        )}
                        <div className="spacer-single"></div>
                        <h5 className="text-dark">Number Of NFT copies</h5>
                        <input className="form-control" autoComplete="off" placeholder="Number Of NFT copies" />
                        <div className="spacer-10"></div>
                        <h5 className="text-dark">Price</h5>
                        <input
                          type="number"
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                          }}
                          value={values.item_price}
                          name="item_price"
                          id="item_price"
                          className="form-control"
                          placeholder="enter price for one item (BNB)"
                        />

                        {errors.item_price && touched.item_price && (
                          <div className="text-red">{errors.item_price}</div>
                        )}
                        <div className="spacer-10"></div>

                        <h5 className="text-dark">Collection</h5>
                        <span className="span-space">
                          This is the collection where your item will appear.
                        </span>

                        {collectionLoader ? (
                          <>
                            <div>
                              <PulseLoader color="black" size="11" />
                            </div>
                          </>
                        ) : (
                          <>
                            {getAllCollectionData.length == 0 ? (
                              <>
                                <div className="spacer-10"></div>
                                <div className="propChildd">
                                  <div className="child">
                                    <span className="spann">
                                      {" "}
                                      <i
                                        onClick={() =>
                                          history.push("/addcollection")
                                        }
                                        className="fa fa-fw"
                                        aria-hidden="true"
                                        title="Properties"
                                      >
                                        
                                      </i>{" "}
                                      <h3
                                        onClick={() =>
                                          history.push("/addcollection")
                                        }
                                        className="text-dark"
                                      >
                                        Add a collection
                                      </h3>
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <select
                                  className="form-select form-control custom-select-1"
                                  aria-label="Default select example"
                                  onChange={(e) => {
                                    handleCollection(e);
                                    handleChange(e);
                                  }}
                                  value={values.collection}
                                  style={{
                                    backgroundColor: "rgb(232, 232, 232)",
                                    color: "#3d3d3d",
                                    border: "solid 1px #3d3d3d",
                                  }}
                                  name="collection"
                                >
                                  <option value="" style={{ display: "none" }}>
                                    Select Collection
                                  </option>
                                  {getAllCollectionData?.map((item, index) => {
                                    return (

                                      <option
                                        value={item.id}
                                        style={{ border: "1px solid #02AAB0" }}
                                      >
                                        {item.name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </>
                            )}

                          </>
                        )}

                        {errors.collection && touched.collection && (
                          <div className="text-red">{errors.collection}</div>
                        )}
                        <div className="spacer-10"></div>
                        <div className="" id="propeerty">
                          <div className="bottomBorderRed pb-2">
                            <div className="propChild">
                              <div className="child">
                                <span className="spann">
                                  {" "}
                                  <i className="fas fa-bars"></i>{" "}
                                  <h3 className="text-dark">Properties</h3>
                                </span>
                                <span>
                                  Textual traits that show up as rectangles
                                </span>
                              </div>
                              <div className="child2">
                                <i
                                  onClick={toggleOnPropertiesModal}
                                  className="fa fa-fw"
                                  aria-hidden="true"
                                  title="Properties"
                                >
                                  
                                </i>
                              </div>
                            </div>
                            <Row>
                              {finalCreatedProperties &&
                                finalCreatedProperties?.map((data, index) => {
                                  return (
                                    <Col
                                      xs={6}
                                      sm={4}
                                      md={3}
                                      lg={3}
                                      className={
                                        "d-flex justify-content-center flex-column align-items-center mt-3 word-break-breakall"
                                      }
                                      key={index}
                                    >
                                      <div
                                        className="w-100"
                                        style={{
                                          backgroundColor:
                                            "rgba(21, 178, 229, 0.06)",
                                          borderRadius: 6,
                                          border: "1px solid rgb(21, 178, 229)",
                                          padding: "5px 5px",
                                          textAlign: "center",
                                          wordBreak: "break",
                                        }}
                                      >
                                        <p>{data.name}</p>
                                        <h4 className="text-dark">
                                          <strong>{data.type} </strong>
                                        </h4>
                                      </div>
                                    </Col>
                                  );
                                })}
                            </Row>
                          </div>
                          {/* <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i
                          className="fa fa-fw"
                          aria-hidden="true"
                          title="Copy to use star"
                        >
                          
                        </i>{" "}
                        <h3>Levels</h3>
                      </span>
                      <span>Numerical traits that show as a progress bar</span>
                    </div>
                    <div className="child2" onClick={toggleLevelModal}>
                      <i className="fa fa-fw" aria-hidden="true" title="Levels">
                        
                      </i>
                    </div>
                  </div>
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="far fa-chart-bar"></i> <h3>Stats</h3>
                      </span>
                      <span>Numerical traits that show as a progress bar</span>
                    </div>
                    <div className="child2" onClick={toggleStatModal}>
                      <i className="fa fa-fw" aria-hidden="true" title="Stats">
                        
                      </i>
                    </div>
                  </div>
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="fas fa-unlock-alt"></i>
                        <h3>Unlockable Content</h3>
                      </span>
                      <span>
                        Include unlockable content that can only be revealed by
                        the owner{" "}
                      </span>
                    </div>
                    <div className="child2">
                      <label className="switch">
                        <input type="checkbox" onChange={UnlockAbleContent} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  {UnlockAbleContentt && (
                    <textarea
                      style={{ marginTop: "5px" }}
                      data-autoresize
                      onChange={inputhandler}
                      value={NFTData.item_UnlockAbleContent}
                      name="item_UnlockAbleContent"
                      id="item_UnlockAbleContent"
                      className="form-control"
                      placeholder="e.g. 'item  UnlockAbleContent'"
                    ></textarea>
                  )}
                  <div className="propChild">
                    <div className="child">
                      <span className="spann">
                        {" "}
                        <i className="fas fa-exclamation-triangle"></i>{" "}
                        <h3>Explicit & Sensitive Content</h3>
                      </span>
                      <span>
                        Set this item as explicit and sensitive content
                      </span>
                    </div>
                    <div className="child2">
                      <label className="switch">
                        <input type="checkbox" onChange={SensitiveContent} />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div> */}
                        </div>
                        {/* <h5>Supply</h5>
                <input
                  style={{
                    backgroundColor: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  type="text"
                  onChange={inputhandler}
                  value={NFTData.item_supply}
                  name="item_supply"
                  id="item_supply"
                  className="form-control"
                  disabled
                /> */}
                        <div className="spacer-60"></div>
                        <h5 className="text-dark">Blockchain</h5>
                        <select
                          className="form-select form-control custom-select-1"
                          aria-label="Default select example"
                          onChange={(e) => {
                            handleBlockchain(e.target.value);

                            handleChange(e);
                          }}
                          value={values.blockchain}
                          style={{
                            backgroundColor: "rgb(255, 255, 255)",
                            color: "#3d3d3d",
                            border: "solid 1px #3d3d3d",
                          }}
                          name="blockchain"
                        >
                          <option style={{ display: "none" }}>
                            Select Blockchain
                          </option>
                          {getAllBlockchain?.map((item, index) => {
                            return (
                              <option
                                value={item.chainID}
                                style={{ border: "1px solid #02AAB0" }}
                              >
                                {item.name} ({item.shortName})
                              </option>
                            );
                          })}
                        </select>

                        {errors.blockchain && touched.blockchain && (
                          <div className="text-red">{errors.blockchain}</div>
                        )}

                        <div className="my-3"></div>
                        <h5 className="text-dark">Payment tokens</h5>

                        <select
                          className="form-select form-control custom-select-1"
                          aria-label="Default select example"
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                          }}
                          value={values.payment_token}
                          name="payment_token"
                          style={{
                            backgroundColor: "rgb(255, 255, 255)",
                            color: "#3d3d3d",
                            border: "solid 1px #3d3d3d",
                          }}
                        >
                          <option style={{ display: "none" }}>
                            Select Payment Token
                          </option>
                          {getAllCurrency?.map((item, index) => {
                            return (
                              <option
                                value={item.id}
                                style={{ border: "1px solid #02AAB0" }}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </select>

                        {errors.payment_token && touched.payment_token && (
                          <div className="text-red">{errors.payment_token}</div>
                        )}
                        {WalletAddress === params ? (
                          <>
                            <h5 className="text-dark">Freeze metadata?</h5>
                            <Formm>
                              <Formm.Switch
                                type="switch"
                                id="custom-switch"
                                label="Checking it will permanently freeze the metadata and can be sold on marketplace."
                                checked={isSwitchOn}
                                onChange={() => {
                                  switchStatus();
                                }}
                              />
                            </Formm>
                          </>
                        ) : (
                          <></>
                        )}
                        {/* <h5 className="text-dark">Is bidding open?</h5>
                    <input name="bid" type="radio" value="Yes" onClick={handleBidding}/>Yes
                    <input style={{marginLeft:"20px"}} name="bid" type="radio" value="No" onClick={handleBiddingClose}/> No
                    {isBidOn && (
                    <>
                      <div  className="bidding-text">
                      <h5 className="text-dark">Bid start date</h5>
                      <h5 className="text-dark">Bid end date</h5>
                      </div>
                      <div style={{display:'flex', justifyContent:'center'}}>
                      <DatePicker selected={startDate} onChange={(date) => startDateFunc(date)} />
                      <DatePicker selected={endDate} onChange={(date) => endDateFunc(date)} />
                      </div>
                    </>
                    )}
                    {bidError &&(
                      <span style={{color:'red'}}>Can't use past date for start date.</span>
                    )}
                    {bidError1 &&(
                      <span style={{color:'red', marginLeft:'12.5%'}}>Can't use past date for end date.</span>
                    )} */}

                        <div className="spacer-10"></div>
                        <h5 className="text-dark">
                          Contract Address (Optional)
                        </h5>
                        <input
                          placeholder="If already minted"
                          type="text"
                          onChange={(e) => {
                            inputhandler(e);
                            handleChange(e);
                            if (e.target.value == "") {
                              setShowTokenId(false);
                            } else {
                              setShowTokenId(true);
                            }
                          }}
                          value={values.item_contactAddress}
                          name="item_contactAddress"
                          id="item_contactAddress"
                          className="form-control"
                          disabled={id}
                        />

                        <div className="spacer-10"></div>

                        {showTokenId ? (
                          <>
                            <h5 className="text-dark">Token Id</h5>
                            <input
                              type="number"
                              onChange={(e) => {
                                inputhandler(e);
                                handleChange(e);
                              }}
                              value={values.item_tokenId}
                              name="item_tokenId"
                              id="item_tokenId"
                              className="form-control"
                              placeholder="Enter the Token id "
                            />

                            {NFTData.item_contactAddress.length > 0 &&
                              !NFTData.item_tokenId ? (
                              <div className="text-red">Token Id Required</div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {/* <div className="spacer-10"></div>
                  <h5>Freeze Data</h5>
                  <input
                    type="text"
                    onChange={inputhandler}
                    value={NFTData.item_Freezemetadata}
                    name="item_Freezemetadata"
                    id="item_Freezemetadata"
                    className="form-control"
                    placeholder="suggested: 0, 10%, 20%, 30%. Maximum is 70%"
                  /> */}
                        <div className="spacer-10"></div>
                        <div className="btn-cntnr" style={{ gap: 10 }}>
                          {isLoading ? (
                            <button
                              disabled
                              style={{
                                backgroundColor: "#02AAB0",
                                borderRadius: 20,
                                height: 35,
                                width: 130,
                                borderWidth: 0,
                              }}
                            >
                              <PulseLoader color="white" size="11" />
                            </button>
                          ) : NFTData.item_contactAddress == "" ||
                            (NFTData.item_contactAddress.length > 0 &&
                              NFTData.item_tokenId) ? (
                            <input
                              type="submit"
                              id="submit"
                              className="btn-main whiter"
                              value={`${id ? "Update" : "Create"} NFT`}
                            />
                          ) : (
                            <>
                              <input
                                id="submit"
                                className="btn-secondary text-center"
                                value={`${id ? "Update" : "Create"} NFT`}
                                style={{
                                  width: 150,
                                  height: 35,
                                  borderRadius: 30,
                                  borderWidth: 0,
                                }}
                                disabled
                              />
                            </>
                          )}
                          <input
                            style={{
                              width: 150,
                              height: 35,
                              borderRadius: 30,
                              borderWidth: 0,
                            }}
                            value={"Cancel"}
                            className="btn-main whiter"
                            onClick={() => history.goBack()}
                          />
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>

              <div className="col-lg-4 col-sm-6 col-xs-12 word-break-breakall">
                <h5 className="text-dark">Preview</h5>
                <div className="nft__item m-0 preview-box">
                  <div className="author_list_pp " style={{ background: "none" }}>
                    {MyProfile?.profileImage ? (
                      <span>
                        <img className="lazy profice-avatar-margin" src={MyProfile?.profileImage ? httpUrl + "/" + MyProfile?.profileImage : defaultImg} alt="User.png" />
                        {/* <i className="fa fa-check"></i> */}
                      </span>
                    ) : (
                      <div style={{
                        width: 150, height: "auto",
                        // backgroundColor: "#02AAB0",
                        borderRadius: "100%",
                      }} >
                        <FaUserCircle size={50} />
                      </div>
                    )}
                  </div>
                  <div className="nft__item_wrap">
                    <span>
                      {id && NFTData?.fileupload == files ? (
                        <>
                          <img src={`${httpUrl}/${files}`} id="get_file_2" className="lazy nft__item_preview" alt="NFT.png" />
                        </>
                      ) : (
                        <img src={
                          files
                            ? URL.createObjectURL(files)
                            : "./img/collections/def.jpeg"
                        } id="get_file_2" className="lazy nft__item_preview " alt="NFT.png" />
                      )}
                    </span>
                    {console.log(files)}
                  </div>
                  <div className="nft__item_info nft-item-margin">
                    <span className="Nfttitle break-all-characters">
                      <h4>
                        {NFTData?.item_title
                          ? NFTData.item_title
                          : "Item Title"}
                      </h4>
                    </span>
                    <div className="nft__item_price break-all-characters">
                      {NFTData?.item_price ? NFTData.item_price : "Item Price"}{" "}
                      {selectedBlockchain?.shortName}
                    </div>
                    <div className="nft__item_action">
                      <span className="text-dark">Buy NFT</span>
                    </div>
                    {/* <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer />

          <Modal show={show} onHide={handleClose} animation={true} centered>
            <Modal.Header className="modal-header-color">
              <Modal.Title className="text-light text-dark">
                Add Properties
              </Modal.Title>

              <button
                aria-label="Hide"
                onClick={handleClose}
                className="btn-close"
              />
            </Modal.Header>
            <Modal.Body className="modal-body-color">
              <p>
                Properties show up underneath your item, are clickable, and can
                be filtered in your collection's sidebar.
              </p>
              <Row style={{ paddingBottom: "5px" }}>
                <Col xs={1}></Col>
                <Col xs={5}>
                  <span
                    className="text-light text-dark"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Type
                  </span>
                </Col>
                <Col xs={5}>
                  <span
                    className="text-light text-dark"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    Name
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {addPropertiesList.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #c7a7a7b9",
                        borderRadius: "4px",
                        // marginTop: "10px",
                      }}
                      key={index}
                    >
                      <Row style={{ height: "40px" }}>
                        <Col xs={1}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                            onClick={() => {
                              removeProperty(index);
                            }}
                          >
                            <CrossIcon />
                          </div>
                        </Col>
                        <Col
                          xs={5}
                          style={{
                            borderRight: "1px solid #c7a7a7b9",
                            borderLeft: "1px solid #c7a7a7b9",
                            height: 40,
                          }}
                        >
                          <input
                            placeholder="Character"
                            type="text"
                            className="form-control"
                            value={item.name}
                            onChange={(e) => {
                              characterCahngeHandler(e, index);
                            }}
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                        <Col xs={5}>
                          <input
                            placeholder="Name"
                            onChange={(e) => {
                              maleCahngeHandler(e, index);
                            }}
                            className="form-control"
                            value={item.type}
                            type="text"
                            style={{
                              border: "none",
                              outline: "none",
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addMoreProperty}
                style={{
                  padding: "10px",
                  border: "2px solid #02AAB0",
                  color: "#02AAB0",
                  fontWeight: "bold",
                  background: "transparent",
                  borderRadius: "6px",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Add more
              </button>
            </Modal.Body>
            <Modal.Footer className="modal-footer-color">
              <div style={{ textAlign: "center", width: "100%" }}>
                <button
                  style={{
                    background: "#02AAB0",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                  }}
                  onClick={savePropertiesList}
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={levelShow}
            onHide={toggleLevelModal}
            animation={true}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black", textAlign: "center" }}>
                Add Levels
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Levels show up underneath your item, are clickable, and can be
                filtered in your collection's sidebar.
              </p>
              <Row style={{ paddingBottom: "5px" }}>
                <Col sm={1}></Col>
                <Col sm={5}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Name
                  </span>
                </Col>
                <Col sm={5}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Value
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {addLevelsList.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #c7a7a7b9",
                        borderRadius: "4px",
                        marginTop: "10px",
                      }}
                      key={index}
                    >
                      <Row style={{ height: "40px" }}>
                        <Col sm={1}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                            onClick={() => {
                              removeLevel(index);
                            }}
                          >
                            <CrossIcon />
                          </div>
                        </Col>
                        <Col
                          sm={6}
                          style={{
                            borderRight: "1px solid #c7a7a7b9",
                            borderLeft: "1px solid #c7a7a7b9",
                          }}
                        >
                          <input
                            placeholder="Speed"
                            type="text"
                            onChange={(e) => {
                              speedCahngeHandler(e, index);
                            }}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              height: "100%",
                            }}
                          />
                        </Col>
                        <Col sm={5}>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Col sm={5}>
                              <input
                                value={addLevelsList[index].value}
                                onChange={(e) => {
                                  speedValueChangeHandler(e, index);
                                }}
                                type="number"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  outline: "none",
                                  height: "100%",
                                }}
                              />
                            </Col>
                            <Col sm={2}>
                              <span>Of</span>
                            </Col>
                            <Col sm={5}>
                              <input
                                value={addLevelsList[index].of}
                                onChange={(e) => {
                                  speedOfChangeHandler(e, index);
                                }}
                                type="number"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  outline: "none",
                                  height: "100%",
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addMoreLevel}
                style={{
                  padding: "10px",
                  border: "2px solid #ff343f",
                  color: "#ff343f",
                  fontWeight: "bold",
                  background: "transparent",
                  borderRadius: "6px",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Add more
              </button>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ textAlign: "center", width: "100%" }}>
                <button
                  style={{
                    background: "#ff343f",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                  }}
                  onClick={toggleLevelModal}
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
          </Modal>
          <Modal
            show={statsShow}
            onHide={toggleStatModal}
            animation={true}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "black", textAlign: "center" }}>
                Add Stats
              </Modal.Title>
              {/* <div style={{width:"20px",height:"20px",backgroundColor:"green"}}>
          <CrossIcon/>
          </div> */}
            </Modal.Header>
            <Modal.Body>
              <p>
                Stats show up underneath your item, are clickable, and can be
                filtered in your collection's sidebar.
              </p>
              <Row style={{ paddingBottom: "5px" }}>
                <Col sm={1}></Col>
                <Col sm={5}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Name
                  </span>
                </Col>
                <Col sm={5}>
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    Value
                  </span>
                </Col>
              </Row>
              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                {addStatsList.map((item, index) => {
                  return (
                    <div
                      style={{
                        border: "1px solid #c7a7a7b9",
                        borderRadius: "4px",
                        marginTop: "10px",
                      }}
                      key={index}
                    >
                      <Row style={{ height: "40px" }}>
                        <Col sm={1}>
                          <div
                            style={{
                              width: "25px",
                              height: "25px",
                              cursor: "pointer",
                              marginTop: "8px",
                            }}
                            onClick={() => {
                              removeStats(index);
                            }}
                          >
                            <CrossIcon />
                          </div>
                        </Col>
                        <Col
                          sm={6}
                          style={{
                            borderRight: "1px solid #c7a7a7b9",
                            borderLeft: "1px solid #c7a7a7b9",
                          }}
                        >
                          <input
                            placeholder="Speed"
                            type="text"
                            onChange={(e) => {
                              speedOfStatsCahngeHandler(e, index);
                            }}
                            style={{
                              border: "none",
                              width: "100%",
                              outline: "none",
                              height: "100%",
                            }}
                          />
                        </Col>
                        <Col sm={5}>
                          <Row
                            style={{
                              display: "flex",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Col sm={5}>
                              <input
                                value={addStatsList[index].value}
                                onChange={(e) => {
                                  speedValueOfStatsChangeHandler(e, index);
                                }}
                                type="number"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  outline: "none",
                                  height: "100%",
                                }}
                              />
                            </Col>
                            <Col sm={2}>
                              <span>Of</span>
                            </Col>
                            <Col sm={5}>
                              <input
                                value={addStatsList[index].of}
                                onChange={(e) => {
                                  speedOfOfStatsChangeHandler(e, index);
                                }}
                                type="number"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  outline: "none",
                                  height: "100%",
                                }}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={addMoreStats}
                style={{
                  padding: "10px",
                  border: "2px solid #ff343f",
                  color: "#ff343f",
                  fontWeight: "bold",
                  background: "transparent",
                  borderRadius: "6px",
                  marginTop: "12px",
                  cursor: "pointer",
                }}
              >
                Add more
              </button>
            </Modal.Body>
            <Modal.Footer>
              <div style={{ textAlign: "center", width: "100%" }}>
                <button
                  style={{
                    background: "#ff343f",
                    color: "white",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                  }}
                  onClick={toggleStatModal}
                >
                  Save
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}
export default CreateNFT;

function CrossIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
