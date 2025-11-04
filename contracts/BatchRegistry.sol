// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BatchRegistry {
    mapping(bytes32 => bool) private batchExists;

    event BatchRegistered(bytes32 indexed fingerprint, uint256 batchId, string cropType);

    function registerBatch(uint256 batchId, string calldata cropType) external returns (bytes32) {
        bytes32 fingerprint = keccak256(abi.encodePacked(batchId, ":", cropType));
        require(!batchExists[fingerprint], "Batch already registered");
        batchExists[fingerprint] = true;
        emit BatchRegistered(fingerprint, batchId, cropType);
        return fingerprint;
    }

    function verifyBatch(uint256 batchId, string calldata cropType) external view returns (bool) {
        bytes32 fingerprint = keccak256(abi.encodePacked(batchId, ":", cropType));
        return batchExists[fingerprint];
    }
}



