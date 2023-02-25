// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

/**
 * Interface for the Contract that needs to be called after
 * User recieves money
 */
interface IManagingInterface {
    /**
     * This Method is called from the
     */
    function isExecutor(address executor) external view returns (bool);
}
