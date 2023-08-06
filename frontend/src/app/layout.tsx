import MetamaskProvider from "@/contexts/metamask";
import "../styles/globals.css";

export const metadata = {
    title: "Bidsquad",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <MetamaskProvider>{children}</MetamaskProvider>
            </body>
        </html>
    );
}
