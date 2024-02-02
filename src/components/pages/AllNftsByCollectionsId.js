import React, { useEffect, useState, useRef } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import GetAllNftsByCollectionIdAction, {
  GetAllNftsByCollectionIdRequest,
} from "../../Redux/Actions/NftActions/GetAllNftsByCollectionIdAction";
import axios from "axios";
import GetNftCollectionByIdAction from "../../Redux/Actions/CollectionAction/GetNftCollectionByIdAction";
import defaultImg from "../../assets/images/default.png";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useHistory, useParams } from "react-router";
import heart from "../../assets/images/heart-icon.png";
import { PropagateLoader, RingLoader } from "react-spinners";
import { Link } from "react-router-dom";
import GetFavouriteNftAction from "../../Redux/Actions/NftActions/GetFavouriteNftAction";
import RemoveFavouriteNftAction from "../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import swal from "sweetalert";
import AddFavouriteNftAction from "../../Redux/Actions/NftActions/AddFavouriteNftAction";
import GetNftCollectionByIdWithOutAccountAction from "../../Redux/Actions/NftActions/GetNftCollectionByIdWithOutAccountAction";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { concat } from "lodash";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const AllNftsByCollectionsId = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  console.log(id);
  const GetAllNftsByCollectionId = useSelector(
    (state) =>
      state.GetAllNftsByCollectionId?.GetAllNftsByCollectionIdResponse?.data
  );
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);

  const GetNftCollectionByIdWithOutAccount = useSelector(
    (state) =>
      state?.GetNftCollectionByIdWithOutAccount
        ?.GetNftCollectionByIdWithOutAccountResponse?.data
  );

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );

  const GetNftCollectionById = useSelector(
    (state) => state.GetNftCollectionById?.GetNftCollectionByIdResponse?.data
  );
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );

  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [favcount, setFavCount] = useState();

  const [filter, setfilter] = useState([]);
  const [getAllNftsByCollectionIdState, setGetAllNftsByCollectionIdState] =
    useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const loadMore = () => {
    let collectionsState = getAllNftsByCollectionIdState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 4;
    setGetAllNftsByCollectionIdState([
      ...collectionsState,
      ...GetAllNftsByCollectionId?.slice(start, end),
    ]);
  };

  useEffect(() => {
    setGetAllNftsByCollectionIdState(GetAllNftsByCollectionId?.slice(0, 8));
    setAllData(GetAllNftsByCollectionId);
  }, [GetAllNftsByCollectionId]);

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };
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



  useEffect(async () => {
    console.log("GetNftCollectionByIdWithOutAccount", GetNftCollectionByIdWithOutAccount);
    // await dispatch(GetNftCollectionByIdAction(id));

    await dispatch(GetNftCollectionByIdWithOutAccountAction(id));

    await dispatch(GetAllNftsByCollectionIdAction(id))
      .then((res) => {
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        toast.success(`${error?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    return () => {
      dispatch(GetAllNftsByCollectionIdRequest());
    };
  }, []);

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
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

            console.log("favcount", favcount);
            // setFavCount((favcount) => favcount + 1);
            // setFavCount(...favCount, favCount)
            const result = await dispatch(GetFavouriteNftAction());
            console.log("resultttttttttttttttttt", result);
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

  const resetFilter = () => {
    setGetAllNftsByCollectionIdState(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    setGetAllNftsByCollectionIdState(filter?.slice(0, 8));
    setFilterData(filter);
  };


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
      <section
        id="profile_banner"
        className="jumbotron breadcumb no-bg"
        style={{
          backgroundImage: `url(${httpUrl}/${GetNftCollectionByIdWithOutAccount?.bannerImage?.replaceAll(
            "\\",
            "/"
          )})`,
        }}
      >
        <div style={{ paddingTop: '0px' }} className="mainbreadcumb"></div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="collection_logo_header d_profile cntr">
              <div style={{ float: "right" }} className="my-2">
                <DropdownButton id="dropdown-basic-button" className="social--btn fa fa-caret-down ">
                  {(!GetNftCollectionByIdWithOutAccount?.websiteLink &&
                    !GetNftCollectionByIdWithOutAccount?.kdiscordLink &&
                    !GetNftCollectionByIdWithOutAccount?.twitterLink &&
                    !GetNftCollectionByIdWithOutAccount?.instagramLink &&
                    !GetNftCollectionByIdWithOutAccount?.mediumLink &&
                    !GetNftCollectionByIdWithOutAccount?.tLink) && (
                      <> <span className="text-center collection-social">No links found </span></>
                    )}
                  {GetNftCollectionByIdWithOutAccount?.websiteLink && (
                    <Dropdown.Item title="website" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.websiteLink) }}><i class="fa fa-globe web-color"  ></i> Website</Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.discordLink && (
                    <Dropdown.Item title="discord" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.discordLink) }} > <i class="fab fa-discord discord-color"></i> Discord </Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.twitterLink && (
                    <Dropdown.Item title="twitter" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.twitterLink) }}> <i className="fa fa-twitter twitter-color"></i> Twitter </Dropdown.Item>
                  )}

                  {GetNftCollectionByIdWithOutAccount?.instagramLink && (
                    <Dropdown.Item title="instagram" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.instagramLink) }} ><i className="fa fa-instagram insta-color"></i> Instagram</Dropdown.Item>
                  )}
                  {GetNftCollectionByIdWithOutAccount?.mediumLink && (
                    <Dropdown.Item title="medium" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.mediumLink) }}> <i className="fa fa-medium medium-color"></i> Medium </Dropdown.Item>
                  )}
                  {GetNftCollectionByIdWithOutAccount?.tLink && (
                    <Dropdown.Item title="telegram" onClick={() => { window.open(GetNftCollectionByIdWithOutAccount?.tLink) }}> <i className="fa fa-telegram telegram-color"></i> Telegram </Dropdown.Item>
                  )}



                </DropdownButton>

              </div>
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img
                    src={
                      httpUrl +
                      "/" +
                      GetNftCollectionByIdWithOutAccount?.logoImage
                    }
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                  {/* <i className="fa fa-check"></i> */}
                </div>

                <div className="profile_name collection-desc">

                  <h4>
                    {GetNftCollectionByIdWithOutAccount?.name}

                  </h4>
                  {console.log(
                    GetAllNftsByCollectionId &&
                    GetAllNftsByCollectionId[0]?.ownerAddress,
                    WalletAddress
                  )}

                  <div>{GetNftCollectionByIdWithOutAccount?.description}</div>
                  {GetNftCollectionByIdWithOutAccount?.address ==
                    WalletAddress && (
                      <button
                        onClick={() => {
                          history.push(`/addcollection/${id}`);
                        }}
                        className="btn btn-main mx-auto"
                      >
                        Update Collection
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mb-cntr">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12">
            <div className="items_filter w-100">
              <form
                className="row form-dark w-100"
                id="form_quick_search"
                name="form_quick_search"
                onReset={() => {
                  resetFilter();
                }}
                onSubmit={handlerSearchSubmit}
              >
                <div className="col-sm-12 d-flex align-items-start justify-content-center">
                  <input
                    className="form-control"
                    id="name_1"
                    name="name_1"
                    ref={searchRef}
                    placeholder="search item here..."
                    type="text"
                    onChange={(e) => handleSearchChange(e)}
                    style={{ width: "100%" }}
                  />
                  <button id="btn-submit">
                    <i className="fa fa-search bg-color-secondary"></i>
                  </button>
                  {/* <div> */}
                  {filterTrigger && (
                    <button id="btn-submit" type="reset">
                      <i class="fas fa-sync bg-danger m-l-1"></i>
                    </button>
                  )}
                  {/* </div> */}
                  <div className="clearfix"></div>
                </div>
              </form>
              {/* <div className="dropdownSelect one">
                <Select
                  className="select1"
                  styles={customStyles}
                  menuContainerStyle={{ zIndex: 999 }}
                  defaultValue={options[0]}
                  options={options}
                />
              </div>
              <div className="dropdownSelect two">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options1[0]}
                  options={options1}
                />
              </div>
              <div className="dropdownSelect three">
                <Select
                  className="select1"
                  styles={customStyles}
                  defaultValue={options2[0]}
                  options={options2}
                />
              </div> */}
            </div>
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row">
              {isloading ? (
                <>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <RingLoader color="black" size="60" />
                  </div>
                </>
              ) : (
                <>
                  {GetAllNftsByCollectionId?.length == 0 ? (
                    <div className="col-sm-12 text-center">
                      No NFT Record Found
                    </div>
                  ) : (
                    ""
                  )}
                  {getAllNftsByCollectionIdState?.map((item, index) => (
                    // <div
                    //   key={index}
                    //   className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                    //   onClick={() => {
                    //     item?.ownerAddress == WalletAddress
                    //       ? history.push(`/mynftdetails/${item?.id}`)
                    //       : history.push(
                    //           `/usernftdetail/${item?.id}/${item?.accountId}`
                    //         );
                    //   }}
                    // >
                    //   <div className="nft__item m-0">
                    //     <div className="author_list_pp">
                    //       <span
                    //         onClick={() =>
                    //           window.open(item.authorLink, "_self")
                    //         }
                    //       >
                    //         <img
                    //           className="lazy"
                    //           src={httpUrl + "/" + item?.ownerImage}
                    //           alt=""
                    //         />
                    //         <i className="fa fa-check"></i>
                    //       </span>
                    //     </div>
                    //     <div className="nft__item_wrap">
                    //       <span>
                    //         <img
                    //           onLoad={onImgLoad}
                    //           src={`${httpUrl}/${item.image}`}
                    //           className="lazy "
                    //           style={{
                    //             width: "100%",
                    //             height: 200,
                    //             borderRadius: 8,
                    //             objectFit: "contain",
                    //           }}
                    //           alt=""
                    //         />
                    //       </span>
                    //     </div>
                    //     <div className="nft__item_info d-flex justify-content-between">
                    //       <span
                    //         onClick={() => window.open(item.nftLink, "_self")}
                    //         className="d-flex flex-column"
                    //       >
                    //         <h4>{item.name}</h4>
                    //         <span>{item.blockChainName}</span>
                    //       </span>
                    //       <div className="nft__item_price d-flex align-items-end">
                    //         <span>Price: {item.buyPrice}</span>
                    //       </div>

                    //       <div className="nft__item_like d-flex justify-content-end">
                    //         <div
                    //         // onClick={() =>
                    //         //   removeToFavourite(
                    //         //     favourite?.id,
                    //         //     favourite?.ownerAddress
                    //         //   )
                    //         // }
                    //         >
                    //           <i
                    //             style={{ color: "red" }}
                    //             className="fa fa-heart"
                    //           ></i>
                    //         </div>
                    //         {/* <span>{favourite?.likes}</span> */}
                    //       </div>
                    //     </div>
                    //   </div>
                    // </div>
                    <div
                      key={index}
                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                    >
                      <div className="nft__item m-0">
                        <div className="author_list_pp">
                          <Link
                            to={
                              item?.ownerAddress === WalletAddress
                                ? "/myprofile"
                                : `/profile/${item?.ownerAddress}`
                            }
                          >
                            <img
                              className="lazy"
                              src={
                                item?.ownerImage
                                  ? httpUrl + "/" + item?.ownerImage
                                  : defaultImg
                              }
                              alt=""
                            />
                            {/* <i className="fa fa-check"></i> */}
                          </Link>
                        </div>
                        <div
                          className="nft__item_wrap"
                          onClick={() => {
                            history.push(`/usernftdetail/${item?.id}/${item?.accountId}`);
                          }}
                        >
                          <span>
                          <span className="heart-span hanging"><img src={heart} /> 12</span>
                            <img
                              onLoad={onImgLoad}
                              src={httpUrl + "/" + item?.image}
                              className="lazy "
                              alt="Nft Pic"
                              style={{
                                width: "100%",
                                height: 200,
                                borderRadius: 8,
                                objectFit: "contain",
                              }}
                            />
                          </span>
                        </div>
                        {/* <div className="nft__item_info">
                    <span
                      onClick={() => window.open(nft.nftLink, "_self")}
                    >
                      <h4>{nft.name}</h4>
                    </span>
                    <div className="nft__item_price">
                      <span>Price: {nft?.sellPrice}</span>
                      <span> {nft?.blockChainName}</span>
                    </div>

                    <div
                      className="nft__item_like"
                      onClick={() =>
                        addToFavourite(nft.id, nft.ownerAddress)
                      }
                    >
                      <i
                        style={{ color: "red" }}
                        className="fa fa-heart"
                      ></i>
                      <span>{nft.likes}</span>
                    </div>
                  </div> */}

                        <div className="nft__item_info d-flex justify-content-between" style={{ margin: 0 }}>
                          <span className="d-flex flex-column">
                            <p className="color-txt" style={{ fontSize: 13 }} onClick={() => {
                              history.push(
                                `/nftsbycollections/${item?.collectionId}`
                              );
                            }}
                            >
                              <b>
                                {item?.collectionName}
                              </b>
                            </p>
                            <h4>{item?.name}</h4>
                            <span>{item?.blockChainName}</span>
                          </span>
                          <div className="nft__item_price d-flex align-items-end flex-column">
                            <span style={{ whiteSpace: "nowrap" }}>
                              Price: {item?.buyPrice}
                            </span>
                          </div>
                        </div>

                        <div className="nft__item_like d-flex justify-content-end">
                          <div
                          // onClick={() =>
                          //   removeToFavourite(item?.id, item?.ownerAddress)
                          // }
                          >
                            {/* <i
                              style={{ color: "red" }}
                              className="fa fa-heart"
                            ></i> */}
{/* 
                            {GetFavouriteNft?.some((item1, index) => {
                              console.log("item1", item1);
                              console.log("item", item);
                              return item1.nftTokenId == item.nftTokenId;
                            }) ? (
                              <span>
                                <i
                                  onClick={() => {
                                    setFavouriteInProgress(true);
                                    removeToFavourite(
                                      item.id,
                                      item.ownerAddress
                                    );
                                  }}
                                  className="fa fa-heart"
                                  style={{ color: "red" }}
                                >
                                  {item?.nftFavouritesCount}
                                </i>
                              </span>
                            ) : (
                              <i
                                onClick={() => {
                                  setFavouriteInProgress(true);

                                  addToFavourite(
                                    item?.id,
                                    item.ownerAddress
                                  );
                                }}
                                className="fa fa-heart"
                              >
                                {item?.nftFavouritesCount}
                              </i>
                            )} */}

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="dull-div">
            {!isloading && (
              <>
                {filterData?.length && filterTrigger ? (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      filterData?.length && (
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
                ) : (
                  <>
                    {getAllNftsByCollectionIdState?.length <
                      GetAllNftsByCollectionId?.length &&
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
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default AllNftsByCollectionsId;
