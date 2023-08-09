import MetamaskProvider from "@/contexts/metamask";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Montserrat } from "next/font/google"

export const metadata = {
    title: "Bidsquad",
};

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={montserrat.className}>
            <body>
                <MetamaskProvider>
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </MetamaskProvider>
            </body>
        </html>
    );
}
