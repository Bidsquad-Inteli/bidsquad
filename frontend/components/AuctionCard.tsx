import Link from "next/link";
import React, { useEffect } from "react";
import { BsCalendarCheckFill, BsCalendar2XFill } from "react-icons/bs";

import { RiAuctionFill } from "react-icons/ri";

import Jazzicon from "react-jazzicon";

export const AuctionCard = ({
	id,
	title,
	description,
	carbonCredit,
	startDate,
	endDate,
	creator,
}: {
	id: string;
	state: number;
	creator: string;
	carbonCredit: number;
	satteliteImageUrl: string;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
}) => {
	const [timeToFinnish, setTimeToFinnish] = React.useState<number>(0);

	useEffect(() => {
		const finalDate = new Date(endDate);
		const now = new Date();
		const diff = finalDate.getTime() - now.getTime();
		const diffDays = diff / (1000 * 3600 * 24);
		const diffDaysRounded = Math.round(diffDays);

		setTimeToFinnish(diffDaysRounded);
	}, []);

	return (
		<Link
			href={`/auction/${id}`}
			className="flex flex-col w-[400px] border-[0.25px] border-grey-100 p-4 rounded-xl overflow-hidden hover:scale-105 transition duration-150 bg-white ease-in-out hover:cursor-grabbing	"
		>
			<div className="flex flex-col w-full">
				<div className="w-full flex items-center justify-center relative h-40%">
					<img
						className="z-[1] rounded-xl h-[300px]"
						src="https://imgur.com/Bkvv5qE.png"
					></img>
					<div className="absolute bg-white rounded-xl flex items-center justify-center bottom-[10px] left-[10px] w-auto px-4 h-[40px]">
						<label>🔥 Ends in: {timeToFinnish} days</label>
					</div>
				</div>

				<div className="flex flex-col justify-center items-start ml-2 mt-2">
					<h1 className="font-bold text-2xl">{title}</h1>
					<label className="font-bold text-sm text-gray-400">
						{description}
					</label>
				</div>

				<div className="w-full flex flex-row justify-start items-center gap-2 text-ellipsis ml-2 mt-4">
					<Jazzicon
						diameter={35}
						seed={Math.round(Math.random() * 10000000)}
					/>
					<label className="text-ellipsis w-[80%]">
						{creator.substring(0, 6)}...
						{creator.substring(creator.length - 4, creator.length)}
					</label>
				</div>

				<hr className="w-full border-[0.25px] border-gray-100 mt-4"></hr>

				<div className="w-full flex flex-row justify-between items-center ml-2 mt-8">
					<div className="flex flex-col items-start justify-center">
						<label className="text-sm text-grey-200 font-bold">
							C$ {carbonCredit}
						</label>
						<label className="text-2xl font-bold">R$ 1000</label>
						<label className="text-sm font-bold text-gray-400">
							Latest Bid
						</label>
					</div>
					<div className="flex items-start justify-center mr-4">
						<Link
							href={`/auction/${id}`}
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						>
							Ver Mais
						</Link>
					</div>
				</div>
			</div>
		</Link>
	);
};
