function withdrawFunds() public {
    uint256 balance = vendorBalances[msg.sender];
    require(balance > 0, "No funds to withdraw");
    vendorBalances[msg.sender] = 0;
    payable(msg.sender).transfer(balance);
}
