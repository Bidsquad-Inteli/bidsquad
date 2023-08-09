/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useState, useContext, SetStateAction, useEffect } from "react";

interface MetamaskContextInterface {
    account: string | null;
    setAccount(account: SetStateAction<null>): void;
    loading: boolean;
    setLoading(loading: boolean): void;
    connectToMetamask(): Promise<void>;
}

const MetamaskContext = createContext<MetamaskContextInterface | null>(null);

export default function MetamaskProvider({ children }: any) {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

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

            if (ethereum.chainId !== desiredChainId) {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: desiredChainId }],
                });
            }
        } catch (err) {
            router.push("/");
            console.error(err);
        }
    };

    useEffect(() => {
        if (!account && pathname !== "/") {
            connectToMetamask();
        }
    }, []);

    return (
        <MetamaskContext.Provider
            value={{
                account,
                setAccount,
                loading,
                setLoading,
                connectToMetamask,
            }}
        >
            {children}
        </MetamaskContext.Provider>
    );
}

export function useMetamask() {
    const context = useContext(MetamaskContext);
    if (!context) throw new Error("useMetamask must be used within a MetamaskProvider");
    const { account, setAccount, loading, setLoading, connectToMetamask } = context;
    return {
        account,
        setAccount,
        loading,
        setLoading,
        connectToMetamask,
    };
}
