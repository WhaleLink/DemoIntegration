// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IPayedTransaction.sol";
import "./IManagingInterface.sol";

/**
 * Interface for the Contract that needs to be called after
 * User recieves money
 */
abstract contract PayedTransaction is ERC165, IPayedTransaction {
    IManagingInterface public paymentManager;
    address public payer;
    address internal controller;

    modifier onlyController() {
        require(
            controller == msg.sender,
            "PayedTransaction: caller is not the controller"
        );
        _;
    }

    constructor(address _paymentManager, address _payer) {
        paymentManager = IManagingInterface(_paymentManager);
        payer = _payer;
        _setController(msg.sender);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == type(IPayedTransaction).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function setPayerWallet(address _payer) external onlyController {
        payer = _payer;
    }

    function setController(address _controller) external onlyController {
        _setController(_controller);
    }

    function getController() external view returns (address) {
        return controller;
    }

    function _setController(address _controller) internal {
        controller = _controller;
    }

    /**
     * Returns allowed payer wallet
     */
    function payerWallet() external view override returns (address) {
        return payer;
    }

    /**
     * This Method is called from Manager
     */
    function creditCardMint(
        address _target,
        uint256 _amount,
        address _payer
    ) external override {
        require(
            paymentManager.isExecutor(msg.sender),
            "PayedTransaction V1 - Wrong Transaction Executor"
        );
        require(
            payer == _payer,
            "PayedTransaction V1 - Payer is wrong address"
        );
        executeMint(_target, _amount);
    }

    /**
     * get the Manager
     */
    function manager() external view override returns (address) {
        return address(paymentManager);
    }

    function executeMint(address target, uint256 amount) internal virtual;
}
