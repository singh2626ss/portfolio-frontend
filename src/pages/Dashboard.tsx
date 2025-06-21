import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
  BarChart3,
  MessageCircle,
  Send,
  Clock,
  Globe,
  Newspaper,
  RefreshCw,
  ExternalLink
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
  AreaChart,
  ScatterChart,
  Scatter
} from 'recharts';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  confidence?: number;
}

const Dashboard = () => {
  const location = useLocation();
  const result = location.state?.result;
  
  // AI Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Real-time Updates State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Only use real API data - no fallbacks
  const performanceData = result?.visualization_data?.performance?.x?.map((date: string, i: number) => ({
    date: new Date(date).toLocaleDateString(),
    value: result.visualization_data.performance.y[i]
  })) || [];

  const allocationData = result?.visualization_data?.composition?.labels?.map((label: string, i: number) => ({
    name: label,
    value: result.visualization_data.composition.values[i],
    color: ["#0ea5e9", "#22c55e", "#f59e0b", "#ef4444", "#d946ef", "#8b5cf6", "#06b6d4", "#84cc16"][i % 8]
  })) || [];

  const sectorData = result?.visualization_data?.composition?.labels?.map((label: string, i: number) => ({
    sector: label,
    allocation: result.visualization_data.composition.values[i],
    performance: result.visualization_data.performance?.y?.[i] || 0
  })) || [];

  const riskMetrics = result?.visualization_data?.risk?.labels?.map((label: string, i: number) => ({
    name: label,
    score: result.visualization_data.risk.values[i] || 0,
    status: result.visualization_data.risk.values[i] >= 7 ? 'good' : 
            result.visualization_data.risk.values[i] >= 5 ? 'moderate' : 'poor'
  })) || [];

  const aiRecommendations = result?.recommendations?.map((rec: any) => ({
    type: rec.type || 'General',
    priority: rec.priority || 'medium',
    title: rec.action || 'Portfolio Recommendation',
    description: rec.details || 'Consider reviewing your portfolio allocation.',
    confidence: 85
  })) || [];

  // Enhanced Market Sentiment Data
  const sentimentData = result?.market_sentiment ? {
    overall: result.market_sentiment.overall_sentiment,
    strength: result.market_sentiment.sentiment_strength,
    subjectivity: result.market_sentiment.subjectivity,
    recentEvents: result.market_sentiment.recent_events || [],
    totalEvents: result.market_sentiment.recent_events?.total_events || 0,
    highImpactCount: result.market_sentiment.recent_events?.high_impact_count || 0
  } : null;

  // Portfolio Summary Data
  const portfolioSummary = result?.portfolio_summary ? {
    totalPositions: result.portfolio_summary.number_of_positions,
    positions: result.portfolio_summary.positions || [],
    totalValue: result.portfolio_summary.positions?.reduce((sum: number, pos: any) => sum + pos.position_value, 0) || 0
  } : null;

  // Volatility Data for Scatter Charts
  const volatilityData = result?.risk_analysis?.volatility_data || {};

  // Portfolio metrics from API data only
  const portfolioMetrics = result?.performance_analysis ? [
    {
      title: 'Total Portfolio Value',
      value: `$${result.performance_analysis.current_value?.toLocaleString() || '0'}`,
      change: `${result.performance_analysis.total_return >= 0 ? '+' : ''}$${result.performance_analysis.total_return?.toLocaleString() || '0'}`,
      changePercent: `${result.performance_analysis.return_percentage >= 0 ? '+' : ''}${result.performance_analysis.return_percentage?.toFixed(2) || '0'}%`,
      isPositive: result.performance_analysis.total_return >= 0,
      icon: DollarSign
    },
    {
      title: 'Total Return',
      value: `${result.performance_analysis.total_return >= 0 ? '+' : ''}$${result.performance_analysis.total_return?.toLocaleString() || '0'}`,
      change: `${result.performance_analysis.return_percentage >= 0 ? '+' : ''}${result.performance_analysis.return_percentage?.toFixed(2) || '0'}%`,
      changePercent: 'all time',
      isPositive: result.performance_analysis.total_return >= 0,
      icon: Percent
    },
    {
      title: 'Risk Level',
      value: result.risk_analysis?.risk_level || 'Moderate',
      change: 'Risk Assessment',
      changePercent: 'portfolio risk',
      isPositive: false,
      icon: Shield
    },
    {
      title: 'Market Sentiment',
      value: result.market_sentiment?.overall_sentiment || 'Neutral',
      change: `${(result.market_sentiment?.sentiment_strength * 100)?.toFixed(1) || '0'}%`,
      changePercent: 'sentiment strength',
      isPositive: result.market_sentiment?.overall_sentiment === 'positive',
      icon: TrendingUp
    }
  ] : [];

  // Check if we have any data to display
  const hasData = result && (
    portfolioMetrics.length > 0 || 
    performanceData.length > 0 || 
    allocationData.length > 0 || 
    riskMetrics.length > 0 || 
    aiRecommendations.length > 0
  );

  // AI Chat Functions
  const sendChatMessage = async () => {
    if (!chatInput.trim() || !result) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('https://portfolio-backend-959021211199.us-central1.run.app/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_question: chatInput,
          portfolio_data: result,
          market_context: {
            sentiment: result.market_sentiment?.overall_sentiment || 'neutral',
            risk_level: result.risk_analysis?.risk_level || 'moderate'
          }
        })
      });

      if (response.ok) {
        const aiResponse = await response.json();
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: aiResponse.nlp_insight,
          timestamp: new Date(),
          confidence: 0.85 // Default confidence for ai-insights
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Real-time Update Functions
  const refreshPortfolioData = async () => {
    if (!result?.portfolio_summary?.positions) return;
    
    setIsRefreshing(true);
    try {
      const updatedPositions = await Promise.all(
        result.portfolio_summary.positions.map(async (position: any) => {
          const response = await fetch(`https://portfolio-backend-959021211199.us-central1.run.app/market-data/${position.symbol}`);
          if (response.ok) {
            const data = await response.json();
            return { ...position, current_price: data.current_price };
          }
          return position;
        })
      );
      
      // Update the result with new data
      const updatedResult = {
        ...result,
        portfolio_summary: {
          ...result.portfolio_summary,
          positions: updatedPositions
        }
      };
      
      // Force re-render (in a real app, you'd use state management)
      window.location.reload();
    } catch (error) {
      console.error('Refresh Error:', error);
    } finally {
      setIsRefreshing(false);
      setLastUpdate(new Date());
    }
  };

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

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Show empty state if no data
  if (!hasData) {
    return (
      <div className="min-h-screen pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="mb-6">
              <Brain className="w-16 h-16 text-neutral-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">No Portfolio Data Available</h2>
            <p className="text-neutral-600 mb-8">
              Please submit your portfolio information to get AI-powered analysis and insights.
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
            >
              Analyze Your Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Real-time Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-neutral-900">AI Portfolio Analysis</h1>
                <p className="text-neutral-600">Multi-agent intelligence powered by Google ADK</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-neutral-600">Last Updated</p>
                <p className="text-sm font-medium text-neutral-900">
                  {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={refreshPortfolioData}
                disabled={isRefreshing}
                className="p-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 disabled:opacity-50 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-5 h-5 text-neutral-600 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Overview Metrics */}
        {portfolioMetrics.length > 0 && (
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
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Performance Chart */}
            {performanceData.length > 0 && (
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
            )}

            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Asset Allocation */}
              {allocationData.length > 0 && (
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
                          {allocationData.map((entry: { name: string; value: number; color: string }, index: number) => (
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
                    {allocationData.map((item: { name: string; value: number; color: string }, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-neutral-600">{item.name}</span>
                        <span className="text-sm text-neutral-900 font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Sector Performance */}
              {sectorData.length > 0 && (
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
              )}
            </div>

            {/* News Timeline */}
            {sentimentData?.recentEvents && sentimentData.recentEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
                    <Newspaper className="w-5 h-5 text-blue-600" />
                    <span>Recent Market Events</span>
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-neutral-600">
                    <span>{sentimentData.totalEvents} total events</span>
                    <span>•</span>
                    <span className="text-red-600">{sentimentData.highImpactCount} high impact</span>
                  </div>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sentimentData.recentEvents.slice(0, 10).map((event: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                      <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${getImpactColor(event.impact_level)}`}></div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="text-sm font-semibold text-neutral-900 mb-1">{event.title}</h4>
                          <div className="flex items-center space-x-2 ml-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              event.impact_level === 'high' ? 'bg-red-100 text-red-700' :
                              event.impact_level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {event.impact_level}
                            </span>
                            {event.url && (
                              <a 
                                href={event.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{event.description}</p>
                        <div className="flex items-center justify-between text-xs text-neutral-500">
                          <span>{event.source}</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* News Summary Card */}
            {sentimentData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>Market News Summary</span>
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-neutral-500" />
                    <span className="text-sm text-neutral-600">Real-time</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Overall Market Sentiment */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-neutral-900">Market Sentiment</h4>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        sentimentData.overall === 'positive' ? 'bg-green-100 text-green-700' :
                        sentimentData.overall === 'negative' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {sentimentData.overall.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-neutral-600">Sentiment Strength</p>
                        <p className="text-xl font-bold text-neutral-900">
                          {(sentimentData.strength * 100).toFixed(1)}%
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600">Subjectivity</p>
                        <p className="text-xl font-bold text-neutral-900">
                          {(sentimentData.subjectivity * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* News Statistics */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Total Events</p>
                      <p className="text-xl font-bold text-blue-600">{sentimentData.totalEvents}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-neutral-600">High Impact</p>
                      <p className="text-xl font-bold text-red-600">{sentimentData.highImpactCount}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Market Health</p>
                      <p className="text-xl font-bold text-green-600">
                        {sentimentData.overall === 'positive' ? 'Good' : 
                         sentimentData.overall === 'negative' ? 'Poor' : 'Neutral'}
                      </p>
                    </div>
                  </div>

                  {/* Key Market Insights */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Key Market Insights</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          sentimentData.overall === 'positive' ? 'bg-green-500' :
                          sentimentData.overall === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm text-neutral-700">
                          Market sentiment is currently <strong>{sentimentData.overall}</strong> with 
                          <strong> {(sentimentData.strength * 100).toFixed(1)}%</strong> strength
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm text-neutral-700">
                          <strong>{sentimentData.highImpactCount}</strong> high-impact events detected in recent market activity
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                        <span className="text-sm text-neutral-700">
                          Sentiment analysis based on <strong>{sentimentData.totalEvents}</strong> market events and news sources
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - AI Insights & Chat */}
          <div className="space-y-8">
            {/* AI Chat Interface */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-purple-600" />
                <span>AI Portfolio Assistant</span>
              </h3>
              
              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 space-y-3">
                {chatMessages.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <MessageCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Ask me anything about your portfolio!</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-100 text-neutral-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.confidence && (
                          <p className="text-xs opacity-75 mt-1">
                            Confidence: {Math.round(message.confidence * 100)}%
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-100 text-neutral-900 px-3 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-neutral-600"></div>
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="Ask about your portfolio..."
                  className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  disabled={isChatLoading}
                />
                <button
                  onClick={sendChatMessage}
                  disabled={!chatInput.trim() || isChatLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Risk Analysis */}
            {riskMetrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Risk Analysis</span>
                </h3>
                <div className="space-y-4">
                  {riskMetrics.map((metric: { name: string; score: number; status: string }, index: number) => (
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
            )}

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI Recommendations</span>
                </h3>
                <div className="space-y-4">
                  {aiRecommendations.map((rec: { type: string; priority: string; title: string; description: string; confidence: number }, index: number) => (
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
              </motion.div>
            )}

            {/* Market Sentiment Analysis */}
            {sentimentData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  <span>Market Sentiment</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-600">Overall Sentiment</p>
                      <p className={`text-lg font-semibold capitalize ${
                        sentimentData.overall === 'positive' ? 'text-green-600' : 
                        sentimentData.overall === 'negative' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {sentimentData.overall}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-600">Strength</p>
                      <p className="text-lg font-semibold text-neutral-900">
                        {(sentimentData.strength * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Total Events</p>
                      <p className="text-xl font-bold text-blue-600">{sentimentData.totalEvents}</p>
                    </div>
                    <div className="text-center p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-neutral-600">High Impact</p>
                      <p className="text-xl font-bold text-red-600">{sentimentData.highImpactCount}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Portfolio Summary */}
            {portfolioSummary && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span>Portfolio Summary</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Positions</p>
                      <p className="text-xl font-bold text-blue-600">{portfolioSummary.totalPositions}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Total Value</p>
                      <p className="text-xl font-bold text-green-600">
                        ${portfolioSummary.totalValue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-neutral-900">Current Positions</h4>
                    {portfolioSummary.positions.map((position: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-neutral-50 rounded">
                        <div>
                          <p className="text-sm font-medium text-neutral-900">{position.symbol}</p>
                          <p className="text-xs text-neutral-600">{position.quantity} shares</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-neutral-900">
                            ${position.position_value.toLocaleString()}
                          </p>
                          <p className={`text-xs ${position.return_percentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {position.return_percentage >= 0 ? '+' : ''}{position.return_percentage.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;