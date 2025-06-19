import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Brain, 
  Code, 
  Database,
  Users,
  ExternalLink,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Saransh Singh',
      role: 'Senior Data Scientist & AI Engineer',
      bio: 'Passionate about leveraging AI and machine learning to solve complex financial problems. Experienced in building scalable data pipelines and implementing advanced analytics solutions.',
      skills: ['Python', 'Machine Learning', 'Data Engineering', 'Financial Modeling', 'Google Cloud'],
      github: 'https://github.com/saranshsingh',
      linkedin: 'https://linkedin.com/in/saranshsingh',
      email: 'saransh@quantumfin.ai',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
    },
    {
      name: 'Himanshi Kushwaha',
      role: 'Senior Software Engineer',
      bio: 'Specializes in building intelligent web applications and implementing cutting-edge AI solutions. Expert in modern web technologies and cloud-native architectures.',
      skills: ['React', 'TypeScript', 'AI/ML', 'Cloud Computing', 'System Design'],
      github: 'https://github.com/himanshikushwaha',
      linkedin: 'https://linkedin.com/in/himanshikushwaha',
      email: 'himanshi@quantumfin.ai',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
    }
  ];

  const projectHighlights = [
    {
      icon: Brain,
      title: 'Multi-Agent Architecture',
      description: 'Advanced AI agents powered by Google\'s Agent Development Kit collaborate to provide comprehensive financial analysis from multiple perspectives.'
    },
    {
      icon: Code,
      title: 'Modern Tech Stack',
      description: 'Built with React, TypeScript, FastAPI, and deployed on Google Cloud Run with Vercel integration for optimal performance and scalability.'
    },
    {
      icon: Database,
      title: 'Real-Time Processing',
      description: 'Advanced data processing pipeline that handles real-time market data, sentiment analysis, and portfolio optimization using Google Cloud infrastructure.'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            About Our Project
          </h1>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            We're building the future of financial analysis through collaborative AI agents. 
            Our platform demonstrates the power of Google's Agent Development Kit in creating intelligent, 
            autonomous systems for investment decision-making.
          </p>
        </motion.div>

        {/* Project Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Project Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">The Challenge</h3>
              <p className="text-neutral-600 leading-relaxed">
                Traditional financial analysis tools are often siloed, providing fragmented insights 
                that don't capture the full complexity of modern markets. Individual investors and 
                analysts need comprehensive, real-time intelligence that can process vast amounts of 
                data and provide actionable recommendations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Our Solution</h3>
              <p className="text-neutral-600 leading-relaxed">
                We've created a multi-agent AI system powered by Google's Agent Development Kit that 
                orchestrates specialized agents for different aspects of financial analysis - market sentiment, 
                risk assessment, portfolio optimization, and trend prediction. These agents collaborate to 
                provide holistic, intelligent insights.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Google ADK Importance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">Why Google's Agent Development Kit?</h2>
          </div>
          <div className="space-y-4">
            <p className="text-neutral-700 leading-relaxed">
              Google's Agent Development Kit represents a paradigm shift in AI development, enabling the creation 
              of autonomous agents that can collaborate, reason, and make decisions independently. In financial analysis, 
              this translates to unprecedented capabilities:
            </p>
            <ul className="space-y-2 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Collaborative Intelligence:</strong> Multiple agents working together provide more comprehensive analysis than any single AI model</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Specialized Expertise:</strong> Each agent focuses on specific domains (risk, sentiment, trends) for deeper insights</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Autonomous Decision Making:</strong> Agents can adapt and make decisions based on real-time market conditions</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span><strong>Scalable Architecture:</strong> Google Cloud infrastructure ensures reliable, high-performance processing</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Project Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">Technical Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projectHighlights.map((highlight, index) => (
              <div key={index} className="bg-white border border-neutral-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <highlight.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{highlight.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{highlight.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Users className="w-6 h-6 text-primary-600" />
            <h2 className="text-3xl font-bold text-neutral-900">Meet the Team</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-neutral-200"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Cpu className="w-6 h-6 text-secondary-600" />
            <h2 className="text-2xl font-bold text-neutral-900">Technology Stack</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary-600 mb-4">Frontend</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• React 18 with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Framer Motion for animations</li>
                <li>• Recharts for data visualization</li>
                <li>• Deployed on Vercel</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-600 mb-4">Backend</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• FastAPI with Python</li>
                <li>• Google Agent Development Kit</li>
                <li>• Multi-agent orchestration</li>
                <li>• Real-time data processing</li>
                <li>• Deployed on Google Cloud Run</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-accent-600 mb-4">AI & Data</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>• Machine Learning models</li>
                <li>• Sentiment analysis</li>
                <li>• Risk assessment algorithms</li>
                <li>• Market data APIs</li>
                <li>• Portfolio optimization</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-4">Interested in Our Work?</h2>
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            We're passionate about pushing the boundaries of AI in finance. 
            Connect with us to learn more about our approach and future projects.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="https://github.com/saranshsingh/quantumfin-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="mailto:saransh@quantumfin.ai"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Get in Touch</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;