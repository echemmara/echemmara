const purchaseItem = async (vendorAddress, amount) => {
  if (contract) {
    try {
      await contract.methods.purchaseItem(vendorAddress).send({
        from: account,
        value: Web3.utils.toWei(amount, "ether"), // Convert amount to Wei
      });
      alert("Purchase successful!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed!");
    }
  }
};
