const marketIndexes = [
  // Índices principales
  {
    symbol: '^DJI',
    name: 'Dow Jones Industrial Average',
    currentPrice: 34321.74,
    priceChange: -256.23,  // Cambio negativo
    percentChange: -0.75,  // Cambio negativo
    type: 'Índice',
  },
  {
    symbol: '^GSPC',
    name: 'S&P 500',
    currentPrice: 3950.15,
    priceChange: 28.42,
    percentChange: 0.72,
    type: 'Índice',
  },
  {
    symbol: '^IXIC',
    name: 'NASDAQ Composite',
    currentPrice: 12356.42,
    priceChange: -152.65,  // Cambio negativo
    percentChange: -1.25,  // Cambio negativo
    type: 'Índice',
  },
  {
    symbol: '^RUT',
    name: 'Russell 2000',
    currentPrice: 1865.32,
    priceChange: 13.76,
    percentChange: 0.74,
    type: 'Índice',
  },
  {
    symbol: '^VIX',
    name: 'CBOE Volatility Index',
    currentPrice: 19.63,
    priceChange: -0.85,  // Cambio negativo
    percentChange: -4.51,  // Cambio negativo
    type: 'Índice',
  },

  // Acciones individuales (simulando más de 100)
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 145.22,
    priceChange: 2.35,
    percentChange: 1.64,
    type: 'Acción',
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    currentPrice: 287.45,
    priceChange: -4.12,  // Cambio negativo
    percentChange: -1.46,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'GOOG',
    name: 'Alphabet Inc. (Google)',
    currentPrice: 2754.63,
    priceChange: 24.65,
    percentChange: 0.90,
    type: 'Acción',
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    currentPrice: 3345.27,
    priceChange: -45.18,  // Cambio negativo
    percentChange: -1.36,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    currentPrice: 688.98,
    priceChange: -15.02,  // Cambio negativo
    percentChange: -2.24,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'FB',
    name: 'Meta Platforms, Inc.',
    currentPrice: 358.11,
    priceChange: 3.32,
    percentChange: 0.94,
    type: 'Acción',
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    currentPrice: 202.56,
    priceChange: 6.45,
    percentChange: 3.29,
    type: 'Acción',
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    currentPrice: 507.22,
    priceChange: -12.55,  // Cambio negativo
    percentChange: -2.54,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    currentPrice: 56.34,
    priceChange: -1.75,  // Cambio negativo
    percentChange: -3.19,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'CSCO',
    name: 'Cisco Systems, Inc.',
    currentPrice: 52.85,
    priceChange: 0.78,
    percentChange: 1.5,
    type: 'Acción',
  },
  {
    symbol: 'BA',
    name: 'Boeing Company',
    currentPrice: 215.10,
    priceChange: 1.90,
    percentChange: 0.89,
    type: 'Acción',
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    currentPrice: 232.11,
    priceChange: 3.67,
    percentChange: 1.61,
    type: 'Acción',
  },
  {
    symbol: 'PYPL',
    name: 'PayPal Holdings, Inc.',
    currentPrice: 274.31,
    priceChange: -6.22,  // Cambio negativo
    percentChange: -2.32,  // Cambio negativo
    type: 'Acción',
  },
  {
    symbol: 'MA',
    name: 'Mastercard Inc.',
    currentPrice: 358.99,
    priceChange: 4.55,
    percentChange: 1.29,
    type: 'Acción',
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    currentPrice: 156.98,
    priceChange: 2.22,
    percentChange: 1.43,
    type: 'Acción',
  },
  
  
  // Criptomonedas (Top 10)
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 53721.34,
    priceChange: 1500.50,
    percentChange: 2.86,
    type: 'Criptomoneda',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 3467.22,
    priceChange: 85.12,
    percentChange: 2.52,
    type: 'Criptomoneda',
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    currentPrice: 412.44,
    priceChange: 7.50,
    percentChange: 1.85,
    type: 'Criptomoneda',
  },
  {
    symbol: 'XRP',
    name: 'XRP (Ripple)',
    currentPrice: 1.25,
    priceChange: -0.05,
    percentChange: -3.85,
    type: 'Criptomoneda',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    currentPrice: 123.45,
    priceChange: 5.25,
    percentChange: 4.44,
    type: 'Criptomoneda',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    currentPrice: 1.60,
    priceChange: 0.12,
    percentChange: 8.11,
    type: 'Criptomoneda',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    currentPrice: 0.25,
    priceChange: -0.01,
    percentChange: -3.85,
    type: 'Criptomoneda',
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    currentPrice: 42.87,
    priceChange: 2.14,
    percentChange: 5.25,
    type: 'Criptomoneda',
  },
  {
    symbol: 'LTC',
    name: 'Litecoin',
    currentPrice: 223.30,
    priceChange: 15.32,
    percentChange: 7.37,
    type: 'Criptomoneda',
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    currentPrice: 2.12,
    priceChange: 0.10,
    percentChange: 4.92,
    type: 'Criptomoneda',
  },
];

export default marketIndexes;
