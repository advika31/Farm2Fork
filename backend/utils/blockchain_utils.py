import os
import json
from web3 import Web3
from eth_account import Account  # ensures keccak available via web3


GANACHE_URL = os.getenv("GANACHE_URL", "http://127.0.0.1:8545")
BUILD_JSON = os.path.join("build", "BatchRegistry.json")
ADDRESS_PATH = os.path.join("build", "BatchRegistry.address")


def _get_w3() -> Web3:
    w3 = Web3(Web3.HTTPProvider(GANACHE_URL))
    if not w3.is_connected():
        raise RuntimeError("Cannot connect to Ganache at " + GANACHE_URL)
    return w3


def _get_contract(w3: Web3):
    if not os.path.exists(BUILD_JSON) or not os.path.exists(ADDRESS_PATH):
        raise RuntimeError("Contract not compiled/deployed. Run compile and deploy scripts.")
    with open(BUILD_JSON, "r", encoding="utf-8") as f:
        compiled = json.load(f)
    with open(ADDRESS_PATH, "r", encoding="utf-8") as f:
        address = f.read().strip()
    return w3.eth.contract(address=address, abi=compiled["abi"])


def _fingerprint(batch_id: int, crop_type: str) -> bytes:
    # Off-chain version of Solidity's keccak256(abi.encodePacked(batchId, ":", cropType))
    data = f"{batch_id}:{crop_type}".encode()
    return Web3.keccak(data)


def register_batch(batch_id: int, crop_type: str):
    """Register batch on-chain. Returns tx hash string."""
    w3 = _get_w3()
    contract = _get_contract(w3)
    sender = w3.eth.accounts[0]
    tx = contract.functions.registerBatch(batch_id, crop_type).transact({"from": sender})
    receipt = w3.eth.wait_for_transaction_receipt(tx)
    return receipt.transactionHash.hex()


def verify_batch_onchain(batch_id: int, crop_type: str) -> bool:
    w3 = _get_w3()
    contract = _get_contract(w3)
    return contract.functions.verifyBatch(batch_id, crop_type).call()



