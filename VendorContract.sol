// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VendorContract {
    struct Vendor {
        address vendorAddress;
        string name;
        bool isHalalCertified;
    }

    mapping(address => Vendor) public vendors;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addVendor(address _vendor, string memory _name, bool _isHalalCertified) public onlyOwner {
        vendors[_vendor] = Vendor(_vendor, _name, _isHalalCertified);
    }

    function isVendorHalal(address _vendor) public view returns (bool) {
        return vendors[_vendor].isHalalCertified;
    }
}
