import { AuctionCard } from '../../components/AuctionCard'
import { Layout } from '../../components/Layout'

import { AiOutlinePlus } from 'react-icons/ai'

import { useRouter } from 'next/router'
import Link from 'next/link'
import path from 'path'

interface Props {
  auctions: {
      id: string;
      name: string;
      description: string;
      startDate: string;
      endDate: string;
      address: string;
      startPrice: number;
      price: number;
  }[];
}

const Auctions: React.FC<Props> = ({auctions}) => {
  // const auctions = [
  //   { 
  //     id: "1", 
  //     name: "Default title for testing", 
  //     description: "Default description for testing", 
  //     startDate: "08/15/2023", 
  //     endDate: "08/15/2023", 
  //     address: "0x1234567890123456789012345678901234567890", 
  //     startPrice: 100.0, 
  //     price: 100.0 
  //   },
  //   { 
  //     id: "2", 
  //     name: "Default title for testing", 
  //     description: "Default description for testing", 
  //     startDate: "08/15/2023", 
  //     endDate: "08/15/2023", 
  //     address: "0x1234567890123456789012345678901234567890", 
  //     startPrice: 100.0, 
  //     price: 100.0 
  //   },
  //   { 
  //     id: "3", 
  //     name: "Default title for testing", 
  //     description: "Default description for testing", 
  //     startDate: "08/15/2023", 
  //     endDate: "08/15/2023", 
  //     address: "0x1234567890123456789012345678901234567890", 
  //     startPrice: 100.0, 
  //     price: 100.0 
  //   },
  //   { 
  //     id: "4", 
  //     name: "Default title for testing", 
  //     description: "Default description for testing", 
  //     startDate: "08/15/2023", 
  //     endDate: "08/15/2023", 
  //     address: "0x1234567890123456789012345678901234567890", 
  //     startPrice: 100.0, 
  //     price: 100.0 
  //   },
  //   { 
  //     id: "5", 
  //     name: "Default title for testing", 
  //     description: "Default description for testing", 
  //     startDate: "08/15/2023", 
  //     endDate: "08/15/2023", 
  //     address: "0x1234567890123456789012345678901234567890", 
  //     startPrice: 100.0, 
  //     price: 100.0 
  //   },
  // ]

  const router = useRouter()

  function sendToNew() {
    router.push('/auctions/new')
  }

  return (
    <Layout title={'Auctions'}>
        <div className='w-auto flex flex-col content-start items-center mt-6 ml-6'>
            <h1 className='w-auto text-3xl self-start font-bold'>Live Auctions 🔥</h1>
            <label className='w-auto text-sm self-start font-bold text-gray-400'>Enjoy! The latest hot auctions</label>
        </div>

        <div className='w-full mt-12 flex flex-wrap justify-center items-center gap-4'>
            {auctions.map((auction, index) => (
                <AuctionCard key={index} {...auction} />
            ))}
        </div>
        
        <Link href={'/auctions/new'}>
            <div className='fixed flex justify-center items-center bg-blue-500 bottom-[50px] right-[50px] w-[50px] h-[50px] rounded-[50%]'>
                {/* <label className='text-white font-bold text-3xl flex justify-center items-center translate-y-[-3px]'>+</label> */}
                <AiOutlinePlus size={30} color='white'/>
            </div>
        </Link>
    </Layout>
  )

}

export const getServerSideProps = async (ctx: any) => {
  const getAuctions = async () => {
      const DEFAULT_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5005/inspect";

      const DEFAULT_PAYLOAD = "auctions";

      const response = await fetch(path.join(DEFAULT_URL, DEFAULT_PAYLOAD));

      if (response.status != 200) {
          return {
              redirect: {
                  destination: "/",
                  permanent: false,
              },
          };
      }

      const res = await response.json();

      return {
          props: {
              auctions: res,
          },
      };
  };

  return await getAuctions();
};

export default Auctions