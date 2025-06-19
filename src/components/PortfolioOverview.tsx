import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';

const PortfolioOverview = () => {
  const metrics = [
    {
      title: 'Total Portfolio Value',
      value: '$127,843.52',
      change: '+$3,421.18',
      changePercent: '+2.75%',
      isPositive: true,
      icon: DollarSign
    },
    {
      title: 'Today\'s Change',
      value: '+$1,247.83',
      change: '+0.98%',
      changePercent: 'vs yesterday',
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: 'Total Return',
      value: '+$23,157.44',
      change: '+22.11%',
      changePercent: 'all time',
      isPositive: true,
      icon: Percent
    },
    {
      title: 'Risk Score',
      value: '6.2/10',
      change: 'Moderate',
      changePercent: 'risk level',
      isPositive: false,
      icon: TrendingDown
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${metric.isPositive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <Icon className={`w-5 h-5 ${metric.isPositive ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-yellow-600'}`}>
                  {metric.change}
                </span>
                <span className="text-xs text-gray-500">{metric.changePercent}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PortfolioOverview;