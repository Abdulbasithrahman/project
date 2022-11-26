import React, { useEffect, useState } from 'react';
import './Overlay.css'
import Widthdraw from '../withdraw/Widthdraw';
import Deposit from '../deposit/Deposit';
import History from '../history/History';
import Logout from '../logout/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import './Home.css'

const Home = () => {
  

  
  //initialization
  const initialHistory = {
    id: null,
    amount: 0,
    payout: "cash",
    sucuess: "",
    description: "",
    transaction: "",
    balance: "",
    timestamp: ""
  };

  const navigate = useNavigate();

  const date = new Date().toLocaleDateString();

  const userName = JSON.parse(localStorage.getItem("user"));

  //states
  const [time, setTime] = useState(new Date().toLocaleTimeString())

  const [historysHide, setHistorysHide] = useState(false);

  const [historys, setHistorys] = React.useState([]);

  const [depositHide, setDepositHide] = useState(false);

  const [widthdrawHide, setWidthdrawHide] = useState(false);

  const [btnWitdrawHide, setBtnWitdrawHide] = useState(false);

  const [account, setAccount] = React.useState({
    accountNumber: userName.accountnumber,
    currentAmount: 0
  });

  //useEffects

  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  }, []);
  
  //setStates

  const DepositHide = () => {
    setDepositHide(!depositHide);
    setWidthdrawHide(false);
    setHistorysHide(!historysHide)
  }

  const WidthdrawHide = () => {
    setDepositHide(false);
    setWidthdrawHide(!widthdrawHide);
    setHistorysHide(!historysHide)
  }

  const eligibleWithdrawBtn = (value) => {
    if (parseInt(account.currentAmount) + parseInt(value) > 0) {
      setBtnWitdrawHide(true);
    } else {
      setBtnWitdrawHide(false);
    }
  }

  //functions
  
  const addDeposit = (value) => {
    setAccount({ ...account, currentAmount: parseInt(account.currentAmount) + parseInt(value) });
  }

  const addWithdraw = (value) => {
    if (account.currentAmount < parseInt(value)) {
      toast.error('Insufficient Balance!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      value.stopPropagation();
    } else {
      setAccount({ ...account, currentAmount: parseInt(account.currentAmount) - parseInt(value) });
    }
  }
  const historysRevData =(historys)=>{
    let data=[];
    for(let i=historys.length-1;i>=0;i--){
       data.push(historys[i]);
    }
    return data;
  };
  const addHistory = (history, Mode) => {
    history.id = historys.length + 1;
    history.sucuess = true;
    history.transaction = Mode;
    history.timestamp = new Date();
    { Mode === "Credited" ? history.balance = parseInt(history.amount) + parseInt(account.currentAmount) : history.balance = parseInt(account.currentAmount) - parseInt(history.amount); }
    setHistorys([...historys, history]);
  }
  
  if (depositHide) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (

    <div className='home-page'>
      <div className='header'>
        <img className='icon2' src='icon.png' alt='photo' />
        <h1 className='header-letter-3'>GCI</h1>
        <Logout />
      </div>
      <div className='welcome-header'>
        <h2 className='welcome'>Account Number:</h2><h2 className='detail' >{userName.accountnumber}</h2>
      </div>
      <div className='welcome-header1'>
        <h3 className='welcome'>Welcome to GCI -</h3><h3 className='detail1'> {userName.firstname}</h3><div className='date'><p>Date:</p><p>{date}</p></div>
      </div>
      <div className='welcome-header1'>
        <h5 className='welcome'>Account Balance:</h5><h5 className='detail1' >Rs.{account.currentAmount}/-</h5><div className='date'><p>Time:</p><p>{time}</p></div>
      </div>
      <div className='buttons'>
        <button className='btn btn-success btn-modal' onClick={DepositHide}>Deposit</button>
        {account.currentAmount !== 0 ? <button className='btn btn-warning btn-modal' onClick={WidthdrawHide}>Widthdraw</button> : <button className='btn btn-warning btn-modal' disabled>Widthdraw</button>}
      </div>
      {depositHide ? <Deposit buttonClass="close-modal" overlay="overlay"
        addHistory={addHistory} hide={DepositHide} balance={addDeposit}
        checkWidthdraw={eligibleWithdrawBtn} /> : null}
      {widthdrawHide ? <Widthdraw buttonClass="close-modal" overlay="overlay" addHistory={addHistory} hide={WidthdrawHide} balance={addWithdraw} /> : null}
      {historys.length > 0 ? <History data={historysRevData(historys)} account={account} /> : null}
      <ToastContainer />
    </div>
  )
}

export default Home
