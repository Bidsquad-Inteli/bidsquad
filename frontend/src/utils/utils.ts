import { ethers } from "ethers";
import axios from "axios";

export const hex2str = (hex: string) => {
    try {
        return ethers.utils.toUtf8String(hex);
    } catch (e) {
        return hex;
    }
};

export async function fetchImageAndConvertToBase64(url) {
    // Fetch the image
    const response = await fetch(url);

    // Get the blob data of the image
    const blob = await response.blob();

    const file = new File([blob], "ipfsFile.png", { type: "image/png" });

    // Function to convert blob to Base64
    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Convert blob to Base64
    let base64Data = await blobToBase64(blob);

    base64Data = (base64Data as any).slice(22);

    return { base64Data, file };
}

export async function sendToIPFS(file) {
    const formData = new FormData();
    formData.append("file", file);

    const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
            pinata_api_key: "bf67cf4376213d9d9cb0", // `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: "5250eddb652c2e750bdf57d8ed79ee762564fed74c4ebfd78bb35dd4dbbe5a17", // `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
        },
    });

    const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;

    return fileHash;
}

export function toUnixTime(date) {
    return Math.floor(date.getTime() / 1000);
  }
