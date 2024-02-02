import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class CustomSlide extends Component {
  render() {
    const { index, ...props } = this.props;
    return <div {...props}></div>;
  }
}

export default class Responsive extends Component {
  render() {
    var settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 2000,
      adaptiveHeight: 300,
      dots: true,
      responsive: [
        {
          breakpoint: 1900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
            dots: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
          },
        },
      ],
    };

    return (
      <div className="nft-big">
        <Slider {...settings}>
          <CustomSlide className="itm" index={1}>
            <div className="nft_pic">
              <span>
                {/* <span className="nft_pic_info">
                  <span className="nft_pic_title">live Arts</span>
                  <span className="nft_pic_by">Nicholas Daniels</span>
                </span> */}
              </span>
              <div className="nft_pic_wrap">
               <div className="Height"></div>
                <img
                
                  src="./images/carousel/football.png"
                  className="lazy img-fluid"
                  alt=""
                />
            <div className="Height"></div>
               
                <div class="text-pnl onStep css-142k476">
                <div class="text-pnl-inner">
                  <h1>DEFI </h1>
                  <h2>SPORTS</h2>
                </div>
                </div>
              </div>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={2}>
            <div className="nft_pic">
              <div className="nft_pic_wrap">
               <div className="Height"></div>
                <img
                  src="./images/carousel/football.png"
                  className="lazy img-fluid"
                  alt=""
                />
                <div className="Height"></div>
                <div class="text-pnl">
                <div class="text-pnl-inner">
                  <h1>DEFI </h1>
                  <h2>SPORTS</h2>
                </div>
                </div>
              </div>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={3}>
            <div className="nft_pic">
              <div className="nft_pic_wrap">
               <div className="Height"></div>
                <img
                  src="./images/carousel/football.png"
                  className="lazy img-fluid"
                  alt=""
                />
                <div className="Height"></div>
                <div class="text-pnl ">
                <div class="text-pnl-inner">
                  <h1>DEFI </h1>
                  <h2>SPORTS</h2>
                </div>
                </div>
              </div>
            </div>
          </CustomSlide>

          {/* <CustomSlide className="itm" index={4}>
            <div className="nft_pic">
              <div className="nft_pic_wrap">
                <img
                  src="./images/carousel/crs-4.png"
                  className="lazy img-fluid"
                  alt=""
                />
                <div class="text-pnl">
                <div class="text-pnl-inner">
                  <h1>DEFI </h1>
                  <h2>SPORTS</h2>
                </div>
                </div>
                
              </div>
            </div>
          </CustomSlide>

          <CustomSlide className="itm" index={5}>
            <div className="nft_pic">
              <div className="nft_pic_wrap">
                <img
                  src="./images/carousel/crs-5.png"
                  className="lazy img-fluid"
                  alt=""
                />
                <div class="text-pnl">
                <div class="text-pnl-inner">
                  <h1>DEFI </h1>
                  <h2>SPORTS</h2>
                </div>
                </div>
              </div>
            </div>
          </CustomSlide> */}
        </Slider>
      </div>
    );
  }
}


