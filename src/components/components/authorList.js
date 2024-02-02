import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import http from "../../Redux/Api/http";
import { FaUser } from "react-icons/fa";
import { PropagateLoader, RingLoader } from "react-spinners";
import { useHistory } from "react-router-dom";
import defaultImg from "../../assets/images/default.png";
import bannerimg from "../../assets/images/banner-img.jpg";

class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}
const AuthorList = () => {
  const httpUrl = process.env.REACT_APP_DEVELOPMENT_URL;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    http
      .get(httpUrl + "/api/v1/Nft/GetTopSeller")
      .then(async (res) => {
        console.log(
          "Responseeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          res.data.data.accountList
        );
        setData(res.data.data.accountList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error?.message);
      });
  }, []);

  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {loading ? (
        <div className="col-sm-12 d-flex justify-content-center">
          <RingLoader color="black" size="60" />
        </div>
      ) : (
        <>
          <div className="nft author_list ol-styling">
            <Slider {...settings}>
              {data?.map((payload, index) => (
                <>
                  <CustomSlide className="itm" index={1}>
                    <li>
                      <div className="author-banner-img" style={{ backgroundImage: `url(${bannerimg})` }}></div>
                      <div className="author_list_pp" style={{ height: 70 }}>
                        <span onClick={() => history.push(`/profile/${payload.address}`)}>
                          <img className="lazy" src={payload?.profileImage ? httpUrl + "/" + payload?.profileImage : defaultImg} alt="" />
                          <i className="fa fa-check"></i>
                        </span>
                      </div>
                      <div className="author_list_info">
                        <span onClick={() => window.open("", "_self")}>
                          {payload.username}
                        </span>
                        <div className="full-div">
                          <i className="text-center">@{payload.username}</i>
                        </div>
                        {/* <span className="bot">
                          {payload?.nftSellPrice + " BNB"}
                        </span> */}
                        {/* <ul class="author-social-list">
                          <li>
                            <a target="_blank" href="#"><i className="fa fa-facebook"></i></a>
                          </li>
                          <li>
                            <a target="_blank" href="#"><i className="fa fa-instagram"></i></a>
                          </li>
                          <li>
                            <a target="_blank" href="#"><i className="fa fa-twitter"></i></a>
                          </li>
                          <li>
                            <a target="_blank" href="#"><i className="fa fa-link"></i></a>
                          </li>
                        </ul> 
                        <div className="author-folowers-item full-div">
                          <div>
                            <p>
                              <b>890</b>
                              Followers
                            </p>
                          </div>
                          <div>
                            <p>
                              <b>17</b>
                              Items
                            </p>
                          </div>
                        </div> */}
                        <div className="full-div">
                          <button className="follow-btn">Follow</button>
                        </div>
                      </div>
                    </li>
                  </CustomSlide>
                </>
              ))}
            </Slider>
          </div>
        </>
      )}

      <div></div>
    </>
  );
};
export default AuthorList;
