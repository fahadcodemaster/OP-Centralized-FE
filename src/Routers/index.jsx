import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  PAGE_settings_PATH,
  PAGE_Myprofile_PATH,
  PAGE_Home_PATH,
  PAGE_Market_PATH,
  PAGE_Helpcenter_PATH,
  PAGE_Rangking_PATH,
  PAGE_ItemDetail_PATH,
  PAGE_Author_PATH,
  PAGE_Wallet_PATH,
  PAGE_Login_PATH,
  PAGE_Works_PATH,
  PAGE_News_PATH,
  PAGE_Create_PATH,
  PAGE_Activity_PATH,
  PAGE_Contact_PATH,
  PAGE_UserNftdetails_PATH,
  // PAGE_MyNftDetails_PATH,
  PAGE_AddCollection_PATH,
  PAGE_Collections_PATH,
  PAGE_NftByCollectionsId_PATH,
  PAGE_EditNft_PATH,
  PAGE_AddCollectionEdit_PATH,
  PAGE_FAQ_PATH,
  PAGE_Stake_PATH,
  PAGE_Privacy_PATH,
  PAGE_Terms_PATH,
  PAGE_Userguide_PATH,
  PAGE_Blog_PATH,
  PAGE_BlogDetail_PATH  
} from "./Routes";

import ScrollToTopBtn from "../components/menu/ScrollToTop";
import Header from "../components/menu/header";
import Home from "../components/pages/home";
import MarketPlaceProducts from "../components/pages/MarketPlace/MarketPlaceProducts";
import Helpcenter from "../components/pages/helpcenter";
import Rangking from "../components/pages/rangking";
import Collections from "../components/pages/Collections";
import ItemDetail from "../components/pages/ItemDetail";
import UserProfile from "../components/pages/UserProfile";
import Wallet from "../components/pages/wallet";
import ConnectWallet from "../components/pages/ConnectWallet";
import Works from "../components/pages/works";
import News from "../components/pages/news";
import Create from "../components/pages/CreateNFT";
import Activity from "../components/pages/activity";
import Contact from "../components/pages/contact";
import MyProfile from "../components/pages/MyProfile";
import ProfileSettings from "../components/pages/ProfileSettings";
import MyItemDetails from "../components/pages/MyNfts/MyNftDetail/MyItemDetails";
import UserNftDetails from "../components/pages/UserNft/UserNftDetails/UserNftDetails";
import AddCollection from "../components/pages/AddCollection";
import FAQ from "../components/pages/Faq";
import Stake from "../components/pages/AddStake";
import Privacy from "../components/pages/privacy-policy";
import Terms from "../components/pages/terms";
import Userguide from "../components/pages/userguide";
import Blog from "../components/pages/blog";
import BlogDetail from "../components/pages/BlogDetail";


import AllNftsByCollectionsId from "../components/pages/AllNftsByCollectionsId";
// export const ScrollTop = ({ children, location }) => {
//   React.useEffect(() => window.scrollTo(0, 0), [location]);
//   return children;
// };

