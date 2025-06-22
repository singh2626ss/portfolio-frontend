import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Brain,
  TrendingUp,
  Shield,
  DollarSign,
  Percent,
  BarChart3,
  Activity,
  CheckCircle,
  AlertTriangle,
  Send,
  RefreshCw,
  MessageCircle,
  Clock,
  Globe,
  PieChart as PieChartIcon,
  Newspaper,
  Calendar,
  ExternalLink
} from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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

  // Load data from localStorage or use passed data
  const [dashboardData, setDashboardData] = useState(() => {
    const savedData = localStorage.getItem('dashboardData');
    return result || (savedData ? JSON.parse(savedData) : null);
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (result) {
      setDashboardData(result);
      localStorage.setItem('dashboardData', JSON.stringify(result));
    }
  }, [result]);

  // Load chat messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setChatMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Helper functions for risk and sentiment colors
  const getRiskValue = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 33;
      case 'medium': return 66;
      case 'high': return 100;
      default: return 50;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'high': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return '#10B981';
      case 'negative': return '#EF4444';
      case 'neutral': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getImpactColor = (impactLevel: string) => {
    switch (impactLevel?.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#EF4444';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  // Enhanced Performance Data - Use the actual performance data from backend
  const performanceData = dashboardData?.visualization_data?.performance ? {
    labels: dashboardData.visualization_data.performance.x.map((date: string) => 
      new Date(date).toLocaleDateString()
    ),
    datasets: [{
      label: 'Portfolio Value',
      data: dashboardData.visualization_data.performance.y,
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(34, 197, 94)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6
    }]
  } : null;

  // Sector Allocation Data - Use the actual composition data from backend
  const sectorData = dashboardData?.visualization_data?.composition ? {
    labels: dashboardData.visualization_data.composition.labels,
    datasets: [{
      data: dashboardData.visualization_data.composition.values,
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
        '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  } : null;

  // Risk Gauge Data - Use the actual risk data from backend
  const riskGaugeData = dashboardData?.visualization_data?.risk ? {
    labels: dashboardData.visualization_data.risk.labels,
    datasets: [{
      data: dashboardData.visualization_data.risk.values,
      backgroundColor: dashboardData.visualization_data.risk.values.map((val: number) => 
        val > 0.2 ? '#EF4444' : val > 0.1 ? '#F59E0B' : '#10B981'
      ),
      borderWidth: 0
    }]
  } : null;

  // Sentiment Gauge Data - Use the actual sentiment gauge from backend
  const sentimentGaugeData = dashboardData?.visualization_data?.sentiment ? {
    value: dashboardData.visualization_data.sentiment.value,
    min: dashboardData.visualization_data.sentiment.min,
    max: dashboardData.visualization_data.sentiment.max,
    thresholds: dashboardData.visualization_data.sentiment.thresholds
  } : null;

  // Volatility Data - Use the actual volatility data from backend
  const volatilityData = dashboardData?.risk_analysis?.volatility_data ? 
    Object.entries(dashboardData.risk_analysis.volatility_data).map(([symbol, data]: [string, any]) => ({
      symbol: data.symbol,
      volatility: data.volatility,
      annualizedVolatility: data.annualized_volatility,
      dailyReturns: data.daily_returns,
      daysAnalyzed: data.days_analyzed
    })) : [];

  // Sector Allocation Data - Use the actual sector data from backend
  const sectorAllocationData = dashboardData?.risk_analysis?.sector_allocation ? {
    labels: Object.keys(dashboardData.risk_analysis.sector_allocation),
    datasets: [{
      data: Object.values(dashboardData.risk_analysis.sector_allocation),
      backgroundColor: [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
        '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
      ],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  } : null;

  // Enhanced Market Sentiment Data - Fixed to match backend structure
  const sentimentData = dashboardData?.market_sentiment ? {
    overall: dashboardData.market_sentiment.overall_sentiment,
    strength: dashboardData.market_sentiment.sentiment_strength,
    summary: dashboardData.market_sentiment.news_summary || 'Market sentiment analysis based on recent events and news sources.',
    recentEvents: dashboardData.market_sentiment.recent_events?.portfolio_events || [],
    totalEvents: dashboardData.market_sentiment.recent_events?.total_events || 0,
    highImpactCount: dashboardData.market_sentiment.recent_events?.high_impact_count || 0,
    symbolBreakdown: dashboardData.market_sentiment.symbol_breakdown || {},
    trendAnalysis: dashboardData.market_sentiment.trend_analysis || {}
  } : null;

  // Portfolio Summary Data - Fixed to match backend structure
  const portfolioSummary = dashboardData?.portfolio_summary ? {
    totalPositions: dashboardData.portfolio_summary.number_of_positions,
    positions: dashboardData.portfolio_summary.positions || [],
    totalValue: dashboardData.performance_analysis?.current_value || 0,
    totalCost: dashboardData.performance_analysis?.total_cost || 0,
    totalReturn: dashboardData.performance_analysis?.total_return || 0,
    returnPercentage: dashboardData.performance_analysis?.return_percentage || 0
  } : null;

  // AI Recommendations Data - Fixed to match backend structure (recommendations field)
  const aiRecommendations = dashboardData?.recommendations || [];

  // Portfolio metrics from API data only with 3 decimal places - Fixed to match backend structure
  const portfolioMetrics = dashboardData?.performance_analysis ? [
    {
      title: 'Total Portfolio Value',
      value: `$${dashboardData.performance_analysis.current_value?.toLocaleString() || '0'}`,
      change: `${dashboardData.performance_analysis.total_return >= 0 ? '+' : ''}$${dashboardData.performance_analysis.total_return?.toFixed(3) || '0'}`,
      changePercent: `${dashboardData.performance_analysis.return_percentage >= 0 ? '+' : ''}${dashboardData.performance_analysis.return_percentage?.toFixed(3) || '0'}%`,
      isPositive: dashboardData.performance_analysis.total_return >= 0,
      icon: DollarSign
    },
    {
      title: 'Total Return',
      value: `${dashboardData.performance_analysis.total_return >= 0 ? '+' : ''}$${dashboardData.performance_analysis.total_return?.toFixed(3) || '0'}`,
      change: `${dashboardData.performance_analysis.return_percentage >= 0 ? '+' : ''}${dashboardData.performance_analysis.return_percentage?.toFixed(3) || '0'}%`,
      changePercent: 'All Time',
      isPositive: dashboardData.performance_analysis.total_return >= 0,
      icon: Percent
    },
    {
      title: 'Risk Level',
      value: dashboardData.risk_analysis?.risk_level?.charAt(0).toUpperCase() + dashboardData.risk_analysis?.risk_level?.slice(1) || 'Moderate',
      change: 'Risk Assessment',
      changePercent: 'Portfolio Risk',
      isPositive: dashboardData.risk_analysis?.risk_level === 'low',
      icon: Shield
    },
    {
      title: 'Market Sentiment',
      value: dashboardData.market_sentiment?.overall_sentiment?.charAt(0).toUpperCase() + dashboardData.market_sentiment?.overall_sentiment?.slice(1) || 'Neutral',
      change: `${(dashboardData.market_sentiment?.sentiment_strength * 100)?.toFixed(3) || '0'}%`,
      changePercent: 'Sentiment Strength',
      isPositive: dashboardData.market_sentiment?.overall_sentiment === 'positive',
      icon: TrendingUp
    }
  ] : [];

  // Check if we have any data to display - make it more permissive
  const hasData = dashboardData && (
    portfolioMetrics.length > 0 || 
    performanceData || 
    sectorData || 
    riskGaugeData ||
    sentimentData ||
    aiRecommendations.length > 0 ||
    dashboardData.risk_analysis ||
    dashboardData.performance_analysis ||
    dashboardData.market_sentiment
  );

  // AI Chat Functions
  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

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
      // Check if we have the required portfolio data
      if (!dashboardData) {
        throw new Error('Portfolio analysis data is required for AI insights. Please analyze your portfolio first.');
      }

      const response = await fetch('https://portfolio-backend-959021211199.us-central1.run.app/ai-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_question: chatInput,
          portfolio_data: dashboardData, // Complete portfolio analysis response
          market_context: dashboardData.market_sentiment // Market sentiment data
        }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          throw new Error(`Validation error: ${errorData.detail || 'Invalid data format. Please ensure portfolio analysis is complete.'}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: result.nlp_insight || result.response || 'I apologize, but I couldn\'t generate a response at this time.',
        timestamp: new Date(),
        confidence: result.confidence_score || result.confidence
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const refreshPortfolioData = async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh - in a real app, you'd call the API again
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdate(new Date());
      
      // Update localStorage with current timestamp
      if (dashboardData) {
        const updatedData = {
          ...dashboardData,
          last_updated: new Date().toISOString()
        };
        setDashboardData(updatedData);
        localStorage.setItem('dashboardData', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Clear all data function
  const clearAllData = () => {
    localStorage.removeItem('dashboardData');
    localStorage.removeItem('chatMessages');
    setDashboardData(null);
    setChatMessages([]);
    // Redirect to input page
    window.location.href = '/';
  };

  // Show empty state if no data
  if (!hasData) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-neutral-600" />
          </div>
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">No Portfolio Data</h2>
          <p className="text-neutral-600 mb-4">Please submit your portfolio data to view the dashboard.</p>
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Go to Input Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Brain className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshPortfolioData}
                disabled={isRefreshing}
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={clearAllData}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                title="Clear all data and start over"
              >
                <BarChart3 className="w-4 h-4" />
                <span>New Analysis</span>
              </button>
              <div className="text-sm text-neutral-600">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Metrics */}
        {portfolioMetrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {portfolioMetrics.map((metric, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <metric.icon className="w-6 h-6 text-neutral-600" />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    metric.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {metric.changePercent}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-neutral-600 mb-2">{metric.title}</h3>
                <p className="text-2xl font-bold text-neutral-900 mb-1">{metric.value}</p>
                <p className={`text-sm font-medium ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Main Dashboard Grid - Full Width Layout */}
        <div className="space-y-8">
          {/* Top Row - Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Portfolio Performance */}
            {(performanceData || dashboardData?.performance_analysis) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Portfolio Performance (30-Day Trend)</span>
                </h3>
                <div className="h-80">
                  {performanceData ? (
                    <Line 
                      data={performanceData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                              label: (context: any) => `Portfolio Value: $${context.parsed.y.toLocaleString()}`
                            }
                          }
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: 'Date',
                              color: '#6B7280',
                              font: { size: 12, weight: 'bold' }
                            },
                            grid: {
                              color: '#F3F4F6'
                            },
                            ticks: {
                              color: '#6B7280',
                              maxRotation: 45
                            }
                          },
                          y: {
                            title: {
                              display: true,
                              text: 'Portfolio Value ($)',
                              color: '#6B7280',
                              font: { size: 12, weight: 'bold' }
                            },
                            grid: {
                              color: '#F3F4F6'
                            },
                            ticks: {
                              color: '#6B7280',
                              callback: (value: any) => `$${value.toLocaleString()}`
                            }
                          }
                        },
                        interaction: {
                          mode: 'nearest',
                          axis: 'x',
                          intersect: false
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                      <p>Performance trend data not available</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Sector Performance */}
            {(sectorData || dashboardData?.risk_analysis?.sector_allocation) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-blue-600" />
                  <span>Portfolio Composition</span>
                </h3>
                <div className="h-80">
                  {sectorData ? (
                    <Pie 
                      data={sectorData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: {
                              color: '#6B7280',
                              padding: 20,
                              usePointStyle: true
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: (context: any) => {
                                const label = context.label || '';
                                const value = context.parsed;
                                const percentage = ((value / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
                                return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-neutral-500">
                      <p>Portfolio composition data not available</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Second Row - Risk and Sentiment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Risk Analysis */}
            {(riskGaugeData || dashboardData?.risk_analysis) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>Risk Metrics</span>
                </h3>
                <div className="space-y-6">
                  {/* Risk Level Gauge */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-700">Risk Level</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold`} style={{ color: getRiskColor(dashboardData.risk_analysis.risk_level) }}>
                        {dashboardData.risk_analysis.risk_level.toUpperCase()}
                      </span>
                      {dashboardData.risk_analysis.risk_level.toLowerCase() === 'low' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${getRiskValue(dashboardData.risk_analysis.risk_level)}%`,
                        backgroundColor: getRiskColor(dashboardData.risk_analysis.risk_level)
                      }}
                    ></div>
                  </div>

                  {/* Portfolio Volatility */}
                  {dashboardData.risk_analysis.portfolio_volatility && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">Portfolio Volatility</span>
                        <span className="text-sm font-semibold text-neutral-900">
                          {(dashboardData.risk_analysis.portfolio_volatility * 100).toFixed(3)}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(dashboardData.risk_analysis.portfolio_volatility * 1000, 100)}%`,
                            backgroundColor: dashboardData.risk_analysis.portfolio_volatility > 0.2 ? '#EF4444' : 
                                           dashboardData.risk_analysis.portfolio_volatility > 0.1 ? '#F59E0B' : '#10B981'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Concentration Risk */}
                  {dashboardData.risk_analysis.concentration_metrics && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">Concentration Risk (HHI)</span>
                        <span className="text-sm font-semibold text-neutral-900">
                          {dashboardData.risk_analysis.concentration_metrics.hhi.toFixed(3)}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min(dashboardData.risk_analysis.concentration_metrics.hhi * 100, 100)}%`,
                            backgroundColor: dashboardData.risk_analysis.concentration_metrics.hhi > 0.5 ? '#EF4444' : 
                                           dashboardData.risk_analysis.concentration_metrics.hhi > 0.25 ? '#F59E0B' : '#10B981'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Top 3 Concentration */}
                  {dashboardData.risk_analysis.concentration_metrics && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">Top 3 Concentration</span>
                        <span className="text-sm font-semibold text-neutral-900">
                          {(dashboardData.risk_analysis.concentration_metrics.top_3_concentration * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${dashboardData.risk_analysis.concentration_metrics.top_3_concentration * 100}%`,
                            backgroundColor: dashboardData.risk_analysis.concentration_metrics.top_3_concentration > 0.7 ? '#EF4444' : 
                                           dashboardData.risk_analysis.concentration_metrics.top_3_concentration > 0.4 ? '#F59E0B' : '#10B981'
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Market Sentiment */}
            {(sentimentData || dashboardData?.market_sentiment) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Market Sentiment</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="text-sm text-neutral-600">Overall Sentiment</p>
                      <p className={`text-lg font-semibold ${
                        sentimentData?.overall === 'Positive' ? 'text-green-600' : 
                        sentimentData?.overall === 'Negative' ? 'text-red-600' : 'text-neutral-600'
                      }`}>
                        {sentimentData?.overall?.charAt(0).toUpperCase() + sentimentData?.overall?.slice(1) || 'Neutral'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-600">Strength</p>
                      <p className="text-lg font-bold text-neutral-900">
                        {(sentimentData?.strength * 100)?.toFixed(3) || '0'}%
                      </p>
                    </div>
                  </div>

                  {/* Sentiment Distribution */}
                  {dashboardData?.market_sentiment?.sentiment_distribution && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <h4 className="text-sm font-medium text-neutral-700 mb-3">Sentiment Distribution</h4>
                      <div className="space-y-2">
                        {Object.entries(dashboardData.market_sentiment.sentiment_distribution).map(([sentiment, count]: [string, any]) => (
                          <div key={sentiment} className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600 capitalize">{sentiment}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-neutral-200 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full"
                                  style={{ 
                                    width: `${(count / (Object.values(dashboardData.market_sentiment.sentiment_distribution) as number[]).reduce((a: number, b: number) => a + b, 0)) * 100}%`,
                                    backgroundColor: sentiment === 'positive' ? '#10B981' : 
                                                   sentiment === 'negative' ? '#EF4444' : '#6B7280'
                                  }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-neutral-900">{count}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Trend Analysis */}
                  {dashboardData?.market_sentiment?.trend_analysis && (
                    <div className="p-4 bg-neutral-50 rounded-lg">
                      <h4 className="text-sm font-medium text-neutral-700 mb-3">Trend Analysis</h4>
                      <div className="space-y-2">
                        {Object.entries(dashboardData.market_sentiment.trend_analysis.trends).map(([trend, symbols]: [string, any]) => (
                          <div key={trend} className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600 capitalize">{trend}</span>
                            <span className="text-sm font-medium text-neutral-900">
                              {Array.isArray(symbols) ? symbols.join(', ') : symbols}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Third Row - News and Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Market News Summary */}
            {(sentimentData || dashboardData?.market_sentiment) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Newspaper className="w-5 h-5 text-indigo-600" />
                  <span>Market News Summary</span>
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
                    <h4 className="text-sm font-semibold text-indigo-900 mb-2">AI Market Analysis</h4>
                    <p className="text-sm text-indigo-800 leading-relaxed">
                      {sentimentData?.summary || 'Market sentiment analysis based on recent events and news sources.'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Market Health</p>
                      <p className={`text-lg font-bold ${
                        sentimentData?.overall === 'Positive' ? 'text-green-600' : 
                        sentimentData?.overall === 'Negative' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {sentimentData?.overall === 'Positive' ? 'Good' : 
                         sentimentData?.overall === 'Negative' ? 'Poor' : 'Fair'}
                      </p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-neutral-600">Sentiment Strength</p>
                      <p className="text-lg font-bold text-blue-600">
                        {(sentimentData?.strength * 100)?.toFixed(3) || '0'}%
                      </p>
                    </div>
                  </div>

                  {/* Symbol Breakdown */}
                  {dashboardData?.market_sentiment?.symbol_breakdown && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-neutral-700">Symbol Sentiment</h4>
                      {Object.entries(dashboardData.market_sentiment.symbol_breakdown).map(([symbol, data]: [string, any]) => (
                        <div key={symbol} className="p-3 bg-neutral-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-900">{symbol}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              data.sentiment.category === 'positive' ? 'bg-green-100 text-green-700' :
                              data.sentiment.category === 'negative' ? 'bg-red-100 text-red-700' :
                              'bg-neutral-100 text-neutral-700'
                            }`}>
                              {data.sentiment.category.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-neutral-600">
                            <span>Polarity: {(data.sentiment.polarity * 100).toFixed(1)}%</span>
                            <span>Articles: {data.sentiment.article_count}</span>
                            <span>Trend: {data.trend.charAt(0).toUpperCase() + data.trend.slice(1)}</span>
                          </div>
                          
                          {/* Individual Headlines */}
                          {data.headlines && data.headlines.length > 0 && (
                            <div className="mt-3 space-y-2">
                              <h5 className="text-xs font-medium text-neutral-700">Recent Headlines</h5>
                              {data.headlines.slice(0, 3).map((headline: any, index: number) => (
                                <div key={index} className="border-l-2 border-neutral-200 pl-3">
                                  <h6 className="text-xs font-medium text-neutral-800 line-clamp-2">
                                    {headline.headline}
                                  </h6>
                                  <div className="flex items-center justify-between text-xs text-neutral-600 mt-1">
                                    <span>{headline.source}</span>
                                    <span>{new Date(headline.published_at).toLocaleDateString()}</span>
                                  </div>
                                  {headline.sentiment && (
                                    <div className="flex items-center space-x-2 mt-1">
                                      <span className={`text-xs px-1 py-0.5 rounded ${
                                        headline.sentiment.category === 'positive' ? 'bg-green-100 text-green-700' :
                                        headline.sentiment.category === 'negative' ? 'bg-red-100 text-red-700' :
                                        'bg-neutral-100 text-neutral-700'
                                      }`}>
                                        {headline.sentiment.category.toUpperCase()}
                                      </span>
                                      <span className="text-xs text-neutral-500">
                                        ({(headline.sentiment.polarity * 100).toFixed(1)}%)
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Recent Events */}
            {(sentimentData?.recentEvents || dashboardData?.market_sentiment?.recent_events) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span>Recent Market Events & News</span>
                </h3>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Total Events</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {sentimentData?.totalEvents || dashboardData?.market_sentiment?.recent_events?.total_events || 0}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-neutral-600">High Impact</p>
                    <p className="text-2xl font-bold text-red-600">
                      {sentimentData?.highImpactCount || dashboardData?.market_sentiment?.recent_events?.high_impact_count || 0}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-neutral-600">Stocks Covered</p>
                    <p className="text-2xl font-bold text-green-600">
                      {(sentimentData?.recentEvents || dashboardData?.market_sentiment?.recent_events?.portfolio_events || []).length}
                    </p>
                  </div>
                </div>
                
                {/* Events by Stock */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {(sentimentData?.recentEvents || dashboardData?.market_sentiment?.recent_events?.portfolio_events || []).map((portfolioEvent: any, index: number) => (
                    <div key={index} className="border border-neutral-200 rounded-xl p-5 hover:bg-neutral-50 transition-colors">
                      {/* Stock Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
                        <div>
                          <h4 className="text-lg font-semibold text-neutral-900">
                            {portfolioEvent.symbol}
                          </h4>
                          <p className="text-sm text-neutral-600">
                            {portfolioEvent.total_events} Events • {portfolioEvent.high_impact_events} High Impact
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            portfolioEvent.high_impact_events > 2 ? 'bg-red-100 text-red-700' :
                            portfolioEvent.high_impact_events > 1 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {portfolioEvent.high_impact_events} High Impact
                          </span>
                        </div>
                      </div>
                      
                      {/* Event Summary */}
                      <div className="mb-4 p-3 bg-neutral-50 rounded-lg">
                        <p className="text-sm text-neutral-700 font-medium">
                          📊 {portfolioEvent.event_summary}
                        </p>
                      </div>
                      
                      {/* Individual Events */}
                      <div className="space-y-3">
                        {portfolioEvent.recent_events && portfolioEvent.recent_events.slice(0, 5).map((event: any, eventIndex: number) => (
                          <div key={eventIndex} className="border border-neutral-200 rounded-lg p-4 hover:bg-white transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="text-sm font-semibold text-neutral-800 line-clamp-2 flex-1 mr-3">
                                {event.headline}
                              </h5>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
                                event.impact_level === 'high' ? 'bg-red-100 text-red-700' :
                                event.impact_level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {event.impact_level?.toUpperCase() || 'LOW'}
                              </span>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-neutral-600 mb-2">
                              <span>🕒 {event.days_old} Days Ago</span>
                              <span>📰 {event.source}</span>
                            </div>
                            
                            {event.sentiment && (
                              <div className="flex items-center space-x-3 p-2 bg-neutral-50 rounded mb-2">
                                <span className="text-xs text-neutral-500">Sentiment:</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded ${
                                  event.sentiment.category === 'positive' ? 'bg-green-100 text-green-700' :
                                  event.sentiment.category === 'negative' ? 'bg-red-100 text-red-700' : 
                                  'bg-neutral-100 text-neutral-700'
                                }`}>
                                  {event.sentiment.category?.toUpperCase()}
                                </span>
                                <span className="text-xs text-neutral-500">
                                  ({(event.sentiment.polarity * 100).toFixed(1)}% confidence)
                                </span>
                              </div>
                            )}
                            
                            {/* URL Link if available */}
                            {event.url && (
                              <div className="mt-2">
                                <a 
                                  href={event.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 font-medium"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>Read Full Article</span>
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {/* Show More Button if there are more events */}
                      {portfolioEvent.recent_events && portfolioEvent.recent_events.length > 5 && (
                        <div className="mt-3 text-center">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View {portfolioEvent.recent_events.length - 5} More Events →
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Footer Note */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 text-center">
                    💡 Events are ranked by impact level and recency. High impact events may significantly affect stock performance.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* New Row - Diversification Score and Individual Stock Volatility */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Diversification Score */}
            {dashboardData?.risk_analysis?.diversification_score && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-green-600" />
                  <span>Portfolio Diversification</span>
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <p className="text-sm text-neutral-600 mb-2">Diversification Score</p>
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {dashboardData.risk_analysis.diversification_score.score}/100
                    </p>
                    <div className="w-full bg-neutral-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${dashboardData.risk_analysis.diversification_score.score}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-neutral-600 mt-2">
                      {dashboardData.risk_analysis.diversification_score.assessment}
                    </p>
                  </div>
                  
                  {dashboardData.risk_analysis.diversification_score.factors && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-neutral-900">Key Factors:</h4>
                      {dashboardData.risk_analysis.diversification_score.factors.map((factor: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                          <span className="text-sm text-neutral-700">{factor.name}</span>
                          <span className={`text-sm font-medium ${
                            factor.impact === 'positive' ? 'text-green-600' : 
                            factor.impact === 'negative' ? 'text-red-600' : 'text-neutral-600'
                          }`}>
                            {factor.impact?.toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Individual Stock Volatility Summary */}
            {volatilityData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  <span>Stock Volatility Summary</span>
                </h3>
                <div className="space-y-4">
                  {volatilityData.map((stock, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-neutral-900">{stock.symbol}</h4>
                        <span className="text-xs text-neutral-500">{stock.daysAnalyzed} Days</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-neutral-50 rounded-lg">
                          <p className="text-xs text-neutral-600">Daily Volatility</p>
                          <p className="text-lg font-bold text-neutral-900">
                            {(stock.volatility * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 rounded-lg">
                          <p className="text-xs text-neutral-600">Annualized</p>
                          <p className="text-lg font-bold text-neutral-900">
                            {(stock.annualizedVolatility * 100).toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      {stock.dailyReturns && stock.dailyReturns.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-neutral-600 mb-2">Recent Performance</p>
                          <div className="flex space-x-1">
                            {stock.dailyReturns.slice(-7).map((return_: number, i: number) => (
                              <div
                                key={i}
                                className={`flex-1 h-6 rounded text-xs flex items-center justify-center font-medium ${
                                  return_ >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                                title={`${(return_ * 100).toFixed(1)}%`}
                              >
                                {(return_ * 100).toFixed(1)}%
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Fourth Row - AI Recommendations and Forecasting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Recommendations */}
            {(aiRecommendations.length > 0 || dashboardData?.recommendations) && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI Recommendations</span>
                </h3>
                <div className="space-y-4">
                  {(aiRecommendations.length > 0 ? aiRecommendations : dashboardData?.recommendations || []).map((rec: any, index: number) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4 hover:bg-neutral-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full`} 
                              style={{ 
                                backgroundColor: getPriorityColor(rec.priority) + '20',
                                color: getPriorityColor(rec.priority)
                              }}>
                          {rec.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-neutral-500 capitalize">
                          {rec.type?.replace('_', ' ')}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900 mb-2">{rec.action || rec.title}</h4>
                      <p className="text-sm text-neutral-600">{rec.details || rec.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Portfolio Forecasting */}
            {dashboardData?.visualization_data?.forecasting && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Portfolio Growth Projections</span>
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(dashboardData.visualization_data.forecasting.scenarios).map(([scenario, data]: [string, any]) => (
                      <div key={scenario} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-neutral-900 capitalize">
                            {scenario} Scenario
                          </h4>
                          <span className="text-xs text-neutral-600">
                            {data.annual_return}% annual return
                          </span>
                        </div>
                        <div className="space-y-2">
                          {data.projections.slice(0, 3).map((projection: any, index: number) => (
                            <div key={index} className="flex items-center justify-between text-xs">
                              <span className="text-neutral-600">Year {projection.year}:</span>
                              <div className="text-right">
                                <div className="font-medium text-neutral-900">
                                  ${projection.value.toLocaleString()}
                                </div>
                                <div className={`text-xs ${
                                  projection.growth >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {projection.growth >= 0 ? '+' : ''}{projection.growth.toFixed(1)}%
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Current Value:</strong> ${dashboardData.visualization_data.forecasting.current_value.toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Projections based on historical performance and market conditions
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Fifth Row - Volatility and Sector Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Volatility Analysis */}
            {volatilityData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  <span>Stock Volatility Analysis</span>
                </h3>
                <div className="space-y-4">
                  {volatilityData.map((stock, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-neutral-900">{stock.symbol}</h4>
                        <span className="text-xs text-neutral-500">{stock.daysAnalyzed} Days Analyzed</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-neutral-50 rounded-lg">
                          <p className="text-xs text-neutral-600">Daily Volatility</p>
                          <p className="text-lg font-bold text-neutral-900">
                            {(stock.volatility * 100).toFixed(3)}%
                          </p>
                        </div>
                        <div className="text-center p-3 bg-neutral-50 rounded-lg">
                          <p className="text-xs text-neutral-600">Annualized Volatility</p>
                          <p className="text-lg font-bold text-neutral-900">
                            {(stock.annualizedVolatility * 100).toFixed(3)}%
                          </p>
                        </div>
                      </div>
                      {stock.dailyReturns && stock.dailyReturns.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-neutral-600 mb-2">Recent Daily Returns</p>
                          <div className="flex space-x-1">
                            {stock.dailyReturns.slice(-5).map((return_: number, i: number) => (
                              <div
                                key={i}
                                className={`flex-1 h-8 rounded text-xs flex items-center justify-center font-medium ${
                                  return_ >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {(return_ * 100).toFixed(1)}%
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Sector Allocation */}
            {sectorAllocationData && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
                  <PieChartIcon className="w-5 h-5 text-blue-600" />
                  <span>Sector Allocation</span>
                </h3>
                <div className="h-80">
                  <Pie 
                    data={sectorAllocationData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: '#6B7280',
                            padding: 20,
                            usePointStyle: true
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (context: any) => {
                              const label = context.label || '';
                              const value = context.parsed;
                              const percentage = ((value / context.dataset.data.reduce((a: number, b: number) => a + b, 0)) * 100).toFixed(1);
                              return `${label}: ${(value * 100).toFixed(1)}%`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Sixth Row - AI Q&A */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Portfolio Assistant</span>
            </h3>
            
            {/* Chat Messages */}
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-neutral-100 text-neutral-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-neutral-100 text-neutral-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
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
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about your portfolio..."
                className="flex-1 bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                disabled={isChatLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isChatLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;