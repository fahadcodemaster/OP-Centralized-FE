import localForage from "localforage";
import { persistReducer } from "redux-persist";
import WalletConnectreducer from "./WalletReducers/ConnectWalletReducer";
import AuthConnect from "./AuthReducers/AuthConnectReducer";
import ValidateSignature from "./AuthReducers/ValidateSignatureReducer";
import Logout from "./AuthReducers/LogoutReducer";
import AddNft from "./NftReducers/AddNftReducer";
import SellNftMarket from "./NftReducers/SellNftMarketReducer";
import GetProfile from "./AccountReducers/GetProfileReducer";
import UpdateProfile from "./AccountReducers/UpdateProfileReducer";
import BuyNftMarket from "./NftReducers/BuyNftMarketReducer";
import MyProfile from "./AccountReducers/MyProfileReducer";
import GetUserAccount from "./AccountReducers/GetUserAccountReducer";
import GetNftHistory from "./NftReducers/GetNftHistoryReducer";
import GetNftMarket from "./NftReducers/GetNftMarketReducer";
import GetNftMarketById from "./NftReducers/GetNftMarketByIdReducer";
import GetMyAllNfts from "./NftReducers/GetMyAllNftsReducer";
import AddFavouriteNft from "./NftReducers/AddFavouriteNftReducer";
import RemoveFavouriteNft from "./NftReducers/RemoveFavouriteNftReducer";
import GetMyAllCollections from "./CollectionReducers/GetMyAllCollections";
import GetMyNftById from "./NftReducers/GetMyNftByIdReducer";
import GetAllNftsByCollectionId from "./NftReducers/GetAllNftsByCollectionIdReducer";
import GetAllBlockChain from "./Blockchain/GetAllBlockChainReducer";
import GetAllCurrency from "./GetAllCurrencyReducers/GetAllCurrencyReducer";
import GetFavouriteNft from "./NftReducers/GetFavouriteNftReducer";
import GetNftCollectionById from "./CollectionReducers/GetNftCollectionByIdReducer";
import GetNftCollectionCategories from "./CategoriesReducers/GetNftCollectionCategoriesReducer";
import GetNftCollectionByIdWithOutAccount from "./NftReducers/GetNftCollectionByIdWithOutAccountReducer";
import getStaking from "./stake_reducers/getStakingReducer";
import getStakingHistory from "./stake_reducers/getStakingHistoryReducer";

const loginConfig = {
  key: "login",
  storage: localForage,
};
const WalletConnctionConfig = {
  key: "WalletConnction",
  storage: localForage,
};

const AuthConnectConfig = {
  key: "AuthConnect",
  storage: localForage,
};

const reducers = {
  // Wallet Reducers
  WalletConnction: persistReducer(WalletConnctionConfig, WalletConnectreducer),
  // Auth Reducers
  AuthConnect: persistReducer(AuthConnectConfig, AuthConnect),
  Login: persistReducer(loginConfig, ValidateSignature),
  Logout,
  // Accounts Reducers
  MyProfile,
  GetProfile,
  GetUserAccount,
  UpdateProfile,
  // NFT Reducers
  AddNft,
  BuyNftMarket,
  GetNftHistory,
  GetNftMarket,
  SellNftMarket,
  GetNftMarketById,
  GetMyAllNfts,
  GetMyNftById,
  AddFavouriteNft,
  RemoveFavouriteNft,
  GetFavouriteNft,
  GetMyAllCollections,
  GetAllNftsByCollectionId,
  GetNftCollectionById,
  GetNftCollectionByIdWithOutAccount,
  GetNftCollectionCategories,
  GetAllBlockChain,
  GetAllCurrency,
  getStaking,
  getStakingHistory
};

export default reducers;
