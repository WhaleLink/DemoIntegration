// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PayedTransaction.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseNFT is ERC721, PayedTransaction, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private nftCounter;

    mapping(address => uint256) purchased;

    constructor(
        string memory name,
        string memory symbol,
        address executor,
        address payer
    ) ERC721(name, symbol) PayedTransaction(executor, payer) {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(PayedTransaction, ERC721) returns (bool) {
        return
            PayedTransaction.supportsInterface(interfaceId) ||
            ERC721.supportsInterface(interfaceId);
    }

    function executeMint(
        address target,
        uint256 amount
    ) internal virtual override {
        require(
            amount < 6,
            "BaseNFT: Maximum amount purchase in one call exeeded."
        );
        require(
            purchased[target] + amount < 6,
            "BaseNFT: Maximum amount per wallet reached."
        );

        for (uint i = 0; i < amount; i++) {
            nftCounter.increment();
            _mint(target, nftCounter.current());
        }
    }
}
