import { AuctionCard } from '../../components/AuctionCard'
import { Layout } from '../../components/Layout'

import React, { useState } from 'react'

import { AiOutlinePlus,  AiOutlineMinus} from 'react-icons/ai'

import { useRouter } from 'next/router'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

const NewAuction = () => {

    const [ qntInputs, setQntInputs ] = useState([true])

    function changeQnt(e: any, type: number) {
        e.preventDefault()
        if(type == 1) {
            setQntInputs([...qntInputs, true])
        } else {
            if(qntInputs.length > 1) {
                setQntInputs(qntInputs.slice(0, qntInputs.length - 1))
            }
        }
        
    }
    
    return (
        <Layout title={'Auctions'}>
            <div className='w-auto flex flex-col content-start items-center mt-6 ml-6'>
                <h1 className='w-auto text-3xl self-start font-bold'>Create an Auction</h1>
                <label className='w-auto text-sm self-start font-bold text-gray-400'>You could create an auction for your property</label>
            </div>

            <div className='flex flex-row'>
                <form className='w-full flex flex-col justify-center items-center mt-6 ml-6'>
                    <div className='flex flex-col justify-center items-start'>
                        <label className='text-md font-bold'>Coordenadas</label>
                        {
                            qntInputs.map((input, index) => (
                                <input key={index} className='w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2' type='text' placeholder={`Coordenada ${index + 1}`} />
                            ))
                        }
                        {/* <input className='w-[90%] md:w-[500px] h-[45px] border-2 border-blue-500 px-4 py-4 rounded-xl outline-0 mt-2' type='text' placeholder='Rua Teste, 123' /> */}
                        <div className='w-full flex justify-center items-center gap-2 mt-4'>
                            <button onClick={(e) => {changeQnt(e, 1)}} className='w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500'><AiOutlinePlus /></button>
                            <label>ou</label>
                            <button onClick={(e) => {changeQnt(e, 0)}} className='w-[30px] h-[30px] flex justify-center items-center rounded-[50%] bg-blue-500'><AiOutlineMinus /></button>
                        </div>
                        
                    </div>
                </form>
            </div>
            
        </Layout>
  )

}

function Map() {
    return 
}

export default NewAuction