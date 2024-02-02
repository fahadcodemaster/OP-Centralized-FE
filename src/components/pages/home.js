import React from "react";
import SliderCarousel from "../components/SliderCarouselsingle";
import FeatureBox from "../components/FeatureBox";
import CarouselCollection from "../components/CarouselCollection";
import MarketNfts from "./MarketPlace/MarketPlaceProducts";
import AuthorList from "../components/authorList";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
import marketplace from "../../assets/images/market-place-icon.png";
import heroimage from "../../assets/images/hero-image.png";

import { NavLink } from "react-router-dom";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: white;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn-custom, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
    height: 100vh;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  // footer.footer-light .subfooter{
  //   border-top: 1px solid rgba(255,255,255,.1);
  // }
`;

const homethree = () => (
  <div>
    <GlobalStyles />
    <section className="conatienr-fluid landing-header">
      <div className="bg-layer"></div>
      <div className="table-cell">
        <div className="table-cell-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-7 col-sm-12">
                <span className="mrk-txt">Explore, Create & Collect NFTs </span>
                <h1>
                  Join The New<br></br> Era of <span>NFTs</span>
                </h1>
                <p>
                  We are a huge marketplace dedicated to connecting great artists of all Superex with their fans and unique token collectors!
                </p>
                <ul>
                  <li><a href="/Marketplace" className="reg-btn">Discover Now</a></li>
                </ul>
              </div>
              <div className="col-lg-5 col-md-5 col-sm-12">
                <img src={heroimage} alt='image' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <MarketNfts />

    <Footer />
  </div>
);
export default homethree;
