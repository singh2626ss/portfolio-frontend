import React from 'react';
import { Brain, ArrowRight, Star, AlertCircle } from 'lucide-react';

const AIRecommendations = () => {
  const recommendations = [
    {
      type: 'Rebalance',
      priority: 'high',
      title: 'Consider reducing TSLA position',
      description: 'High volatility and overweight allocation detected. Consider reducing by 25% to optimize risk.',
      impact: 'Risk reduction: -1.2 points',
      confidence: 85
    },
    {
      type: 'Opportunity',
      priority: 'medium',
      title: 'Add defensive positions',
      description: 'Portfolio lacks defensive stocks. Consider utilities or consumer staples for stability.',
      impact: 'Diversification: +0.8 points',
      confidence: 78
    },
    {
      type: 'Alert',
      priority: 'medium',
      title: 'Monitor earnings season',
      description: 'AAPL and MSFT reporting next week. Consider position sizing ahead of potential volatility.',
      impact: 'Timing optimization',
      confidence: 72
    },
    {
      type: 'Growth',
      priority: 'low',
      title: 'Explore emerging markets',
      description: 'Consider small allocation to emerging market ETFs for long-term growth potential.',
      impact: 'Growth potential: +1.1 points',
      confidence: 65
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Alert': return <AlertCircle className="w-4 h-4" />;
      case 'Opportunity': return <Star className="w-4 h-4" />;
      default: return <ArrowRight className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            <p className="text-sm text-gray-500">Personalized insights based on your portfolio</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="text-gray-600">
                  {getTypeIcon(rec.type)}
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                  {rec.priority.toUpperCase()}
                </span>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Confidence</div>
                <div className="text-sm font-medium text-gray-900">{rec.confidence}%</div>
              </div>
            </div>
            
            <h4 className="text-sm font-semibold text-gray-900 mb-2">{rec.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{rec.impact}</span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                View Details →
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
          <div className="flex items-center space-x-2 mb-2">
            <Brain className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">AI Insight</span>
          </div>
          <p className="text-sm text-purple-700">
            Based on current market conditions and your risk profile, focus on rebalancing 
            high-volatility positions while maintaining growth exposure in technology sector.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;