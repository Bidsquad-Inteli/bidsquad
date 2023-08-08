import MetamaskProvider from "@/contexts/metamask";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google"

export const metadata = {
    title: "Bidsquad",
};

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
            <body>
                <MetamaskProvider>
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </MetamaskProvider>
            </body>
        </html>
    );
}
