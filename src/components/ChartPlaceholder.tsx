import React from 'react';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface ChartPlaceholderProps {
  title: string;
  type: 'line' | 'bar' | 'pie';
  height?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ 
  title, 
  type, 
  height = 'h-64' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'line': return <TrendingUp className="w-8 h-8 text-blue-400" />;
      case 'bar': return <BarChart3 className="w-8 h-8 text-blue-400" />;
      case 'pie': return <PieChart className="w-8 h-8 text-blue-400" />;
      default: return <BarChart3 className="w-8 h-8 text-blue-400" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className={`${height} flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50`}>
        <div className="text-center">
          {getIcon()}
          <p className="mt-2 text-sm text-gray-500">Chart visualization area</p>
          <p className="text-xs text-gray-400">Ready for integration with charting library</p>
        </div>
      </div>
    </div>
  );
};

export default ChartPlaceholder;