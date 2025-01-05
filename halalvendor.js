import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import VendorContract from './abis/Vendor.json';

const HalalVendor = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = VendorContract.networks[networkId];
      if (networkData) {
        const abi = VendorContract.abi;
        const address = networkData.address;
        const contractInstance = new web3.eth.Contract(abi, address);
        setContract(contractInstance);
      } else {
        alert('Smart contract not deployed to detected network.');
      }
    };

    loadBlockchainData();
  }, []);

  const addVendor = async (name, isHalalCertified) => {
    await contract.methods.addVendor(account, name, isHalalCertified).send({ from: account });
    loadVendors();
  };

  const loadVendors = async () => {
    // Logic to fetch vendors
  };

  return (
    <div>
      <h2>Halal Vendors</h2>
      <button onClick={() => addVendor("Vendor Name", true)}>Add Vendor</button>
      <ul>
        {vendors.map((vendor, index) => (
          <li key={index}>{vendor.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HalalVendor;
