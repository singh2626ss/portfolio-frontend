import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StockTicker from '../components/StockTicker'; 
import { 
  ArrowRight, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  DollarSign,
  Plus,
  Minus,
  Brain,
  BarChart3,
  Activity,
  AlertTriangle,
  ChevronDown,
  Search
} from 'lucide-react';

interface StockHolding {
  symbol: string;
  quantity: number;
  purchasePrice: number;
}

interface FormData {
  riskTolerance: string;
  investmentGoals: string;
  timeHorizon: string;
  monthlyInvestment: string;
  currentSavings: string;
  holdings: StockHolding[];
}

// Popular stocks data
const POPULAR_STOCKS = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc. (Google)' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', name: 'Tesla Inc.' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  { symbol: 'META', name: 'Meta Platforms Inc.' },
  { symbol: 'NFLX', name: 'Netflix Inc.' },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.' },
  { symbol: 'JNJ', name: 'Johnson & Johnson' }
];

// Stock Dropdown Component
interface StockDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const StockDropdown: React.FC<StockDropdownProps> = ({ value, onChange, placeholder = "e.g., AAPL" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStocks = POPULAR_STOCKS.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (symbol: string) => {
    onChange(symbol);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    setSearchTerm(newValue);
    setIsOpen(true);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.stock-dropdown')) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative stock-dropdown">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-white border border-neutral-300 rounded-lg p-3 pr-10 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          required
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-neutral-100">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="py-1">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  type="button"
                  onClick={() => handleSelect(stock.symbol)}
                  className="w-full px-3 py-2 text-left hover:bg-neutral-50 flex items-center justify-between"
                >
                  <div>
                    <div className="font-medium text-neutral-900">{stock.symbol}</div>
                    <div className="text-sm text-neutral-500">{stock.name}</div>
                  </div>
                  {value === stock.symbol && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-neutral-500">
                No stocks found. Type to search or enter a custom symbol.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function InputPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    riskTolerance: '',
    investmentGoals: '',
    timeHorizon: '',
    monthlyInvestment: '',
    currentSavings: '',
    holdings: [{ symbol: '', quantity: 0, purchasePrice: 0 }]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHoldingChange = (index: number, field: keyof StockHolding, value: string | number) => {
    const updatedHoldings = [...formData.holdings];
    updatedHoldings[index] = {
      ...updatedHoldings[index],
      [field]: field === 'symbol' ? value : Number(value)
    };
    setFormData(prev => ({
      ...prev,
      holdings: updatedHoldings
    }));
  };

  const addHolding = () => {
    setFormData(prev => ({
      ...prev,
      holdings: [...prev.holdings, { symbol: '', quantity: 0, purchasePrice: 0 }]
    }));
  };

  const removeHolding = (index: number) => {
    if (formData.holdings.length > 1) {
      setFormData(prev => ({
        ...prev,
        holdings: prev.holdings.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Validate required fields
    if (!formData.riskTolerance || !formData.investmentGoals || !formData.timeHorizon) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    if (formData.holdings.some(holding => !holding.symbol || !holding.quantity || !holding.purchasePrice)) {
      setError('Please fill in all portfolio details.');
      setIsLoading(false);
      return;
    }
    
    try {
      const payload = {
        portfolio: formData.holdings.map(holding => ({
          symbol: holding.symbol,
          quantity: parseInt(holding.quantity.toString()),
          purchase_price: parseFloat(holding.purchasePrice.toString())
        })),
        investment_goals: [formData.investmentGoals],
        risk_tolerance: formData.riskTolerance,
        time_horizon: formData.timeHorizon
      };

      const response = await fetch('https://portfolio-backend-959021211199.us-central1.run.app/analyze-portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      navigate('/dashboard', { state: { result } });
    } catch (error) {
      console.error('Error calling API:', error);
      setError(`Failed to analyze portfolio: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
      <StockTicker />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"></div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900">Portfolio Analysis</h1>
          </div>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Share your investment details and financial goals to receive personalized AI-powered insights and recommendations.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Current Holdings */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-semibold text-neutral-900">Current Holdings</h3>
              </div>
              <p className="text-neutral-600">Enter your current stock positions for analysis</p>
              
              {formData.holdings.map((holding, index) => (
                <div key={index} className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Stock Symbol</label>
                      <StockDropdown
                        value={holding.symbol}
                        onChange={(value) => handleHoldingChange(index, 'symbol', value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Quantity</label>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        step="1"
                        value={holding.quantity || ''}
                        onChange={(e) => handleHoldingChange(index, 'quantity', e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Purchase Price ($)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        value={holding.purchasePrice || ''}
                        onChange={(e) => handleHoldingChange(index, 'purchasePrice', e.target.value)}
                        className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        required
                      />
                    </div>
                    <div className="flex items-end">
                      {formData.holdings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHolding(index)}
                          className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg p-3 transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addHolding}
                className="w-full bg-primary-50 hover:bg-primary-100 text-primary-600 border border-primary-200 rounded-lg p-3 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Another Holding
              </button>
            </div>

            {/* Risk Tolerance */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent-600" />
                <h3 className="text-xl font-semibold text-neutral-900">Risk Tolerance</h3>
              </div>
              <p className="text-neutral-600">How comfortable are you with investment volatility?</p>
              <select
                name="riskTolerance"
                value={formData.riskTolerance}
                onChange={handleInputChange}
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors"
                required
              >
                <option value="">Select your risk tolerance</option>
                <option value="conservative">Conservative - Prefer stable, low-risk investments</option>
                <option value="moderate">Moderate - Balanced approach with some risk</option>
                <option value="aggressive">Aggressive - Comfortable with high-risk, high-reward</option>
              </select>
            </div>

            {/* Investment Goals */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-secondary-600" />
                <h3 className="text-xl font-semibold text-neutral-900">Investment Goals</h3>
              </div>
              <p className="text-neutral-600">What are your primary investment objectives?</p>
              <select
                name="investmentGoals"
                value={formData.investmentGoals}
                onChange={handleInputChange}
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500 transition-colors"
                required
              >
                <option value="">Select your investment goal</option>
                <option value="growth">Growth - Maximize capital appreciation</option>
                <option value="income">Income - Generate regular income</option>
                <option value="capital_preservation">Capital Preservation - Protect principal</option>
              </select>
            </div>

            {/* Time Horizon */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold text-neutral-900">Investment Time Horizon</h3>
              </div>
              <p className="text-neutral-600">How long do you plan to invest before needing the funds?</p>
              <select
                name="timeHorizon"
                value={formData.timeHorizon}
                onChange={handleInputChange}
                className="w-full bg-white border border-neutral-300 rounded-lg p-3 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                required
              >
                <option value="">Select time horizon</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>

            {/* Financial Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Monthly Investment */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-neutral-900">Monthly Investment</h3>
                </div>
                <p className="text-neutral-600">How much can you invest monthly?</p>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="number"
                    name="monthlyInvestment"
                    value={formData.monthlyInvestment}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="50"
                    className="w-full bg-white border border-neutral-300 rounded-lg p-3 pl-10 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Current Savings */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-neutral-900">Available Capital</h3>
                </div>
                <p className="text-neutral-600">Additional funds available to invest?</p>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="number"
                    name="currentSavings"
                    value={formData.currentSavings}
                    onChange={handleInputChange}
                    placeholder="0"
                    min="0"
                    step="100"
                    className="w-full bg-white border border-neutral-300 rounded-lg p-3 pl-10 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-primary-600/25"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing Portfolio...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Generate AI Analysis
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-700 font-medium">Error</span>
                </div>
                <p className="text-red-600 mt-1">{error}</p>
              </div>
            )}
          </form>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Secure & Private</span>
            </div>
            <p className="text-neutral-600 text-sm">
              Your financial information is processed securely and never stored permanently. 
              All analysis is performed in real-time for your privacy and security.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}