import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import GetMyAllCollectionsAction from "../../Redux/Actions/CollectionAction/GetMyAllCollections";
import { useDispatch, useSelector } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router";
import MyCollections from "./MyCollections";
import defaultImg from "../../assets/images/default.png";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Collections = function () {
  const dispatch = useDispatch();

  const history = useHistory();

  const allMyCollections = useSelector(
    (state) => state.GetMyAllCollections?.GetAllMyCollectionsResponse?.data
  );
  const [isloading, setIsloading] = useState(true);

  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
  );
  const data = useSelector((state) => state);
  const [allCollectionsState, setAllCollectionsState] = useState([]);
  const [height, Setheight] = useState(270);
  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;

  useEffect(() => {
    if (allMyCollections && allMyCollections.length > 0) {
      setAllCollectionsState(allMyCollections?.slice(0, 8));
    }
  }, [allMyCollections]);

  useEffect(async () => {
    await dispatch(GetMyAllCollectionsAction())
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
    let collectionsState = allCollectionsState;
    let start = collectionsState?.length;
    let end = collectionsState?.length + 8;
    setAllCollectionsState([
      ...collectionsState,
      ...allMyCollections.slice(start, end),
    ]);
  };

  const onImgLoad = ({ target: img }) => {
    let currentHeight = height;
    if (currentHeight < img.offsetHeight) {
      Setheight({
        height: img.offsetHeight,
      });
    }
  };

  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
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
        style={{ backgroundImage: `url(${"./images/background/4.jpg"})` }}
      >
        <div className="small-pnl secnd-anime"></div>
        <div className="mainbreadcumb"></div>
      </section>

      <section className="container d_coll no-top no-bottom">
        <div className="row">
          <div className="col-md-12">
            <div className="d_profile cntr">
              <div className="profile_avatar">
                <div className="d_profile_img">
                  <img
                    src={MyProfile?.profileImage ? httpUrl + "/" + MyProfile?.profileImage : defaultImg}
                    alt=""
                    style={{ height: 150, width: 150 }}
                  />
                  {/* <i className="fa fa-check"></i> */}
                </div>

                <div className="profile_name">
                  <h4>
                    {MyProfile?.username}
                    <div className="clearfix"></div>
                    <span id="wallet" className="profile_wallet">
                      {WalletAddress}{" "}
                    </span>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(WalletAddress);
                        toast.success("Address copied successfully", {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                      id="btn_copy"
                      title="Copy Address"
                    >
                      Copy
                    </button>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MyCollections />
      <Footer />
    </div>
  );
};
export default Collections;
