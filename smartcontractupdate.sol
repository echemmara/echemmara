mapping(address => uint256) public vendorBalances;

function purchaseItem(address _vendor) public payable {
    require(msg.value > 0, "Payment required");
    require(vendors[_vendor].vendorAddress == _vendor, "Vendor does not exist");

    vendorBalances[_vendor] += msg.value;
}
