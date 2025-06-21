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
import HimanshiImg from './1743038871929.jpeg';
import SaranshImg from './IMG_2192.jpg';
import flowchart from './FLOWCHART.png'; // Ensure this resolves to a valid string path


const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Saransh Singh',
      role: 'Data Scientist',
      bio: 'I build AI-driven systems that scale. With expertise in ML, big data, and cloud analytics (AWS, GCP, Azure), my work spans predictive modeling, portfolio optimization, and real-time dashboards. Recently developed a multi-agent portfolio analysis tool using Google ADK, deployed with FastAPI and GCP.',
      skills: ['Python', 'Machine Learning', 'Data Engineering', 'Financial Modeling', 'Google Cloud'],
      github: 'https://github.com/singh2626ss',
      linkedin: 'https://www.linkedin.com/in/saranshsinghdollar/',
      email: 'singh2626.ss@gmail.com',
      image: SaranshImg,
      quote: '“If it helps even one person feel more confident about their money, it’s worth building.”'
    },
    {
      name: 'Himanshi Kushwaha',
      role: 'Software Engineer',
      bio: 'I craft intelligent web apps powered by real-time data and AI. Skilled in React, TypeScript, FastAPI, and GCP, I led the frontend and backend integration of a multi-agent financial insights platform—deploying fast, personalized analytics through seamless cloud architecture.',
      skills: ['React', 'TypeScript','Javascript', 'Python', 'Machine Learning', 'Cloud Computing', 'System Design'],
      github: 'https://github.com/himanshikushwaha',
      linkedin: 'https://www.linkedin.com/in/himanshikushwaha/',
      email: 'himanshikushwaha305@gmail.com',
      image: HimanshiImg,
      quote: '“Good design should help you think less and do more.”'
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
          {/* <p className="text-xl text-neutral-600 max-w-4xl mx-auto leading-relaxed">
            We're building the future of financial analysis through collaborative AI agents. 
            Our platform demonstrates the power of Google's Agent Development Kit in creating intelligent, 
            autonomous systems for investment decision-making.
          </p> */}
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
                    <p className="text-neutral-600 text-sm leading-relaxed mb-2">{member.bio}</p>
{member.quote && (
  <p className="italic text-neutral-500 text-sm mb-4">{member.quote}</p>
)}

                    
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


{/* Why We Built This */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="bg-white border border-neutral-200 rounded-2xl p-8 mb-16 shadow-sm"
>
  <div className="flex items-center space-x-3 mb-6">
    <div className="p-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg">
      <Zap className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-2xl font-bold text-neutral-900">Why We Built This</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-3">The Problem</h3>
      <p className="text-neutral-600 leading-relaxed">
        For most people, understanding investments is overwhelming. Financial platforms are scattered, 
        filled with jargon, or require prior knowledge to make sense of. Without a clear overview, it’s hard to know 
        what to do next or whether your decisions are helping you reach your financial goals.
      </p>
      <p className="text-neutral-600 leading-relaxed mt-4">
        People shouldn’t need to be financial experts or spreadsheet wizards to feel confident about their money.
        We saw a gap in tools that actually simplify things for everyday investors.
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold text-neutral-900 mb-3">Our Vision</h3>
      <p className="text-neutral-600 leading-relaxed">
        QuantumFin AI is our first step toward solving that. We’ve built a working prototype that brings together 
        multiple intelligent agents to handle the complexity so you don’t have to.
      </p>
      <p className="text-neutral-600 leading-relaxed mt-4">
        From live market tracking to risk alerts, from personalized recommendations to sentiment analysis 
        everything works behind the scenes to give you a clean, single screen view of your portfolio health.
        Our goal is to make advanced financial insight feel as simple as checking the weather.
      </p>
    </div>
  </div>
</motion.div>
 {/* Flowchart Section */}
 <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.45 }}
  className="mb-24"
