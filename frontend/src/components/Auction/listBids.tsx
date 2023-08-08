import React from "react";

import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import Jazzicon from "react-jazzicon";

interface Bid {
    owner: string;
    amount: number;
}

const BidList = ({owner, amount}: Bid) => {

  return (
    <>
      <div className="pl-12 flex flex-col mb-4">
        <label className="self-start font-bold">Bids 🔥</label>
        <label className="self-start font-bold text-gray-400">
          Here you can see a list of all bids on this auction
        </label>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="flex flex-row justify-between items-center border-[3px] border-black w-[85%] h-[60px] rounded-xl px-4">
          <div className="flex items-center justify-center gap-2">
            <Jazzicon
              diameter={35}
              seed={Math.round(Math.random() * 10000000)}
            />
            <div>
              {owner &&
                owner.substring(0, 6) +
                  "..." +
                  owner.substring(owner.length - 4, owner.length)}
            </div>
          </div>
          <div>
            {
                amount &&
                <label className="font-bold text-2xl">R$ {amount}</label>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default BidList;
