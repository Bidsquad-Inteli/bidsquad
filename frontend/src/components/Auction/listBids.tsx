import { useEffect } from "react";
import { FaEthereum } from "react-icons/fa";
import Jazzicon from "react-jazzicon";

interface Bid {
  owner: string;
  amount: number;
  unique: number;
}

export const BidList: React.FC<Bid> = ({ owner, amount, unique }) => {
  useEffect(() => {
    console.log("KEY!!!", unique);
  }, []);

  return (
    <div className="w-full mb-3 flex flex-col items-center justify-center">
      <div
        className={`flex flex-row justify-between items-center border-[3px] ${
          unique === 0 ? "border-black px-4" : "border-gray-200 px-8"
        } w-[85%] h-[60px] rounded-xl`}
      >
        <div className="flex items-center justify-center gap-2">
          <Jazzicon diameter={35} seed={Math.round(Math.random() * 10000000)} />
          <div>
            {owner &&
              owner.substring(0, 6) +
                "..." +
                owner.substring(owner.length - 4, owner.length)}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {amount && <label className="font-bold text-2xl">{amount}</label>}{" "}
          <FaEthereum size={30} />
        </div>
      </div>
    </div>
  );
};

export default BidList;
