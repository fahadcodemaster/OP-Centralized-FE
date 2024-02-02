
import axios from "axios";
import React, { useEffect, useState } from "react"
import { sendToken } from "../../Redux/Actions/WalletActions/WalletAction";
import Footer from "../components/footer";
import getStakingAction from "../../Redux/Actions/stake_action/getStaking";
import getStakingHistoryAction from "../../Redux/Actions/stake_action/getStakingHistory";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import detectEthereumProvider from "@metamask/detect-provider";
import http from "../../Redux/Api/http";
import { ToastContainer, toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Web3 from "web3";
import moment from "moment";
import { PulseLoader } from "react-spinners";


const AddStake = () => {
    const WalletAddress = useSelector(
        (state) => state.WalletConnction?.WalletResponse?.accounts
      );
    // const checkBalance = async () => {
    //     const provider = await detectEthereumProvider()

    //     if (provider !== window.ethereum) {
    //         window.web3 = new Web3(provider)
    //     } else {
    //         window.web3 = new Web3(window.ethereum)
    //     }

    //     let tokenAddress = "0x9Ce7B893A8aBe688803121e1bcCc68D069C01f51";
    //     let walletAddress = "0x0a8b0ae65a7062F6BdFD5e4C577E5CC3629971A5";

    //     // The minimum ABI to get ERC20 Token balance
    //     let minABI = [
    //         // balanceOf
    //         {
    //             "constant": true,
    //             "inputs": [{ "name": "_owner", "type": "address" }],
    //             "name": "balanceOf",
    //             "outputs": [{ "name": "balance", "type": "uint256" }],
    //             "type": "function"
    //         },
    //         // decimals
    //         {
    //             "constant": true,
    //             "inputs": [],
    //             "name": "decimals",
    //             "outputs": [{ "name": "", "type": "uint8" }],
    //             "type": "function"
    //         }
    //     ];

    //     // Get ERC20 Token contract instance



    //     // var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));

    //     let contract = new window.web3.Contract(minABI).at(tokenAddress);

    //     // Call balanceOf function
    //     contract.balanceOf(walletAddress, (error, balance) => {
    //         // Get decimals
    //         contract.decimals((error, decimals) => {
    //             // calculate a balance
    //             balance = balance.div(10 ** decimals);
    //             console.log(balance.toString());
    //         });
    //     });
    // }




    // useEffect(() => {
    //     checkBalance()
    // }, [])

    const [isStakeOpen, setIsStakeOpen] = useState(false)
    const [isUnstakeOpen, setIsUnstakeOpen] = useState(false)
    const [isUnstakeRewardOpen, setIsUnstakeRewardOpen] = useState(false)
    const [stakeAmount, setStakeAmount] = useState()
    const [unStakeAmount, setUnstakeAmount] = useState()
    const [unStakeRewardAmount, setUnstakeRewardAmount] = useState()
    const [stakeAmountError, setStakeAmountError] = useState(false)
    const [stakeAmountErrorMessage, setStakeAmountErrorMessage] = useState("")
    const [unStakeAmountError, setunStakeAmountError] = useState(false)
    const [unStakeAmountErrorMessage, setUnstakeAmountErrorMessage] = useState("")
    const [unStakeRewardAmountError, setunStakeRewardAmountError] = useState(false)
    const [isInterval, setIsInterval] = useState(false);
    const [stakeLoading, setStakingLoading] = useState(false);
    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setSeconds] = useState()
    const [unStakeRewardAmountErrorMessage, setUnstakeRewardAmountErrorMessage] = useState("")
    const [DSCToekns, setDSCToekns] = useState(0)
    const dispatch = useDispatch()
    const baseUrl = process.env.REACT_APP_DEVELOPMENT_URL;
    const stakeState = useSelector((state) => state.getStaking?.payload?.data)
    const stakingHistoryState = useSelector((state) => state.getStakingHistory?.payload?.data)


    useEffect(() => {

    if (stakeState && !isInterval) {
      const eventTime = moment(stakeState?.expiryDate).unix();
      
      const currentTime = moment().unix();
      const diffTime = eventTime - currentTime;
      let duration = moment.duration(diffTime * 1000, "milliseconds");
    
      const interval = 1000;
      setInterval(() => {
        setIsInterval(true);
        if (duration._milliseconds <= 0) {
          
          setDays("0");
          setHours("0");
          setMinutes("0");
          setSeconds("0");
        } else {
          duration = moment.duration(duration - interval, "milliseconds");
          setDays(duration.days());
          setHours(duration.hours());
          setMinutes(duration.minutes());
          setSeconds(duration.seconds());
          // console.log(duration.days() + ":" + duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
        }
      }, interval);
    }
  }, [stakeState]);

    const toggleStake = () => {
        setIsStakeOpen(!isStakeOpen)
    }
    const toggleUnstake = () => {
        setIsUnstakeOpen(!isUnstakeOpen)
    }

    const toggleUnstakeReward = () => {
        setIsUnstakeRewardOpen(!isUnstakeRewardOpen)
    }


    const handeStakeAmountChange = (e) => {
        const { value } = e.target
        console.log(value)
        console.log(DSCToekns)
        console.log(typeof value)
        console.log(typeof DSCToekns)
        if (value <= 0) {
            setStakeAmountErrorMessage("Amount must be greater than 0")
            setStakeAmountError(true)
        }
        else if (parseInt(value) > parseInt(DSCToekns)) {
            setStakeAmountErrorMessage("You don't have enough DSC tokens")
            setStakeAmountError(true)
        }
        else {
            setStakeAmountError(false)
        }
        setStakeAmount(value)
    }
    const handelUnstakeAmountChange = (e) => {
        const { value } = e.target
        if (value <= 0) {
            setUnstakeAmountErrorMessage("Amount must be greater than 0")
            setunStakeAmountError(true)
        }
        else {
            setunStakeAmountError(false)
        }
        setUnstakeAmount(value)
    }

    useEffect(() => {
        dispatch(getStakingAction())
        dispatch(getStakingHistoryAction())

        let timer = setInterval(() => {
            dispatch(getStakingAction())
            dispatch(getStakingHistoryAction())
        }, 2000)

        return () => clearInterval(timer);

    }, []);

    const handelUnstakeRewardAmountChange = (e) => {
        const { value } = e.target
        if (value <= 0) {
            setUnstakeRewardAmountErrorMessage("Amount must be greater than 0")
            setunStakeRewardAmountError(true)
        }
        else {
            setunStakeRewardAmountError(false)
        }
        setUnstakeRewardAmount(value)
    }


    const unstakeAmountFunc = () => {
        console.log("ttttttttttttttt", unStakeAmount);
        if (!unStakeAmount > 0) return
        http.post(baseUrl + "/api/v1/stacking/withdrawStacking", {
            amount: unStakeAmount
        }).then(resp => {
            toggleUnstake()
            if (resp.data.isSuccess) {
                toast.success("Staking is done", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error(resp.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }


        }).catch(error => {
            toggleUnstake()
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        })
    }

    const unstakeRewardAmountFunc = () => {
        if (!unStakeRewardAmount > 0) return
        http.post(baseUrl + "/api/v1/stacking/withdrawReward", {
            amount: unStakeRewardAmount
        }).then(resp => {
            toggleUnstakeReward()
            if (resp.data.isSuccess) {
                toast.success("Unstake reward done successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
            else {
                toast.error(resp.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(error => {
            toggleUnstakeReward()
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });

        })
    }

    const checkBalance = async () => {
        const provider = await detectEthereumProvider()
        if (provider !== window.ethereum) {
            window.web3 = new Web3(provider)
        } else {
            window.web3 = new Web3(window.ethereum)
        }
        let tokenAddress = "0x9Ce7B893A8aBe688803121e1bcCc68D069C01f51";
        let walletAddress = WalletAddress;
        
        const minABI = [
            {
                constant: true,
                inputs: [{ name: "_owner", type: "address" }],
                name: "balanceOf",
                outputs: [{ name: "balance", type: "uint256" }],
                type: "function",
            },
        ];
        const contract = new window.web3.eth.Contract(minABI, tokenAddress);
        const result = await contract.methods.balanceOf(walletAddress).call(); 
        const format = window.web3.utils.fromWei(result);
        setDSCToekns(format)
    }
    useEffect(() => {
        checkBalance()
    }, [])


    const addStaking = async () => {
        if (stakeAmountError) return
        setStakingLoading(true)
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const payload = {
            tokenAddress: "0x9Ce7B893A8aBe688803121e1bcCc68D069C01f51",
            from: accounts[0],
            to: "0x70490Ade9aCB340646FdCcee7D53531B52d0A71a",
            value: stakeAmount,
        };
        sendToken(payload)
            .then((transectionHash) => {
                axios.post(baseUrl + "/api/v1/stacking/addStacking",
                    {
                        // "address": accounts[0],
                        "amount": stakeAmount,
                        "txHash": transectionHash,
                        "currencyId": 9,
                        "chainId": 97
                    }
                ).then((resp) => {
                    setDSCToekns(DSCToekns-stakeAmount)

                    if (resp.data.isSuccess) {
                        setStakingLoading(false)
                        toast.success("Staking is done", {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                        });
                        toggleStake()
                    }
                    else {
                        toggleStake()
                    }

                }).catch(() => {
                    toggleStake()
                    setStakingLoading(false)
                })
            })
            .catch((error) => {
                toggleStake()
                setStakingLoading(false)

            });
    };
    return (<>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
        />
        <section className="container stake-vault-panel" style={{ marginTop: 100 }}>
            <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-center">
                    <a class="reg-btn blue big" href="#" onClick={toggleStake}>Stake In Vault</a>
                </div>
                {isStakeOpen &&
                    <section className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 mb-5">

                                <h2 style={{ color: "black" }}>Stake In Vault</h2>
                                <h5 style={{ color: "black" }}>Available DSC tokens : {DSCToekns ? DSCToekns : 0}</h5>
                                <div className="spacer-single"></div>
                                <h5 className="text-dark">Enter DSC tokens for stake</h5>
                                <input
                                    type="number"
                                    onChange={handeStakeAmountChange}
                                    value={stakeAmount}
                                    name="item_title"
                                    id="item_title"
                                    className="form-control"
                                    placeholder="0"
                                // placeholder="e.g. 'Crypto Funk'"
                                />
                                {stakeAmountError &&
                                    <div className="text-red">{stakeAmountErrorMessage}</div>
                                }
                                {stakeLoading ? (
                                    <button
                                    disabled
                                    style={{
                                      backgroundColor: "#02AAB0",
                                      borderRadius: 20,
                                      height: 40,
                                      width: 80,
                                      borderWidth: 0,
                                    }}
                                  >
                                    <PulseLoader color="white" size="11" />
                                  </button>
                                ): (
                                <div className="col-md-12 col-lg-12 col-sm-12 col-12 mt-3">
                                    <button class="reg-btn blue big" onClick={addStaking}>Stake</button>
                                </div>
                                )}
                                
                            </div>


                        </div>
                    </section>}

                <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-center">
                    <a class="reg-btn grey big m-b-10" href="#" onClick={toggleUnstake}>Unstake From Vault</a>
                </div>

                {isUnstakeOpen &&
                    <section className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 mb-5">
                                <h2 style={{ color: "black" }}>Unstake from Vault</h2>
                                <div className="spacer-single"></div>
                                <h5 className="text-dark">Enter DSC tokens to unstake</h5>
                                <input
                                    type="number"
                                    onChange={handelUnstakeAmountChange}
                                    value={unStakeAmount}
                                    name="item_title"
                                    id="item_title"
                                    className="form-control"
                                    placeholder="0"
                                // placeholder="e.g. 'Crypto Funk'"
                                />
                                {unStakeAmountError &&
                                    <div className="text-red">{unStakeAmountErrorMessage}</div>
                                }
                                <div className="col-md-12 col-lg-12 col-sm-12 col-12 mt-3">
                                    <button class="reg-btn blue big" onClick={unstakeAmountFunc}>Unstake</button>
                                </div>
                            </div>
                        </div>
                    </section>}



                <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-center">
                    <a class="reg-btn grey big m-b-10" href="#" onClick={toggleUnstakeReward}>Unstake Reward</a>
                </div>

                {isUnstakeRewardOpen &&
                    <section className="container">
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 mb-5">
                                <h2 style={{ color: "black" }}>Unstake from Vault</h2>
                                <div className="spacer-single"></div>
                                <h5 className="text-dark">Enter DSC tokens to reward unstake</h5>
                                <input
                                    type="number"
                                    onChange={handelUnstakeRewardAmountChange}
                                    value={unStakeRewardAmount}
                                    name="item_title"
                                    id="item_title"
                                    className="form-control"
                                    placeholder="0"
                                // placeholder="e.g. 'Crypto Funk'"
                                />
                                {unStakeRewardAmountError &&
                                    <div className="text-red">{unStakeRewardAmountErrorMessage}</div>}

                                <div className="col-md-12 col-lg-12 col-sm-12 col-12 mt-3">
                                    <button class="reg-btn blue big" onClick={unstakeRewardAmountFunc}>Unstake</button>
                                </div>
                            </div>
                        </div>
                    </section>}








                <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                    <ul className="total-stake-list">
                        <li>
                            <p>
                                Amount{": "}
                                <span>{stakeState?.amount ? stakeState?.amount: 0}</span>
                            </p>
                        </li>
                        <li>
                            <p>
                                Reward Amount{": "}
                                <span>{stakeState?.rewardAmount ? stakeState?.rewardAmount: 0}</span>
                            </p>
                        </li>
                        <li>


                            <p>
                                Address{": "}
                                <span>{
                                    stakeState?.address.length > 10
                                        ? stakeState?.address.substring(0, 12) +
                                        "..." : stakeState?.address
                                }</span>
                                <CopyToClipboard
                                    text={stakeState?.address}
                                    onCopy={() => {

                                        toast.success("Address copied successfully", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: true,
                                            progress: undefined,
                                        });
                                    }}
                                >
                                    <button
                                        id="btn_copy"
                                        title="Copy Address"
                                    >
                                        Copy
                                    </button>
                                </CopyToClipboard>
                            </p>
                        </li>
                        <li>
                            <p>
                                User Name{": "}
                                <span>{stakeState?.userName}</span>


                            </p>
                        </li>
                        <li>
                            <p>
                                Expiry Date{": "}
                                <span>{(days ? days: 0) + "days " + (hours ? hours: 0) + "hours " + (minutes ? minutes: 0) + "mins "+ (seconds ? seconds: 0) + "seconds"}</span>

                            </p>
                        </li>
                    </ul>
                </div>
                {/* <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                    <ul className="my-profile-details-list list-view">
                        <li class="head">
                            <p>Offers</p>
                            <span><i className="fa fa-angle-down"></i></span>
                        </li>
                        <li className="brdr">
                            <div className="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Tx Hash
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Amount
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Status
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Transaction Status Type
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Actual Amount
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Created At
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">0.15BNB</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">$79.5</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">in 19 hours</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">hassan</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">hassan</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">hassan</div>
                            </div>
                        </li>
                    </ul>
                </div> */}
                <div className="col-md-12 col-lg-12 col-sm-12 col-12 text-center">
                    <h2 className="style-2 txt-dark text-center">Statistics</h2>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 col-12">
                    <ul className="my-profile-details-list list-view">
                        <li class="head">
                            <p>Offers</p>
                            <span><i className="fa fa-angle-down"></i></span>
                        </li>
                        <li className="brdr">
                            <div className="row">
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Tx Hash
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Amount
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Transaction Status Type
                                </div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Status
                                </div>


                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Actual Amount
                                </div>

                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">
                                    Created At
                                </div>
                            </div>
                        </li>

                        {stakingHistoryState?.map((item, index) => <li key={index}>
                            <div class="row" >
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{

                                    item?.txHash.length > 10
                                        ? item?.txHash.substring(0, 6) +
                                        "..." +
                                        item?.txHash.slice(-6)
                                        : item?.txHash
                                }</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{item.amount}</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{item.transactioStatusType}</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{item.status}</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{item.actualAmount}</div>
                                <div className="col-md-2 col-lg-2 col-sm-2 col-2">{item.createdAt.split("T")[0]}</div>
                            </div>
                        </li>)}

                    </ul>
                </div>
            </div>
        </section>
        <Footer />
    </>
    )

}


export default AddStake
