// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract MultiSigWallet {

    uint pricePart = 10e17; // price is 0.1 ETH per share
    uint priceFull = 10e20; // price of a full estate is 100 ETH
    address vault; // specify vault address here
    mapping (address => bool) estates;
    mapping (address => address[]) estatesBuyers;


    // List of clients that have verify there information
    mapping(address => bool) public clients;

    // Events
    event Deposit(address indexed sender, uint amount, uint balance);
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);

    // List of owners of the wallet
    address[] public owners;
    // Mapping to allow for easy checks if someone is an owner
    mapping(address => bool) public isOwner;
    // Number of confirmations required to execute a transaction
    uint8 public numConfirmationsRequired;

    // Tx object
    struct Transaction {
        address to;
        uint value;
        bytes data;
        bool executed;
        uint8 numConfirmations;
    }

    // mapping from tx index => owner => bool
    // use this to check if some transaction is confirmed by some person
    mapping(uint => mapping(address => bool)) public isConfirmed;

    // List of all tracked transactions
    Transaction[] public transactions;

    // Helper functions
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    constructor(address[] memory _owners, uint8 _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    function submitTransaction(
        address _to,
        uint _value,
        bytes memory _data
    ) public onlyOwner {
        uint txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    function confirmTransaction(
        uint _txIndex
    )
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    function executeTransaction(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    function revokeConfirmation(
        uint _txIndex
    ) public onlyOwner txExists(_txIndex) notExecuted(_txIndex) {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    function getTransactionCount() public view returns (uint) {
        return transactions.length;
    }

    function getTransaction(
        uint _txIndex
    )
        public
        view
        returns (
            address to,
            uint value,
            bytes memory data,
            bool executed,
            uint8 numConfirmations
        )
    {
        Transaction storage transaction = transactions[_txIndex];

        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.numConfirmations
        );
    }

    function buyFull(
        address estate,
        uint256 tokenId
    )
        payable public {
            require (clients[msg.sender], "User not registered to the KYC");
            require(msg.value >= priceFull, "Not enough ETH sent.");

            uint256 refund = uint256(msg.value) - uint256(priceFull);
            if (refund != 0) {
                payable(msg.sender).transfer(refund);
            }

            ERC721(estate).safeTransferFrom(address(this), address(msg.sender), tokenId, "");
            payable(vault).transfer(msg.value - refund);
    }

    function buyPart(
        address estate
    )
        payable public {
            require (clients[msg.sender], "User not registered to the KYC");

            uint256 available = ERC1155(estate).balanceOf(address(this), 1);
            uint256 amount = uint256(msg.value)/uint256(pricePart);
            uint256 refund = uint256(msg.value)%uint256(pricePart);

            require(amount != 0, "Insufficient amount of ETH sent! Price is 0.1 ETH per share.");
            require(amount <= available, "Too few shares available.");

            if (refund != 0) {
                payable(msg.sender).transfer(refund);
            }

            if (!estates[estate]) {
                estates[estate] = true;
            }
            ERC1155(estate).safeTransferFrom(address(this), msg.sender, 1, amount, "");
            payable(vault).transfer(msg.value - refund);
            estatesBuyers[estate].push(msg.sender);
    }

    function deletePart(
        address estate
    )
        external onlyOwner {
            estates[estate] = false;
            delete estatesBuyers[estate];
    }

    function updateClientsKYC(
        address[] calldata clientsToAdd,
        address[] calldata clientsToRemove
    ) external onlyOwner {
        /**
        * Update the list of user that are KYC or not.
         */
        // Add clients
        for (uint i = 0; i < clientsToAdd.length; i++) {
            if (! clients[clientsToAdd[i]]) {
                clients[clientsToAdd[i]] = true;
            }
        }

        // Remove clients
        for (uint i = 0; i < clientsToRemove.length; i++) {
            if (clients[clientsToRemove[i]]){
                delete clients[clientsToRemove[i]];
            }
        }
    }

}