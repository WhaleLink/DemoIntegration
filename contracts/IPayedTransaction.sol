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
    function creditCardMint(
        address _target,
        uint256 _amoun,
        address payert
    ) external;

    /**
     * Returns the Payerwallet
     */
    function payerWallet() external view returns (address);

    /**
     * Sets the payerwallet
     *
     * @param _payer The Payerwallet
     */
    function setPayerWallet(address _payer) external;

    /**
     * Get Controller from Wallet
     *
     */

    function getController() external view returns (address);

    /**
     * get the Manager
     */
    function manager() external view returns (address);
}
