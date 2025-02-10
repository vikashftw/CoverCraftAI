import React from 'react';
import { FileText, Send, Upload, Star, Zap, Trophy, CheckCircle, Sparkles } from 'lucide-react';
import useGoogleAuth from '../components/OAuth';

function Home() {
  const { handleGoogleSignIn } = useGoogleAuth();

  return (
    <div className="min-h-screen bg-[#0A0A0F] overflow-hidden relative">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
      
      {/* Navigation */}
      <nav className="relative z-10 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text">
                CoverCraft AI
              </span>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <img 
                src="https://www.google.com/favicon.ico" 
                alt="Google" 
                className="w-5 h-5"
              />
              Sign in
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-32">
            {/* Left side - Content */}
            <div className="flex-1 text-center lg:text-left relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-8 border border-blue-500/20">
                  <span className="text-blue-400 font-semibold flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Powered by Advanced AI
                  </span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
                  Craft Your Perfect
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                    Cover Letter
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-12 max-w-2xl">
                  Experience the future of job applications with our AI-powered platform. 
                  Create compelling, personalized cover letters that capture attention and 
                  showcase your true potential.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <button
                    onClick={handleGoogleSignIn}
                    className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img 
                      src="https://www.google.com/favicon.ico" 
                      alt="Google" 
                      className="w-5 h-5 relative z-10"
                    />
                    <span className="relative z-10">Get Started with Google</span>
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-gray-300">AI-Optimized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-gray-300">ATS-Friendly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-gray-300">Industry-Specific</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="flex-1 hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl opacity-30 blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black p-1 rounded-3xl">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                  alt="Workspace"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="relative mb-32">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl border border-white/5 p-12">
              <h2 className="text-4xl font-bold text-white text-center mb-16">
                Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">CoverCraft AI</span>?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500"></div>
                  <div className="relative p-8 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                    <div className="text-blue-400 mb-4 p-3 bg-blue-500/10 rounded-xl w-fit">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Industry-Leading AI</h3>
                    <p className="text-gray-300">Our advanced AI understands industry nuances and creates tailored cover letters that resonate with hiring managers.</p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 rounded-xl transition-all duration-500"></div>
                  <div className="relative p-8 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                    <div className="text-purple-400 mb-4 p-3 bg-purple-500/10 rounded-xl w-fit">
                      <Star className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Perfect Customization</h3>
                    <p className="text-gray-300">Store up to 5 resumes and generate truly unique cover letters that are flawlessly tailored to every job description.</p>
                  </div>
                </div>
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-500"></div>
                  <div className="relative p-8 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300">
                    <div className="text-green-400 mb-4 p-3 bg-green-500/10 rounded-xl w-fit">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">Instant Results</h3>
                    <p className="text-gray-300">Get professionally crafted cover letters in seconds, not hours. Save time without sacrificing quality or detail.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="relative">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Three Simple Steps to Success
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Upload className="w-8 h-8" />,
                  title: "1. Upload Resume",
                  description: "Upload your resume and let our AI analyze your experience and skills.",
                  color: "blue"
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "2. Add Job Details",
                  description: "Paste the job description to help our AI understand the role requirements.",
                  color: "purple"
                },
                {
                  icon: <Send className="w-8 h-8" />,
                  title: "3. Generate Letter",
                  description: "Get your perfectly crafted cover letter in seconds, ready to impress.",
                  color: "green"
                }
              ].map((step, index) => (
                <div key={index} className="group relative">
                  <div className={`relative p-8 rounded-xl bg-gradient-to-br from-${step.color}-500/5 via-${step.color}-500/10 to-${step.color}-500/5 border border-${step.color}-500/10 hover:border-${step.color}-500/20 transition-all duration-300`}>
                    <div className={`text-${step.color}-400 mb-4 p-3 bg-${step.color}-500/10 rounded-xl w-fit`}>
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;