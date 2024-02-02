import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import SellNftMarketAction from "../../../Redux/Actions/NftActions/SellNftMarketAction";
const SellToMarkePlace = ({ nftIdd, pricee }) => {
  const [NewPrice, SetNewPrice] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const inputhandler = (e) => {
    const { value } = e.target;

    SetNewPrice(value);
  };
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      SellNftMarketAction({
        nftId: nftIdd,
        price: pricee ? pricee : NewPrice,
      })
    );
  };
  return (
    <>
      <div className="nft__item_action">
        <span onClick={handleShow}>Sell NFT</span>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Selling Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="row">
            <div className="col-md-12">
              <form
                name="contactForm"
                id="contact_form"
                className="form-border"
                onSubmit={onsubmitHandler}
              >
                <div className="row">
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="field-set">
                          <label>Selling Amount:</label>
                          <input
                            value={NewPrice}
                            onChange={inputhandler}
                            type="number"
                            name="NewPrice"
                            id="acceptselling"
                            placeholder="Enter Selling Amount Here..."
                            className="form-control  "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div id="submit" className="pull-left">
                    <input
                      onChange={inputhandler}
                      type="submit"
                      id="send_message"
                      value="Sell Nft "
                      className="btn btn-main color-2"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SellToMarkePlace;
