// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./PayedTransaction.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BaseToken is ERC20, PayedTransaction, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        address _executor
    ) ERC20(name, symbol) PayedTransaction(_executor) {}

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return PayedTransaction.supportsInterface(interfaceId);
    }

    function executeMint(
        address target,
        uint256 amount
    ) internal virtual override {
        _mint(target, amount);
    }
}
