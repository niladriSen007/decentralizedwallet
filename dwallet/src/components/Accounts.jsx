import { useEffect, useState } from "react";
import "./Main.css";

function Accounts({web3,setAddress}) {

  const [allAcccounts,setAllAccounts] = useState([])

  const [provider,setProvider]= useState("None")

  const [bal,setBal] = useState(0)

  const [showAddress,setShowAddress] = useState("Default Account")

  const accounts = async() =>{
   try
   {
    const allAcc = await web3.eth.getAccounts();
    // console.log(allAcc)
    setAllAccounts(allAcc)
    // console.log(allAcccounts)
    setProvider("Gnache")
   }
   catch(e)
   {
    console.log(e);
   }
  }

  const logAcc = async(e) =>{
    setShowAddress(e.target.value)
    setAddress(e.target.value)
    const weiBalance = await web3.eth.getBalance(e.target.value);
    const etherBalance = web3.utils.fromWei(weiBalance,"ether")
    setBal(etherBalance)
  }

  useEffect(()=>{
    accounts()
  },[])
  return (
    <div className=" flex flex-col items-center">
      <form className="label1" id="myForm" >
        <label htmlFor="selectNumber" className="text-xl text-center font-bold py-2">Select an account</label>
        <select className="rounded-sm p-1 border-2 border-gray-500 outline-none bg-slate-800 w-[100%]" id="selectNumber" onChange={logAcc}>
          <option >Select an account</option>
         {
          allAcccounts.map((acc,i)=>(
            <option value={acc} key={i} className="text-slate-100" >{acc}</option>
          ))
         }
        </select>
      </form>
      <span className="conAc font-bold">Connected Account: {showAddress}</span>
      <span className="acBal font-bold py-1">Account Balance: {bal} ether</span>
      <span className="provider font-bold py-1">Provider : {provider}</span>
    </div>
  );
}

export default Accounts;
