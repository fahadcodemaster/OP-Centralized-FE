import React, { useEffect, useState, useRef } from "react";

import { Link, useHistory, useParams } from "react-router-dom";
import { PropagateLoader, RingLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import GetUserFavouriteNftAction from "../../../Redux/Actions/NftActions/GetUserFavouriteNftAction";
import axios from "axios";
import http from "../../../Redux/Api/http";
import RemoveFavouriteNftAction from "../../../Redux/Actions/NftActions/RemoveFavouriteNftAction";
import GetFavouriteNftAction from "../../../Redux/Actions/NftActions/GetFavouriteNftAction";
import swal from "sweetalert";
import defaultImg from "../../../assets/images/default.png";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

function UserFavNft() {
  const history = useHistory();
  const { id } = useParams()
  const [isloading, setIsloading] = useState(true);

  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [favData, setFavData] = useState();
  const [favLoader, setFavLoader] = useState(true);
  const [filterTrigger, setFilterTrigger] = useState(false);
  const [numItems, setNumItems] = useState(4)
  const [favouriteInProgress, setFavouriteInProgress] = useState(false);


  const [filter, setfilter] = useState([]);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);

  const GetFavouriteNft = useSelector(
    (state) => state.GetFavouriteNft?.GetFavouriteNftResponse?.data
  );
  const test = useSelector(
    (state) => state
  );

  const [favourites, SetFavourites] = useState(GetFavouriteNft?.slice(0, 8));
  const [height, Setheight] = useState(270);

  useEffect(()=>{
    getFavNfts()
  }, [])

  useEffect(async ()=>{
    if (isConnected) {
      await dispatch(GetFavouriteNftAction());
    }
  },[])

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

  const getFavNfts = async() =>{
    await http
        .get(httpUrl + `/api/v1/Nft/GetUserFavouriteNft?Address=${id}`)
        .then((res) => {
          console.log("USERRRR FAVV", res);
          setFavData(res.data.data)
          setFavLoader(false)
        })
  }

  useEffect(() => {
    console.log("GetFavouriteNft", test);
    SetFavourites(GetFavouriteNft?.slice(0, 8));
    setAllData(GetFavouriteNft);
  }, [GetFavouriteNft]);

  useEffect(async () => {
    await dispatch(GetUserFavouriteNftAction())
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
  }, []);

  const loadMore = () => {
    if(favData?.length > numItems){
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
        height: img?.offsetHeight,
      });
    }
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setfilter(
      allData?.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const resetFilter = () => {
    SetFavourites(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);

    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);

    SetFavourites(filter?.slice(0, 8));
    setFilterData(filter);
  };

  // const removeToFavourite = async (nftId, OwnerAddress) => {
  //   const payload = {
  //     nftId: nftId,
  //     nftAddress: OwnerAddress,
  //   };

  //   await dispatch(RemoveFavouriteNftAction(payload))
  //     .then(async (resp) => {
  //       if (resp?.isSuccess === true) {
  //         toast.success(`${resp?.data}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         await dispatch(GetUserFavouriteNftAction());
  //         // setTimeout(() => window.location.reload(), 2000);
  //       } else if (resp?.data?.isSuccess === false) {
  //         toast.error(`${resp?.data?.data}`, {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       swal({
  //         icon: "error",
  //         title: error?.data?.message,
  //       });
  //     });
  // };

  return (
    <>
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
                {/* <input
                  className="form-control"
                  id="name_1"
                  name="name_1"
                  ref={searchRef}
                  placeholder="search item here..."
                  type="text"
                  onChange={(e) => handleSearchChange(e)}
                  style={{ width: "100%" }}
                /> */}
                {/* <button id="btn-submit">
                  <i className="fa fa-search bg-color-secondary"></i>
                </button> */}
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
      </div>
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
        {favLoader ? (
          <>
            <div className="col-sm-12 d-flex justify-content-center">
              <RingLoader color="black" size="60" />
            </div>
          </>
        ) : (
          <>
            {favData?.length == 0 ? (
              <div className="col-sm-12 text-center">No NFT Record Found</div>
            ) : (
              ""
            )}

            {favData?.slice(0, numItems).map((nft, index) => (
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
                      className="d-flex flex-column"
                    >
                      <p
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          history.push(
                            `/nftsbycollections/${nft?.collectionId}`
                          );
                        }}
                      >
                        {nft?.collectionName?.length > 15 ? nft?.collectionName.slice(0, 14)+'...': nft?.collectionName}
                      </p>
                      <h4>{nft?.name.length > 10 ? nft?.name.slice(0, 9)+'...': nft?.name}</h4>
                      
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
            ))}

            {favData?.length > numItems && (
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
    </>
  );
}

export default UserFavNft;
