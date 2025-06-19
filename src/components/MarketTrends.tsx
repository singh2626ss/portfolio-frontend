import React from 'react';
import { TrendingUp, Activity, Globe, BarChart3 } from 'lucide-react';

const MarketTrends = () => {
  const trends = [
    {
      title: 'Market Sentiment',
      value: 'Bullish',
      indicator: '+2.3%',
      description: 'Overall market confidence is high',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Volatility Index',
      value: '18.4',
      indicator: '-1.2',
      description: 'Lower volatility indicates stability',
      icon: Activity,
      color: 'blue'
    },
    {
      title: 'Sector Rotation',
      value: 'Tech Focus',
      indicator: '+5.7%',
      description: 'Technology sector showing strength',
      icon: BarChart3,
      color: 'purple'
    },
    {
      title: 'Global Impact',
      value: 'Positive',
      indicator: '+1.8%',
      description: 'International markets supportive',
      icon: Globe,
      color: 'teal'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'teal': return 'bg-teal-100 text-teal-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Activity className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Market Trends</h3>
            <p className="text-sm text-gray-500">Real-time market analysis and sentiment</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trends.map((trend, index) => {
            const Icon = trend.icon;
            return (
              <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getColorClasses(trend.color)}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{trend.title}</h4>
                      <span className="text-sm font-semibold text-gray-700">{trend.indicator}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 mb-1">{trend.value}</p>
                    <p className="text-xs text-gray-500">{trend.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Market Summary</h4>
          <p className="text-sm text-gray-600">
            Current market conditions favor growth-oriented portfolios. Technology sector leadership 
            continues with reduced volatility providing a stable investment environment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;