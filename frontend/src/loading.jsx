import React, { useState, useEffect } from 'react';
import { Camera, Wand2, Sparkles, Image, Zap, Stars, Palette, Lightbulb } from 'lucide-react';
import Display from './display1';
const AIImageGenerator = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate random particles for animation
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleSymbolClick = () => {
    setAnimationStarted(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowWelcome(true);
      // Navigate to main page after 2 seconds
      setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
    }, 5000);
  };

  const LoadingScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Central Content */}
      <div className="text-center z-10">
        {!animationStarted ? (
          // Initial Symbol
          <div
            onClick={handleSymbolClick}
            className="group cursor-pointer transform hover:scale-110 transition-all duration-300"
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300">
                <Wand2 className="w-16 h-16 text-white group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 animate-pulse"></div>
              
              {/* Floating icons around the symbol */}
              <div className="absolute -top-4 -right-4 animate-bounce">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Stars className="w-6 h-6 text-blue-400" />
              </div>
              <div className="absolute -top-4 -left-4 animate-bounce" style={{ animationDelay: '1s' }}>
                <Zap className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <p className="text-white text-xl font-bold mt-8 group-hover:text-purple-300 transition-colors duration-300">
              Click to Enter the Magic
            </p>
            <p className="text-purple-300 text-sm mt-2 opacity-75">
              AI Image Generator
            </p>
          </div>
        ) : (
          // Animation Sequence
          <div className="space-y-8">
            {/* Main Animation Container */}
            <div className="relative">
              {/* Expanding Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-32 h-32 border-2 border-purple-400 rounded-full animate-ping"
                    style={{
                      animationDelay: `${i * 0.7}s`,
                      animationDuration: '2s',
                      transform: `scale(${1 + i * 0.5})`,
                    }}
                  />
                ))}
              </div>

              {/* Central Spinning Symbol */}
              <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-spin">
                <Wand2 className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="relative h-20">
              {[Camera, Image, Palette, Lightbulb].map((Icon, index) => (
                <div
                  key={index}
                  className="absolute animate-bounce"
                  style={{
                    left: `${25 + index * 20}%`,
                    animationDelay: `${index * 0.3}s`,
                    animationDuration: '1.5s',
                  }}
                >
                  <Icon className="w-8 h-8 text-purple-300" />
                </div>
              ))}
            </div>

            {/* Loading Text */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white animate-pulse">
                Initializing AI Magic...
              </h2>
              <div className="flex justify-center space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-64 h-2 bg-purple-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse transition-all duration-5000 ease-out w-full"></div>
            </div>
          </div>
        )}
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-10 left-10 animate-spin-slow">
        <Sparkles className="w-8 h-8 text-purple-400 opacity-50" />
      </div>
      <div className="absolute bottom-10 right-10 animate-spin-slow">
        <Stars className="w-8 h-8 text-blue-400 opacity-50" />
      </div>
    </div>
  );
  const WelcomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 animate-fadeIn">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
          <Wand2 className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-5xl font-bold text-white mb-6">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">AI Image Generator</span>
        </h2>
        <p className="text-xl text-purple-300 mb-8">
          Your journey begins here...
        </p>
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );

  return (
    <div>
      {showLoading ? <LoadingScreen /> : showWelcome ? <WelcomePage /> : <Display/>}
    </div>
  );
};

export default AIImageGenerator;