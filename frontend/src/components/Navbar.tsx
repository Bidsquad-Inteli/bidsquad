"use client";
import { useMetamask } from "@/contexts/metamask";
import Link from "next/link";
import { NavbarItem } from "./NavbarItem";

export const Navbar = () => {
    const { account } = useMetamask();

    return (
        <nav className="nav font-semibold text-lg z-[2] header sticky top-0 flex items-center bg-white shadow-md px-8 py-02">
            <Link href="/" className="absolute">
                BidSquad
            </Link>
            <ul className="flex items-center justify-center grow">
                <NavbarItem href="/" label="Menu" />
                {account && <NavbarItem href="/auctions" label="Auctions" />}
            </ul>
            {account && <p className="absolute right-0 px-4 text-sm">
                {account}
            </p>}
        </nav>
    );
};
