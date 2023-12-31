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
from datetime import datetime
from urllib.parse import parse_qs, urlparse

import core.wallet as Wallet
from core.auctioneer import Auctioneer
from core.encoders import BalanceEncoder
from core.log import logger
from core.outputs import Error, Log
from core.util import hex_to_str
from routes import Mapper
from core.outputs import Error

class DefaultRoute():

    def execute(self, match_result, request=None):
        return Error("Operation not implemented")


class AdvanceRoute(DefaultRoute):

    def _parse_request(self, request):
        self._msg_sender = request["metadata"]["msg_sender"]
        self._msg_timestamp = datetime.fromtimestamp(
            request["metadata"]["timestamp"])
        request_payload = json.loads(
            hex_to_str(request["payload"]))
        self._request_args = request_payload["args"]

    def execute(self, match_result, request=None):
        if request:
            self._parse_request(request)


class WalletRoute(AdvanceRoute):

    def __init__(self, wallet: Wallet):
        self._wallet = wallet


class DepositEtherRoute(WalletRoute):
    def execute(self, match_result, request=None):
        return self._wallet.ether_deposit_process(request)


class BalanceRoute(WalletRoute):

    def execute(self, match_result, request=None):
        account = match_result["account"]
        balance = self._wallet.balance_get(account)
        return Log(json.dumps(balance, cls=BalanceEncoder))


class AuctioneerRoute(AdvanceRoute):

    def __init__(self, auctioneer):
        self._auctioneer: Auctioneer = auctioneer

class CreateAuctionRoute(AuctioneerRoute):

    def _parse_request(self, request):
        super()._parse_request(request)
        self._request_args["base64Image"] = self._request_args["base64Image"]
        self._request_args["satteliteImageUrl"] = self._request_args["satteliteImageUrl"]
        self._request_args["start_date"] = datetime.fromtimestamp(
            self._request_args["start_date"])
        self._request_args["end_date"] = datetime.fromtimestamp(
            self._request_args["end_date"])
        

    def execute(self, match_result, request=None):
        super().execute(match_result, request)
        return self._auctioneer.auction_create(self._msg_sender,
                                               self._request_args.get("base64Image"),
                                               self._request_args.get("satteliteImageUrl"),
                                               self._request_args.get("title"),
                                               self._request_args.get(
                                                   "description"),
                                               self._request_args.get(
                                                   "start_date"),
                                               self._request_args.get(
                                                   "end_date"),
                                               self._msg_timestamp,
                                                self._request_args.get("maxTokenizationCost")
                                               )


class EndAuctionRoute(AuctioneerRoute):

    def __init__(self, auctioneer):
        super().__init__(auctioneer)
        self._rollup_address = None

    @property
    def rollup_address(self):
        return self._rollup_address

    @rollup_address.setter
    def rollup_address(self,value):
        self._rollup_address = value

    def execute(self, match_result, request=None):
        super().execute(match_result, request)
        if self._rollup_address is None:
            return Error ("DApp Address is needed to end an Auction. Check Dapp documentation on how to proper set the DApp Address")
        return self._auctioneer.auction_end(self._request_args.get("auction_id"),
                                            self._rollup_address,
                                            self._msg_timestamp,
                                            self._msg_sender,
                                            self._request_args.get("withdraw", False))

class PlaceBidRoute(AuctioneerRoute):

    def execute(self, match_result, request=None):
        super().execute(match_result, request)
        return self._auctioneer.auction_bid(self._msg_sender,
                                            self._request_args.get(
                                                "auction_id"),
                                            self._request_args.get("amount"),
                                            self._msg_timestamp)


class InspectRoute(DefaultRoute):

    def __init__(self, auctioneer):
        self._auctioneer: Auctioneer = auctioneer


class QueryAuctionRoute(InspectRoute):

    def execute(self, match_result, request=None):
        return self._auctioneer.auction_get(
            int(match_result["auction_id"]))


class ListAuctionsRoute(InspectRoute):

    def _parse_request(self, request):
        url = urlparse(hex_to_str(request["payload"]))
        self._query = parse_qs(url.query)

    def execute(self, match_result, request=None):
        self._parse_request(request)
        return self._auctioneer.auction_list(query=self._query)


class ListBidsRoute(InspectRoute):

    def execute(self, match_result, request=None):
        return self._auctioneer.auction_list_bids(
            int(match_result["auction_id"]))
    

class Router():

    def __init__(self, wallet, auctioneer):
        self._controllers = {
            "auction_bid": PlaceBidRoute(auctioneer),
            "auction_create": CreateAuctionRoute(auctioneer),
            "auction_end": EndAuctionRoute(auctioneer),
            "auction_query": QueryAuctionRoute(auctioneer),
            "auction_list": ListAuctionsRoute(auctioneer),
            "balance": BalanceRoute(wallet),
            "bid_list": ListBidsRoute(auctioneer),
            "ether_deposit": DepositEtherRoute(wallet),
        }

        self._route_map = Mapper()
        self._route_map.connect(None,
                                "bid",
                                controller="auction_bid",
                                action="execute")
        self._route_map.connect(None,
                                "create",
                                controller="auction_create",
                                action="execute")
        self._route_map.connect(None,
                                "auctions",
                                controller="auction_list",
                                action="execute")
        self._route_map.connect(None,
                                "auctions/{auction_id}",
                                controller="auction_query",
                                action="execute")
        self._route_map.connect(None,
                                "balance/{account}",
                                controller="balance",
                                action="execute")
        self._route_map.connect(None,
                                "auctions/{auction_id}/bids",
                                controller="bid_list",
                                action="execute")
        self._route_map.connect(None,
                                "end",
                                controller="auction_end",
                                action="execute")
        self._route_map.connect(None,
                                "ether_deposit",
                                controller="ether_deposit",
                                action="execute"),
        

    def set_rollup_address(self,rollup_address):
        self._controllers['auction_end'].rollup_address = rollup_address

    def process(self, route, request=None):
        route = route.lower()
        match_result = self._route_map.match(route)

        if match_result is None:
            return Error(f"Operation '{route}' is not supported")
        else:
            controller = self._controllers.get(match_result["controller"])
            logger.info(f"Executing operation '{route}'")
            return controller.execute(match_result, request)
