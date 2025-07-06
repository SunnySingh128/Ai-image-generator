import React, { useEffect, useState } from 'react';
import { Wand2, Sparkles, Stars, Zap } from 'lucide-react';
import axios from 'axios';
// Mock axios for demo purposes - replace with actual import in your project
// const axios = {
//   post: (url, data) => {
//     return new Promise((resolve, reject) => {
//       // Simulate API call delay
//       setTimeout(() => {
//         // Mock response - replace with actual API call
//         resolve({
//           data: {
//             image: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' // 1x1 transparent PNG
//           }
//         });
//       }, 2000);
//     });
//   }
// };

export default function Display() {
  const [generateFlag, setGenerateFlag] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [particles, setParticles] = useState([]);

  // Generate random particles for animation
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  function handleClick() {
    setGenerateFlag(true);
  }

  function handleChange(e) {
    setPrompt(e.target.value);
  }

  useEffect(() => {
    if (generateFlag) {
      axios.post('http://localhost:5000/generate', { imageUrl: prompt })
        .then(res => {
          console.log(res.data);
          // Add base64 prefix to display image
          setImageUrl(`data:image/png;base64,${res.data.image}`);
          setGenerateFlag(false); // reset flag
        })
        .catch(err => {
          console.log(err);
          setGenerateFlag(false);
        });
    }
  }, [generateFlag, prompt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Particles */}
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

      {/* Floating Decorative Elements */}
      <div className="absolute top-10 left-10 animate-spin-slow">
        <Sparkles className="w-8 h-8 text-purple-400 opacity-30" />
      </div>
      <div className="absolute top-20 right-20 animate-bounce">
        <Stars className="w-6 h-6 text-blue-400 opacity-40" />
      </div>
      <div className="absolute bottom-20 left-20 animate-pulse">
        <Zap className="w-7 h-7 text-green-400 opacity-30" />
      </div>
      <div className="absolute bottom-10 right-10 animate-spin-slow">
        <Sparkles className="w-6 h-6 text-pink-400 opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              AI Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Generator</span>
            </h1>
            <p className="text-purple-300 text-lg">Transform your ideas into stunning visual masterpieces</p>
          </div>

          {/* Input Section */}
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Describe your image:
                </label>
                <input
                  type="text"
                  value={prompt}
                  onChange={handleChange}
                  placeholder="A majestic dragon soaring through a starlit sky..."
                  className="w-full h-14 bg-gray-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </div>
              
              <button 
                onClick={handleClick}
                disabled={generateFlag}
                className={`w-full font-bold py-4 px-8 rounded-xl transition-all duration-300 transform shadow-lg ${
                  generateFlag 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-purple-500/25'
                } text-white`}
              >
                {generateFlag ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Wand2 className="w-5 h-5" />
                    <span>Generate Image</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Image Display Section */}
          {imageUrl && (
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl animate-fadeIn">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-4">Generated Image</h3>
                <div className="relative inline-block">
                    {imageUrl && 
                  <img 
                    src={imageUrl} 
                    alt="Generated" 
                    className="max-w-full h-auto rounded-xl shadow-2xl border border-purple-500/30 animate-zoomIn"
                  />}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl blur opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes zoomIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-zoomIn {
          animation: zoomIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}