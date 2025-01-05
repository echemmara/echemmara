mapping(address => bool) public admins;

modifier onlyAdmin() {
    require(admins[msg.sender] == true, "Only admins can perform this action");
    _;
}

function addAdmin(address _admin) public onlyOwner {
    admins[_admin] = true;
}
