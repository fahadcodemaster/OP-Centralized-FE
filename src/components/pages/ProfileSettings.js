import React, { useEffect, useState, useRef } from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import "../../assets/myProfile.scss";
import * as Yup from "yup";
import { WalletDisconnect } from "../../Redux/Actions/WalletActions/WalletAction";
import { AuthConnectRequest } from "../../Redux/Actions/AuthActions/AuthConnectAction";
import { LogoutAction } from "../../Redux/Actions/AuthActions/LogoutAction";
import { ValidateSignatureRequest } from "../../Redux/Actions/AuthActions/ValidateSignatureAction";
import { Formik, Form, Field } from "formik";
import { CopyToClipboard } from "react-copy-to-clipboard";
import bannerimg from '../../assets/images/profile-banner.jpg';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import UpdateProfileAction from "../../Redux/Actions/Account/UpdateProfileAction";
import MyProfileAction from "../../Redux/Actions/Account/MyProfileAction";
import { FaCopy, FaUserCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }`;
const CreateSchema = Yup.object().shape({
  username: Yup.string(),
    // .required("Please enter the username without any spaces in this field")
    // .matches(
    //   /^[A-Za-z0-9\.\-\/]+$/,
    //   "Only alphabets and number are allowed without space this field "
    // ),
  bio: Yup.string(),
  email: Yup.string().required("Email Required"),
  instagramLink: Yup.string().url().nullable(),
  twitterLink: Yup.string().url().nullable(),
  yourSiteLink: Yup.string().url().nullable(),
  OrganizationId: Yup.string(),
});
function ProfileSettings() {
  const [files, SetFiles] = useState();
  const [organization, setOrganization] = useState();
  const [orgID, setOrgID] = useState();
  const [FileError, SetFileError] = useState("");
  const [userImage, setUserImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orgCheck, setOrgCheck] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const history = useHistory();
  const formRef = useRef();

  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const Token = useSelector((state) => state.Login?.authResponse?.data?.token);
  
  const MyProfile = useSelector(
    (state) => state.MyProfile?.MyProfileResponse?.data
    );
    const dispatch = useDispatch();
    const text = MyProfile?.bio? MyProfile?.bio?.toString(): '';

  useEffect(() => {
    getOrganizations()
    dispatch(MyProfileAction())
      .then((res) => {
        const data = res.data;

        formRef.current.setValues({
          yourSiteLink:
            (data?.yourSiteLink &&
              data?.yourSiteLink != "null" &&
              data?.yourSiteLink) ||
            "",
          username:
            (data?.username && data?.username != "null" && data?.username) ||
            "",
          bio: (data?.bio && data?.bio != "null" && data?.bio) || "",
          email: (data?.email && data?.email != "null" && data?.email) || "",
          instagramLink:
            (data?.instagramLink &&
              data?.instagramLink != "null" &&
              data?.instagramLink) ||
            "",
          twitterLink:
            (data?.twitterLink &&
              data?.twitterLink != "null" &&
              data?.twitterLink) ||
            "",
          WalletAdres: WalletAddress,
        });

        console.log(formRef.current.values);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fileschange = (e) => {


    const file = e.target.files[0];
    if (
      file?.type === "image/jpeg" ||
      file?.type === "image/png" ||
      file?.type === "image/jpg" ||
      file?.type === "image/gif"
    ) {

      SetFileError(null);
      SetFiles(file);
    } else {
      SetFileError("Invalid File Format");
      SetFiles(null);
    }
  };
  const getOrganizations = async (e) => {
    await axios
    .get(
      httpUrl + "/api/v1/Organization/GetAllOrganization",
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    )
    .then((resp) => {
      console.log("objectobjectobject", resp.data.data);
      setOrganization(resp.data.data)
      setOrgCheck(false)
    })

  };

  const WalletAddress = useSelector(
    (state) => state.WalletConnction?.WalletResponse?.accounts
  );

  const [ProfileData, SetProfileData] = useState({
    username: MyProfile?.username,
    bio: MyProfile?.bio,
    email: MyProfile?.email,
    instagramLink: MyProfile?.instagramLink,
    yourSiteLink: MyProfile?.yourSiteLink,
    twitterLink: MyProfile?.twitterLink,
    WalletAdres: WalletAddress,
  });
  const inputhandler = (e) => {
    const { name, value } = e.target;

    SetProfileData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setUserImage(MyProfile?.profileImage);
    SetProfileData(MyProfile);
  }, [MyProfile]);

  const onsubmitHandler = async (e) => {
    setIsLoading(true);
    if (files == null && FileError == "Invalid File Format") {
      toast.error(
        `You selected the wrong file type, you can only upload PNG, JPG, JPEG, GIF`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      setIsLoading(false);
      return;
    }
    var bodyFormData = new FormData();
    bodyFormData.append("ProfileImage", files);
    bodyFormData.append("Username", ProfileData.username);
    bodyFormData.append("Email", ProfileData.email);
    bodyFormData.append("TwitterLink", ProfileData.twitterLink);
    bodyFormData.append("InstagramLink", ProfileData.instagramLink);
    bodyFormData.append("YourSiteLink", ProfileData.yourSiteLink);
    bodyFormData.append("Bio", ProfileData.bio);
    bodyFormData.append("OrganizationId", orgID);
    console.table([...bodyFormData])
    
    await dispatch(UpdateProfileAction(bodyFormData))
      .then((res) => {
        console.log("abc");
        setIsLoading(false);
        toast.success(`${res.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch(MyProfileAction())
          .then((res) => {
            const data = res.data;
            formRef.current.setValues({
              yourSiteLink:
                (data?.yourSiteLink &&
                  data?.yourSiteLink != "null" &&
                  data?.yourSiteLink) ||
                "",
              username:
                (data?.username &&
                  data?.username != "null" &&
                  data?.username) ||
                "",
              bio: (data?.bio && data?.bio != "null" && data?.bio) || "",
              email:
                (data?.email && data?.email != "null" && data?.email) || "",
              instagramLink:
                (data?.instagramLink &&
                  data?.instagramLink != "null" &&
                  data?.instagramLink) ||
                "",
              twitterLink:
                (data?.twitterLink &&
                  data?.twitterLink != "null" &&
                  data?.twitterLink) ||
                "",
              WalletAdres: WalletAddress,
            });
          })
          .catch((error) => {
            console.log(error);
          });
        setUserImage(res?.data?.profileImage);
        setTimeout(() => {
          history.push("/myProfile")
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
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
  };
  const Logoutt = async () => {
    await dispatch(WalletDisconnect());
    await dispatch(AuthConnectRequest());
    await dispatch(LogoutAction());
    await dispatch(ValidateSignatureRequest());
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
      <section className="profile-banner">
        <div className="full-div banner" style={{ backgroundImage: `url(${bannerimg})` }}></div>
      </section >
      <div class="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="profile-info-container">
              <div className="d_profile profile-container">
                <div className="profile-pic-cntnr">
                  <div htmlFor="imagee" className="">
                    {files ? (
                      <img
                        id="changePic"
                        src={URL.createObjectURL(files)}
                        alt="profilepic.png"
                        style={{ width: 130, height: 130 }}
                      />
                    ) : (
                      MyProfile?.profileImage ? (
                        <img
                          id="changePic"

                          src={`${httpUrl}/${userImage}`}
                          alt="profilepic.png"
                          style={{ width: 130, height: 130 }}
                        />
                      ) : (
                        <FaUserCircle size="2x" />
                      ))}
                  </div>
                </div>
                <div className="Profile-txt">
                  <h4>{MyProfile?.username ? MyProfile?.username: 'Unnamed'}
                    <span class="email-span">{MyProfile?.email}</span>
                    <span id="wallet" class="profile_wallet hover-blue">{WalletAddress}
                      <button id="btn_copy" title="Copy Address"><i class="fa fa-files-o" aria-hidden="true"></i></button>
                    </span>
                  </h4>
                  <button className="follow-btn">+ Follow</button>
                </div>
              </div>
              <div className="profile-text-container">
                <p>
                  {/* {showMore ? text : `${text?.substring(0, 45)}`}
                    {text?.length > 45 ? (
                      <span className="btn-more-less" onClick={() => setShowMore(!showMore)}>
                        {showMore ? " show less" : "...show more"}
                      </span>
                    ) : null
                    } */}
                  
                </p>
                <h5>Follow Me</h5>
                <ul className="my-social-list">
                  <li>
                    <a target="_blank" href="https://www.twitter.com/"><i className="fa fa-twitter"></i> Twitter.com</a>
                  </li>
                  <li>
                    <a target="_blank" href="https://www.instagram.com/"><i className="fa fa-instagram"></i> Instagram.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" container-fluid">
        <div className="container">
          <div className="row justify-content-center">
            <div className="small-pnl secnd-anime"></div>
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="Topbarsetting">
                <ul class="de_nav de_nav">
                  <li>
                    <a href="/myprofile">Preview Profile</a>
                  </li>
                  <li id="Mainbtn4" class="">
                    <span onClick={Logoutt}>Logout</span>
                  </li>
                </ul>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <Formik
                    validationSchema={CreateSchema}
                    innerRef={formRef}
                    onSubmit={() => onsubmitHandler()}
                    validator={() => ({})}
                    initialValues={{
                      username: "",
                      bio: "",
                      email: "",
                      instagramLink: "",
                      twitterLink: "",
                      yourSiteLink: "",
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
                        name="contactForm"
                        id="contact_form"
                        className="form-border"
                        onSubmit={handleSubmit}
                      >
                        
                        <div className="row">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-6">
                                <div className="field-set">
                                  <label>Name</label>
                                  <input type="text" onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    // disabled={MyProfile?.username ?? false}
                                    value={values.username}
                                     name="username" id="username" placeholder="Enter Your Full Name" className="form-control" />
                                </div>
                                {errors.username && touched.username && (
                                  <div className="text-red">
                                    {errors.username}
                                  </div>
                                )}
                              </div>
                              {/* <div className="col-md-6">
                                <div className="field-set">
                                  <label>Username</label>
                                  <input
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={values.username}
                                    placeholder="Enter Your Username Here..."
                                    className="form-control"
                                    disabled={MyProfile?.username ?? false}
                                  />
                                </div>
                                {errors.username && touched.username && (
                                  <div className="text-red">
                                    {errors.username}
                                  </div>
                                )}
                              </div> */}
                              <div className="col-md-6">
                                <div className="field-set">
                                  <label>Email</label>
                                  <input
                                    placeholder="MyEmailAddress@domain.com"
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    id="email"
                                    className="form-control"
                                  />
                                </div>
                                {errors.email && touched.email && (
                                  <div className="text-red">{errors.email}</div>
                                )}
                              </div>
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label>Bio</label>
                                  <textarea
                                    data-autoresize
                                    name="bio"
                                    id="bio"
                                    onChange={(e) => {
                                      inputhandler(e);
                                      handleChange(e);
                                    }}
                                    className="form-control"
                                    value={values.bio}
                                    placeholder="We all Have a story and message for the world!"
                                  ></textarea>
                                </div>
                                {errors.bio && touched.bio && (
                                  <div className="text-red">{errors.bio}</div>
                                )}
                              </div>
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label>Profile Picture</label>
                                  <input
                                    onChange={fileschange}
                                    type="file"
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label>Organizations</label>
                                  <select className="form-control" autoComplete="off">
                                    {orgCheck ? (
                                    <PulseLoader color="white" size="11" />

                                    ): (
                                      <>
                                      {organization?.map((data)=>(
                                        <>
                                        
                                        <option defaultValue={setOrgID(data.id)} onChange={setOrgID(data.id)}>{data.name}</option>
                                        
                                        </>
                                      ))}
                                      </>
                                    )}
                                    {/* <option>BNB</option>
                                    <option>BNC</option> */}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="field-set">
                                  <label>Wallet Address</label>
                                  {WalletAddress ? (
                                    <span
                                      style={{
                                        wordBreak: "break-all",
                                      }}
                                      id="name"
                                      className="form-control"
                                    >
                                      {WalletAddress}{" "}
                                      <CopyToClipboard
                                        text={WalletAddress}
                                        onCopy={() => {
                                          toast.success(
                                            "Address copied successfully",
                                            {
                                              position: "top-right",
                                              autoClose: 5000,
                                              hideProgressBar: false,
                                              closeOnClick: true,
                                              pauseOnHover: false,
                                              draggable: true,
                                              progress: undefined,
                                            }
                                          );
                                        }}
                                      >
                                        <FaCopy
                                          style={{
                                            float: "right",
                                            fontSize: "25px",
                                            marginTop: "0px",
                                            cursor: "pointer",
                                          }}
                                          title="Copy to use paperclip"
                                        />
                                      </CopyToClipboard>
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundColor: "none",
                                        color: "white",
                                      }}
                                      id="name"
                                      className="form-control"
                                    >
                                      Login To View Wallet address
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="spacer-30"></div>
                              <div className="col-md-12">
                                <div className="row">
                             
                                  <div className="col-md-6">
                                    <div className="field-set">
                                      <label>Twitter </label>
                                      <input
                                        onChange={(e) => {
                                          inputhandler(e);
                                          handleChange(e);
                                        }}
                                        type="text"
                                        name="twitterLink"
                                        id="twitter"
                                        value={values.twitterLink}
                                        className="form-control"
                                        placeholder="Your Twitter Handle"
                                      />
                                      {errors.twitterLink && touched.twitterLink && (
                                        <div className="text-red">
                                          {errors.twitterLink}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="field-set">
                                      <label>Instagram </label>
                                      <input
                                        onChange={(e) => {
                                          inputhandler(e);
                                          handleChange(e);
                                        }}
                                        type="text"
                                        name="instagramLink"
                                        value={values.instagramLink}
                                        id="instagram"
                                        className="form-control"
                                        placeholder="Your Instagram Handle"
                                      />
                                      {errors.instagramLink &&
                                        touched.instagramLink && (
                                          <div className="text-red">
                                            {errors.instagramLink}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="field-set">
                                      <label>Your Website</label>
                                      <input
                                        onChange={(e) => {
                                          inputhandler(e);
                                          handleChange(e);
                                        }}
                                        type="text"
                                        name="yourSiteLink"
                                        value={values.yourSiteLink}
                                        id="yourSiteLink"
                                        className="form-control"
                                        placeholder="MyWebsite.xx"
                                      />
                                      {errors.yourSiteLink &&
                                        touched.yourSiteLink && (
                                          <div className="text-red">
                                            {errors.yourSiteLink}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 pt-2">
                          <div className="row" style={{ gap: 10 }}>
                            {isLoading ? (
                              <button
                                style={{
                                  backgroundColor: "#02AAB0",
                                  borderRadius: 20,
                                  height: 35,
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
                                value="Save"
                              />
                            )}
                            <input
                              style={{
                                width: 150,
                                height: 35,
                                borderRadius: 30,
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
            </div>
          </div>
        </div>
      </div>
      <div className="spacer-double"></div>
      <Footer />
    </div>
  );
}

export default ProfileSettings;
