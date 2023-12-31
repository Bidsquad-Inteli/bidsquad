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

import itertools
from datetime import datetime

class Bid:
    """
    Auction bid

    Identifies a bid of an `amount` placed by a user (`author`) on an
    auction (`auction_id`).
    """

    def __init__(self, auction_id: int, author: str,
                 amount: int, timestamp: datetime):
        if amount <= 0:
            raise ValueError(f"Amount ({amount}) must be greater than zero")

        self._auction_id = auction_id
        self._author = author
        self._amount = amount * 10**18 # Convert to wei
        self._timestamp = timestamp

    @property
    def auction_id(self):
        return self._auction_id

    @property
    def author(self):
        return self._author

    @property
    def amount(self):
        return self._amount

    @property
    def timestamp(self):
        return self._timestamp

    def __eq__(self, other):
        return (self.author == other.author
                and self.auction_id == other.auction_id
                and self.amount == other.amount
                and self.timestamp == other.timestamp)

    def __ne__(self, other):
        return not (self == other)

    def __gt__(self, other):
        return (self.amount > other.amount
                or (self.amount == other.amount
                    and self.timestamp < other.timestamp))

    def __lt__(self, other):
        return (self.amount < other.amount
                or (self.amount == other.amount
                    and self.timestamp > other.timestamp))

    def __ge__(self, other):
        return NotImplemented

    def __le__(self, other):
        return NotImplemented


class Auction:
    """
    Auction
    It can receive bids as long as the `end_date` has not been reached.

    It has a minimum bid amount set, as well as a `title` and `description`,
    and may be in three different states: `CREATED`,` STARTED` or `FINISHED`.
    """

    CREATED = 0
    STARTED = 1
    FINISHED = 2

    _id = itertools.count()

    def __init__(self, creator: str, carbonCredit: int, satteliteImageUrl: str, title: str, description: str,
                 start_date: datetime, end_date: datetime, maxTokenizationCost: int):
        if end_date <= start_date:
            raise ValueError(
                f"End date ({end_date}) must be after start date ({start_date})")

        self._id = next(self._id)
        self._state = Auction.CREATED
        self._creator = creator
        self._carbonCredit = carbonCredit
        self._satteliteImageUrl = satteliteImageUrl
        self._title = title
        self._description = description
        self._start_date = start_date
        self._end_date = end_date
        self._maxTokenizationCost = maxTokenizationCost * 10**18
        self._bids: list[Bid] = []

    @property
    def id(self):
        return self._id

    @property
    def state(self):
        return self._state

    @property
    def creator(self):
        return self._creator

    @property
    def title(self):
        return self._title

    @property
    def description(self):
        return self._description

    @property
    def start_date(self):
        return self._start_date

    @property
    def end_date(self):
        return self._end_date

    @property
    def winning_bid(self):
        if len(self._bids) == 0:
            return None
        else:
            return self._bids[-1]

    @property
    def bids(self):
        return self._bids

    def __lt__(self, other):
        return (self.id < other.id)

    def bid(self, bid: Bid):
        
        if self.state == Auction.FINISHED:
            raise ValueError("The auction has already been finished")

        if bid.auction_id != self.id:
            raise ValueError(f"Auction id ({bid.auction_id}) does not match")
        
        if bid.amount > self._maxTokenizationCost:
            raise ValueError(f"Bid amount ({bid.amount}) is not greater than the maxTokenizationCost ({self._maxTokenizationCost})")
        
        if self.winning_bid is None or bid.amount < self.winning_bid.amount:
            self._bids.append(bid)
        else:
            raise ValueError(
                f"Bid amount ({bid.amount}) is not greater than the current " +
                f"winning bid amount ({self.winning_bid.amount})")

        if self.state == Auction.CREATED:
            self._state = Auction.STARTED

    def finish(self):
        self._state = Auction.FINISHED
