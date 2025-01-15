import axios from 'axios';

const MORALIS_API_BASE = 'https://solana-gateway.moralis.io';

// Configure axios instance with Moralis API key
const moralisApi = axios.create({
  baseURL: MORALIS_API_BASE,
  headers: {
    'X-API-Key': localStorage.getItem('MORALIS_API_KEY') || '',
  },
});

export interface TokenMetadata {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface TokenBalance {
  token_address: string;
  balance: string;
  decimals: number;
}

export interface TokenPrice {
  nativePrice: string;
  usdPrice: number;
  exchangeAddress: string;
}

export const MoralisService = {
  // Token Metadata
  async getTokenMetadata(network: string, address: string): Promise<TokenMetadata> {
    console.log('Fetching token metadata:', { network, address });
    const response = await moralisApi.get(`/token/${network}/${address}/metadata`);
    return response.data;
  },

  // Token Balances
  async getWalletTokens(network: string, address: string): Promise<TokenBalance[]> {
    console.log('Fetching wallet tokens:', { network, address });
    const response = await moralisApi.get(`/account/${network}/${address}/tokens`);
    return response.data;
  },

  // Native Balance
  async getNativeBalance(network: string, address: string): Promise<{ balance: string }> {
    console.log('Fetching native balance:', { network, address });
    const response = await moralisApi.get(`/account/${network}/${address}/balance`);
    return response.data;
  },

  // Token Price
  async getTokenPrice(network: string, address: string): Promise<TokenPrice> {
    console.log('Fetching token price:', { network, address });
    const response = await moralisApi.get(`/token/${network}/${address}/price`);
    return response.data;
  },

  // Portfolio
  async getPortfolio(network: string, address: string) {
    console.log('Fetching portfolio:', { network, address });
    const response = await moralisApi.get(`/account/${network}/${address}/portfolio`);
    return response.data;
  },

  // Token Swaps
  async getSwapsByWallet(network: string, address: string) {
    console.log('Fetching wallet swaps:', { network, address });
    const response = await moralisApi.get(`/account/${network}/${address}/swaps`);
    return response.data;
  },
};