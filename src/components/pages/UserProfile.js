import React, { useEffect, useState } from "react";
import ColumnZero from "../components/ColumnZero";
import ColumnZeroTwo from "../components/ColumnZeroTwo";
import ColumnZeroThree from "../components/ColumnZeroThree";
import Footer from "../components/footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import defaultImg from "../../assets/images/default.png";

import UserNfts from "./UserNft/UserNfts";
import OnSaleUserNfts from "./UserNft/OnSaleUserNfts";
import UserFavNft from "./UserNft/UserFavNft";
import { useDispatch, useSelector } from "react-redux";
import http from "../../Redux/Api/http";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { createGlobalStyle } from "styled-components";
import { conforms } from "lodash";
import { useHistory } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const UserProfile = function () {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [userData, setUserData] = useState();
  const [itemsCounter, setItemsCounter] = useState();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    let params = window.location.pathname;
    setAddress(params.split("/")[2]);
    await http
      .get(
        httpUrl +
          `/api/v1/Account/GetUserAccount?address=${params.split("/")[2]}`
      )
      .then((res) => {
        console.log(res.data);
        setItemsCounter(res.data.data.nftRequestModelList.length);
        setUserData(res.data.data.accountViewModel);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const [openMenu2, setOpenMenu2] = React.useState(false);
  const handleBtnClick = () => {
    setOpenMenu(!openMenu);
    setOpenMenu1(false);
    setOpenMenu2(false);
    document.getElementById("Mainbtn").classList.add("active");
    document.getElementById("Mainbtn1").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
    setOpenMenu(false);
    document.getElementById("Mainbtn1").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn2").classList.remove("active");
  };
  const handleBtnClick2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu(false);
    setOpenMenu1(false);
    document.getElementById("Mainbtn2").classList.add("active");
    document.getElementById("Mainbtn").classList.remove("active");
    document.getElementById("Mainbtn1").classList.remove("active");
  };
  // const copyAddress = async () => {
  //   await navigator.clipboard.writeText(address);
  //   toast.success("Address copied successfully", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  return (
    <div>
      {loading ? (
        <PulseLoader color="white" size="11" />
      ) : (
        <>
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

          <section className="container no-bottom">
            <div className="spacer-double"></div>
            <div className="row">
              <div className="col-md-12 ">
                <div className="userprofile_logo_header other-prfle">
                  <div className="profile_avatar">
                    <div className="d_userprofile_img">
                      <img
                        src={
                          userData?.profileImage
                            ? httpUrl + "/" + userData?.profileImage
                            : defaultImg
                        }
                        alt=""
                        style={{ height: 150, width: 150 }}
                      />
                    </div>

                    <div className="profile_name">
                      <h4>
                        <span>{userData?.username ? userData?.username.length > 15 ? userData?.username.slice(0,14): userData?.username: 'Unnamed'}</span>
                        {/* <span style={{ fontSize: 14, verticalAlign: "bottom" }}>
                          <i
                            className="fa fa-check fa-xs"
                            style={{
                              position: "unset",
                              margin: 0,
                              display: "unset",
                              marginLeft: 4,
                            }}
                          ></i>
                        </span> */}
                        <div className="clearfix"></div>
                      </h4>
                      <span id="wallet" className="profile_wallet">
                        {address}
                      </span>
                      <CopyToClipboard
                        text={address}
                        onCopy={() => {
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
                      >
                        <button id="btn_copy" title="Copy Address">
                          Copy
                        </button>
                      </CopyToClipboard>
                      <span className="profile_username text-dark">
                        {/* <ReactReadMoreReadLess
                          charLimit={50}
                          
                          readMoreText={"Read more ▼"}
                          readLessText={"Read less ▲"}
                          readMoreStyle={{color: 'blue'}}
                          readLessStyle={{color: 'blue'}}
                      >
                              {userData?.bio}
                              
                          </ReactReadMoreReadLess> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="spacer-double"></div>
              {/* <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img
                        src={`${httpUrl}/${userData?.profileImage}`}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {userData?.username}
                          <span className="profile_username">
                            @{userData?.username}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {address}
                          </span>
                          <button
                            onClick={() => copyAddress()}
                            id="btn_copy"
                            title="Copy Address"
                          >
                            Copy
                          </button>
                          <span className="profile_username">
                            Description:{" "}
                            <span style={{ color: "black" }}>
                              {userData?.bio}
                            </span>
                          </span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                       <div className="profile_follower">500 followers</div> 
                    </div>
                    <div className="de-flex-col">
                      <span className="btn-main">Follow</span>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <span className="d-flex justify-content-center">
              <span>Total Items: {itemsCounter ? itemsCounter : 0}</span>
            </span>
            <br></br>
          </section>

          <section className="container no-top">
            <div className="row">
              <div className="col-lg-12">
                <div className="items_filter">
                  <ul className="d-flex justify-content-center de_nav text-left">
                    <li id="Mainbtn" className="active">
                      <span onClick={handleBtnClick}>On Sale</span>
                    </li>
                    <li id="Mainbtn1" className="">
                      <span onClick={handleBtnClick1}>NFTs</span>
                    </li>
                    <li id="Mainbtn2" className="">
                      <span onClick={handleBtnClick2}>Liked</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {openMenu && (
              <div id="zero1" className="onStep fadeIn">
                <OnSaleUserNfts />
              </div>
            )}
            {openMenu1 && (
              <div id="zero2" className="onStep fadeIn">
                <UserNfts />
              </div>
            )}
            {openMenu2 && (
              <div id="zero3" className="onStep fadeIn">
                <UserFavNft />
              </div>
            )}
          </section>

          <Footer />
        </>
      )}
    </div>
  );
};
export default UserProfile;
