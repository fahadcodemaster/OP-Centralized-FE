import { useEffect } from "react";
import "./App.css";
import Routers from "./Routers/index";
import MyProfileAction, {
  MyProfileRequest,
} from "./Redux/Actions/Account/MyProfileAction";
import GetMyAllNftsAction from "./Redux/Actions/NftActions/GetMyAllNftsAction";
import GetNftMarketAction from "./Redux/Actions/NftActions/GetNftMarketAction";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import http from "./Redux/Api/http";
import GetMyAllCollectionsAction from "./Redux/Actions/CollectionAction/GetMyAllCollections";
import GetAllBlockChainAction from "./Redux/Actions/Blockchain/GetAllBlockChainAction";
import GetAllCurrencyAction from "./Redux/Actions/CurrencyAction/GetAllCurrencyAction";
import { WalletDisconnect } from "./Redux/Actions/WalletActions/WalletAction";
import { ValidateSignatureRequest } from "./Redux/Actions/AuthActions/ValidateSignatureAction";

import localforage from "localforage";
import { AuthConnectRequest } from "./Redux/Actions/AuthActions/AuthConnectAction";
import { useHistory } from "react-router";
import GetNftCollectionCategoriesAction from "./Redux/Actions/CategoriesAction/GetNftCollectionCategoriesAction";
function App() {
  const isConnected = useSelector((state) => state.Login?.authResponse?.data);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    http.setAuthorizationHeader(isConnected?.token);
    setTimeout(async () => {
      await dispatch(GetAllBlockChainAction());
      await dispatch(GetNftCollectionCategoriesAction());
      await dispatch(MyProfileAction())
        .then((res) => {})
        .catch((error) => {
          // if (error.message == "Invalid jwt token") {
          dispatch(MyProfileRequest());
          dispatch(WalletDisconnect());
          dispatch(ValidateSignatureRequest());
          dispatch(AuthConnectRequest());
          localforage.clear();
          localStorage.clear();
          console.clear();
          console.log(error);
          // history.push("/");
          // }
        });

      if (isConnected) {
        await dispatch(GetMyAllNftsAction());
        // await dispatch(GetNftMarketAction());
        await dispatch(GetMyAllCollectionsAction());
      }
      await dispatch(GetAllCurrencyAction());
    }, 2000);
  }, [isConnected]);
  useEffect(() => {
    const CompData = () => {
      // setTimeout(async () => {
      //   await dispatch(MyProfileAction());
      //   await dispatch(GetMyAllNftsAction());
      //   await dispatch(GetNftMarketAction());
      // }, 1000);
    };
    CompData();
  }, [isConnected, dispatch]);

  return <Routers />;
}

export default App;
