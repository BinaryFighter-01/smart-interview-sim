
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Settings } from 'lucide-react';

interface AdvancedAvatarAnimationProps {
  isPlaying: boolean;
  currentText: string;
  avatarStyle: 'professional' | 'friendly' | 'corporate';
  voiceSettings: {
    language: string;
    accent: string;
    speed: number;
    pitch: number;
  };
  onVoiceComplete?: () => void;
}

const AdvancedAvatarAnimation: React.FC<AdvancedAvatarAnimationProps> = ({
  isPlaying,
  currentText,
  avatarStyle,
  voiceSettings,
  onVoiceComplete
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [lipSyncData, setLipSyncData] = useState<number[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const avatarConfigs = {
    professional: {
      colors: ['from-slate-500', 'to-slate-700'],
      expression: 'calm',
      clothing: 'suit'
    },
    friendly: {
      colors: ['from-blue-500', 'to-indigo-600'],
      expression: 'warm',
      clothing: 'casual'
    },
    corporate: {
      colors: ['from-gray-600', 'to-gray-800'],
      expression: 'confident',
      clothing: 'business'
    }
  };

  useEffect(() => {
    if (isPlaying && currentText && !isMuted) {
      setIsAnimating(true);
      speakWithLipSync(currentText);
    } else {
      setIsAnimating(false);
      if (utteranceRef.current) {
        speechSynthesis.cancel();
      }
    }
  }, [isPlaying, currentText, isMuted]);

  const speakWithLipSync = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any existing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Configure voice settings
      utterance.rate = voiceSettings.speed;
      utterance.pitch = voiceSettings.pitch;
      utterance.volume = isMuted ? 0 : 0.8;
      
      // Try to find a voice that matches the language/accent
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes(voiceSettings.language) && 
        voice.name.toLowerCase().includes(voiceSettings.accent.toLowerCase())
      ) || voices.find(voice => voice.lang.includes(voiceSettings.language));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      // Generate simple lip sync animation data
      generateLipSyncData(text);
      
      utterance.onend = () => {
        setIsAnimating(false);
        setLipSyncData([]);
        onVoiceComplete?.();
      };
      
      speechSynthesis.speak(utterance);
    } else {
      // Fallback animation without speech
      setTimeout(() => {
        setIsAnimating(false);
        onVoiceComplete?.();
      }, text.length * 50);
    }
  };

  const generateLipSyncData = (text: string) => {
    // Simple lip sync simulation based on text analysis
    const words = text.split(' ');
    const syncData = words.map(() => Math.random() * 0.8 + 0.2);
    setLipSyncData(syncData);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current && speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (!isMuted) {
        // Restart with muted
        setTimeout(() => speakWithLipSync(currentText), 100);
      }
    }
  };

  const currentConfig = avatarConfigs[avatarStyle];
  const currentLipSync = isAnimating ? lipSyncData[Math.floor(Date.now() / 500) % lipSyncData.length] || 0 : 0;

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Container */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-2xl relative overflow-hidden">
        <div className="relative">
          {/* Background Animation */}
          {isAnimating && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 animate-pulse rounded-full"></div>
          )}
          
          {/* Avatar Circle */}
          <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${currentConfig.colors[0]} ${currentConfig.colors[1]} flex items-center justify-center transition-all duration-500 ${isAnimating ? 'animate-pulse scale-105' : 'scale-100'} shadow-lg`}>
            {/* Avatar Face */}
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-inner">
              <div className="flex flex-col items-center">
                {/* Eyes */}
                <div className="flex gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full bg-slate-700 transition-all duration-200 ${isAnimating ? 'animate-bounce' : ''}`}></div>
                  <div className={`w-4 h-4 rounded-full bg-slate-700 transition-all duration-200 ${isAnimating ? 'animate-bounce' : ''}`} style={{ animationDelay: '0.1s' }}></div>
                </div>
                
                {/* Mouth with Lip Sync */}
                <div 
                  className={`bg-slate-700 rounded-full transition-all duration-100`}
                  style={{
                    width: `${12 + currentLipSync * 8}px`,
                    height: `${6 + currentLipSync * 4}px`,
                    transform: isAnimating ? `scaleY(${1 + currentLipSync})` : 'scaleY(1)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Sound Waves */}
          {isAnimating && !isMuted && (
            <div className="absolute -inset-6">
              <div className="absolute inset-0 rounded-full border-2 border-blue-300/40 animate-ping"></div>
              <div className="absolute inset-3 rounded-full border-2 border-blue-400/40 animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-6 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
          )}

          {/* Microphone Indicator */}
          {isAnimating && (
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </div>

        {/* Voice Controls */}
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="bg-white/80 hover:bg-white"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
        </div>
      </Card>

      {/* Enhanced Speech Bubble */}
      {currentText && (
        <Card className="max-w-lg p-6 bg-white shadow-xl animate-fade-in relative border-l-4 border-blue-500">
          <div className="absolute -top-3 left-8 w-6 h-6 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          {/* Typing Animation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              AI Interviewer is speaking...
            </div>
            
            <p className="text-gray-800 leading-relaxed text-lg">
              {currentText}
            </p>
            
            {/* Voice Settings Display */}
            <div className="flex items-center gap-4 text-xs text-gray-500 border-t pt-2">
              <span>Language: {voiceSettings.language.toUpperCase()}</span>
              <span>Speed: {voiceSettings.speed}x</span>
              <span>Style: {avatarStyle}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Status Indicators */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className={`flex items-center gap-2 ${isAnimating ? 'text-green-600' : 'text-gray-400'}`}>
          <div className={`w-2 h-2 rounded-full ${isAnimating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          {isAnimating ? 'Speaking' : 'Ready'}
        </div>
        
        <div className={`flex items-center gap-2 ${isMuted ? 'text-red-600' : 'text-blue-600'}`}>
          <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-blue-500'}`}></div>
          {isMuted ? 'Muted' : 'Audio On'}
        </div>
      </div>
    </div>
  );
};

export default AdvancedAvatarAnimation;
