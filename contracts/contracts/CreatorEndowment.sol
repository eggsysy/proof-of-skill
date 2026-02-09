// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {ISuperfluid, ISuperToken} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {ISuperAgreement} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperAgreement.sol";
import {IInstantDistributionAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IInstantDistributionAgreementV1.sol";

contract CreatorEndowment {
    ISuperfluid private _host;
    IInstantDistributionAgreementV1 private _ida;
    ISuperToken public streamingToken;

    address public creator;
    uint32 public constant INDEX_ID = 0;

    constructor(address host, address token) {
        _host = ISuperfluid(host);
        streamingToken = ISuperToken(token);
        creator = msg.sender;

        _tryInitializeIdaReference();
    }

    function initializeIDA() external {
        require(msg.sender == creator, "Only creator can initialize IDA");
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

    function distributeRevenue(uint256 amount) external {
        require(msg.sender == creator, "Only the creator can trigger distribution");
        _ensureIdaInitialized();

        streamingToken.transferFrom(msg.sender, address(this), amount);

        _host.callAgreement(
            _ida,
            abi.encodeWithSelector(
                _ida.distribute.selector,
                streamingToken,
                INDEX_ID,
                amount,
                new bytes(0)
            ),
            new bytes(0)
        );
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
}
