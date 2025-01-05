const approveVendor = async (vendorAddress) => {
  try {
    await contract.methods.approveVendor(vendorAddress).send({ from: account });
    alert("Vendor approved!");
  } catch (error) {
    console.error(error);
    alert("Approval failed!");
  }
};
