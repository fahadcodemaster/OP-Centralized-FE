// @ts-ignore
import React, { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clock from "./Clock";

const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 260px;
  overflow: hidden;
  border-radius: 8px;
`;

// class div extends Component {
//   render() {
//     const { index, ...props } = this.props;
//     return <div {...props}></div>;
//   }
// }

const Responsive = () => {
  // @ts-ignore
  const dummyData = [
    {
      deadline: "December, 30, 2021",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-1.jpg",
      previewImg: "./images/items/static-1.jpg",
      title: "Pinky Ocean",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-10.jpg",
      previewImg: "./images/items/static-2.jpg",
      title: "Deep Sea Phantasy",
      price: "0.06 ETH",
      bid: "1/22",
      likes: 80,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-11.jpg",
      previewImg: "./images/items/static-3.jpg",
      title: "Rainbow Style",
      price: "0.05 ETH",
      bid: "1/11",
      likes: 97,
    },
    {
      deadline: "January, 1, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-12.jpg",
      previewImg: "./images/items/static-4.jpg",
      title: "Two Tigers",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-9.jpg",
      previewImg: "./images/items/anim-4.webp",
      title: "The Truth",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 15, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-2.jpg",
      previewImg: "./images/items/anim-2.webp",
      title: "Running Puppets",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-3.jpg",
      previewImg: "./images/items/anim-1.webp",
      title: "USA Wordmation",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-4.jpg",
      previewImg: "./images/items/anim-5.webp",
      title: "Loop Donut",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 3, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-5.jpg",
      previewImg: "./images/items/anim-3.webp",
      title: "Lady Copter",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-7.jpg",
      previewImg: "./images/items/static-5.jpg",
      title: "Purple Planet",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-6.jpg",
      previewImg: "./images/items/anim-6.webp",
      title: "Oh Yeah!",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 10, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-8.jpg",
      previewImg: "./images/items/anim-7.webp",
      title: "This is Our Story",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-9.jpg",
      previewImg: "./images/items/static-6.jpg",
      title: "Pixel World",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
    {
      deadline: "January, 10, 2022",
      authorLink: "#",
      nftLink: "#",
      bidLink: "#",
      authorImg: "./images/author/author-12.jpg",
      previewImg: "./images/items/anim-8.webp",
      title: "I Believe I Can Fly",
      price: "0.08 ETH",
      bid: "1/20",
      likes: 50,
    },
  ];

  // @ts-ignore
  const [Deadline, setDeadline] = useState({
    deadline: "January, 10, 2022",
    deadline1: "February, 10, 2022",
    deadline2: "February, 1, 2022",
  });

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    adaptiveHeight: 300,
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
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
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
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="nft">
      {/* @ts-ignore */}
      <Slider {...settings}>
        <div
          className="itm"
          // @ts-ignore
          index={1}>
          <div className="d-item">
            <div className="nft__item">
              <div className="de_countdown">
                <Clock deadline={Deadline.deadline} />
              </div>
              <div className="author_list_pp">
                <span onClick={() => window.open("/home1", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-1.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images/items/static-1.jpg"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>Pinky Ocean</h4>
                </span>
                <div className="nft__item_price">0.08 ETH</div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>50</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="itm"
          // @ts-ignore
          index={2}>
          <div className="d-item">
            <div className="nft__item">
              <div className="author_list_pp">
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-10.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images/items/static-2.jpg"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>Deep Sea Phantasy</h4>
                </span>
                <div className="nft__item_price">
                  0.06 ETH<span>1/22</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>80</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="itm"
          // @ts-ignore
          index={3}>
          <div className="d-item">
            <div className="nft__item">
              <div className="de_countdown">
                <Clock deadline={Deadline.deadline1} />
              </div>
              <div className="author_list_pp">
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-11.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images//items/static-3.jpg"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>Rainbow Style</h4>
                </span>
                <div className="nft__item_price">
                  0.05 ETH<span>1/11</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>97</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="itm"
          // @ts-ignore
          index={4}>
          <div className="d-item">
            <div className="nft__item">
              <div className="author_list_pp">
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-12.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images/items/static-4.jpg"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>Two Tigers</h4>
                </span>
                <div className="nft__item_price">
                  0.02 ETH<span>1/15</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>73</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="itm"
          // @ts-ignore
          index={5}>
          <div className="d-item">
            <div className="nft__item">
              <div className="author_list_pp">
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-9.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images/items/anim-4.webp"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>The Truth</h4>
                </span>
                <div className="nft__item_price">0.06 ETH</div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>26</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="itm"
          // @ts-ignore
          index={6}>
          <div className="d-item">
            <div className="nft__item">
              <div className="de_countdown">
                <Clock deadline={Deadline.deadline2} />
              </div>
              <div className="author_list_pp">
                <span onClick={() => window.open("/#", "_self")}>
                  <img
                    className="lazy"
                    src="./images/author/author-2.jpg"
                    alt="user.png"
                  />
                  <i className="fa fa-check"></i>
                </span>
              </div>
              <div className="nft__item_wrap">
                <Outer>
                  <span>
                    <img
                      src="./images/items/anim-2.webp"
                      className="lazy nft__item_preview"
                      alt="nft.png"
                    />
                  </span>
                </Outer>
              </div>
              <div className="nft__item_info">
                <span onClick={() => window.open("/#", "_self")}>
                  <h4>Running Puppets</h4>
                </span>
                <div className="nft__item_price">
                  0.03 ETH<span>1/24</span>
                </div>
                <div className="nft__item_action">
                  <span onClick={() => window.open("/#", "_self")}>
                    Buy NFT
                  </span>
                </div>
                <div className="nft__item_like">
                  <i className="fa fa-heart"></i>
                  <span>45</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Responsive;
