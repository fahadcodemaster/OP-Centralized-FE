import React, { useEffect, useState, useRef, Component, useLayoutEffect } from "react";
import BuyNft from "../../components/BuyNft";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import { getToken } from "../../../utils";
import { Link } from "react-router-dom";
import { PropagateLoader, RingLoader } from "react-spinners";
import Slider from "react-slick";
import AccordionFilter from "../accordionFilter";
import AuthorList from "../../components/authorList";
import heart from "../../../assets/images/heart-icon.png";
import cryptocurrency from "../../../assets/images/cryptocurrency-icon.png";
import placebid from "../../../assets/images/placebid-icon.png";
import verified from "../../../assets/images/verified-icon.png";
import defaultImg from "../../../assets/images/default.png";
import footerlogo from "../../../assets/images/footer-logo.png";
import { useLocation, useHistory } from "react-router-dom";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import GetNftMarketByIdAction from "../../../Redux/Actions/NftActions/GetNftMarketById";
import { toast, ToastContainer } from "react-toastify";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import marketplacebg from "../../../assets/images/market-place-banner.png";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import { Accordion, Button, Card, Form, NavLink } from "react-bootstrap";
import http from "../../../Redux/Api/http";
import { Redirect } from "@reach/router";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

function MarketNfts() {
  const Marketplaceprodu = useSelector(
    (state) => state.GetNftMarket?.GetNftMarketResponse?.data
  );


  // const MyNfts = useSelector(
  //   (state) => state.GetMyAllNfts?.GetMyAllNftsResponse?.data
  // );

  const location = useLocation();
  const history = useHistory();

  const [isloading, setIsloading] = useState(true);
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);
  const [routee, setRoute] = useState(true);
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [filter, setfilter] = useState([]);
  const [hotcollection, setHotCollection] = useState();
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [colLoading, setColLoading] = useState(true);
  const [buyNow, setBuyNow] = useState(false);
  const [auction, setAuction] = useState(false);
  const [pathname, setPathname] = useState();
  const [favcount, setFavCount] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [priceEnteries, setPriceEnteries] = useState();
  const [priceCheck, setPriceCheck] = useState(false);
  const [hasbids, setHasOffers] = useState(false);

  const [checkTrueItem, setCheckTrueItem] = useState("");
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);

  const dispatch = useDispatch();
  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const [marketNfts, SetMarketNfts] = useState(Marketplaceprodu?.slice(0, 4));
  const [height, Setheight] = useState(270);
  const searchRef = useRef();
  const GetNftCollectionCategories = useSelector(
    (state) =>
      state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse
        ?.data
  );

  const collectionOption = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "fruit", label: "fruit" },
  ];

  const customStyles = {
    option: (base, state) => ({
      ...base,
      background: "#212428",
      color: "#fff",
      borderRadius: state.isFocused ? "0" : 0,
      "&:hover": {
        background: "#16181b",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "#212428 !important",
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
    }),
    control: (base, state) => ({
      ...base,
      padding: 2,
    }),
  };

  // const options = [
  //   { value: "All categories", label: "All categories" },
  //   { value: "Art", label: "Art" },
  //   { value: "Music", label: "Music" },
  //   { value: "Domain Names", label: "Domain Names" },
  // ];
  // const options1 = [
  //   { value: "Buy Now", label: "Buy Now" },
  //   { value: "On Auction", label: "On Auction" },
  //   { value: "Has Offers", label: "Has Offers" },
  // ];
  // const options2 = [
  //   { value: "All Items", label: "All Items" },
  //   { value: "Single Items", label: "Single Items" },
  //   { value: "Bundles", label: "Bundles" },
  // ];

  const loadMore = () => {
    let marketNftstate = marketNfts;
    let start = marketNftstate?.length;
    let end = marketNftstate?.length + 4;
    if (filterData.length) {
      SetMarketNfts([...marketNftstate, ...filterData?.slice(start, end)]);
    } else {
      SetMarketNfts([
        ...marketNftstate,
        ...Marketplaceprodu?.slice(start, end),
      ]);
    }
  };
  const activeRemove = (e) => {
    const parentCls = e.target.parentNode.parentNode.parentNode.classList
    document.getElementById("SidefilterMenu").classList.remove(parentCls[1]);
  };
  const activeAdd = (e) => {
    // const parentCls = e.target.parentNode.parentNode.parentNode.classList
    const ress = document.getElementById("SidefilterMenu")
    console.log(ress);
    document.getElementById("SidefilterMenu").classList.add("active");
  };
  const priceFilter = async () => {
    const payload = {
      search: "",
      min: minPrice,
      max: maxPrice,
      collectionId: [
        0
      ],
      sortBy: 'string',
      sortIndex: 0
    }
    console.log("heeheheh", payload);
    if (minPrice && maxPrice) {
      await http
        .post(httpUrl + "/api/v1/Nft/GetMarketPlaceNftSearch", payload)
        .then((res) => {
          console.log("filtered dataaaaaaaaaaaaaa", res.data.data);
          setPriceEnteries(res.data.data)
          setBuyNow(false)
          setAuction(false)
          setPriceCheck(true)
        })
        .catch((error) => {
          console.log(error?.message);
        });
    }

  };

  useEffect(async () => {
    var params = window.location.pathname;
    setPathname(params.split("/")[1]);
    setTimeout(async () => {
      await http
        .get(httpUrl + "/api/v1/Nft/GetHotNfts")
        .then((res) => {
          console.log("HOT COLLECTION", res.data.data);
          setHotCollection(res.data.data);
          setColLoading(false);
          // setGetMasterAddress(res?.data?.data?.address);
        })
        .catch((error) => {
          console.log(error?.message);
        });

      await dispatch(GetNftMarketAction())
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
      if (isConnected) {
        await dispatch(GetFavouriteNftAction());
      }
    }, 3000);
  }, []);

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

  useEffect(() => {
    console.log("Marketplaceprodu", Marketplaceprodu);
    SetMarketNfts(Marketplaceprodu?.slice(0, 4));
    setAllData(Marketplaceprodu);

  }, [Marketplaceprodu]);


  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img?.offsetHeight,
      });
    }
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

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setfilter(
      allData?.filter((item) => {
        return item.name.toLowerCase().includes(value.toLowerCase());
      })
    );
  };
  const routeToMP = (e) => {
    setRoute(true);
    // window.open('/marketplace')
  };
  const setBuyNowFunc = (e) => {
    setAuction(false);
    setPriceCheck(false);
    setHasOffers(false);
    setBuyNow(true);
  };
  const setAuctionFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setHasOffers(false);
    setAuction(true);
  };
  const setHasOffersFunc = (e) => {
    setBuyNow(false);
    setPriceCheck(false);
    setAuction(false);
    setHasOffers(true);
  };

  const resetFilter = () => {
    SetMarketNfts(allData);
    setfilter([]);
    setFilterTrigger(false);

    console.log(marketNfts);
    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    SetMarketNfts(filter?.slice(0, 4));
    setFilterData(filter);
  };

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };




  console.log(filter);

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
      {location.pathname !== "/" && (
        <section className="jumbotron breadcumb no-bg">
          <div className="small-pnl secnd-anime"></div>
          <div className="mainbreadcumb markert-banner">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1 className="text-center">Marketplace</h1>
                  {/* <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="/">Home</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Marketplace</li>
                    </ol>
                  </nav> */}
                  <ul className="arrange-list">
                    <li>
                      <a href="#">All</a>
                    </li>
                    <li>
                      <a href="#">On Sale</a>
                    </li>
                    <li>
                      <a href="#">Owned</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* {window.location.pathname.includes("marketplace") && (
        <section className="container p-b-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="items_filter w-100">
                <form
                  className=" form-dark w-100 formbg"
                  style={{ padding: "10px" }}
                  id="form_quick_search"
                  name="form_quick_search"
                  onReset={() => {
                    resetFilter();
                  }}
                  onSubmit={handlerSearchSubmit}
                >
                  <div className="row">
                    <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-12 disblo">
                      <div className="d-flex align-items-start justify-content-center wid padding-shareef">
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

                        {filterTrigger && (
                          <button id="btn-submit" type="reset">
                            <i className="fas fa-sync bg-danger m-l-1"></i>
                          </button>
                        )}
                        <div className="clearfix"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )} */}


      {pathname === "marketplace" ? (
        <>
          {/* Side Filter menu 
      ==================== */}
          {/* <div id="SidefilterMenu" className="Sidefiltermenu" >
        <div className="Sidefiltermenu-inner">
          <button onClick={(e)=> activeRemove(e)} className="Close-btn Close-filter-btn">
            <i className="fa fa-close"></i>
          </button>
          <h1><i className="fa fa-filter"></i> Filter</h1>
          <AccordionFilter/>
        </div>
      </div> */}
          {/* Side Filter menu 
      ===================== */}
          <section className="container">
            <div className="row">
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
              {isloading ? (
                <>
                  <div className="col-sm-12 d-flex justify-content-center">
                    <RingLoader color="black" size="60" />
                  </div>
                </>
              ) : (
                <>
                  {Marketplaceprodu?.length == 0 ? (
                    <div className="col-sm-12 text-center">
                      No NFT Record Found
                    </div>
                  ) : (
                    ""
                  )}

                  <>
                    {isloading ? (
                      <div className="col-sm-12 d-flex justify-content-center">
                        <RingLoader color="black" size="60" />
                      </div>
                    ) : (
                      <>

                        {marketNfts?.map((nft, index) => (
                          <>
                            {buyNow ? (
                              <>
                                {!nft.isBidOpen && (
                                  <div
                                    key={index}
                                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                                  >
                                    <div className="nft market-nft">
                                      <CustomSlide className="itm" index={1}>
                                        <div className="nft_coll">
                                          <div className="nft_wrap">
                                            <span
                                              className=" pic-demo"
                                              onClick={() => {
                                                history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                              }}
                                            // style={{
                                            //   background: `url(${httpUrl +
                                            //     "/" +
                                            //     nft?.image.replaceAll("\\", "/")
                                            //     }) no-repeat`,
                                            // }}
                                            >
                                              <span className="heart-span"><img src={heart} /> {" "}
                                                {nft?.nftFavouritesCount}</span>
                                              <div className="table-cell">
                                                <div className="table-cell-center">
                                                  <img
                                                    src={httpUrl + "/" + nft?.image}
                                                    className="lazy img-fluid"
                                                    alt=""
                                                  />
                                                </div>
                                              </div>
                                            </span>
                                          </div>
                                          <div className="nft_coll_pp">
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
                                            {/* <i className="fa fa-check"></i> */}
                                          </div>
                                          <div className="nft_coll_info">
                                            <span
                                              onClick={() => {
                                                history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                              }}
                                            >
                                              <h4> {nft?.name}</h4>
                                            </span>
                                            <span
                                              onClick={() => {
                                                history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                              }}
                                            >
                                              Price {" " + nft?.sellPrice + " "}BNB
                                            </span>
                                            <div className="full-div">
                                              <a
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                                className="view-all-btn"
                                              >
                                                Detail{" "}
                                                <i
                                                  className="fa fa-angle-right"
                                                  aria-hidden="true"
                                                ></i>
                                              </a>

                                              {/* <i
                                            onClick={() =>
                                              addToFavourite(
                                                nft?.id,
                                                nft.ownerAddress
                                              )
                                            }
                                            className="fa fa-heart"
                                          ></i> */}

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
                                            </div>
                                          </div>
                                        </div>
                                      </CustomSlide>
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : auction ? (
                              <>
                                {nft.isBidOpen && (
                                  <>
                                    <div
                                      key={index}
                                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                                    >
                                      <div className="nft market-nft">
                                        <CustomSlide className="itm" index={1}>
                                          <div className="nft_coll">
                                            <div className="nft_wrap">
                                              <span
                                                className=" pic-demo"
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              // style={{
                                              //   background: `url(${httpUrl +
                                              //     "/" +
                                              //     nft?.image.replaceAll("\\", "/")
                                              //     }) no-repeat`,
                                              // }}
                                              >
                                                <span className="heart-span"><img src={heart} /> {" "}
                                                  {nft?.nftFavouritesCount}</span>
                                                <div className="table-cell">
                                                  <div className="table-cell-center">
                                                    <img
                                                      src={httpUrl + "/" + nft?.image}
                                                      className="lazy img-fluid"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                              </span>
                                            </div>
                                            <div className="nft_coll_pp">
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
                                              {/* <i className="fa fa-check"></i> */}
                                            </div>
                                            <div className="nft_coll_info">
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              >
                                                <h4> {nft?.name}</h4>
                                              </span>
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              >
                                                Price {" " + nft?.sellPrice + " "}BNB
                                              </span>
                                              <div className="full-div">
                                                <a
                                                  onClick={() => {
                                                    history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                  }}
                                                  className="view-all-btn"
                                                >
                                                  Detail{" "}
                                                  <i
                                                    className="fa fa-angle-right"
                                                    aria-hidden="true"
                                                  ></i>
                                                </a>

                                                {/* <i
                                          onClick={() =>
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress
                                            )
                                          }
                                          className="fa fa-heart"
                                        ></i> */}

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
                                              </div>
                                            </div>
                                          </div>
                                        </CustomSlide>
                                      </div>
                                    </div>

                                  </>
                                )}
                              </>
                            ) : priceCheck ? (
                              <>
                                {priceEnteries.map((nft1, index1) => (
                                  <>
                                    <div
                                      key={index1}
                                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                                    >
                                      {console.log("KEYYY", index)}
                                      <div className="nft market-nft">
                                        <CustomSlide className="itm" index1={1}>
                                          <div className="nft_coll">
                                            <div className="nft_wrap">
                                              <span
                                                className=" pic-demo"
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft1?.id}/${nft1?.accountId}`);
                                                }}
                                              // style={{
                                              //   background: `url(${httpUrl +
                                              //     "/" +
                                              //     nft1?.image.replaceAll("\\", "/")
                                              //     }) no-repeat`,
                                              // }}
                                              >
                                                <span className="heart-span"><img src={heart} /> {" "}
                                                  {nft?.nftFavouritesCount}</span>
                                                <div className="table-cell">
                                                  <div className="table-cell-center">
                                                    <img
                                                      src={httpUrl + "/" + nft1?.image}
                                                      className="lazy img-fluid"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>

                                              </span>
                                            </div>
                                            <div className="nft_coll_pp">
                                              <span
                                                onClick={() => {
                                                  history.push(
                                                    nft1.ownerAddress === WalletAddress
                                                      ? `/myprofile`
                                                      : `/profile/${nft1.ownerAddress}`
                                                  );
                                                }}
                                              >
                                                <img
                                                  className="lazy"
                                                  src={
                                                    nft1?.ownerImage
                                                      ? httpUrl + "/" + nft1?.ownerImage
                                                      : defaultImg
                                                  }
                                                  alt=""
                                                />
                                              </span>
                                              {/* <i className="fa fa-check"></i> */}
                                            </div>
                                            <div className="nft_coll_info">
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft1?.id}/${nft1?.accountId}`);
                                                }}
                                              >

                                                <h4> {nft1?.name ? nft1?.name : 'no title'}</h4>
                                              </span>
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft1?.id}/${nft1?.accountId}`);
                                                }}
                                              >

                                                Price {" " + nft1?.sellPrice ? nft1?.sellPrice : nft1?.buyPrice} BNB
                                              </span>
                                              <div className="full-div">
                                                <a
                                                  onClick={() => {
                                                    history.push(`/usernftdetail/${nft1?.id}/${nft1?.accountId}`);
                                                  }}
                                                  className="view-all-btn"
                                                >
                                                  Detail{" "}
                                                  <i
                                                    className="fa fa-angle-right"
                                                    aria-hidden="true"
                                                  ></i>
                                                </a>

                                                {/* <i
                                          onClick={() =>
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress
                                            )
                                          }
                                          className="fa fa-heart"
                                        ></i> */}

                                                {GetFavouriteNft?.some(
                                                  (item, index1) => {
                                                    return (
                                                      item.nftTokenId == nft1.nftTokenId
                                                    );
                                                  }
                                                ) ? (
                                                  <i
                                                    onClick={() => {
                                                      setFavouriteInProgress(true);

                                                      removeToFavourite(
                                                        nft1.id,
                                                        nft1.ownerAddress,
                                                      );
                                                    }}
                                                    className="fa fa-heart"
                                                    style={{ color: "red" }}
                                                  >
                                                    {" "}
                                                    {nft1?.nftFavouritesCount}
                                                  </i>
                                                ) : (
                                                  <i
                                                    onClick={() => {
                                                      setFavouriteInProgress(true);
                                                      addToFavourite(
                                                        nft1?.id,
                                                        nft1.ownerAddress,
                                                      );
                                                    }}
                                                    className="fa fa-heart"
                                                  >
                                                    {" "}
                                                    {nft1?.nftFavouritesCount}
                                                  </i>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </CustomSlide>
                                      </div>
                                    </div>
                                  </>
                                ))}
                              </>
                            ) : hasbids ? (
                              <>
                                {nft?.hasBids && (
                                  <>
                                    <div
                                      key={index}
                                      className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                                    >
                                      <div className="nft market-nft">
                                        <CustomSlide className="itm" index={1}>
                                          <div className="nft_coll">
                                            <div className="nft_wrap">
                                              <span
                                                className=" pic-demo"
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              // style={{
                                              //   background: `url(${httpUrl +
                                              //     "/" +
                                              //     nft?.image.replaceAll("\\", "/")
                                              //     }) no-repeat`,
                                              // }}
                                              >
                                                <span className="heart-span"><img src={heart} /> {" "}
                                                  {nft?.nftFavouritesCount}</span>
                                                <div className="table-cell">
                                                  <div className="table-cell-center">
                                                    <img
                                                      src={httpUrl + "/" + nft?.image}
                                                      className="lazy img-fluid"
                                                      alt=""
                                                    />
                                                  </div>
                                                </div>
                                              </span>
                                            </div>
                                            <div className="nft_coll_pp">
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
                                              {/* <i className="fa fa-check"></i> */}
                                            </div>
                                            <div className="nft_coll_info">
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              >
                                                <h4> {nft?.name}</h4>
                                              </span>
                                              <span
                                                onClick={() => {
                                                  history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                }}
                                              >
                                                Price {" " + nft?.sellPrice + " "}BNB
                                              </span>
                                              <div className="full-div">
                                                <a
                                                  onClick={() => {
                                                    history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                                  }}
                                                  className="view-all-btn"
                                                >
                                                  Detail{" "}
                                                  <i
                                                    className="fa fa-angle-right"
                                                    aria-hidden="true"
                                                  ></i>
                                                </a>

                                                {/* <i
                                          onClick={() =>
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress
                                            )
                                          }
                                          className="fa fa-heart"
                                        ></i> */}

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
                                              </div>
                                            </div>
                                          </div>
                                        </CustomSlide>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ) : (
                              <div
                                key={index}
                                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                              >
                                <div className="nft">
                                  <CustomSlide className="itm" index={1}>
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

                                          <img
                                            src={httpUrl + "/" + nft?.image}
                                            className="lazy img-fluid"
                                            alt=""
                                          />
                                          <a href="#" className="cart-btn" onClick={() =>
                                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                          }> <i className="fa fa-shopping-cart"></i></a>

                                        </span>
                                      </div>
                                      <div className="nft_coll_pp">
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
                                        {/* <i className="fa fa-check"></i> */}
                                      </div>
                                      <div className="nft_coll_info">
                                        <span className="color-txt">
                                          {nft?.collectionName}
                                        </span>
                                        <span
                                          onClick={() => {
                                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                          }}
                                        >
                                          <h4> {nft?.name}</h4>
                                        </span>
                                        <span
                                          onClick={() => {
                                            history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                          }}
                                        >
                                          Price {" " + nft?.sellPrice + " "}BNB
                                        </span>
                                        <div className="full-div">
                                          <a
                                            onClick={() => {
                                              history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`);
                                            }}
                                            className="view-all-btn"
                                          >
                                            Detail{" "}
                                            <i
                                              className="fa fa-angle-right"
                                              aria-hidden="true"
                                            ></i>
                                          </a>

                                          {/* <i
                                          onClick={() =>
                                            addToFavourite(
                                              nft?.id,
                                              nft.ownerAddress
                                            )
                                          }
                                          className="fa fa-heart"
                                        ></i> */}

                                        </div>
                                      </div>
                                    </div>
                                  </CustomSlide>
                                </div>
                              </div>
                            )}

                          </>
                        ))}
                      </>
                    )}
                    {marketNfts?.length < Marketplaceprodu?.length &&
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

                  {filterData?.length && filterTrigger ? (
                    <>
                      {marketNfts?.length < filterData?.length && (
                        <div className="col-lg-12">
                          <div className="spacer-single"></div>
                          <span
                            onClick={loadMore}
                            className="btn-main lead m-auto"
                          >
                            Load More Filter
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* {marketNfts?.length < Marketplaceprodu?.length &&
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
                    )} */}
                    </>
                  )}
                </>
              )}
            </div>
          </section>


        </>
      ) : (
        <>
          <section className="container ptb-o">

            <div className="row">
              <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 onStep css-keef6k">
                <h2>Best Creators & Sellers</h2>
                <h3 class="style-brder">Best sellers of the week's NFTs</h3>
              </div>
              <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 text-right">
                <a className="viewall-btn" href="#">
                  <span>See More</span></a>
              </div>
              <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 text-right onStep css-keef6k">
              </div>
              <div className="col-lg-12">
                <AuthorList />
              </div>
            </div>
            <div className="spacer-30"></div>

            <div className="row">
              <div className="col-lg-12 col-xl-12 col-sm-12 col-sm-12 onStep css-keef6k text-center">
                <h3 className="style-brder">Featured</h3>
                <h2>Featured Items</h2>
                <p className="text-center">We are a huge marketplace dedicated to connecting great artists of all Superex<br></br> with their fans and unique token collectors!</p>
              </div>
            </div>
          </section>
          <section className="container">
            <div className="row">
              <div className="col-lg-12">
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
                {isloading ? (
                  <>
                    <div className="col-sm-12 d-flex justify-content-center">
                      <RingLoader color="black" size="60" />
                    </div>
                  </>
                ) : (
                  <>
                    {Marketplaceprodu?.length == 0 ? (
                      <div className="col-sm-12 text-center">
                        No NFT Record Found
                      </div>
                    ) : (
                      ""
                    )}
                    <Slider {...settings}>
                      {marketNfts?.map((nft, index) => {
                        return (
                          // nft.isSelled == true && (

                          <div className="nft">
                            <CustomSlide className="itm" index={1}>
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
                                    className="pic-demo"
                                    onClick={() =>
                                      history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                    }
                                  // style={{
                                  //   background: `url(${httpUrl +
                                  //     "/" +
                                  //     nft?.image.replaceAll("\\", "/")
                                  //     }) no-repeat`,
                                  // }}
                                  >

                                    <img
                                      src={httpUrl + "/" + nft?.image}
                                      className="lazy img-fluid"
                                      alt=""
                                    />
                                    <a href="#" className="cart-btn" onClick={() =>
                                      history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                    }> <i className="fa fa-shopping-cart"></i></a>
                                  </span>
                                </div>

                                <div className="nft_coll_info">
                                  {/* <span
                                    onClick={() =>
                                      history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                    }
                                  >
                                    <h4> {nft?.name}</h4>
                                  </span> */}

                                  <span
                                  // onClick={() =>
                                  //   history.push(`/usernftdetail/${nft?.id}/${nft?.accountId}`)
                                  // }

                                  >
                                    <h4> {nft?.name}</h4>
                                    {/* Price {" " + nft?.sellPrice + " "}BNB */}
                                  </span>
                                  <div className="full-div currancy-show">
                                    {" " + nft?.sellPrice + " "} ETH <i></i>
                                  </div>
                                </div>
                              </div>
                            </CustomSlide>
                          </div>
                        );
                        // );
                      })}
                    </Slider>
                    <div className="spacer-30"></div>


                    <div class="spacer-single"></div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 onStep css-keef6k">
                        <h2>Hot Products</h2>
                        <h3 className="style-brder">Products</h3>
                      </div>

                      <div className="col-lg-6 col-xl-6 col-sm-6 col-sm-6 text-right">
                        {/* <NavLink to="/marketplace">
                      <a
                        href="javascript:void(0);"
                        className="view-all-btn"
                        onClick={() => history.push(`/marketplace`)}
                      >
                        See More <i className="fa fa-angle-right"></i>
                      </a>
                    </NavLink> */}
                        <a className="viewall-btn" href="#">

                          <span>See More</span></a>
                      </div>
                      <div className="sapcer-10"></div>
                    </div>

                    {colLoading ? (
                      <div className="col-sm-12 d-flex justify-content-center">
                        <RingLoader color="black" size="60" />
                      </div>
                    ) : (
                      <>
                        <Slider {...settings}>
                          {hotcollection?.map((nft, index) => (
                            <div className="nft nft-payen">
                              <CustomSlide className="itm" index={1}>
                                <div className="nft_coll">
                                  <div className="nft_wrap">
                                    <span
                                      className="pic-demo"
                                      onClick={() =>
                                        history.push(
                                          `/nftsbycollections/${nft?.collectionId}`
                                        )
                                      }>
                                      <i className="fa fa-check"></i>
                                      <div className="table-cell">
                                        <div className="table-cell-center">
                                          <img
                                            src={httpUrl + "/" + nft?.bannerImage}
                                            className="lazy img-fluid"
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </span>
                                  </div>
                                  <div className="nft_coll_pp">
                                    <span
                                      onClick={() =>
                                        history.push(
                                          `/nftsbycollections/${nft?.collectionId}`
                                        )
                                      }
                                    >
                                      <img
                                        className="lazy"
                                        src={nft?.logoImage ? httpUrl + "/" + nft?.logoImage : defaultImg}
                                        alt=""
                                      />
                                    </span>
                                  </div>
                                  <div className="nft_coll_info">
                                    <span
                                      onClick={() =>
                                        history.push(
                                          `/nftsbycollections/${nft?.collectionId}`
                                        )
                                      }
                                    >
                                      <h4> {nft?.collectionName.length > 15 ? nft?.collectionName.slice(0, 14) + '...' : nft?.collectionName}</h4>
                                    </span>

                                    <div className="full-div">
                                      <ul className="owner-item-list">
                                        <li>
                                          <span>
                                            <b>12</b>
                                            Owners
                                          </span>
                                        </li>

                                        <li>
                                          <span>
                                            <b>100</b>
                                            Items
                                          </span>
                                        </li>

                                        <li>
                                          <span>
                                            <b> 2.5K</b>
                                            Sold
                                          </span>
                                        </li>
                                      </ul>
                                      {/* <a
                                        onClick={() =>
                                          history.push(
                                            `/nftsbycollections/${nft?.collectionId}`
                                          )
                                        }
                                        className="view-all-btn"
                                      >
                                        Detail{" "}
                                        <i
                                          className="fa fa-angle-right"
                                          aria-hidden="true"
                                        ></i>
                                      </a> */}
                                      <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius nisi vitae lectus fermentum, non facilisis nibh fringilla. Ut vulputate iaculis lacus, a iaculis orci tristique eu. Nulla interdum quam sit amet convallis bibendum. Aliquam cursus interdum rhoncus. Nulla tincidunt cursus tempus. Pellentesque nisl velit,
                                      </p>
                                      {/* <i
                                      onClick={() =>
                                        addToFavourite(
                                          nft?.id,
                                          nft.ownerAddress
                                        )
                                      }
                                      className="fa fa-heart"
                                    ></i> */}
                                    </div>
                                  </div>
                                </div>
                              </CustomSlide>
                            </div>

                            // );
                          ))}
                        </Slider>
                      </>
                    )}

                    {/* {routee && (
                  
                  <Redirect to="/marketplace" />
                  
                )} */}

                    {filterData?.length && filterTrigger ? (
                      <>
                        {marketNfts?.length < filterData?.length && (
                          <div className="col-lg-12">
                            <div className="spacer-single"></div>
                            <span
                              onClick={loadMore}
                              className="btn-main lead m-auto"
                            >
                              Load More Filter
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {/* {marketNfts?.length < Marketplaceprodu?.length &&
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
                    )} */}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>

        </>
      )}
    </>
  );
}

export default MarketNfts;
