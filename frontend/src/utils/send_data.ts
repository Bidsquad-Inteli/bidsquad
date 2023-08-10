import { InputBox__factory, EtherPortal__factory } from "@cartesi/rollups";
import { ethers } from "ethers";

const INPUTBOX_ADDRESS = "0x5a723220579C0DCb8C9253E6b4c62e572E379945";
const ETHERPORTAL_ADDRESS = "0xA89A3216F46F66486C9B794C1e28d3c44D59591e";

export const DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";

export async function depositEther(maxTokenizationCost) {
    // Start a connection
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();

    // Instantiate the EtherPortal contract
    const etherPortal = EtherPortal__factory.connect(ETHERPORTAL_ADDRESS, signer);

    const depositAmount = ethers.utils.parseEther(maxTokenizationCost.toString());
    const bytes = ethers.utils.toUtf8Bytes("");

    const depositTx = await etherPortal.depositEther(DAPP_ADDRESS, bytes, { value: depositAmount });
}

export async function sendInput(payload) {
    // Start a connection
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();

    // Instantiate the InputBox contract
    const inputBox = InputBox__factory.connect(INPUTBOX_ADDRESS, signer);

    // Encode the input
    const inputBytes = ethers.utils.isBytesLike(payload) ? payload : ethers.utils.toUtf8Bytes(JSON.stringify(payload));

    // Send the transaction
    const tx = await inputBox.addInput(DAPP_ADDRESS, inputBytes);
    console.log(`transaction: ${tx.hash}`);

    // tx contains all data about the transaction
    // Wait for confirmation
    console.log("waiting for confirmation...");
    const receipt = await tx.wait();

    // Search for the InputAdded event
    const event = receipt.events?.find((e) => e.event === "InputAdded");

    if (!event) {
        throw new Error(`InputAdded event not found in receipt of transaction ${receipt.transactionHash}`);
    }
    return {
        status: "Input added with success!",
    };
}
