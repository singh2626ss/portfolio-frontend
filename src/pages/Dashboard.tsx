import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent,
  Brain,
  Shield,
  Activity,
  Target,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

const Dashboard = () => {
  // Sample data for charts
  const performanceData = [
    { date: '2023-01', value: 104686 },
    { date: '2023-02', value: 108234 },
    { date: '2023-03', value: 112456 },
    { date: '2023-04', value: 109876 },
    { date: '2023-05', value: 115432 },
    { date: '2023-06', value: 118765 },
    { date: '2023-07', value: 122134 },
    { date: '2023-08', value: 119876 },
    { date: '2023-09', value: 124567 },
    { date: '2023-10', value: 127843 }
  ];

  const allocationData = [
    { name: 'Technology', value: 45, color: '#0ea5e9' },
    { name: 'Healthcare', value: 20, color: '#22c55e' },
    { name: 'Finance', value: 15, color: '#f59e0b' },
    { name: 'Consumer', value: 12, color: '#ef4444' },
    { name: 'Energy', value: 8, color: '#d946ef' }
  ];

  const sectorData = [
    { sector: 'Tech', allocation: 45, performance: 12.5 },
    { sector: 'Healthcare', allocation: 20, performance: 8.3 },
    { sector: 'Finance', allocation: 15, performance: 6.7 },
    { sector: 'Consumer', allocation: 12, performance: 4.2 },
    { sector: 'Energy', allocation: 8, performance: -2.1 }
  ];

  const riskMetrics = [
    { name: 'Diversification', score: 8.2, status: 'good' },
    { name: 'Volatility', score: 6.8, status: 'moderate' },
    { name: 'Correlation', score: 5.4, status: 'moderate' },
    { name: 'Liquidity', score: 9.1, status: 'good' }
  ];

  const aiRecommendations = [
    {
      type: 'Rebalance',
      priority: 'high',
      title: 'Reduce Technology Exposure',
      description: 'Your tech allocation is 45%, consider reducing to 35% for better diversification.',
      confidence: 87
    },
    {
      type: 'Opportunity',
      priority: 'medium',
      title: 'Add International Exposure',
      description: 'Consider adding emerging market ETFs for geographic diversification.',
      confidence: 74
    },
    {
      type: 'Risk',
      priority: 'medium',
      title: 'Monitor Correlation Risk',
      description: 'High correlation between holdings may increase portfolio volatility.',
      confidence: 82
    }
  ];

  const portfolioMetrics = [
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
      value: '6.8/10',
      change: 'Moderate',
      changePercent: 'risk level',
      isPositive: false,
      icon: Shield
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-neutral-50 text-neutral-700 border-neutral-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-neutral-600';
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">AI Portfolio Analysis</h1>
              <p className="text-neutral-600">Multi-agent intelligence powered by Google ADK</p>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Overview Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {portfolioMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${metric.isPositive ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    <Icon className={`w-5 h-5 ${metric.isPositive ? 'text-green-600' : 'text-yellow-600'}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-neutral-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-neutral-900">{metric.value}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-yellow-600'}`}>
                      {metric.change}
                    </span>
                    <span className="text-xs text-neutral-500">{metric.changePercent}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-primary-600" />
                  <span>Portfolio Performance</span>
                </h3>
                <div className="flex items-center space-x-2 text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                  <span>Portfolio Value</span>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                    <XAxis dataKey="date" stroke="#737373" />
                    <YAxis stroke="#737373" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        color: '#171717'
                      }} 
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Allocation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-secondary-600" />
                  <span>Asset Allocation</span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          color: '#171717'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {allocationData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-neutral-600">{item.name}</span>
                      <span className="text-sm text-neutral-900 font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sector Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-accent-600" />
                  <span>Sector Performance</span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                      <XAxis dataKey="sector" stroke="#737373" />
                      <YAxis stroke="#737373" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e5e5',
                          borderRadius: '8px',
                          color: '#171717'
                        }} 
                      />
                      <Bar dataKey="performance" fill="#22c55e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-8">
            {/* Risk Analysis */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span>Risk Analysis</span>
              </h3>
              <div className="space-y-4">
                {riskMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-neutral-700">{metric.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                          {metric.score}/10
                        </span>
                        {metric.status === 'good' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          metric.score >= 7 ? 'bg-green-500' : 
                          metric.score >= 5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${metric.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Recommendations</span>
              </h3>
              <div className="space-y-4">
                {aiRecommendations.map((rec, index) => (
                  <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority.toUpperCase()}
                      </span>
                      <div className="text-right">
                        <div className="text-xs text-neutral-500">Confidence</div>
                        <div className="text-sm font-medium text-neutral-900">{rec.confidence}%</div>
                      </div>
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-900 mb-2">{rec.title}</h4>
                    <p className="text-sm text-neutral-600">{rec.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">AI Insight</span>
                </div>
                <p className="text-sm text-neutral-700">
                  Based on current market conditions and your risk profile, consider rebalancing 
                  your technology exposure while maintaining growth potential through diversification.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;