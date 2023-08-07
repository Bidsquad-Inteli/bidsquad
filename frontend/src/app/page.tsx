"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Layout } from "../components/Layout";
import MetamaskLogo from "@/assets/metamask.png";
import { useMetamask } from "@/contexts/metamask";

const Home = () => {
    const { account, setAccount } = useMetamask();
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
            console.log("REDE!!!!!!", ethereum.chainId);
            if (ethereum.chainId !== desiredChainId) {
                await ethereum.request({
                    method: "wallet_switchEthereumChain",
                    params: [{ chainId: desiredChainId }],
                });
            }

            router.replace("/auctions");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout title="Home">
            <div className="flex flex-col items-center justify-center h-full py-8 px-4">
                <div className="w-full md:w-3/5">
                    <h1 className="text-4xl text-center font-bold mb-4">
                        Welcome to BidSquad!
                    </h1>

                    <p className="text-xl text-center mb-6">
                        A revolutionary platform for carbon credit auctions,
                        making a difference in the fight against climate change.
                    </p>

                    <p className="text-xl text-center mb-8">
                        BidSquad offers a transparent and efficient marketplace
                        where participants on both sides can collaborate to make
                        a real impact in the fight against climate change.
                        Together, we can drive sustainability forward and create
                        a more sustainable world. Join us today and be part of
                        the solution!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">
                                For Those Adding an Area:
                            </h2>
                            <p className="text-lg">
                                1. Add your area: Mark the coordinates of your
                                land with potential carbon consumption.
                            </p>
                            <p className="text-lg">
                                2. Reverse Auctions: Carbon certifiers place
                                competitive bids for your carbon credits.
                            </p>
                            <p className="text-lg">
                                3. Sustainable Impact: Sell carbon credits to
                                support global emissions reduction projects.
                            </p>
                        </div>

                        <div className="border rounded-lg p-6">
                            <h2 className="text-2xl font-semibold mb-4">
                                For Carbon Certifiers:
                            </h2>
                            <p className="text-lg">
                                1. Browse Available Areas: Explore listed areas
                                with estimated carbon credit potential.
                            </p>
                            <p className="text-lg">
                                2. Place Competitive Bids: Bid for carbon
                                credits that align with your sustainability
                                goals.
                            </p>
                            <p className="text-lg">
                                3. Promote Sustainable Projects: Support
                                initiatives aimed at mitigating environmental
                                impact.
                            </p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-6 mt-4">
                        <h2 className="text-2xl font-semibold mb-4">
                            Key Benefits:
                        </h2>
                        <p className="text-lg">
                            Blockchain Technology: The security and transparency
                            of blockchain ensure that all transactions and bids
                            are reliable and immutable.
                        </p>
                        <p className="text-lg">
                            Advanced Artificial Intelligence: Our cutting-edge
                            AI accurately assesses carbon consumption potential,
                            providing trustworthy carbon credit estimates.
                        </p>
                        <p className="text-lg">
                            Accessible Sustainability: BidSquad makes
                            participation in the carbon credit market accessible
                            to everyone, regardless of the size of their land or
                            organization.
                        </p>
                        <p className="text-lg">
                            Accredited Certifiers: We collaborate with renowned
                            certifiers, ensuring the validity and authenticity
                            of the generated carbon credits.
                        </p>
                    </div>
                </div>
                <div className="mt-8 flex items-center">
                    {!account ? (
                        <button
                            onClick={connectToMetamask}
                            className="bg-primary hover:bg-[#00c0c7] text-gray-800 hover:text-white px-8 py-3 rounded-lg font-semibold flex justify-between items-center mt-4"
                        >
                            <Image
                                alt="Metamask logo"
                                src={MetamaskLogo}
                                height={32}
                                className="mr-2"
                            />
                            Join BidSquad
                        </button>
                    ) : (
                        <p className="text-center">
                            Connected to address <br />
                            {account}
                        </p>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Home;
