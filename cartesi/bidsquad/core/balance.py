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

class Balance():
    """
    Holds and manipulates an account's balance for Ethers
    """

    def __init__(self, account: str,
                 etherBalance: int = 0):
        self._etherBalance = etherBalance
        self._account = account

    def _ether_increase(self, amount: int):
        if amount < 0:
            raise ValueError(
                f"Failed to increase ether balance for {self._account}. "
                f"{amount} should be a positive number")

        self._etherBalance = self._etherBalance + amount

    def _ether_decrease(self, amount: int):
        if amount < 0:
            raise ValueError(
                f"Failed to decrease balance for {self._account}. "
                f"{amount} should be a positive number")

        if self._etherBalance < amount:
            raise ValueError(
                f"Failed to decrease balance for {self._account}. "
                f"Not enough funds to decrease {amount}")

        self._etherBalance = self._etherBalance - amount