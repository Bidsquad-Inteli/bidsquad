"use client";
//@ts-nocheck

"use client";
import { Layout } from "@/components/Layout";
import { SemipolarLoading } from "react-loadingg";

import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

import { useState } from "react";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const NewAuction = () => {
  const [qntInputs, setQntInputs] = useState([true]);
  const [loaded, setLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [map, setMap] = useState("");
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isSecondPage, setIsSecondPage] = useState(false);

  function changeQnt(e: any, type: number) {
    e.preventDefault();
    if (type == 1) {
      setQntInputs([...qntInputs, true]);
    } else {
      if (qntInputs.length > 1) {
        setQntInputs(qntInputs.slice(0, qntInputs.length - 1));
      }
    }
  }

  function saveCoordinate(value: string, index: number) {
    let aux: any = coordinates;

    const splited = value.split(",");

    aux[index] = value;

    setCoordinates(aux);
  }

  async function fetchImageAndConvertToBase64(url) {
    // Fetch the image
    const response = await fetch(url);

    // Get the blob data of the image
    const blob = await response.blob();

    const file = new File([blob], "ipfsFile.png", { type: "image/png" });

    const formData = new FormData();
    formData.append("file", file);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: "bf67cf4376213d9d9cb0", // `${process.env.REACT_APP_PINATA_API_KEY}`,
        pinata_secret_api_key:
          "5250eddb652c2e750bdf57d8ed79ee762564fed74c4ebfd78bb35dd4dbbe5a17", // `${process.env.REACT_APP_PINATA_API_SECRET}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const fileHash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;

    console.log(fileHash);

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
    const base64Data = await blobToBase64(blob);

    const object = {
      satelliteImage: fileHash,
      base64Image: base64Data,
    };

    window.localStorage.setItem("object", JSON.stringify(object));

    return fileHash;
  }

  async function getResult(e: any) {
    e.preventDefault();
    console.log(coordinates);

    const joined = coordinates.join("|");

    setMap(
      `https://maps.googleapis.com/maps/api/staticmap?size=400x400&maptype=satellite&path=color:0xff0000ff|weight:5|${joined}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    await fetchImageAndConvertToBase64(
      `https://maps.googleapis.com/maps/api/staticmap?size=400x400&maptype=satellite&path=color:0xff0000ff|weight:0|${joined}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );

    setLoaded(true);
  }

  function changePage(e: any, type: string) {
    e.preventDefault();
    if (type == "next") {
      const object = JSON.parse((window as any).localStorage.getItem("object"));

      if (object) {
        if (
          object.satelliteImage == "" ||
          object.satelliteImage == undefined ||
          object.satelliteImage == null ||
          object.base64Image == undefined ||
          object.base64Image == null ||
          object.base64Image == ""
        ) {
          toast.error("You need to upload a satellite image");
          return;
        }
      } else {
        toast.error("You need to upload a satellite image");
        return;
      }

      setIsFirstPage(false);
      setIsSecondPage(true);
    } else {
      setIsFirstPage(true);
      setIsSecondPage(false);
    }
  }

  return (
    <Layout title={"Auctions"}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-auto flex flex-col content-start items-center mt-6 ml-6">
        <h1 className="w-auto text-3xl self-start font-bold">
          Create an Auction
        </h1>
        <label className="w-auto text-sm self-start font-bold text-gray-400">
          You could create an auction for your property
        </label>
      </div>
      {isFirstPage && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-56 mt-10 md:mt-32">
          <form className="flex flex-col justify-center items-center mt-6 ml-6">
            <div className="flex flex-col justify-center items-start">
              <label className="text-md font-bold">Coordenadas</label>
              {qntInputs.map((input, index) => (
                <input
                  key={index}
                  className="w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2"
                  type="text"
                  placeholder={`Coordenada ${index + 1}`}
                  onChange={(e) => {
                    saveCoordinate(e.target.value, index);
                  }}
                />
              ))}
              {/* <input className='w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2' type='text' placeholder='Rua Teste, 123' /> */}
              <div className="w-full flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={(e) => {
                    changeQnt(e, 1);
                  }}
                  className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500"
                >
                  <AiOutlinePlus color="white" />
                </button>
                <label>ou</label>
                <button
                  onClick={(e) => {
                    changeQnt(e, 0);
                  }}
                  className="w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500"
                >
                  <AiOutlineMinus color="white" />
                </button>
              </div>
              <div className="w-full flex justify-center items-center mt-8">
                <button
                  onClick={(e) => {
                    getResult(e);
                  }}
                  className="w-[200px] h-[40px] text-white font-bold flex justify-center items-center rounded-xl bg-blue-500"
                >
                  Processar Coordenadas
                </button>
              </div>
            </div>
          </form>
          <div>
            {loaded ? (
              <div className="w-full flex flex-col justify-center items-center">
                <label className="w-full text-center font-bold mb-4 text-2xl">
                  Imagem
                </label>
                <img
                  className="border-4 border-blue-500 rounded-2xl"
                  src={map}
                ></img>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-6">
                <label>Aguardando Coordenadas</label>
                <div className="relative mr-8">
                  <SemipolarLoading color="#3B82F6" size="small" speed={8} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isSecondPage && (
        <form className="w-full flex flex-col justify-center items-center mt-6 ml-6 gap-4">
          <div className="flex flex-col justify-center items-start">
            <label className="text-md font-bold">Título</label>
            <input
              className="w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2"
              type="text"
              placeholder={`Título`}
              // onChange={(e) => {
              //     setTitle(e.target.value);
              // }}
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <label className="text-md font-bold">Description</label>
            <input
              className="w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2"
              type="text"
              placeholder={`Description`}
              // onChange={(e) => {
              //     setTitle(e.target.value);
              // }}
            />
          </div>

          <div className="flex flex-col justify-center items-start">
            <label className="text-md font-bold">State</label>
            <input
              className="w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2"
              type="text"
              placeholder={`State`}
              // onChange={(e) => {
              //     setTitle(e.target.value);
              // }}
            />
          </div>
        </form>
      )}

      <div className="w-full mt-24 flex flex-row items-center justify-center gap-2">
        {isFirstPage && (
          <>
            <button
              disabled
              className="w-[140px] h-[40px] text-white font-bold flex justify-center items-center rounded-xl bg-blue-500 disabled:opacity-50"
            >
              Back Page
            </button>
            <button
              onClick={(e) => {
                changePage(e, "next");
              }}
              className="w-[140px] h-[40px] text-white font-bold flex justify-center items-center rounded-xl bg-blue-500"
            >
              Next Page
            </button>
          </>
        )}

        {isSecondPage && (
          <>
            <button
              onClick={(e) => {
                changePage(e, "prev");
              }}
              className="w-[140px] h-[40px] text-white font-bold flex justify-center items-center rounded-xl bg-blue-500"
            >
              Back Page
            </button>
            <button
              disabled
              className="w-[140px] h-[40px] text-white font-bold flex justify-center items-center rounded-xl bg-blue-500 disabled:opacity-50"
            >
              Next Page
            </button>
          </>
        )}
      </div>
    </Layout>
  );
};

export default NewAuction;
