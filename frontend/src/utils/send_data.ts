import { InputBox__factory } from "@cartesi/rollups";
import { ethers } from "ethers";

const INPUTBOX_ADDRESS = "0x5a723220579C0DCb8C9253E6b4c62e572E379945";

const DAPP_ADDRESS = "0x142105FC8dA71191b3a13C738Ba0cF4BC33325e2";

export async function createAuction(data) {
  // Start a connection
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  const signer = provider.getSigner();

  // Instantiate the InputBox contract
  const inputBox = InputBox__factory.connect(INPUTBOX_ADDRESS, signer);

  // Encode the input
  const inputBytes = ethers.utils.isBytesLike(data)
    ? data
    : ethers.utils.toUtf8Bytes(JSON.stringify(data));

  // Send the transaction
  const tx = await inputBox.addInput(DAPP_ADDRESS, inputBytes);
  console.log(`transaction: ${tx.hash}`);

  // tx contains all data about the transaction
  // Wait for confirmation
  console.log("waiting for confirmation...");
  const receipt = await tx.wait(1);

  // Search for the InputAdded event
  const event = receipt.events?.find((e) => e.event === "InputAdded");

  if (!event) {
    throw new Error(
      `InputAdded event not found in receipt of transaction ${receipt.transactionHash}`
    );
  }
  return {
    status: "auction created with success!",
  };
}
