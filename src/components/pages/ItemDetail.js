import React from "react";
import Footer from "../components/footer";
import { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const Colection = function () {
  return (
    <div>
      <GlobalStyles />

      <section className="container">
        <div className="row mt-md-5 pt-md-4">
          <div className="col-md-6 text-center">
            <img
              src="./images/items/big-1.jpg"
              className="img-fluid img-rounded mb-sm-30"
              alt="NFT.png"
            />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>Pinky Ocean</h2>
              <div className="item_info_counts">
                <div className="item_info_type">
                  <i className="fa fa-image"></i>Art
                </div>
                <div className="item_info_views">
                  <i className="fa fa-eye"></i>250
                </div>
                <div className="item_info_like">
                  <i className="fa fa-heart"></i>18
                </div>
                <div className="item_info_like">
                  <i className="fa fa-dollar"></i>0.88 SOL
                </div>
              </div>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <h6>Creator</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Link style={{ textDecoration: "none" }} to="author">
                    <img
                      className="lazy"
                      src="./images/author/author-1.jpg"
                      alt="Author.png"
                    />
                    {/* <i className="fa fa-check"></i> */}
                  </Link>
                </div>
                <div className="author_list_info">
                  <span>Monica Lucas</span>
                </div>
              </div>
              <div className="spacer-40"></div>
              <button id="btnBuy" className=" btn-main">
                BUY NFT
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
export default Colection;
