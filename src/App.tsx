import { useEffect } from "react"
import CryptoSearchForm from "./components/CryptoSearchForm"
import { useCryptoStore } from "./store/store"
import CryptoPriceDisplay from "./components/CryptoPriceDisplay"

function App() {
  const { fetchCrypto } = useCryptoStore()

  useEffect(() => {
    fetchCrypto()
  }, [fetchCrypto])
  

  return (
    <>
      <div className="container">
        <h1 className="app-title">Cotizador de <span>Criptomonedas</span></h1>

        <div className="content">
          <CryptoSearchForm />

          <CryptoPriceDisplay />
        </div>
      </div>
    </>
  )
}

export default App
