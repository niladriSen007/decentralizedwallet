import { useState } from "react";
import "./Main.css";

function SendEther({web3,account}) {

  const [receipt,setReceipt] = useState({})

  const [formData,setFormData]= useState({
    receiver:"",
    amount:0, 
  })

  const sendEther = (e) =>{
    e.preventDefault();
    const _to = formData.receiver;
    const _ethVal = formData.amount;
    const _weiVal = web3.utils.toWei(_ethVal,"ether");
    web3.eth.sendTransaction({
      from:account,
      to:_to,
      value:_weiVal,
    }).then(function(rec){
      setReceipt(rec)
      console.log(rec)
      setFormData({
        receiver:"",
        amount:0
      })
    })
  }

  const handleChange =(e) =>{
    e.preventDefault();
  setFormData(prevData=>{
    return{
      ...prevData,
      [e.target.name]:e.target.value,
    }
  })
  }

  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label ">
          <label htmlFor="" className=" font-bold py-1">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to" name="receiver" onChange={handleChange} value={formData.receiver}></input>
        </p>

        <p className="label">
          <label htmlFor="" className="font-bold py-1">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value" name="amount" onChange={handleChange} value={formData.amount}></input>
        </p>
        <button className=" p-2 bg-blue-400 font-bold rounded-lg mt-3" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          {receipt
           &&
           <h3>Json Response</h3>}
           <code>{receipt && JSON.stringify(receipt,["blockHash","blockNumber","from","gasUsed","to","transactionHash"],2)}</code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
