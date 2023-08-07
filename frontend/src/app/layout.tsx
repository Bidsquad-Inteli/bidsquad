import MetamaskProvider from "@/contexts/metamask";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
    title: "Bidsquad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <MetamaskProvider>
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </MetamaskProvider>
            </body>
        </html>
    );
}
