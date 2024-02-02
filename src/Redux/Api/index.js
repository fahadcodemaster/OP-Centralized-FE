import AuthConnect from "./AuthApis/AuthConnectApi";
import ValidateSignature from "./AuthApis/ValidateSignatureApi";
import Logout from "./AuthApis/LogoutApi";
import UpdateProfile from "./AccountsApis/UpdateProfileApi";
import GetProfile from "./AccountsApis/GetProfileApi";
import GetUserAccount from "./AccountsApis/GetUserAccount";
import SellNftMarket from "./NftApis/SellNftMarketApi";
import BuyNftMarket from "./NftApis/BuyNftMarketApi";
import GetNftHistory from "./NftApis/GetNftHistoryApi";
import GetNftMarket from "./NftApis/GetNftMarketApi";
import GetNftMarketById from "./NftApis/GetNftMarketByIdApi";
import GetMyAllNfts from "./NftApis/GetMyAllNftsApi";
import AddFavouriteNft from "./NftApis/AddFavouriteNftApi";
import GetFavouriteNft from "./NftApis/GetFavouriteNftApi";
import GetUserFavouriteNft from "./NftApis/GetUserFavouriteNftApi";
import RemoveFavouriteNft from "./NftApis/RemoveFavouriteNftApi";
import AddNft from "./NftApis/AddNftApi";
import MyProfile from "./AccountsApis/MyProfileApi";
import GetMyAllCollections from "./CollectionApis/GetMyAllCollections";
import GetMyNftById from "./NftApis/GetMyNftByIdApi";
import GetAllNftsByCollectionId from "./NftApis/GetAllNftsByCollectionIdApi";
import GetAllBlockChain from "./BlockchainApi/GetAllBlockChainApi";
import GetAllCurrency from "./GetAllCurrencyApi/GetAllCurrencyApi";
import GetNftCollectionById from "./CollectionApis/GetNftCollectionByIdApi";
import GetNftCollectionCategories from "./CategoriesApis/GetNftCollectionCategoriesApi";
import GetNftCollectionByIdWithOutAccount from "./NftApis/GetNftCollectionByIdWithOutAccountApi";
import GetStaking from "./stake_apis/getStaking";
import GetStakingHistory from "./stake_apis/getStakingHistory";

const API = {
  AuthConnect,
  ValidateSignature,
  MyProfile,
  Logout,
  AddNft,
  UpdateProfile,
  GetProfile,
  SellNftMarket,
  BuyNftMarket,
  GetNftHistory,
  GetNftMarket,
  GetNftMarketById,
  GetMyAllNfts,
  AddFavouriteNft,
  GetFavouriteNft,
  GetUserFavouriteNft,
  RemoveFavouriteNft,
  GetMyAllCollections,
  GetMyNftById,
  GetAllNftsByCollectionId,
  GetNftCollectionById,
  GetNftCollectionCategories,
  GetAllBlockChain,
  GetAllCurrency,
  GetUserAccount,
  GetNftCollectionByIdWithOutAccount,
  GetStaking,
  GetStakingHistory
};
export default API;