// const PosedRouter = ({ children }) => (
//   <Location>
//     {({ location }) => (
//       <div id="routerhang">
//         <div key={location.key}>
//           <Route location={location}>{children}</Route>
//         </div>
//       </div>
//     )}
//   </Location>
//);
function Router() {
  var isUserLogedIn = false;

  const User = useSelector((state) => state.Login);

  if (
    User.authResponse &&
    User.authResponse.data &&
    User.authResponse?.data?.token
  ) {
    isUserLogedIn = true;
  } else {
    isUserLogedIn = false;
  }

  function PrivateRoute({ component: Component, authed, ...rest }) {
    const User = useSelector((state) => state.Login);

    // console.log(
    //   User.authResponse,
    //   User.authResponse.data,
    //   User.authResponse?.data?.token
    // );

    return (
      <Route
        exact
        {...rest}
        render={(props) =>
          User.authResponse &&
            User.authResponse.data &&
            User.authResponse?.data?.token ? (
            <Component {...props} />
          ) : (
            <>
              {console.log("Redirection Hit")}

              <Redirect to={"/connectwallet"} />
            </>
          )
        }
      />
    );
  }

  return (
    <>
      <ScrollToTopBtn />
      <Header />
      <Switch>
        <Route
          exact
          path={PAGE_Home_PATH}
          component={Home}
          key={PAGE_Home_PATH}
        />
        <Route
          exact
          path={PAGE_Market_PATH}
          component={MarketPlaceProducts}
          key={PAGE_Market_PATH}
        />
        <Route
          exact
          path={PAGE_Helpcenter_PATH}
          component={Helpcenter}
          key={PAGE_Helpcenter_PATH}
        />
        <Route
          exact
          path={PAGE_Rangking_PATH}
          component={Rangking}
          key={PAGE_Rangking_PATH}
        />
        <Route
          exact
          path={PAGE_Stake_PATH}
          component={Stake}
          key={PAGE_Stake_PATH}
        />

        <Route
          exact
          path={PAGE_Privacy_PATH}
          component={Privacy}
          key={PAGE_Privacy_PATH}
        />
        <Route
          exact
          path={PAGE_Blog_PATH}
          component={Blog}
          key={PAGE_Blog_PATH}
        />
        <Route
          exact
          path={PAGE_BlogDetail_PATH}
          component={BlogDetail}
          key={PAGE_BlogDetail_PATH}
        />
        <Route
          exact
          path={PAGE_Terms_PATH}
          component={Terms}
          key={PAGE_Terms_PATH}
        />
        <Route
          exact
          path={PAGE_Userguide_PATH}
          component={Userguide}
          key={PAGE_Userguide_PATH}
        />
        <Route
          authed={isUserLogedIn}
          exact
          path={PAGE_Collections_PATH}
          component={Collections}
          key={PAGE_Collections_PATH}
        />
        <PrivateRoute
          exact
          path={PAGE_AddCollection_PATH}
          component={AddCollection}
          key={PAGE_AddCollection_PATH}
        />

        <PrivateRoute
          exact
          path={PAGE_AddCollectionEdit_PATH}
          component={AddCollection}
          key={PAGE_AddCollectionEdit_PATH}
        />

        {/* <Route
          exact
          path={PAGE_MyNftDetails_PATH}
          component={UserNftDetails}
          key={PAGE_MyNftDetails_PATH}
        /> */}
        <Route
          authed={isUserLogedIn}
          exact
          path={PAGE_NftByCollectionsId_PATH}
          component={AllNftsByCollectionsId}
          key={PAGE_NftByCollectionsId_PATH}
        />
        <Route
          exact
          path={PAGE_UserNftdetails_PATH}
          component={UserNftDetails}
          key={PAGE_UserNftdetails_PATH}
        />
        <Route
          exact
          path={PAGE_ItemDetail_PATH}
          component={ItemDetail}
          key={PAGE_ItemDetail_PATH}
        />
        <Route
          exact
          path={PAGE_Author_PATH}
          component={UserProfile}
          key={PAGE_Author_PATH}
        />
        <Route
          exact
          path={PAGE_Wallet_PATH}
          component={Wallet}
          key={PAGE_Wallet_PATH}
        />
        <Route
          exact
          path={PAGE_Login_PATH}
          component={ConnectWallet}
          key={PAGE_Login_PATH}
        />
        <Route exact path={PAGE_FAQ_PATH} component={FAQ} key={PAGE_FAQ_PATH} />
        <Route
          exact
          path={PAGE_Works_PATH}
          component={Works}
          key={PAGE_Works_PATH}
        />
        <Route
          exact
          path={PAGE_News_PATH}
          component={News}
          key={PAGE_News_PATH}
        />
        <PrivateRoute
          authed={isUserLogedIn}
          exact
          path={PAGE_Create_PATH}
          component={Create}
          key={PAGE_Create_PATH}
        />

        <PrivateRoute
          authed={isUserLogedIn}
          exact
          path={PAGE_EditNft_PATH}
          component={Create}
          key={PAGE_EditNft_PATH}
        />
        <Route
          exact
          path={PAGE_Activity_PATH}
          component={Activity}
          key={PAGE_Activity_PATH}
        />
        <Route
          exact
          path={PAGE_Contact_PATH}
          component={Contact}
          key={PAGE_Contact_PATH}
        />
        <PrivateRoute
          authed={isUserLogedIn}
          exact
          path={PAGE_Myprofile_PATH}
          component={MyProfile}
          key={PAGE_Myprofile_PATH}
        />
        <PrivateRoute
          authed={isUserLogedIn}
          exact
          path={PAGE_settings_PATH}
          component={ProfileSettings}
          key={PAGE_settings_PATH}
        />
      </Switch>
    </>
  );
}

export default Router;
