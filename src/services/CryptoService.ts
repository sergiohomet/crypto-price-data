import axios from "axios";
import { CryptoCurrenciesResponseSchema, CryptoPriceSchema } from "../schemas/crypto-schema";
import { Pair } from "../types";

export async function getCryptos() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
    try {
        const {data: { Data }} = await axios(url)
        const result = CryptoCurrenciesResponseSchema.safeParse(Data)
    
        if(result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getCryptoPrice(pair: Pair) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${pair.cryptoCurrency}&tsyms=${pair.currency}`

    try {
        const {data: {DISPLAY}} = await axios(url)
        const result = CryptoPriceSchema.safeParse(DISPLAY[pair.cryptoCurrency][pair.currency])
        if(result.success) {
            return result.data
        }
    } catch (error) {
        console.log(error)
    }
}