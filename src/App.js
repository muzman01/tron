import { React, useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import utils from './utils';
import TronWeb from "tronweb"

const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://nile.trongrid.io/");
const solidityNode = new HttpProvider("https://nile.trongrid.io/");
const eventServer = new HttpProvider("https://nile.trongrid.io/");
const privateKey = "";
const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey
);

function App() {
  const [myMessage, setMyMessage] = useState(<h3> LOADING.. </h3>);
  const [myDetails, setMyDetails] = useState({
    name: 'none',
    address: 'none',
    balance: 0,
    frozenBalance: 0,
    network: 'none',
    link: 'false',
  });

  const getBalance = async () => {
    //if wallet installed and logged , getting TRX token balance
    if (window.tronWeb && window.tronWeb.ready) {
      let walletBalances = await window.tronWeb.trx.getAccount(
        window.tronWeb.defaultAddress.base58
      );
      return walletBalances;
    } else {
      return 0;
    }
  };


    // window.tronWeb.contract.transfer("TSovXp2sCJs4XMksmyRKE2Wyme9ddFyK7Z", "1").send({
    //       shouldPollResponse: true,
    //       callValue: 0
    //   }).then(res => console.log("başarılı").catch(err => console.log("hatalı")));
    async function triggerSmartContract() {
      const trc20ContractAddress = "TGJEkR9HoMWSAmLNv6R5mX2swJ1pEG9thB";//contract address
      var address = "TSovXp2sCJs4XMksmyRKE2Wyme9ddFyK7Z";
      const accBalance = await getBalance()
      const lastbanalce =  tronWeb.trx.getBalance('TSovXp2sCJs4XMksmyRKE2Wyme9ddFyK7Z').then(result => console.log(result))
      console.log(accBalance.__payload__);
    
      // if(lastbanalce < 1){
      //   console.log("coinin yok");
      // }else{
      //   try {
      //     let contract = await tronWeb.contract().at(trc20ContractAddress);
      //     //Use send to execute a non-pure or modify smart contract method on a given smart contract that modify or change values on the blockchain.
      //     // These methods consume resources(bandwidth and energy) to perform as the changes need to be broadcasted out to the network.
      //     let result = await contract.transfer(
      //         "TSovXp2sCJs4XMksmyRKE2Wyme9ddFyK7Z", //address _to
      //         1000000   //amount
      //     ).send({
      //         feeLimit: 1000000
      //     }).then(output => {console.log('- Output:', output, '\n');});
      //     console.log('result: ', result);
      // } catch(error) {
      //     console.error("trigger smart contract error",error)
      // }
      // }
      // tronWeb.trx.sendToken("TK96qi3vfgAyknBgMSMCm5RYjWDdEdnJFd",1000,'1000');
      const privateKey = 'df7667823943deb71d14cefaa9ad5e591f831cc0b67f67b15756ff95cf47a96a' 
      var fromAddress = "TSovXp2sCJs4XMksmyRKE2Wyme9ddFyK7Z"; //address _from
      var toAddress = "TK96qi3vfgAyknBgMSMCm5RYjWDdEdnJFd"; //address _to
      var amount = 10000000; //amount
      //Creates an unsigned TRX transfer transaction
     const tradeobj = await tronWeb.transactionBuilder.sendTrx(
            toAddress,
            amount,
            fromAddress
      );
      const signedtxn = await tronWeb.trx.sign(
            tradeobj,
            privateKey
      );
      const receipt = await tronWeb.trx.sendRawTransaction(
            signedtxn
      );
      console.log('- Output:', receipt, '\n');
 
  }
  

  const getWalletDetails = async () => {
    if (window.tronWeb) {
      //checking if wallet injected
      if (window.tronWeb.ready) {
        let tempBalance = await getBalance();
        let tempFrozenBalance = 0;

        if (!tempBalance.balance) {
          tempBalance.balance = 0;
        }

        //checking if any frozen balance exists
        // if (
        //   !tempBalance.frozen &&
        //   !tempBalance.account_resource.frozen_balance_for_energy
        // ) {
        //   tempFrozenBalance = 0;
        // } else {
        //   if (
        //     tempBalance.frozen &&
        //     tempBalance.account_resource.frozen_balance_for_energy
        //   ) {
        //     tempFrozenBalance =
        //       tempBalance.frozen[0].frozen_balance +
        //       tempBalance.account_resource.frozen_balance_for_energy
        //         .frozen_balance;
        //   }
        //   if (
        //     tempBalance.frozen &&
        //     !tempBalance.account_resource.frozen_balance_for_energy
        //   ) {
        //     tempFrozenBalance = tempBalance.frozen[0].frozen_balance;
        //   }
        //   if (
        //     !tempBalance.frozen &&
        //     tempBalance.account_resource.frozen_balance_for_energy
        //   ) {
        //     tempFrozenBalance =
        //       tempBalance.account_resource.frozen_balance_for_energy
        //         .frozen_balance;
        //   }
        // }

        //we have wallet and we are logged in
        setMyMessage(<h3>WALLET CONNECTED</h3>);
        setMyDetails({
          name: window.tronWeb.defaultAddress.name,
          address: window.tronWeb.defaultAddress.base58,
          balance: tempBalance.balance / 1000000,
          frozenBalance: tempFrozenBalance / 1000000,
          network: window.tronWeb.fullNode.host,
          link: 'true',
        });
      } else {
        //we have wallet but not logged in
        setMyMessage(<h3>WALLET DETECTED PLEASE LOGIN</h3>);
        setMyDetails({
          name: 'none',
          address: 'none',
          balance: 0,
          frozenBalance: 0,
          network: 'none',
          link: 'false',
        });
      }
    } else {
      //wallet is not detected at all
      setMyMessage(<h3>WALLET NOT DETECTED</h3>);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      getWalletDetails();
      //wallet checking interval 2sec
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="App">
      <div className="Card">
        <h1> TRON WALLET & REACT INTEGRATION </h1>
        <div className="Logo">
        <img
          src={logo}
          alt="logo"
        />

        </div>
        <div className="Stats">
          {myMessage}
          <h4>Account Name: {myDetails.name} </h4>
          <h4>My Address: {myDetails.address}</h4>
          <h4>
            Balance: {myDetails.balance} TRX (Frozen:{' '}
            {myDetails.frozenBalance} TRX)
          </h4>
          <h4>Network Selected: {myDetails.network}</h4>
          <h4>Link Established: {myDetails.link}</h4>
          <button onClick={triggerSmartContract}>gönder</button>
        </div>
        <footer>
          <p>V 0.03 / 2022 &copy; BLOKFİELD</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

// transfer blogu




// const TronWeb = require('tronweb');
// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider('https://api.shasta.trongrid.io');
// const solidityNode = new HttpProvider('https://api.shasta.trongrid.io');
// const eventServer = 'https://api.shasta.trongrid.io';

// const privateKey = ''; //PK of sending account


// const sunAmount 		= 1000000; // 1 TRX
// const sendToAddress	    = '';      //receiving address of the receiving account

// const tronWeb = new TronWeb(
// 	fullNode,
// 	solidityNode,
// 	eventServer,
// 	// privateKey
// );
// tronWeb.setPrivateKey(privateKey);

// tronWeb.trx.sendTransaction(sendToAddress, sunAmount, privateKey, function(err, retObj){
// 	if (err){
// 		console.log('ERROR: '+err);
// 	}else if (retObj){
// 		console.log('SUCCEED:\t')+retObj.transaction.txID);
// 		// console.log(retObj);
// 	}
// });