import { Layout } from '../components/Layout'

const Home = () => {
  return (
    <Layout title={'Home'}>
      <div className='flex flex-col items-center justify-center h-full py-8 px-4'>
        <h1 className='text-4xl font-bold mb-6'>Bem-vindo ao BidSquad!</h1>
        <p className='text-lg text-center mb-8'>
          Uma plataforma revolucionária de leilão de crédito de carbono, impulsionada pela inovação da tecnologia blockchain e pela eficiência da inteligência artificial.
        </p>

        <div className='w-full md:w-3/4 lg:w-1/2'>
          <h2 className='text-2xl font-bold mb-4'>Como funciona?</h2>
          <ol className='text-lg list-decimal list-inside'>
            <li>Adicione sua área: Marque as coordenadas dos vértices do terreno e nossa inteligência artificial estimará o crédito de carbono gerado.</li>
            <li>Leilões Reversos: Certificadoras de carbono oferecem lances competitivos para comprar os créditos gerados. Quanto maior o potencial de consumo de carbono, maior será o interesse das certificadoras.</li>
            <li>Impacto Sustentável: Ao vender os créditos para certificadoras, você contribui diretamente para a preservação do meio ambiente e projetos de redução de emissões em todo o mundo.</li>
          </ol>
        </div>

        <div className='w-full md:w-3/4 lg:w-1/2 mt-8'>
          <h2 className='text-2xl font-bold mb-4'>Principais Benefícios:</h2>
          <ul className='text-lg list-disc list-inside'>
            <li>Tecnologia Blockchain: Transações seguras e transparentes garantidas pela blockchain.</li>
            <li>Inteligência Artificial Avançada: Nossa IA estima o potencial de consumo de carbono de forma precisa, gerando estimativas confiáveis de créditos de carbono.</li>
            <li>Sustentabilidade Acessível: O BidSquad torna a participação no mercado de crédito de carbono acessível a todos.</li>
            <li>Certificadoras Credenciadas: Trabalhamos com certificadoras de renome, garantindo a validade dos créditos de carbono gerados.</li>
          </ul>
        </div>

        <p className='text-lg mt-8'>
          Junte-se a nós na jornada para um futuro mais verde e sustentável. Crie sua conta no BidSquad hoje mesmo e faça parte dessa mudança positiva.
        </p>
        <p className='text-lg'>
          Seja um agente de transformação ambiental. Seja o elo que liga sustentabilidade e inovação. Seja parte do BidSquad!
        </p>
      </div>
    </Layout>
  )
}

export default Home
