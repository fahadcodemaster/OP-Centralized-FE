import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import GetMyAllCollectionsAction from "../../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { toast, ToastContainer } from "react-toastify";
import { PropagateLoader, RingLoader } from "react-spinners";
const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

const MyCollections = () => {
  const myAllCollectionsState = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const [isloading, setIsloading] = useState(true);

  console.log("myAllCollectionsState", myAllCollectionsState);
  const dispatch = useDispatch();
  const searchRef = useRef();
  const [allData, setAllData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [filter, setfilter] = useState([]);
  const [filterTrigger, setFilterTrigger] = useState(false);

  const [myAllCollections, SetMyAllCollections] = useState(
    myAllCollectionsState?.slice(0, 8)
  );
  const [height, Setheight] = useState(270);
  const [route, setRoute] = useState("");
  const history = useHistory();

  useEffect(() => {
    let route = window.location.pathname;
    setRoute(route);
    SetMyAllCollections(myAllCollectionsState?.slice(0, 8));
    setAllData(myAllCollectionsState);
  }, [myAllCollectionsState]);

  useEffect(() => {
    collectionsGet()
  }, []);

  const collectionsGet = async () => {
    await dispatch(GetMyAllCollectionsAction())
      .then((res) => {
        setIsloading(false);
      })
      .catch((error) => {
        console.log('objectttttttttttttttt', error);
        collectionsGet()
        setIsloading(false);
      });
  }

  const loadMore = () => {
    let collectionState = myAllCollectionsState;
    let start = collectionState?.length;
    let end = collectionState?.length + 8;
    SetMyAllCollections([
      ...collectionState,
      ...myAllCollectionsState?.slice(start, end),
    ]);
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
    SetMyAllCollections(allData?.slice(0, 8));
    setfilter([]);
    setFilterTrigger(false);
    searchRef.current.value = "";
  };
  const handlerSearchSubmit = (e) => {
    e.preventDefault();
    setFilterTrigger(true);
    SetMyAllCollections(filter?.slice(0, 8));
    setFilterData(filter);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12">
            <div className="items_filter w-100">
              {route == "/collections" ? (
                <div className="d-flex justify-content-center">
                  <Link className="sell-item-btn spc" to="/addcollection">
                    Add collection
                  </Link>
                </div>
              ) : (
                <></>
              )}
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
        </div>
        {/* </div> */}
      </div>

      <div className="container">
        <div className="row w-100">
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
              {myAllCollectionsState?.length == 0 ? (
                <div className="col-sm-12 text-center">
                  No Collections Record Found
                </div>
              ) : (
                ""
              )}

              {myAllCollections?.map((collections, index) => (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4"
                  onClick={() => {
                    history.push(`/nftsbycollections/${collections.id}`);
                  }}
                >
                  <div className="nft__item m-0">
                    <div className="author_list_pp">
                      <span
                        onClick={() =>
                          window.open(collections.authorLink, "_self")
                        }
                      >
                        <img
                          className="lazy"
                          src={httpUrl + "/" + collections?.logoImage}
                          alt=""
                        />
                        {/* <i className="fa fa-check"></i> */}
                      </span>
                    </div>
                    <div className="nft__item_wrap">
                      <span className="nft__item_wrap">
                        <img
                          onLoad={onImgLoad}
                          src={httpUrl + "/" + collections?.featuredImage}
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
                    <div className="nft__item_info">
                      <span
                        onClick={() =>
                          window.open(collections.nftLink, "_self")
                        }
                      >
                        <h4 className="mb-3">{collections?.name.length > 10 ? collections?.name.slice(0, 9) + '...' : collections?.name}</h4>
                      </span>
                      <div className="nft__item_price">
                        {/* {collections.sellPrice} */}
                        {/* <span>ETH</span> */}
                      </div>
                      {/* {nft.staus !== "ForSale" && (
                <SellNftToMarket nftIdd={nft.id} pricee={nft.sellPrice} />
              )} */}

                      {/* <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{collections.likes}</span>
              </div> */}
                    </div>
                  </div>
                </div>
              ))}

              {filterData?.length && filterTrigger ? (
                <>
                  {myAllCollections?.length < filterData?.length && (
                    <div className="col-lg-12">
                      <div className="spacer-single"></div>
                      <span onClick={loadMore} className="btn-main lead m-auto">
                        Load More Filter
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {myAllCollections?.length < myAllCollectionsState?.length &&
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
        <div className="spacer-double"></div>
      </div>
    </>
  );
};

export default MyCollections;
