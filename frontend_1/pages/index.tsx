import { Layout } from '../components/Layout'

const Home = () => {
  const auctions = [
    { 
      id: "1", 
      name: "Default title for testing", 
      description: "Default description for testing", 
      startDate: "08/15/2023", 
      endDate: "08/15/2023", 
      address: "0x1234567890123456789012345678901234567890", 
      startPrice: 100.0, 
      price: 100.0 
    },
    { 
      id: "2", 
      name: "Default title for testing", 
      description: "Default description for testing", 
      startDate: "08/15/2023", 
      endDate: "08/15/2023", 
      address: "0x1234567890123456789012345678901234567890", 
      startPrice: 100.0, 
      price: 100.0 
    },
    { 
      id: "3", 
      name: "Default title for testing", 
      description: "Default description for testing", 
      startDate: "08/15/2023", 
      endDate: "08/15/2023", 
      address: "0x1234567890123456789012345678901234567890", 
      startPrice: 100.0, 
      price: 100.0 
    },
    { 
      id: "4", 
      name: "Default title for testing", 
      description: "Default description for testing", 
      startDate: "08/15/2023", 
      endDate: "08/15/2023", 
      address: "0x1234567890123456789012345678901234567890", 
      startPrice: 100.0, 
      price: 100.0 
    },
    { 
      id: "5", 
      name: "Default title for testing", 
      description: "Default description for testing", 
      startDate: "08/15/2023", 
      endDate: "08/15/2023", 
      address: "0x1234567890123456789012345678901234567890", 
      startPrice: 100.0, 
      price: 100.0 
    },
  ]

  return (
    <Layout title={'Home'}>
      <div className='flex flex-col items-center justify-center h-full py-8 px-4'>
        <h1 className='text-4xl font-bold'>
          Welcome to <span className='text-blue-600'>BidSquad</span>
        </h1>
      </div>
    </Layout>
  )
}

export default Home
