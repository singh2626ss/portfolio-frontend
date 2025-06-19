import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const RiskAnalysis = () => {
  const riskFactors = [
    {
      category: 'Diversification',
      score: 7.2,
      status: 'good',
      description: 'Well diversified across sectors'
    },
    {
      category: 'Volatility',
      score: 6.8,
      status: 'moderate',
      description: 'Moderate volatility in portfolio'
    },
    {
      category: 'Market Correlation',
      score: 5.4,
      status: 'moderate',
      description: 'High correlation with market trends'
    },
    {
      category: 'Liquidity',
      score: 8.9,
      status: 'good',
      description: 'High liquidity across holdings'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'moderate': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <XCircle className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Risk Analysis</h3>
            <p className="text-sm text-gray-500">AI-powered portfolio risk assessment</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskFactors.map((factor, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{factor.category}</span>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                  {getStatusIcon(factor.status)}
                  <span>{factor.score}/10</span>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    factor.score >= 7 ? 'bg-green-500' : 
                    factor.score >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${factor.score * 10}%` }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-500">{factor.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Overall Risk Assessment</h4>
          <p className="text-sm text-blue-700">
            Your portfolio shows a <span className="font-medium">moderate risk profile</span> with good diversification 
            and liquidity. Consider reducing market correlation by adding alternative investments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;