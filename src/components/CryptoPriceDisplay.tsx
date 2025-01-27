import { useMemo } from "react";
import { useCryptoStore } from "../store/store";
import Spinner from "./Spinner";

export default function CryptoPriceDisplay() {
  const { cryptoData, loading } = useCryptoStore();

  const hasResult = useMemo(
    () => Object.values(cryptoData).includes(""),
    [cryptoData]
  );

  return (
    <div className="result-wrapper">
      {loading ? <Spinner /> : !hasResult && (
        <>
          <h2>Cotización:</h2>
          <div className="result">
            <img
              src={`https://cryptocompare.com/${cryptoData.IMAGEURL}`}
              alt="Cryptomoneda imagen"
            />
            <div>
              <p>El precio es de: <span>{cryptoData.PRICE}</span></p>
              <p>El precio más alto del día: <span>{cryptoData.HIGHDAY}</span></p>
              <p>El precio más bajo del día: <span>{cryptoData.LOWDAY}</span></p>
              <p>Variación últimas 24 Horas{" "}<span>{cryptoData.CHANGEPCT24HOUR}</span></p>
              <p>última Actualización: <span>{cryptoData.LASTUPDATE}</span></p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
