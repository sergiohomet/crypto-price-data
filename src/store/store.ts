import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { CryptoCurrency, CryptoPrice, Pair } from "../types";
import { getCryptoPrice, getCryptos } from "../services/CryptoService";

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  cryptoData: CryptoPrice;
  loading: boolean;
  fetchCrypto: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};

export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    cryptoData: {
      PRICE: "",
      IMAGEURL: "",
      LASTUPDATE: "",
      HIGHDAY: "",
      LOWDAY: "",
      CHANGEPCT24HOUR: "",
    },
    loading: false,

    fetchCrypto: async () => {
      const cryptoCurrencies = await getCryptos();

      set(() => ({
        cryptoCurrencies,
      }));
    },

    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));

      const cryptoData = await getCryptoPrice(pair);
      set(() => ({
        cryptoData,
        loading: false,
      }));
    },
  }))
);
