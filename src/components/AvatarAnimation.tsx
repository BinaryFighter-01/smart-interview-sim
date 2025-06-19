
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface AvatarAnimationProps {
  isPlaying: boolean;
  currentText: string;
}

const AvatarAnimation: React.FC<AvatarAnimationProps> = ({ isPlaying, currentText }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Container */}
      <Card className="p-8 bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-200 shadow-xl">
        <div className="relative">
          {/* Avatar Circle */}
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}>
            {/* Avatar Face */}
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
              <div className="flex flex-col items-center">
                {/* Eyes */}
                <div className="flex gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`}></div>
                  <div className={`w-3 h-3 rounded-full bg-blue-600 transition-all duration-300 ${isAnimating ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.1s' }}></div>
                </div>
                {/* Mouth */}
                <div className={`w-4 h-2 rounded-full bg-blue-600 transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}></div>
              </div>
            </div>
          </div>
          
          {/* Sound Waves */}
          {isAnimating && (
            <div className="absolute -inset-4">
              <div className="absolute inset-0 rounded-full border-2 border-blue-300 animate-ping"></div>
              <div className="absolute inset-2 rounded-full border-2 border-blue-400 animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute inset-4 rounded-full border-2 border-blue-500 animate-ping" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>
      </Card>

      {/* Speech Bubble */}
      {currentText && (
        <Card className="max-w-md p-4 bg-white shadow-lg animate-fade-in relative">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
          <p className="text-center text-gray-700 leading-relaxed">
            {currentText}
          </p>
        </Card>
      )}
    </div>
  );
};

export default AvatarAnimation;
