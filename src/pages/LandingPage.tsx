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
      icon: Brain,
      title: 'Multi-Agent Intelligence',
      description: 'Advanced AI agents powered by Google\'s Agent Development Kit work collaboratively to analyze your portfolio from multiple expert perspectives.',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: TrendingUp,
      title: 'Real-Time Market Analysis',
      description: 'Stay ahead with live market sentiment analysis and trend detection using cutting-edge AI technology and real-time data processing.',
      color: 'from-secondary-500 to-secondary-600'
    },
    {
      icon: Shield,
      title: 'Smart Risk Assessment',
      description: 'Sophisticated risk modeling and portfolio optimization powered by Google Cloud infrastructure to help you make informed decisions.',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: Target,
      title: 'Personalized Insights',
      description: 'Get tailored investment recommendations based on your unique risk tolerance, financial goals, and current market conditions.',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const stats = [
    { label: 'AI Agents', value: '12+', description: 'Specialized financial analysis agents' },
    { label: 'Data Points', value: '10M+', description: 'Real-time market data processed' },
    { label: 'Accuracy', value: '94%', description: 'Prediction accuracy rate' },
    { label: 'Response Time', value: '<2s', description: 'Average analysis completion' }
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
                Powered by Google's Agent Development Kit
              </span>
              <Sparkles className="w-6 h-6 text-accent-500" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                Intelligent
              </span>
              <br />
              Portfolio Analytics
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience the future of investment analysis with our multi-agent AI platform. 
              Get personalized insights, risk assessments, and market intelligence tailored to your financial goals.
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
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Revolutionary AI Architecture
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform leverages Google's Agent Development Kit to create a sophisticated 
              ecosystem of collaborative AI agents, each specialized in different aspects of financial analysis.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white border border-neutral-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-primary-600/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-neutral-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-neutral-900 mb-1">{stat.label}</div>
                <div className="text-sm text-neutral-600">{stat.description}</div>
              </motion.div>
            ))}
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
              <Cpu className="w-6 h-6 text-primary-600" />
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Powered by Google Cloud ADK
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Multi-Agent Orchestration
            </h2>
            <p className="text-xl text-neutral-600 max-w-4xl mx-auto">
              Built with Google's Agent Development Kit, our platform demonstrates 
              the power of collaborative AI agents working together to solve complex financial analysis challenges.
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-neutral-50 to-blue-50 border border-neutral-200 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Agent Collaboration</h3>
                <p className="text-neutral-600">Multiple specialized agents work together, sharing insights and building comprehensive analysis.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Real-Time Processing</h3>
                <p className="text-neutral-600">Agents process market data, news sentiment, and portfolio metrics in real-time for instant insights.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">Intelligent Automation</h3>
                <p className="text-neutral-600">Autonomous decision-making and recommendation generation based on sophisticated AI models.</p>
              </div>
            </div>
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
              Intelligent Portfolio Analysis
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Developed by senior data scientists and software engineers with expertise in AI, 
              machine learning, and financial technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="text-center">
                <div className="text-lg font-semibold text-neutral-900">Saransh Singh</div>
                <div className="text-neutral-600">Senior Data Scientist & AI Engineer</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-neutral-300"></div>
              <div className="text-center">
                <div className="text-lg font-semibold text-neutral-900">Himanshi Kushwaha</div>
                <div className="text-neutral-600">Senior Software Engineer</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
      </section>
    </div>
  );
};

export default LandingPage;