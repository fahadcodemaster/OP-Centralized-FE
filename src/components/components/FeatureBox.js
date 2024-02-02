import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

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

const featurebox = () => (
  <div className='row'>
    <div className="col-lg-12 col-md-12 mb-12">
      <div className="feature-box f-boxed style-3">
        <span class="number-span">1</span>
        <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className="bg-color-2 i-boxed icon_wallet"></i>
        </Reveal>
        <div className="text">
          <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="text-uppercase">Set up your wallet</h4>
          </Reveal>
          <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">User can login using his/her wallet via the Binance Smart Chain and can transact using Binance Coin (BNB).</p>
          </Reveal>
        </div>
        {/* <i className="wm icon_wallet"></i> */}
      </div>
    </div>

    <div className="col-lg-12 col-md-12 mb-12">
      <div className="feature-box f-boxed style-3 right-box">
      <span class="number-span">2</span>
        <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className=" bg-color-2 i-boxed icon_cloud-upload_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="text-uppercase">Add your NFT's</h4>
          </Reveal>
          <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">NFTs can be minted on the platform given that the user has participated in Staking DeFiSports Coin (DSC).</p>
          </Reveal>
        </div>
        {/* <i className="wm icon_cloud-upload_alt"></i> */}
      </div>
    </div>

    <div className="col-lg-12 col-md-12 mb-12">
      <div className="feature-box f-boxed style-3">
      <span class="number-span">3</span>
        <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
          <i className=" bg-color-2 i-boxed icon_tags_alt"></i>
        </Reveal>
        <div className="text">
          <Reveal className='onStep' keyframes={fadeInUp} delay={100} duration={600} triggerOnce>
            <h4 className="text-uppercase">Sell your NFT's</h4>
          </Reveal>
          <Reveal className='onStep' keyframes={fadeInUp} delay={200} duration={600} triggerOnce>
            <p className="">A single NFT or a collection can be listed on the marketplace by Fixed price and Auction based mechanisms.</p>
          </Reveal>
        </div>
        {/* <i className="wm icon_tags_alt"></i> */}
      </div>
    </div>
  </div>
);
export default featurebox;