>
  <div className="text-center mb-8">
    {/* <h2 className="text-3xl font-bold text-neutral-900 mb-4">
      Agent Workflow at a Glance
    </h2> */}
    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
      The diagram below shows how various agents collaborate, from fetching live data and analyzing sentiment, to generating reports and personalized insights.
    </p>
  </div>

  <div className="flex justify-center">
    <img 
      src={flowchart} // Use curly braces to correctly pass the string value
      alt="Agent Workflow Diagram" 
      className="w-full max-w-6xl rounded-2xl border border-neutral-200 shadow-lg"
    />
  </div>
</motion.div>

{/* Why Google’s Agent Development Kit? */}
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
    <h2 className="text-2xl font-bold text-neutral-900">Why Google’s Agent Development Kit?</h2>
  </div>

  <div className="space-y-4">
    <p className="text-neutral-700 leading-relaxed">
      As part of the ADK x Google Cloud Hackathon, using the Agent Development Kit (ADK) was a core requirement. While it wasn’t our original tool of choice, it ended up being extremely helpful for structuring a system of collaborative AI agents.
    </p>

    <p className="text-neutral-700 leading-relaxed">
      In our project, each agent plays a different role—some track live stock prices, some analyze news, and others compute risks or generate insights. ADK gave us a simple way to connect these agents without writing everything from scratch.
    </p>

    <ul className="space-y-2 text-neutral-700">
      <li className="flex items-start space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
        <span>
          <strong>Agent-to-Agent Communication:</strong> Built-in messaging made it easy for one agent to request help from another, like asking for sentiment before scoring a stock.
        </span>
      </li>
      <li className="flex items-start space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
        <span>
          <strong>Lightweight and Flexible:</strong> ADK is simpler than some other frameworks like LangChain, but it still gives you memory, prompts, and coordination logic.
        </span>
      </li>
      <li className="flex items-start space-x-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
        <span>
          <strong>Great for Prototyping:</strong> It helped us quickly build and test our idea without needing to engineer a full backend from scratch.
        </span>
      </li>
    </ul>

    <p className="text-neutral-700 leading-relaxed pt-4">
      While we initially used ADK because the hackathon required it, we found it surprisingly useful for building this kind of multi-agent coordination. It helped bring our prototype to life faster and with better structure.
    </p>
  </div>
</motion.div>
{/* Project Highlights
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mb-16"
>
  <h2 className="text-3xl font-bold text-neutral-900 text-center mb-12">Technical Highlights</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {projectHighlights.map((highlight, index) => (
      <div
        key={index}
        className="bg-white border border-neutral-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <highlight.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-3">{highlight.title}</h3>
        <p className="text-neutral-600 leading-relaxed">{highlight.description}</p>
      </div>
    ))}
  </div>
</motion.div> */}

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
    {/* Frontend */}
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Activity className="w-5 h-5 text-primary-600" />
        <h3 className="text-lg font-semibold text-primary-600">Frontend</h3>
      </div>
      <ul className="space-y-2 text-neutral-600">
        <li>• React 18 (TypeScript)</li>
        <li>• Tailwind CSS</li>
        <li>• Framer Motion (animation)</li>
        <li>• Recharts (data visualization)</li>
        <li>• Hosted on Vercel</li>
      </ul>
    </div>

    {/* Backend */}
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="w-5 h-5 text-secondary-600" />
        <h3 className="text-lg font-semibold text-secondary-600">Backend</h3>
      </div>
      <ul className="space-y-2 text-neutral-600">
        <li>• FastAPI (Python)</li>
        <li>• Agent Development Kit (Google)</li>
        <li>• Poetry (dependency management)</li>
        <li>• Multi-agent orchestration</li>
        <li>• Google Cloud Run (deployment)</li>
      </ul>
    </div>

    {/* AI & Data */}
    <div>
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-accent-600" />
        <h3 className="text-lg font-semibold text-accent-600">AI & Data</h3>
      </div>
      <ul className="space-y-2 text-neutral-600">
        <li>• Machine Learning (scikit-learn)</li>
        <li>• yFinance for pricing data</li>
        <li>• Finnhub + AlphaVantage APIs</li>
        <li>• NewsAPI for sentiment signals</li>
        <li>• Portfolio risk & optimization models</li>
      </ul>
    </div>
  </div>
</motion.div>

        {/* Call to Action
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
        </motion.div> */}
      </div>
    </div>
  );
};

export default AboutPage;