// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * Interface for the Contract that needs to be called after
 * User recieves money
 */
interface IPayedTransaction {
    /**
     * This Method is called from the
     */
    function creditCardMint(address _target, uint256 _amount) external;
}
