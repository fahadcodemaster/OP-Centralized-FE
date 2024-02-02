import React from "react";
import { Row, Col } from "react-bootstrap";
import Footer from "../../components/components/footer";
import guid1 from "../../assets/images/guide-1.png";
import guid2 from "../../assets/images/guide-2.png";
import guid3 from "../../assets/images/guide-3.png";
import guid4 from "../../assets/images/guide-4.jpeg";
import guid5 from "../../assets/images/guide-5.png";
import guid6 from "../../assets/images/guide-6.png";
import guid7 from "../../assets/images/guide-7.png";
import guid8 from "../../assets/images/guide-8.png";
import guid9 from "../../assets/images/guide-9.png";
import guid10 from "../../assets/images/guide-10.png";
import guid11 from "../../assets/images/guide-11.png";
import guid12 from "../../assets/images/guide-12.png";
import guid13 from "../../assets/images/guide-13.png";
import guid14 from "../../assets/images/guide-14.png";
import guid15 from "../../assets/images/guide-15.png";
const getCurruntYear = () => {
    return new Date().getFullYear();
}
const Userguide = () => (
    <>

        <section class="privacy-page userguide relative">
            <div className="small-pnl secnd-anime"></div>
            <div class="container">
                <div class="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="guid-div">
                            <h1 className="text-center">User Guide</h1>
                            <h2>Ultimate Guide: How to use </h2>
                            <h3>First, you will have to set up a Meta Mask wallet and for that, you need to follow these steps.</h3>
                            <p><b>1.</b> Go to Google.com and browse for META MASK Extension, then add an extension to your web browser</p>
                            <p><b>2.</b> Open <a target="_blank" href="https://metamask.io/">https://metamask.io/</a> and download it to your web browser.?</p>
                            <p>Following Dialogue box will appear.</p>
                            <img src={guid1} alt="metamask" />
                            <p>metamask.io</p>
                            <p>
                                <b>3.</b> Once the installation is completed Click on &lt;get started&gt; then click &lt;create a wallet&gt;.
                            </p>
                            <img src={guid2} alt="metamask" />
                            <p>
                                <b>4.</b> After clicking on creating wallet accept the terms and conditions for the wallet and create your password.
                            </p>
                            <img src={guid3} alt="metamask" />
                            <p>You can secure your account from the secret recovery phase option to keep your wallet safe.</p>
                            <h3>How to Connect Meta Mask to BINANCE CHAIN</h3>
                            <p><b>5.</b> Now after creating your account on Meta Mask, click on Ethereum Main net on the top right corner of the app.</p>
                            <img src={guid4} alt="metamask" />
                            <p><b>6.</b> Now click on Network and Add a Network then enter the details to META MASK.</p>
                            <p>For Instance:</p>
                            <img src={guid5} alt="metamask" />
                            <p><b>7.</b> Now that you are connected to the BSC test-net network, you will need some funds for your wallet. Click on the following link to start the process:
                                <a target="_blank" href="https://testnet.binance.org/faucet-smart">https://testnet.binance.org/faucet-smart</a></p>
                            <p>Copy your account IP address and paste it here.<br></br>
                                When finished, click on the META MASK extension to confirm you have received the funds.
                            </p>
                            <img src={guid6} alt="metamask" />
                            <img src={guid7} alt="metamask" />
                            <p><b>8.</b> Once your wallet is connected META MASK will be displaying and your token is created Now visit:
                                <a target="_blank" href="https://fineoriginal.com/">https://fineoriginal.com/</a></p>
                            <p>
                                Now click on add collection to add your collection and enter all the details.
                            </p>
                            <img src={guid8} alt="metamask" />
                            <p>
                                <a target="_blank" href="https://fineoriginal.com/">https://fineoriginal.com/</a><br></br>
                                After Adding your collection click on create NFT and it will be created once you enter all the requirements.
                            </p>
                            <img src={guid9} alt="metamask" />
                            <img src={guid10} alt="metamask" />
                            <p>
                                Now if you have created your NFT and added a collection your screen will be displayed like this.
                            </p>
                            <img src={guid11} alt="metamask" />
                            <p>
                                <b>9.</b> You can create more than one collection of the NFT. Now as NFT is created users can open bids or sell them easily.
                            </p>
                            {/* <img src={guid12} alt="metamask" /> */}
                            <p>After opening the bid, you can participate in the auction by selecting your price range from minimum amount to maximum and selecting the number of days for which that bid will be available.</p>
                            {/* <img src={guid13} alt="metamask" /> */}
                            <p>
                                You can also cancel the listing and remove the NFT from the bid or place it on sale on your desired amount.<br></br>
                                Now as you have opened the bid you can place that bid in your offer and include it in your listing.

                            </p>
                            {/* <img src={guid14} alt="metamask" /> */}
                            <p>Now your NFT is on auction, and it will be displayed that you displayed a bid at what time, and it ends at which time.</p>
                            <img src={guid15} alt="metamask" />
                            <p>Now the NFT bid is displayed and the amount of your NFT bid is placed to the right of your name in the auction.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </>
);
export default Userguide;
