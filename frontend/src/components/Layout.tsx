import Head from "next/head"

import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export const Layout = ({
    title,
    navbar = true,
    footer = true,
    children
}: {
    title?: string,
    navbar?: boolean,
    footer?: boolean,
    children: React.ReactNode
}) => {
    return (
        <div>
            <Head>
                <title>{
                    title ? `${title} | BidSquad` : "BidSquad"
                }</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <main className="flex flex-col flex-1 w-full min-h-screen h-full">
                {navbar ? <Navbar  /> : null}

                {children}
            </main>
        </div>
    )
}