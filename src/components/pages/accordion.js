import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.white {
    background: transparent;
  }
`;

const accordion= () => (
<div>
<GlobalStyles/>

  <section className='jumbotron breadcumb no-bg'>
    <div className='mainbreadcumb'>
      <div className='container'>
        <div className='row m-10-hor'>
          <div className='col-12'>
            <h1 className='text-center'>FAQ</h1>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className='container faq-section'>
    <div className='row justify-content-center'>

      <div className='col-md-12'>
      <h3>Full Hide</h3>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
              - How to buy a Fixed Price NFT <span><i class="fa fa-minus"></i><i class="fa fa-plus"></i></span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
              Any NFT that the user desire to purchase on a fixed price can be bought instantly on the payment of the price mentioned of that particular listing.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
              - How to bid in DeFiSports NFT Auction
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body> Any NFT available on the marketplace can be bought using the Auction sale method in a particular time where the buyer will have to place a bid to buy that particular NFT. The highest bid under that particular time ends up winning that NFT.  
              Once the user is sure of buying a particular NFT listing after seeing all details regarding that NFT such as visual, description, & bidding history, the user can click the ‘Place Bid’ button to which the user will be directed to a ‘Pop-Up’ of Placing a Bid. On the occasion of a bid below than the minimum bid, the bid will be rejected and the user will be asked to Top-up funds to proceed further.  
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
              How to bid in DeFiSports NFT Auction
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body> 
              Any NFT available on the marketplace can be bought using the Auction sale method in a particular time where the buyer will have to place a bid to buy that particular NFT. The highest bid under that particular time ends up winning that NFT.
              Once the user is sure of buying a particular NFT listing after seeing all details regarding that NFT such as visual, description, & bidding history, the user can click the ‘Place Bid’ button to which the user will be directed to a ‘Pop-Up’ of Placing a Bid. On the occasion of a bid below than the minimum bid, the bid will be rejected and the user will be asked to Top-up funds to proceed further.  
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
              - How to Sell your NFTs?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body> On the particular NFT Asset page, the owner of the NFT Asset can click sell to be able to list that particular NFT. The owner also has to define about which cryptocurrency he would accept to sell that NFT and the selling mechanism whether it can auction based on an instant sale for a fixed price. In case of an Auction, the owner has to define a minimum price to start the auction. </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="4">
              On which blockchain will the platform mint and store the NFT?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body> Minted NFTs will exist on the Binance Smart Chain only. However, their correspondent data will not be stored on the blockchain.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="5">
              - Who is eligible to mint NFTs on the DeFiSports NFT Marketplace?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="5">
              <Card.Body> All users who have registered to the platform by connecting themselves with their wallets can participate to mint NFTs on the platform.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="6">
              - What file formats are acceptable to create and NFT for the platform?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="6">
              <Card.Body> JPG, PNG, JPEG, & GIF formats can only be used to mint NFTs.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="7">
              - Can I make changes to my minted NFTs?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="7">
              <Card.Body> No. The only way possible to make changes to the blockchain are by deleting the old one from the chain and minting a new one.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="8">
              - Where will the NFT be stored?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="8">
              <Card.Body> Once the NFT is minted, it will remain on the blockchain forever unless it is deleted and created again. The data used to mint the NFT is not stored on the Blockchain.</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="9">
              - Is there a fee to mint NFTs?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="9">
              <Card.Body> There is no fee to mint an NFT apart from the usual gas fee. However, the user must have to take part in Staking DSC tokens to be able to mint NFTs</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>

    </div>
  </section>

  <Footer />
</div>

);
export default accordion;