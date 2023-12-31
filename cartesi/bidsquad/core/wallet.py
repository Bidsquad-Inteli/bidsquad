# Copyright 2022 Cartesi Pte. Ltd.
#
# SPDX-License-Identifier: Apache-2.0
# Licensed under the Apache License, Version 2.0 (the "License"); you may not use
# this file except in compliance with the License. You may obtain a copy of the
# License at http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software distributed
# under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
# CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

import json

from core.balance import Balance
from core.log import logger
from core.outputs import Error, Notice, Voucher
from eth_abi import decode, encode
from core.eth_abi_ext import decode_packed

# Function selector to be called during the execution of a voucher that transfers funds,
# corresponds to the first 4 bytes of the Keccak256-encoded result of  withdrawEther(address _receiver, uint256 _value)'
WITHDRAW_ETHER_SELECTOR = b'\x4b\x17\x5e\x4a'

_accounts = dict[str: Balance]()

def _balance_get(account) -> Balance:
    balance = _accounts.get(account)

    if not balance:
        _accounts[account] = Balance(account)
        balance = _accounts[account]

    return balance

def balance_get(account) -> Balance:
    logger.info(f"Balance for '{account}' retrieved")
    return _balance_get(account)

def ether_deposit_process(payload:str):
    binary_payload = bytes.fromhex(payload[2:])
    try:
        account, amount = _ether_deposit_parse(binary_payload)
        logger.info(f"'{amount}' ethers deposited "
                    f"in account '{account}'")
        return _ether_deposit(account, amount)
    except ValueError as error:
        error_msg = f"{error}"
        logger.debug(error_msg, exc_info=True)
        return Error(error_msg)

    
def _ether_deposit_parse(binary_payload: bytes):
    try:
        input_data = decode_packed(
            ['address',  # Address of the depositor
             'uint256'], # Amount of ERC-20 tokens being deposited
            binary_payload
        )

        account = input_data[0]
        amount = input_data[1]
        return account,  amount
    except Exception as error:
        raise ValueError(
            "Payload does not conform to Ether transfer ABI") from error

def _ether_deposit(account, amount):
    balance = _balance_get(account)
    balance._ether_increase(amount)

    notice_payload = {
        "type": "etherdeposit",
        "content": {
            "address": account,
            "amount": amount
        }
    }
    return Notice(json.dumps(notice_payload))

def ether_withdraw(rollup_address, account):
    balance = _balance_get(account)
    balance._ether_decrease(balance._etherBalance)

    transfer_payload = WITHDRAW_ETHER_SELECTOR + \
            encode(['address', 'uint256'], [account, balance._etherBalance])

    logger.info(f"'{balance._etherBalance}' ether withdrawn from '{account}'")
    return Voucher(rollup_address, transfer_payload)

def ether_transfer(account, to, amount):
    try:
        balance = _balance_get(account)
        balance_to = _balance_get(to)

        balance._ether_decrease(amount)
        balance_to._ether_increase(amount)

        notice_payload = {
            "type": "ethertransfer",
            "content": {
                "from": account,
                "to": to,
                "amount": amount
            }
        }
        logger.info(f"'{amount}' ethers transferred from "
                    f"'{account}' to '{to}'")
        return Notice(json.dumps(notice_payload))
    except Exception as error:
        error_msg = f"{error}"
        logger.debug(error_msg, exc_info=True)
        return Error(error_msg)