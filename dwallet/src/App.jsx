import { useState, useEffect } from "react";
import Web3 from "web3";
import Welcome from "./components/Welcome.jsx";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);

  const [account,setAccount] = useState(null)

  const setAddress = (address) => {
    setAccount(address)
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = new Web3("http://127.0.0.1:7545");
        setWeb3(web3);
        // console.log(state);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);
  return (
    <div className="Flex py-12 bg-slate-900 w-full h-screen text-white">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        <Accounts web3={web3} setAddress={setAddress}/>
      </div>

      <div>
        <SendEther web3={web3} account={account}/>
      </div>
    </div>
  );
};
export default App;
