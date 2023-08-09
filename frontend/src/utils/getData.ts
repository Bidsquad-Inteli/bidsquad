import { hex2str } from "./utils";
export interface BidsData {
  amount: number;
  auction_id: number;
  author: string;
  timestamp: number;
}

export interface Auction {
  id: string;
  state: number;
  creator: string;
  carbonCredit: number;
  satteliteImageUrl: string;
  title: string;
  description: string;
  start_date: number;
  end_date: number;
}

export const getBidsData = async (
  id: string | number
): Promise<BidsData[] | null> => {
  try {
    const bids = await fetch(
      `http://localhost:5005/inspect/auctions/${id}/bids`
    );
    const data = await bids.json();

    let bidsData = [];
    for (let i in data.reports) {
      let payload = data.reports[i].payload;
      bidsData = JSON.parse(`${hex2str(payload)}`);
    }

    return bidsData as BidsData[];
  } catch (err) {
    console.log("ERRO", err);
    return null;
  }
};

export const getLatestBidData = async (
  id: string | number
): Promise<BidsData | null> => {
  try {
    const bids = await fetch(
      `http://localhost:5005/inspect/auctions/${id}/bids`
    );
    const data = await bids.json();

    let bidsData = [];
    for (let i in data.reports) {
      let payload = data.reports[i].payload;
      bidsData = JSON.parse(`${hex2str(payload)}`);
    }

    return bidsData[bidsData.length - 1] as BidsData;
  } catch (err) {
    console.log("ERRO", err);
    return null;
  }
};

export const getAuctions = async (): Promise<Auction[] | null> => {
  try {
    const response = await fetch("http://localhost:5005/inspect/auctions");

    if (response.status != 200) {
      // router.push("/");
      return null;
    }

    const res = await response.json();

    console.log(`Inspect status: ${JSON.stringify(res.status)}`);
    console.log(`Input count: ${JSON.stringify(res.processed_input_count)}`);
    console.log(`Reports:`);

    let auctions;
    console.log(res.reports);
    for (let i in res.reports) {
      let payload = res.reports[i].payload;
      auctions = JSON.parse(`${hex2str(payload)}`);
    }
    if (res.exception_payload) {
      let payload = res.exception_payload;
      console.log(`Exception payload: ${hex2str(payload)}`);
    }
    console.log("AUCTIONS PEGAS!", auctions);

    // for (let auction of auctions) {
    //   const bids = await getBidsData(auction.id);
    //   console.log(bids)
    // }

    return auctions;
  } catch (err) {
    console.log(err);
    return null;
    // setAuctions([
    //   {
    //     id: "1",
    //     state: 1,
    //     creator: "0x71ce1e91bD8c4673e09EAb1F7a4D79B646d66874",
    //     carbonCredit: 100,
    //     satteliteImageUrl: "https://imgur.com/CqoAKuh.png", //https://imgur.com/R1DlCa4.png
    //     title: "Auction Teste",
    //     description: "Auction Teste Description",
    //     startDate: "12/04/2004",
    //     endDate: "12/04/2004",
    //   },
    // ]);
  }
};
