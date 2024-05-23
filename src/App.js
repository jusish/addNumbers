import React, { useState, useEffect } from "react";
import Web3 from "web3";
import AdditionABI from "./Addition.json";
function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [sum, setSum] = useState("");


  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
      }
    }
    initWeb3();
  }, []);



  useEffect(() => {
    if (web3) {
      const networkId = 5777; // Ganache network id
      const deployedNetwork = AdditionABI.networks[networkId];
      const contractAddress = "0x2d4FBf946A3D15ce6E9db9c70D1E1d69e0B1BC7B"
      if (deployedNetwork) {
        const contractInstance = new web3.eth.Contract(
          AdditionABI.abi,
          contractAddress
        );
        setContract(contractInstance);
      } else {
        console.error("Contract not deployed to the specified network");
      }
    }
  }, [web3]);
  const addNumbers = async () => {
    if (contract) {
      try {
        await contract.methods
          .addTwoNumbers(parseInt(number1), parseInt(number2))
          .send({ from: '0x7b4D5114D07081516EAa4D77E6D9299ccC28D823' });
        const sumBigInt = await contract.methods.displaySum().call();
        const sumNumber = parseInt(sumBigInt.toString()); // Convert BigInt to number
        setSum(sumNumber.toString());
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <div>
      <h1>Number Adder</h1>
      <input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
        placeholder="Enter number 1"
      />
      <input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
        placeholder="Enter number 2"
      />
      <button onClick={addNumbers}>Add</button>
      <p>Number 1: {number1}</p>
      <p>Number 2: {number2}</p>
      <p>Sum: {sum}</p>
    </div>
  );
}
export default App;