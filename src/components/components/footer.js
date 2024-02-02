import React from "react";
import { Row, Col } from "react-bootstrap";
import footerlogo from "../../assets/images/footer-logo.png";
const getCurruntYear = () => {
  return new Date().getFullYear();
}
const footer = () => (
  <footer className="container-fluid">

    <div className="row">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <img className="footer-logo" src={footerlogo} />
            <p>Buy, sell and discover exclusive digital assets<br></br> by the top artists of NFTs world.</p>
            <ul className="social-list">
              <li><a target="_blank" href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
              <li><a target="_blank" href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a></li>
              <li><a target="_blank" href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a></li>
              <li><a target="_blank" href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-6">
            <h6>Community</h6>
            <ul>
              <li><a href="/marketplace">Marketplace</a></li>
              <li><a href="/addcollection">Add Collection</a></li>
              <li><a href="/createnft">Create New NFT</a></li>
              <li><a href="/connectwallet">wallet</a></li>
              <li><a href="/myprofile">My Profile</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <h6>Contact</h6>
            <ul className="footer-list">
              <li><i className="fa fa-map-marker"></i> 12 New Elephant Road, P.O. 1334 NY, United States</li>
              <li><a href="tel:012 345 678 90"><i className="fa fa-phone"></i> 012 345 678 90</a></li>
              <li><a href="mailto:OPVS.com"><i className="fa fa-envelope-o"></i> OPVS.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12">
              <p>© Copyright 2022 OPVS - All Rights Reserved.</p>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul className="privacy-list">
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Term of Services</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
export default footer;
