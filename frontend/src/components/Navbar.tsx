"use client";
import Link from "next/link";
import { useState } from "react";
import { NavbarItem } from "./NavbarItem";
import { SearchBar } from "./SearchBar";
import SearchIcon from "./SearchIcon";
import CartIcon from "./CartIcon";

export const Navbar = () => {
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
    const toggleSearchBar = () => setShowSearchBar((prev) => !prev);

    return (
        <header className="z-[2] header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
            <Link href="/">BidSquad</Link>
            <nav className="nav font-semibold text-lg">
                <ul className="flex items-center">
                    <NavbarItem href="/" label="Menu" />
                    <NavbarItem href="/auctions" label="Auctions" />
                </ul>
            </nav>
            <div className="flex justify-end">
                {showSearchBar && <SearchBar />}
                <button onClick={toggleSearchBar}>
                    <SearchIcon />
                </button>
                <Link href="/cart">
                    <CartIcon />
                </Link>
            </div>
        </header>
    );
};
