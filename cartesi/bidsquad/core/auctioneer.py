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
from operator import attrgetter

import core.wallet as Wallet
from core.encoders import AuctionEncoder, BidEncoder
from core.log import logger
from core.model import Auction, Bid
from core.outputs import Error, Log, Notice, Output
import numpy as np

import base64

from tflite_runtime.interpreter import Interpreter

import sys
sys.path.append('/usr/lib/python3/dist-packages')
import cv2

def decode_image_from_base64(base64_string):
    image_bytes = base64.b64decode(base64_string)
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image


def get_carbon_credits_for_sattelite_image(base64Image: str):

    # Carregando o modelo TFLite
    interpreter = Interpreter(model_path='./model/model.tflite')
    interpreter.allocate_tensors()

    # Decodificando e preprocessando a imagem
    img = decode_image_from_base64(base64Image)
    img = cv2.resize(img, (256, 256))
    img = np.array(img, dtype=np.float32) / 255 
    img = np.expand_dims(img, axis=0)

    # Definindo o tensor de entrada
    input_index = interpreter.get_input_details()[0]['index']
    interpreter.set_tensor(input_index, img)

    # Invocando o interpretador
    interpreter.invoke()

    # Obtendo a predição
    output_index = interpreter.get_output_details()[0]['index']
    results = round(float(interpreter.get_tensor(output_index)[0][0]), 1)
    return results


class Auctioneer:
    def __init__(self, wallet: Wallet):
        self._auctions: dict[int, Auction] = {}
        self._wallet = wallet

    def auction_create(
        self,
        seller: str,
        base64Image: int,
        satteliteImageUrl: str,
        title: str,
        description: str,
        start_date: datetime,
        end_date: datetime,
        current_date: datetime,
        maxTokenizationCost: int,
    ):
        try:
            # if start_date < current_date:
            #     raise ValueError(
            #         f"Start date '{start_date.isoformat()}' " "must be in the future"
            #     )
            logger.info(f"Model run for {satteliteImageUrl}")
            carbonCredits = get_carbon_credits_for_sattelite_image(base64Image)
            logger.info(f"Carbon Credits: {carbonCredits}")

            auction = Auction(
                seller,
                carbonCredits,
                satteliteImageUrl,
                title,
                description,
                start_date,
                end_date,
                maxTokenizationCost,
            )
            self._auctions[auction._id] = auction

            auction_json = json.dumps(auction, cls=AuctionEncoder)
            notice_payload = f'{{"type": "auction_create", "content": {auction_json}}}'
            logger.info(
                f"Auction {auction._id} created for {carbonCredits} carbon credits"
            )
            return Notice(notice_payload)
        except Exception as error:
            error_msg = f"Failed to create auction. {error}"
            logger.debug(error_msg, exc_info=True)
            return Error(error_msg)

    def auction_list_bids(self, auction_id):
        try:
            auction = self._auctions.get(auction_id)
            if auction == None:
                raise ValueError(f"Auction id {auction_id} not found")
            return Log(json.dumps(auction.bids, cls=BidEncoder))
        except Exception as error:
            error_msg = f"Failed to list bids for auction id {auction_id}. {error}"
            logger.debug(error_msg, exc_info=True)
            return Error(error_msg)

    def auction_bid(self, bidder, auction_id, amount, timestamp):
        try:
            logger.info(bidder, 'bidder')
            auction = self._auctions.get(auction_id)
            if not auction:
                raise ValueError(f"There's no auction with id {auction_id}")
            if bidder == auction.creator:
                raise ValueError(f"{bidder} cannot bid on their own auction")
            if timestamp < auction.start_date:
                raise ValueError(
                    "Bid arrived before auction start date"
                    f"'{auction.start_date.isoformat()}'"
                )
            if timestamp > auction.end_date:
                raise ValueError(
                    "Bid arrived after auction end date "
                    f"'{auction.end_date.isoformat()}'"
                )
            
            new_bid = Bid(auction_id, bidder, amount, timestamp)
            auction.bid(new_bid)
            bid_json = json.dumps(new_bid, cls=BidEncoder)
            logger.info(f"Bid of '{new_bid.amount}' placed for " f"{auction_id}")
            return Notice(f'{{"type": "auction_bid", "content": {bid_json}}}')
        except Exception as error:
            error_msg = f"Failed to bid. {error}"
            logger.debug(error_msg, exc_info=True)
            return Error(error_msg)

    def auction_end(
        self, auction_id, rollup_address, msg_date, msg_sender, withdraw=False
    ):
        try:
            auction = self._auctions.get(auction_id)

            if not auction:
                raise ValueError(f"There's no auction with id {auction_id}")
            if msg_date < auction.end_date:
                raise ValueError(
                    f"It can only end after {auction.end_date.isoformat()}"
                )
            notice_template = '{{"type": "auction_end", "content": {}}}'
            winning_bid = auction.winning_bid
            outputs: list[Output] = []

            if not winning_bid:
                notice_payload = notice_template.format(
                    f'{{"auction_id": {auction.id}}}'
                )
                notice = Notice(notice_payload)
                outputs.append(notice)
            else:
                output = self._wallet.ether_transfer(
                    account=winning_bid.author,
                    to=auction.creator,
                    amount=winning_bid.amount,
                )

                if type(output) is Error:
                    return output

                outputs.append(output)

                if withdraw and msg_sender == auction.winning_bid.author:
                    output = self._wallet.ether_withdraw(
                        rollup_address=rollup_address,
                        account=msg_sender,
                    )

                    if type(output) is Error:
                        return output
                    
                    outputs.append(output)
                    
                    output = self._wallet.ether_withdraw(
                        rollup_address=rollup_address,
                        account=rollup_address,
                    )

                    if type(output) is Error:
                        return output

                    outputs.append(output)

                bid_str = json.dumps(winning_bid, cls=BidEncoder)
                notice_payload = notice_template.format(bid_str)
                notice = Notice(notice_payload)
                outputs.append(notice)

            auction.finish()
            logger.info(f"Auction {auction.id} finished")
            return outputs
        except Exception as error:
            error_msg = f"Failed to end auction. {error}"
            logger.debug(error_msg, exc_info=True)
            return Error(error_msg)

    def auction_get(self, auction_id):
        try:
            auction_json = json.dumps(self._auctions[auction_id], cls=AuctionEncoder)
            return Log(auction_json)
        except Exception as error:
            return Error(f"Auction id {auction_id} not found")

    def auction_list(self, **kwargs):
        try:
            auctions = sorted(self._auctions.values())
            query = kwargs.get("query")
            if query:
                sort = query.get("sort")
                offset = query.get("offset")
                limit = query.get("limit")
                if sort:
                    sort = sort[0]
                    auctions = sorted(auctions, key=attrgetter(sort))

                if offset:
                    offset = int(offset[0])
                    auctions = auctions[offset:]

                if limit:
                    limit = int(limit[0])
                    auctions = auctions[:limit]
            logger.info(f"Listing auctions")
            logger.debug(f"Auctions: {auctions}")
            return Log(json.dumps(auctions, cls=AuctionEncoder))
        except Exception as error:
            error_msg = f"Failed to list auctions. {error}"
            logger.debug(error_msg, exc_info=True)
            return Error(error_msg)