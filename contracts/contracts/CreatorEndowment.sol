// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperAgreement} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperAgreement.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorEndowment is Ownable {
    ISuperfluid private _host;
    IInstantDistributionAgreementV1 private _ida;
    ISuperToken public streamingToken;

    address public creator;
    uint32 public constant INDEX_ID = 0;
    event RevenueDistributed(uint256 amount, uint256 timestamp);

    constructor(address host, address token) Ownable(msg.sender) {
        _host = ISuperfluid(host);
        streamingToken = ISuperToken(token);
        creator = msg.sender;

        _tryInitializeIdaReference();
    }

    function initializeIDA() external onlyOwner {
        require(address(_ida) == address(0), "IDA already initialized");

        ISuperAgreement idaContract = _host.getAgreementClass(
            keccak256("org.superfluid-finance.agreements.InstantDistributionAgreement.v1")
        );
        require(address(idaContract) != address(0), "No IDA agreement found on host");
        _ida = IInstantDistributionAgreementV1(address(idaContract));
    }

    function addBacker(address backer, uint128 units) external {
        _ensureIdaInitialized();

        // Attempt to create the publisher index each time. If it already exists,
        // keep going and just update the subscription units.
        try _host.callAgreement(
            _ida,
            abi.encodeWithSelector(_ida.createIndex.selector, streamingToken, INDEX_ID, new bytes(0)),
            new bytes(0)
        ) {
            // index created
        } catch {
            // index already exists or createIndex is not needed
        }

        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.updateSubscription.selector,
                streamingToken,
                INDEX_ID,
                backer,
                units,
                new bytes(0)
            ),
            new bytes(0)
        );
    }

    function distribute(uint256 amount) external onlyOwner {
        _ensureIdaInitialized();
        require(streamingToken.balanceOf(address(this)) >= amount, "Insufficient contract balance");

        (bool indexExists,,,) = _ida.getIndex(streamingToken, address(this), INDEX_ID);
        require(indexExists, "IDA index does not exist");
        (uint256 actualAmount, uint128 newIndexValue) =
            _ida.calculateDistribution(streamingToken, address(this), INDEX_ID, amount);
        require(actualAmount > 0, "Amount too low");

        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.updateIndex.selector,
                streamingToken,
                INDEX_ID,
                newIndexValue,
                new bytes(0)
            ),
            new bytes(0)
        );

        emit RevenueDistributed(actualAmount, block.timestamp);
    }

    function _tryInitializeIdaReference() internal {
        try _host.getAgreementClass(
            keccak256("org.superfluid-finance.agreements.InstantDistributionAgreement.v1")
        ) returns (ISuperAgreement idaContract) {
            _ida = IInstantDistributionAgreementV1(address(idaContract));
        } catch {
            _ida = IInstantDistributionAgreementV1(address(0));
        }
    }

    function _ensureIdaInitialized() internal view {
        require(address(_ida) != address(0), "IDA not initialized");
    }

    // Add this function to your contract
    function getBackerUnits(address backer) public view returns (uint128 units) {
        // This queries the Superfluid IDA for the specific subscriber's units
        (,, units,) = _ida.getSubscription(
            streamingToken,
            address(this), // The publisher (this contract)
            INDEX_ID,      // Usually 0
            backer         // The user
        );
    }
}
