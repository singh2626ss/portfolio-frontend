import React from 'react';
import { TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

const HoldingsTable = () => {
  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 50,
      avgPrice: 142.50,
      currentPrice: 175.84,
      value: 8792.00,
      change: '+23.4%',
      isPositive: true
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 25,
      avgPrice: 285.20,
      currentPrice: 338.11,
      value: 8452.75,
      change: '+18.5%',
      isPositive: true
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 15,
      avgPrice: 2340.00,
      currentPrice: 2542.18,
      value: 38132.70,
      change: '+8.6%',
      isPositive: true
    },
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      quantity: 20,
      avgPrice: 245.60,
      currentPrice: 201.29,
      value: 4025.80,
      change: '-18.1%',
      isPositive: false
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      quantity: 12,
      avgPrice: 418.30,
      currentPrice: 432.12,
      value: 5185.44,
      change: '+3.3%',
      isPositive: true
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Holdings</h3>
        <p className="text-sm text-gray-500">Your current stock positions</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {holdings.map((holding, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{holding.symbol}</div>
                    <div className="text-xs text-gray-500">{holding.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{holding.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${holding.avgPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${holding.currentPrice.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${holding.value.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {holding.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${holding.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {holding.change}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoldingsTable;