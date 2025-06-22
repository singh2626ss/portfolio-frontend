import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap, 
  Users, 
  BarChart3, 
  ArrowRight,
  Target,
  Globe,
  Cpu,
  Activity,
  Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'MarketDataAgent',
      description: 'Streams real-time stock quotes and 30-day historical data via Alpha Vantage and Finnhub for always-fresh market tracking.',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: Globe,
      title: 'SentimentAnalysisAgent',
      description: 'Fetches 100+ news articles per symbol from NewsAPI and scores headlines as bullish, bearish, or neutral.',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: Shield,
      title: 'RiskAssessmentAgent',
      description: 'Calculates volatility, Value-at-Risk, drawdown, and concentration (HHI) to highlight portfolio risk zones.',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: BarChart3,
      title: 'PortfolioAnalysisAgent',
      description: 'Aggregates your holdings to compute performance metrics, returns, allocation breakdowns, and growth charts.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Sparkles,
      title: 'ReportingAgent',
      description: 'Formats analysis results into structured JSON outputs for rendering dashboards and future report generation.',
      color: 'from-teal-500 to-teal-600',
    },
    {
      icon: Brain,
      title: 'AIInsightsAgent',
      description: 'Delivers personalized, AI-powered recommendations based on your goals, risk profile, and market context.',
      color: 'from-pink-500 to-pink-600',
    },
  ];
  
// at the top of your file
const techFeatures = [
  {
    icon: TrendingUp,
    title: 'Track Live Market Data',
    description:
      'Get real-time price and volume updates to act on market shifts quickly and confidently.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Globe,
    title: 'Decode Sentiment Instantly',
    description:
      'Know how headlines may impact your stocks with automated bullish/bearish NLP analysis.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Identify Hidden Risks',
    description:
      'Get alerts when your portfolio is overexposed using advanced VaR and HHI calculations.',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Target,
    title: 'Get Personalized Plans',
    description:
      'Receive AI-generated investment suggestions based on your goals, assets, and risk profile.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: BarChart3,
    title: 'Generate Sharable Reports',
    description:
      'Export PDF/JSON snapshots of your portfolio and strategy—great for reviews or discussions.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Cpu,
    title: 'Automate Analysis, Skip the Manual Work',
    description:
      'Our agents pull data, run models, and return answers—saving you hours of spreadsheet time.',
    color: 'from-pink-500 to-pink-600',
  },
]
;
  
  
  const logoUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',           // Google
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',                // Amazon
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',             // Microsoft
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',           // Apple
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg', // Meta
    'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',                   // IBM
    // 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Nvidia_logo.svg',                // NVIDIA
    // 'https://upload.wikimedia.org/wikipedia/commons/2/24/AMD_logo.svg',                   // AMD
    'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',          // Netflix
    'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',                // Oracle
    // 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Salesforce_logo.svg',            // Salesforce
    'https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg',              // SAP
    'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',  // Spotify
    'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg',           // Airbnb
    'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',             // Uber
    // 'https://upload.wikimedia.org/wikipedia/commons/7/75/Cisco_logo.svg',                 // Cisco
    // 'https://upload.wikimedia.org/wikipedia/commons/3/31/Hewlett-Packard_Logo.svg',       // HP Inc.
    // 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Intel-logo.svg',                 // Intel
    // 'https://upload.wikimedia.org/wikipedia/commons/c/c2/BlackRock_logo_2022.svg',        // BlackRock
    // 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Vanguard_Group_logo.svg',        // Vanguard
    // 'https://upload.wikimedia.org/wikipedia/commons/2/28/Paypal_logo.svg',                // PayPal
    // 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Stripe_Logo%2C_revised_2016.svg',// Stripe
    // 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Nasdaq_Logo.svg',                // Nasdaq
    // 'https://upload.wikimedia.org/wikipedia/commons/f/f9/S%26P_Global_logo.svg',          // S&P Global
    // 'https://upload.wikimedia.org/wikipedia/commons/2/24/Robinhood_Logo.svg',             // Robinhood
    // 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Yahoo%21_logo.svg'               // Yahoo
  ];

  const stats = [
    {
      label: 'APIs Integrated',
      value: '6+',
      description: 'Google Gemini, Finnhub, FMP, Alpha Vantage, NewsAPI, FastAPI'
    },
    {
      label: 'Market Data Provider',
      value: 'Finnhub + Alpha',
      description: 'Real-time stock prices, volumes, and financial metrics'
    },
    {
      label: 'News Analyzed',
      value: '1000+',
      description: 'Sentiment extracted from financial headlines using NewsAPI'
    },
    {
      label: 'LLM-Powered Intelligence',
      value: 'Gemini',
      description: 'Google Cloud Gemini used for NLP & AI reasoning via ADK'
    }
  ];
  

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 to-secondary-100/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-6 h-6 text-accent-500" />
              <span className="text-accent-600 font-semibold text-sm uppercase tracking-wider">
              Built with Google's Agent Development Kit 
              </span>
              <Sparkles className="w-6 h-6 text-accent-500" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
              Financial Portfolio Analysis
              </span>
              <br />
              {/* With Multi-Agent AI */}
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Understand your investments, look for hidden risks, know market trends and get tailored insights to improve your portfolio and make desicion to be aligned with your financial goals.

            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/input"
                className="group bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/40 flex items-center space-x-2"
              >
                <span>Start Analysis</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/dashboard"
                className="group border-2 border-neutral-300 hover:border-primary-500 text-neutral-700 hover:text-primary-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center space-x-2 bg-white/80 hover:bg-white"
              >
                <BarChart3 className="w-5 h-5" />
                <span>View Demo</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Tech Stack Marquee */}
      <section className="py-12 bg-white overflow-hidden">
  <div className="relative w-full">
    <div className="whitespace-nowrap animate-marquee flex items-center space-x-12 px-6">
      {logoUrls.concat(logoUrls).map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`logo-${idx}`}
          className="h-10 w-auto hover:grayscale-0 transition duration-300"
        />
      ))}
    </div>
    <div className="mt-6 text-center px-4">
  <p className="text-sm text-neutral-500 italic">
    Logos are for illustrative purposes only. We are not affiliated with or endorsed by these companies.
  </p>
</div>
  </div>
</section>



  
{/* Technology Section */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Cpu className="w-6 h-6 text-cyan-600" />
        <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wider">
          Core Dashboard Capabilities
        </span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
        Your Portfolio, Simplified
      </h2>
      <p className="text-xl text-neutral-600 max-w-4xl mx-auto">
        From performance tracking to AI-driven Q&A and six interactive tools to manage your investments with ease.
      </p>
    </motion.div>

    <div className="bg-gradient-to-r from-neutral-50 to-blue-100 border border-neutral-200 rounded-3xl p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Portfolio Performance</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            Real-time value tracking and performance metrics across your entire portfolio.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Market Sentiment</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            AI-powered sentiment analysis on the latest market news and events.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Risk Metrics</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            Advanced risk assessment and volatility analysis so you never get caught off-guard.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Market News Summary</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            Daily headlines distilled into concise insights—no more endless scrolling.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">Recent Events</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            Company-specific events extracted with impact levels to keep you informed.
          </p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">AI Q&A</h3>
          <p className="text-sm text-neutral-600 leading-snug">
            Ask questions about your portfolio and get instant, intelligent answers.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>



      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-neutral-50 to-blue-50">
  <div className="max-w-[95rem] mx-auto px-6 lg:px-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center px-4"
        >
          <div className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-3">
            {stat.value}
          </div>
          <div className="text-lg font-bold text-neutral-900 whitespace-nowrap mb-2">
            {stat.label}
          </div>
          <div className="text-sm text-neutral-600 leading-relaxed max-w-xs mx-auto">
            {stat.description}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

    {/* Features Section */}
    <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-10 text-center">
  Built for the ADK x Google Cloud Hackathon
</h2>
<p className="text-xl text-neutral-600 max-w-3xl mx-auto text-center mb-12">
  This project is a submission to the <a href="https://googlecloudmultiagents.devpost.com/?ref_feature=challenge&ref_medium=your-open-hackathons&ref_content=Submissions+open" target="_blank" className="text-primary-600 underline hover:text-primary-700">Agent Development Kit Hackathon</a> using Google's open-source ADK to orchestrate a team of collaborative agents.
</p>

          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
  {features.map((feature, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white border border-neutral-200 rounded-2xl 
                 h-[240px] flex flex-col items-center justify-center 
                 text-center p-6 
                 hover:shadow-xl hover:shadow-primary-600/10 
                 transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{feature.title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  ))}
</div>

        </div>
      </section>
{/* Team Section */}
<section className="py-24 bg-gradient-to-r from-neutral-50 to-blue-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
        Built by People Who Use It Too
      </h2>
      <p className="text-xl text-neutral-600 mb-8">
        We created this tool to make portfolio tracking and market analysis easier for ourselves and for anyone else who wants to make better financial decisions without overcomplicating things.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
        <div className="text-center">
          <div className="text-lg font-semibold text-neutral-900">Saransh Singh</div>
          <div className="text-neutral-600 text-sm">Data Scientist</div>
        </div>
        <div className="hidden sm:block w-px h-12 bg-neutral-300"></div>
        <div className="text-center">
          <div className="text-lg font-semibold text-neutral-900">Himanshi Kushwaha</div>
          <div className="text-neutral-600 text-sm">Software Developer</div>
        </div>
      </div>
    </motion.div>
  </div>
</section>



      {/* CTA Section
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join the revolution in AI-powered financial analysis. Share your investment goals 
              and witness the power of collaborative AI agents in action.
            </p>
            <Link
              to="/input"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 hover:from-primary-500 hover:via-secondary-500 hover:to-accent-500 text-white px-10 py-5 rounded-2xl font-semibold text-xl transition-all duration-300 shadow-2xl shadow-primary-600/25 hover:shadow-3xl hover:shadow-primary-600/40 group"
            >
              <Brain className="w-6 h-6" />
              <span>Start Your Analysis</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
};

export default LandingPage;