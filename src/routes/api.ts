export const BASE_URL = `https://api.coinpaprika.com/v1`;
export const COIN_URL = `https://ohlcv-api.nomadcoders.workers.dev/?coinId=`;
export async function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export async function fetchCoinHostory(coinId: string) {
  return fetch(`${COIN_URL}${coinId}`).then((response) => response.json());
}
