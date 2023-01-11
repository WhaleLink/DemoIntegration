// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "./IPayedTransaction.sol";

/**
 * Interface for the Contract that needs to be called after
 * User recieves money
 */
abstract contract PayedTransaction is ERC165, IPayedTransaction {
    address transactionExecutor;

    constructor(address _transactionExecutor) {
        transactionExecutor = _transactionExecutor;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(IPayedTransaction).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    /**
     * This Method is called from the
     */
    function creditCardMint(
        address _target,
        uint256 _amount
    ) external override {
        require(
            msg.sender == transactionExecutor,
            "PayedTransaction - Wront Transaction Executor"
        );
        executeMint(_target, _amount);
    }

    function executeMint(address target, uint256 amount) internal virtual;
}
