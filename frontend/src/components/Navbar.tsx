"use client";
import { useMetamask } from "@/contexts/metamask";
import Link from "next/link";
import { NavbarItem } from "./NavbarItem";
import Image from "next/image";
import MetamaskLogo from "@/assets/metamask.png";

export const Navbar = () => {
    const { account, setAccount } = useMetamask();

    const connectToMetamask = async () => {
        const ethereum = (window as any).ethereum;

        if (!ethereum) {
            alert("Install MetaMask");
            return;
        }

        try {
            const [account] = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(account);

            const desiredChainId = "0x7a69";
            // console.log("REDE!!!!!!", ethereum.chainId);
            if (ethereum.chainId !== desiredChainId) {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: desiredChainId }],
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <nav className="nav font-semibold text-lg z-[2] header sticky top-0 flex items-center bg-white shadow-md px-8 py-02">
            <Link href="/" className="absolute">
                BidSquad
            </Link>

            <ul className="flex items-center justify-center grow">
                <NavbarItem href="/" label="Menu" />
                {account && <NavbarItem href="/auctions" label="Auctions" />}
            </ul>
            
            {account && (
                <p className="absolute right-0 px-4 text-sm">
                    {account.substring(0, 6)}...
                    {account.substring(account.length - 6, account.length)}
                </p>
            )}
            {!account && (
                <button
                    onClick={connectToMetamask}
                    className="bg-primary hover:bg-[#00c0c7] text-gray-800 hover:text-white p-2 rounded-lg font-semibold flex justify-between items-center absolute right-0 mr-4"
                >
                    <Image
                        alt="Metamask logo"
                        src={MetamaskLogo}
                        height={32}
                        className="mr-2"
                    />
                    Join BidSquad
                </button>
            )}
        </nav>
    );
};
