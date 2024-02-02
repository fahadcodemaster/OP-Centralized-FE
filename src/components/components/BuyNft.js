import React from "react";
import { useDispatch } from "react-redux";
import Web3 from "web3";
import BuyNftMarketAction from "../../Redux/Actions/NftActions/BuyNftMarketActions";
const BuyNft = ({ nftidd, ownerAddress, sellPrice }) => {
  const dispatch = useDispatch();
  const BuyNftMarket = async (txHash, account) => {
    await dispatch(
      BuyNftMarketAction({
        address: account,
        transactionHash: txHash,
        nftId: nftidd,
      })
    );
  };
  const BuyNfttt = async () => {
    const amount = parseInt(Web3.utils.toWei(String(0.000011))).toString(16);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    const transactionParameters = {
      nonce: "0x00", // ignored by MetaMask
      gasPrice: "5000000000", // customizable by user during MetaMask confirmation.
      gas: "21000", // customizable by user during MetaMask confirmation.
      to: "0x7D0f339B28A24E094E8FdF824d9283301B8ba5a3", // Required except during contract publications.
      from: account, // must match user's active address.
      value: amount, // Only required to send ether to the recipient from the initiating external account.
      data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
      chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
    };
    // txHash is a hex string
    // As with any RPC call, it may throw an error
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    if (txHash) BuyNftMarket(txHash, account);
  };

  return (
    <>
      <div className="nft__item_action">
        <span onClick={BuyNfttt}>Buy NFT</span>
      </div>
    </>
  );
};

export default BuyNft;
