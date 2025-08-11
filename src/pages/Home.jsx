import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-blue-900/20 to-cyan-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        
        <div className={`relative z-10 max-w-6xl mx-auto transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="mb-8">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30 backdrop-blur-sm mb-8">
              <span className="text-blue-300 text-sm font-medium">✨ Your Career Journey Starts Here</span>
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-8 tracking-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent animate-pulse">
              Path
            </span>
            <br />
            Shape Your{" "}
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse delay-500">
              Future
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            Discover careers, get guided roadmaps, and connect your degree to your dream job — 
            <span className="text-blue-300 font-medium"> all in one revolutionary platform</span>
          </p>
          
          <div className="flex justify-center flex-wrap gap-6 mb-16">
            <button
              onClick={() => navigate('/signup')}
              className="group relative bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </button>
            
            <button
              onClick={() => navigate('/login')}
              className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span className="relative z-10">Sign In</span>
            </button>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StatCard number="10K+" label="Students Guided" delay="0" />
            <StatCard number="500+" label="Career Paths" delay="200" />
            <StatCard number="95%" label="Success Rate" delay="400" />
          </div>
        </div>



        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-violet-100 bg-clip-text text-transparent">
              Why CareerPad?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-violet-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🎯"
              title="AI-Powered Matching"
              text="Advanced algorithms analyze your strengths, goals, and passions to recommend careers that perfectly align with your unique profile."
              gradient="from-blue-500/20 to-cyan-500/20"
              delay="0"
            />
            <FeatureCard
              icon="🧭"
              title="Smart Roadmaps"
              text="Get personalized semester-by-semester guides that transform your current degree into a strategic pathway to your dream career."
              gradient="from-violet-500/20 to-purple-500/20"
              delay="200"
            />
            <FeatureCard
              icon="🤝"
              title="Expert Network"
              text="Access curated mentors, inspiring alumni stories, and battle-tested resources that accelerate your professional growth."
              gradient="from-cyan-500/20 to-teal-500/20"
              delay="400"
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you're exploring possibilities or already on your path, CareerPad is your intelligent partner from student to success.
          </p>
          
          <button
            onClick={() => navigate('/signup')}
            className="group relative inline-block bg-gradient-to-r from-white to-blue-50 text-gray-900 font-bold px-12 py-5 rounded-2xl text-xl transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            <span className="relative z-10">Start Your Journey Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-violet-100 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <p className="text-sm text-gray-400 mt-6">No credit card required • Get started in under 60 seconds</p>
        </div>
      </section>
    </div>
  );
}

function StatCard({ number, label, delay }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), parseInt(delay));
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, text, gradient, delay }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), parseInt(delay));
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`group relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl backdrop-blur-sm"></div>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
      
      <div className="relative z-10 p-8 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105">
        <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
          {text}
        </p>
      </div>
    </div>
  );
}