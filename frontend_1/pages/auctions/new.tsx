import { AuctionCard } from '../../components/AuctionCard'
import { Layout } from '../../components/Layout'

import { AiOutlinePlus } from 'react-icons/ai'

import { useRouter } from 'next/router'

const NewAuction = () => {

  return (
    <Layout title={'Auctions'}>
        <div className='w-auto flex flex-col content-start items-center mt-6 ml-6'>
            <h1 className='w-auto text-3xl self-start font-bold'>Create an Auction</h1>
            <label className='w-auto text-sm self-start font-bold text-gray-400'>You could create an auction for your property</label>
        </div>

        <div>
            <form className='w-full flex flex-col justify-center items-center mt-6 ml-6'>
                <div className='flex flex-col justify-center items-start'>
                    <label className='text-md font-bold'>Endereço Base</label>
                    <input className='w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2' type='text' placeholder='Rua Teste, 123' />
                </div>
            </form>
        </div>

        <div className='w-full'>

        </div>
    </Layout>
  )

}

export default NewAuction