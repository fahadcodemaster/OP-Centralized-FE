import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import Footer from "../../components/footer";
import { useSelector, useDispatch } from "react-redux";
import GetNftMarketAction from "../../../Redux/Actions/NftActions/GetNftMarketAction";
import GetMyAllCollectionsAction from "../../../Redux/Actions/CollectionAction/GetMyAllCollections";
import http from "../../../Redux/Api/http";
import {
  FaDiscord,
  FaInstagram,
  FaMediumM,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { CgWebsite } from "react-icons/cg";
import { toast, ToastContainer } from "react-toastify";
import { PulseLoader } from "react-spinners";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import GetNftCollectionByIdAction from "../../../Redux/Actions/CollectionAction/GetNftCollectionByIdAction";
import GetNftCollectionCategoriesAction from "../../../Redux/Actions/CategoriesAction/GetNftCollectionCategoriesAction";
import GetAllBlockChainAction from "../../../Redux/Actions/Blockchain/GetAllBlockChainAction";
import GetAllCurrencyAction from "../../../Redux/Actions/CurrencyAction/GetAllCurrencyAction";

const CreateSchema = Yup.object().shape({
  logoImage: Yup.mixed().required("File is required"),
  featureImage: Yup.mixed().required("File is required"),
  bannerImage: Yup.mixed().required("File is required"),

  item_name: Yup.string().required("Name Required"),
  item_url: Yup.string().url().nullable(),
  item_description: Yup.string().required("Description Required"),
  blockChain: Yup.string().required("Blockchain Required"),
  item_site_link: Yup.string().url().nullable(),
  item_discord_link: Yup.string().url().nullable(),
  item_twitter_link: Yup.string().url().nullable(),
  item_instagram_link: Yup.string().url().nullable(),
  item_medium_link: Yup.string().url().nullable(),
  item_telegram_link: Yup.string().url().nullable(),
  item_instagram_link: Yup.string().url().nullable(),
  // item_percentage_fee: Yup.string().required("Precentage Fee Required"),
  payment_token: Yup.string().required("Payment Token Required"),
  category: Yup.string().required("Category Required"),
});

function AddCollection() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const formRef = useRef();
  const [uploadLogoImage, setUploadLogoImage] = useState();
  const [uploadFeatureImage, setUploadFeatureImage] = useState();
  const [uploadBannerImage, setUploadBannerImage] = useState();
  const [uploadLogoImageError, setUploadLogoImageError] = useState("");
  const [uploadFeatureImageError, setuploadFeatureImageError] = useState("");
  const [uploadBannerImageError, setuploadBannerImageError] = useState("");
  const [getAllCurrency, setGetAllCurrency] = useState([]);
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [sensitiveContent, setSensitiveContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const [selectedBlockchain, setSelectedBlockchain] = useState("");
  const getAllBlockchain = useSelector(
    (state) => state?.GetAllBlockChain?.GetAllBlockChainResponse?.data
  );
  const GetNftCollectionCategories = useSelector(
    (state) =>
      state?.GetNftCollectionCategories?.GetNftCollectionCategoriesResponse
        ?.data
  );

  const GetNftCollectionById = useSelector(
    (state) => state.GetNftCollectionById?.GetNftCollectionByIdResponse?.data
  );

  const [CollectionData, setCollectionData] = useState({
    logoImage: "",
    featureImage: "",
    bannerImage: "",
    item_name: "",
    item_url: "",
    item_description: "",
    item_site_link: "",
    item_discord_link: "",
    item_twitter_link: "",
    item_instagram_link: "",
    item_medium_link: "",
    item_telegram_link: "",
    blockChain: "",
    payment_token: "",
    category: "",

    // item_percentage_fee: "",
  });

  const logoImageFilesChange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {
      setUploadLogoImageError(null);
      setUploadLogoImage((prev) => file);
    } else {
      setUploadLogoImageError("Invalid File Format ");
      setUploadLogoImage((prev) => null);
    }
  };

  const inputhandler = (e) => {
    const { name, value } = e.target;

    setCollectionData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const featureImageFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {
      setuploadFeatureImageError(null);
      setUploadFeatureImage((prev) => file);
    } else {
      setuploadFeatureImageError("Invalid File Format ");
      setUploadFeatureImage((prev) => null);
    }
  };

  const bannerImageFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {
      setuploadBannerImageError(null);
      setUploadBannerImage((prev) => file);
    } else {
      setuploadBannerImageError("Invalid File Format ");
      setUploadBannerImage((prev) => null);
    }
  };

  const handleBlockchain = (chainId) => {
    console.log(id);
    setSelectedBlockchain((prev) =>
      getAllBlockchain.find((item, index) => item.chainID == chainId)
    );
    console.log(selectedBlockchain);
  };

  useEffect(async () => {
    await dispatch(GetNftCollectionCategoriesAction());
    await dispatch(GetAllBlockChainAction());
    await dispatch(GetAllCurrencyAction());
    if (id) {
      await dispatch(GetNftCollectionByIdAction(id))
        .then((res) => {
          const { data } = res;

          setCollectionData({
            logoImage: data?.logoImage,
            featureImage: data?.featuredImage,
            bannerImage: data?.bannerImage,
            item_name: data?.name,
            item_url: data?.url,
            item_description: data?.description,
            blockChain: data?.chainID,
            item_site_link: data?.websiteLink,
            item_discord_link: data?.discordLink,
            item_twitter_link: data?.twitterLink,
            item_instagram_link: data?.instagramLink,
            item_medium_link: data?.mediumLink,
            item_telegram_link: data?.tLink,
            item_instagram_link: data?.instagramLink,
            payment_token: data?.currencyId,
            category: data?.categoryId,

            // item_percentage_fee: "",
          });

          // const finalurl = data?.logoImage.replaceAll("\\", "/");

          // encodeImageFileAsURL(`${httpUrl}/${finalurl}`);

          // setUploadFeatureImage(data?.featuredImage);
          // setUploadBannerImage(data?.bannerImage);

          formRef.current.setValues({
            logoImage: data?.logoImage,
            featureImage: data?.featuredImage,
            bannerImage: data?.bannerImage,

            item_name: data?.name,
            item_url: data?.url,
            item_description: data?.description,
            blockChain: data?.chainID,
            item_site_link: data?.websiteLink,
            item_discord_link: data?.discordLink,
            item_twitter_link: data?.twitterLink,
            item_instagram_link: data?.instagramLink,
            item_medium_link: data?.mediumLink,
            item_telegram_link: data?.tLink,
            item_instagram_link: data?.instagramLink,
            // item_percentage_fee: Yup.string().required("Precentage Fee Required"),
            payment_token: data?.currencyId,
            category: data?.categoryId,
          });
        })
        .catch((error) => { });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      http
        .get(httpUrl + "/api/v1/BlockChain/GetAllCurrency")
        .then((res) => {
          console.log("GetAllCurrency", res?.data?.data);

          setGetAllCurrency(res?.data?.data);
        })
        .catch((error) => {
          console.log("getAllCurrencyError", error);
        });
    }, 2000);
  }, []);

  // function encodeImageFileAsURL(link) {
  //   // var file = element.files[0];

  //   http
  //     .get(link)
  //     .then((res) => {
  //       var reader = new FileReader();
  //       reader.onloadend = function () {
  //         console.log("RESULT", reader.result);
  //       };
  //       setUploadLogoImage(res.data);
  //       // console.log("reader.readAsDataURL(link)", reader.readAsDataURL(link));
  //       console.log("picccc", res.data);
  //       // reader.readAsDataURL(res);
  //     })
  //     .catch();
  // }

  const onsubmitHandler = async (e) => {
    setIsLoading(true);

    var bodyFormData = new FormData();
    // bodyFormData.append("OwnerAddress", WalletAddress);
    bodyFormData.append("Name", CollectionData.item_name);
    bodyFormData.append("Url", CollectionData.item_url || "");
    bodyFormData.append("Description", CollectionData.item_description);
    bodyFormData.append("WebsiteLink", CollectionData.item_site_link || "");
    bodyFormData.append("DiscordLink", CollectionData.item_discord_link || "");
    bodyFormData.append("TwitterLink", CollectionData.item_twitter_link || "");
    bodyFormData.append(
      "InstagramLink",
      CollectionData.item_instagram_link || ""
    );
    bodyFormData.append("MediumLink", CollectionData.item_medium_link || "");
    bodyFormData.append("TLink", CollectionData.item_telegram_link || "");
    // bodyFormData.append("PercentageFee", CollectionData.item_percentage_fee);
    bodyFormData.append("CategoryId", CollectionData.category);
    bodyFormData.append(
      "ChainId",
      selectedBlockchain?.chainID || GetNftCollectionById.chainID
    );
    bodyFormData.append("CurrencyId", CollectionData.payment_token);
    // bodyFormData.append("SensitveContent", sensitiveContent);
    bodyFormData.append(
      "LogoImage",
      uploadLogoImage || CollectionData.logoImage
    );
    bodyFormData.append(
      "FeaturedImage",
      uploadFeatureImage || CollectionData.featureImage
    );
    bodyFormData.append(
      "BannerImage",
      uploadBannerImage || CollectionData.bannerImage
    );
    // console.log(selectedBlockchain);

    if (id) {
      http
        .put(
          httpUrl + "/api/v1/Nft/UpdateNftCollection?collectionId=" + id,
          bodyFormData
        )
        .then((res) => {
          setTimeout(() => {
            if (res?.data.isSuccess == true) {
              return history.push(`/nftsbycollections/${id}`);
            }
          }, 3000);

          toast.success(`${res?.data?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(`${error?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setIsLoading(false);
        });
      return;
    }

    http
      .post(`${httpUrl}/api/v1/Nft/AddNftCollection`, bodyFormData)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        var message;
        if (res?.data.isSuccess == false) {
          message = `${res?.data.message}`;
        } else if (res?.data.isSuccess == true) {
          message = `${res?.data.message} you are going to be redirected to the added collection`;
        }
        toast.success(message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          dispatch(GetMyAllCollectionsAction()).then((response) => {
            if (res?.data.isSuccess == true) {
              return history.push(`/nftsbycollections/${response?.data[0].id}`);
            }
          });
        }, 2000);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`${error?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    console.log(bodyFormData);
  };

  return (
    <div>
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
      <section className="jumbotron breadcumb no-bg">
        <div className="small-pnl secnd-anime"></div>
        <div className="mainbreadcumb">
          <div className="container">
            <div className="row m-10-hor">
              <div className="col-12">
                <h1 className="text-center">
                  {id ? "Update" : "Create"} Your Collection
                </h1>
                {/* <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Create Collection</li>
                  </ol>
                </nav> */}
                <div className="full-div text-center">
                  <div className="border-div"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container p-tab-0">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 mb-5">
            <Formik
              validationSchema={CreateSchema}
              onSubmit={() => onsubmitHandler()}
              innerRef={formRef}
              validator={() => ({})}
              initialValues={{
                logoImage: "",
                featureImage: "",
                bannerImage: "",
                item_name: "",
                item_url: "",
                item_description: "",
                item_site_link: "",
                item_discord_link: "",
                item_twitter_link: "",
                item_instagram_link: "",
                item_medium_link: "",
                item_telegram_link: "",
                // item_percentage_fee: "",
                blockChain: "",
                item_discord_link: "",
                payment_token: "",
                category: "",
              }}
            >
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                setFieldValue,
              }) => (
                <Form
                  id="form-create-item"
                  className="form-border"
                  innerRef={formRef}
                  onSubmit={handleSubmit}
                >
                  {console.log(errors)}


                  <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12">
                      <div className="my-3"></div>
                      <h5 className="txt-dark">Name</h5>
                      <input type="text" onChange={(e) => { inputhandler(e); handleChange(e); }} value={values.item_name} name="item_name" id="item_name" className="form-control" placeholder="e.g. 'Crypto Funk" />

                      {errors.item_name && touched.item_name && (
                        <div className="text-red">{errors.item_name}</div>
                      )}
                      <div className="my-3"></div>
                      {/* <h5 className="txt-dark">Organization Name (Optional)</h5>
                      <input type="text" name="organization_name" id="organization_name" className="form-control" placeholder="Organization Name" /> */}

                      {/* <div className="my-3"></div>
                      <h5 className="txt-dark">External Link</h5>
                      <input type="text"  name="external-link" id="external-link" className="form-control" placeholder="External Link"/> */}

                      <div className="my-3"></div>
                      <h5 className="txt-dark">External Link</h5>
                      <span className="span-space">
                        Customize your URL on Chain Mastery. Must only contain
                        lowercase letters,numbers, and hyphens.
                      </span>
                      <input
                        type="text"
                        onChange={(e) => {
                          inputhandler(e);
                          handleChange(e);
                        }}
                        value={values.item_url}
                        name="item_url"
                        id="item_url"
                        className="form-control"
                        placeholder="e.g. 'http://google.com"
                      />

                      {errors.item_url && touched.item_url && (
                        <div className="text-red">{errors.item_url}</div>
                      )}

                      <div className="my-3"></div>
                      <h5 className="txt-dark">Description</h5>

                      <textarea
                        data-autoresize
                        onChange={(e) => {
                          inputhandler(e);
                          handleChange(e);
                        }}
                        value={values.item_description}
                        name="item_description"
                        id="item_description"
                        className="form-control"
                      ></textarea>

                      {errors.item_description && touched.item_description && (
                        <div className="text-red">{errors.item_description}</div>
                      )}

                      <div className="my-3"></div>
                      <h5 className="txt-dark">Number Of NFt Copies</h5>
                      <input type="text" name="nft_copies" id="nft_copies" className="form-control" placeholder="Number Of NFt Copies" />


                      <div className="my-3"></div>
                      <h5 className="txt-dark">Collection</h5>

                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="category"
                        value={values?.category}
                        onChange={(e) => {
                          inputhandler(e);
                          handleChange(e);
                        }}
                        style={{
                          backgroundColor: "rgb(255, 255, 255)",
                          color: "#3d3d3d",
                          border: "solid 1px #3d3d3d",
                        }}
                      >
                        <option style={{ display: "none" }}>Select Category</option>
                        {GetNftCollectionCategories?.map((item, index) => {
                          return (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>

                      {errors.category && touched.category && (
                        <div className="text-red">{errors.category}</div>
                      )}



                      <div className="my-3"></div>
                      {/* <h5 className="txt-dark">Price</h5>
                      
                      <select name="price" id="price" className="form-control">
                        <option>BNB</option>
                        <option>BNB</option>
                        <option>BNB</option>
                      </select> */}



                      {/* <div className="my-3"></div>
                  <h5 className="txt-dark">Royalties</h5>
                  <span>
                    Collect a fee when a user re-sells an item you originally
                    created. This is deducted from the final sale price and paid
                    monthly to a payout address of your choosing.
                  </span>
                  <p>Percentage fee</p>
                  <input
                    type="number"
                    onChange={(e) => {
                      inputhandler(e);
                      handleChange(e);
                    }}
                    value={CollectionData.item_percentage_fee}
                    name="item_percentage_fee"
                    id="item_percentage_fee"
                    className="form-control"
                    placeholder="0.00"
                  />
                  {errors.item_percentage_fee &&
                    touched.item_percentage_fee && (
                      <div className="text-red">
                        {errors.item_percentage_fee}
                      </div>
                    )} */}

                      {console.log(values)}

                      <div className="my-3" />
                      <h5 className="txt-dark">Blockchain</h5>
                      <select
                        className="form-select form-control"
                        aria-label="Default select example"
                        name="blockChain"
                        value={values.blockChain}
                        onChange={(e) => {
                          handleBlockchain(e.target.value);
                          handleChange(e);
                        }}
                        style={{
                          backgroundColor: "rgb(255, 255, 255)",
                          color: "#3d3d3d",
                          border: "solid 1px #3d3d3d",
                        }}
                      >
                        <option style={{ display: "none" }}>
                          Select Blockchain
                        </option>
                        {getAllBlockchain?.map((item, index) => {
                          return (
                            <option value={item.chainID} key={index}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                      {errors.blockChain && touched.blockChain && (
                        <div className="text-red">{errors.blockChain}</div>
                      )}
                      <div className="my-3"></div>
                      <h5 className="txt-dark">Payment tokens</h5>

                      <select
                        className="form-select form-control custom-select-1"
                        aria-label="Default select example"
                        onChange={(e) => {
                          inputhandler(e);
                          handleChange(e);
                        }}
                        value={values.payment_token}
                        name="payment_token"
                        style={{
                          backgroundColor: "rgb(255, 255, 255)",
                          color: "#3d3d3d",
                          border: "solid 1px #3d3d3d",
                        }}
                      >
                        <option style={{ display: "none" }}>
                          Select Payment Token
                        </option>
                        {getAllCurrency?.map((item, index) => {
                          return (
                            <option
                              value={item.id}
                              style={{ border: "1px solid #02AAB0" }}
                            >
                              {item.name}
                            </option>
                          );
                        })}
                      </select>

                      {errors.payment_token && touched.payment_token && (
                        <div className="text-red">{errors.payment_token}</div>
                      )}
                      <div className="my-3"></div>
                      <h5 className="txt-dark">Contract Address (Optional)</h5>
                      <input type="text" name="contract-address" id="contract-address" className="form-control" placeholder="Contract Address" />




                      <div className="my-3"></div>
                      <h5 className="txt-dark">Links</h5>
                      <Row className="collection-social-links d-flex flex-column">
                        <Col className="collection-social-link-child ps-4">
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <CgWebsite size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_site_link}
                                name="item_site_link"
                                id="item_site_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://yoursite.com"
                              />
                              {errors.item_site_link && touched.item_site_link && (
                                <div className="text-red">
                                  {errors.item_site_link}
                                </div>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <FaDiscord size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_discord_link}
                                name="item_discord_link"
                                id="item_discord_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://discord.gg/your-account"
                              />
                              {errors.item_discord_link &&
                                touched.item_discord_link && (
                                  <div className="text-red">
                                    {errors.item_discord_link}
                                  </div>
                                )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <FaTwitter size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_twitter_link}
                                name="item_twitter_link"
                                id="item_twitter_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://twitter.com/youraccount"
                              />
                              {errors.item_twitter_link &&
                                touched.item_twitter_link && (
                                  <div className="text-red">
                                    {errors.item_twitter_link}
                                  </div>
                                )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <FaInstagram size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_instagram_link}
                                name="item_instagram_link"
                                id="item_instagram_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://instagram.com/youraccount"
                              />
                              {errors.item_instagram_link &&
                                touched.item_instagram_link && (
                                  <div className="text-red">
                                    {errors.item_instagram_link}
                                  </div>
                                )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <FaMediumM size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_medium_link}
                                name="item_medium_link"
                                id="item_medium_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://www.medium.com/@yourAccount"
                              />
                              {errors.item_medium_link &&
                                touched.item_medium_link && (
                                  <div className="text-red">
                                    {errors.item_medium_link}
                                  </div>
                                )}
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={1} className="social-icon-block d-grid ">
                              <FaTelegramPlane size={30} />
                            </Col>

                            <Col xs={11} className="ps-0">
                              <input
                                type="text"
                                onChange={(e) => {
                                  inputhandler(e);
                                  handleChange(e);
                                }}
                                value={values.item_telegram_link}
                                name="item_telegram_link"
                                id="item_telegram_link"
                                className="form-control m-0 custom-input"
                                placeholder="https://t.me/youraccount"
                              />
                              {errors.item_telegram_link &&
                                touched.item_telegram_link && (
                                  <div className="text-red">
                                    {errors.item_telegram_link}
                                  </div>
                                )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <div className="spacer-60"></div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg-12 col-md-6 col-sm-12">
                          <h5 className="txt-dark">
                            Logo image
                          </h5>
                          <span className="span-space">
                            {/* This image will also be used for navigation. 350 x 350
                            recommended. */}
                            350 x 350
                          </span>
                          <div className="collect-create-logo">
                            <p
                              id="file_name"
                              className={uploadLogoImageError ? "text-danger" : ""}
                            >
                              {uploadLogoImage ? (
                                <img
                                  src={URL.createObjectURL(uploadLogoImage)}
                                  className="get_upload_file_logo"
                                  alt="AddCollection.png"
                                />
                              ) : CollectionData?.logoImage ? (
                                <img
                                  src={`${httpUrl}/${CollectionData?.logoImage}`}
                                  className="get_upload_file_logo"
                                  alt="AddCollection.png"
                                />
                              ) : (
                                "Please Select PNG, JPG, JPEG Or GIF"
                              )}
                            </p>

                            <div className="browse">
                              <input
                                type="button"
                                id="get_file"
                                name="logoImage"
                                className="btn-main"
                                value="Browse"
                              />
                              <input
                                id="upload_file"
                                type="file"
                                name="logoImage"
                                onChange={(e) => {
                                  logoImageFilesChange(e);
                                  handleChange(e);
                                }}
                              />
                              {errors.logoImage && touched.logoImage && (
                                <div className="text-red">{errors.logoImage}</div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-6 col-sm-12">
                          <div className="my-3"></div>
                          <h5 className="txt-dark">Featured image</h5>
                          <span className="span-space">
                            {/* This image will be used for featuring your collection on the
                            homepage, category pages, or other promotional areas of
                            ChainMastery. 600 x 400 recommended. */}
                            600 x 400
                          </span>
                          <div className="collect-create-feature-image">
                            <p
                              id="file_name"
                              className={uploadFeatureImageError ? "text-danger" : ""}
                            >
                              {uploadFeatureImage ? (
                                <img
                                  src={URL.createObjectURL(uploadFeatureImage)}
                                  className="get_upload_file_feature_image"
                                  alt="AddCollection.png"
                                />
                              ) : CollectionData?.featureImage ? (
                                <img
                                  src={`${httpUrl}/${CollectionData?.featureImage}`}
                                  className="get_upload_file_feature_image"
                                  alt="AddCollection.png"
                                />
                              ) : (
                                "Please Select PNG, JPG, JPEG Or GIF"
                              )}
                            </p>

                            <div className="browse">
                              <input
                                type="button"
                                id="get_file"
                                name="featureImage"
                                className="btn-main"
                                value="Browse"
                              />
                              <input
                                id="upload_file"
                                type="file"
                                name="featureImage"
                                onChange={(e) => {
                                  featureImageFileChange(e);
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>
                          {errors.featureImage && touched.featureImage && (
                            <div className="text-red">{errors.featureImage}</div>
                          )}
                        </div>

                        <div className="col-lg-12 col-md-6 col-sm-12">
                          <div className="my-3"></div>
                          <h5 className="txt-dark">Banner image</h5>
                          <span className="span-space">
                            {/* This image will appear at the top of your collection page.
                            Avoid including too much text in this banner image, as the
                            dimensions change on different devices. 1400 x 400
                            recommended. */}
                            1400 x 400
                          </span>
                          <div className="collect-create-banner-image">
                            <p
                              id="file_name"
                              className={uploadBannerImageError ? "text-danger" : ""}
                            >
                              {uploadBannerImage ? (
                                <img
                                  src={URL.createObjectURL(uploadBannerImage)}
                                  className="get_upload_file_banner_image"
                                  alt="AddCollection.png"
                                />
                              ) : CollectionData?.bannerImage ? (
                                <img
                                  src={`${httpUrl}/${CollectionData?.bannerImage}`}
                                  className="get_upload_file_banner_image"
                                  alt="AddCollection.png"
                                />
                              ) : (
                                "Please Select PNG, JPG, JPEG Or GIF"
                              )}
                            </p>

                            <div className="browse">
                              <input
                                type="button"
                                id="get_file"
                                name="bannerImage"
                                className="btn-main"
                                value="Browse"
                              />
                              <input
                                id="upload_file"
                                type="file"
                                name="bannerImage"
                                onChange={(e) => {
                                  bannerImageFileChange(e);
                                  handleChange(e);
                                }}
                              />
                            </div>
                          </div>

                          {errors.bannerImage && touched.bannerImage && (
                            <div className="text-red">{errors.bannerImage}</div>
                          )}
                          <div className="spacer-30"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div className="row">
                    <div className="col-lg-12 btn-cntnr">

                      {isLoading ? (
                        <button
                          style={{
                            backgroundColor: "#02AAB0",
                            borderRadius: 10,

                            width: 130,
                            borderWidth: 0,
                          }}
                        >
                          <PulseLoader color="white" size="11" />
                        </button>
                      ) : (
                        <input
                          type="submit"
                          id="submit"
                          className="btn-main"
                          value={`${id ? "Update" : "Create"} Collection`}
                        />
                      )}
                      <input
                        style={{
                          width: 150,

                          borderRadius: 10,
                          borderWidth: 0,
                        }}
                        value={"Cancel"}
                        className="btn-main whiter"
                        onClick={() => history.goBack()}
                      />
                    </div>

                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AddCollection;
