
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedAvatarWithAudioProps {
  isPlaying: boolean;
  currentText: string;
  avatarStyle?: 'professional' | 'friendly' | 'corporate';
  voiceSettings?: {
    language: string;
    rate: number;
    pitch: number;
  };
  onVoiceComplete?: () => void;
  onPlaybackStart?: () => void;
}

const EnhancedAvatarWithAudio: React.FC<EnhancedAvatarWithAudioProps> = ({
  isPlaying,
  currentText,
  avatarStyle = 'professional',
  voiceSettings = { language: 'en-US', rate: 0.9, pitch: 1.0 },
  onVoiceComplete,
  onPlaybackStart
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSupported, setAudioSupported] = useState(true);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for speech synthesis support
    if (!('speechSynthesis' in window)) {
      setAudioSupported(false);
      toast({
        title: "Audio Not Supported",
        description: "Your browser doesn't support text-to-speech functionality.",
        variant: "destructive",
      });
    }
  }, []);

  useEffect(() => {
    if (isPlaying && currentText && !isMuted && audioSupported) {
      playAudio(currentText);
    }
  }, [isPlaying, currentText, isMuted, audioSupported]);

  const playAudio = (text: string) => {
    if (!audioSupported) return;
    
    // Cancel any existing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    setCurrentUtterance(utterance);
    
    // Configure voice settings
    utterance.rate = voiceSettings.rate;
    utterance.pitch = voiceSettings.pitch;
    utterance.volume = 0.8;
    
    // Try to find a voice that matches the language
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes(voiceSettings.language) && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.includes(voiceSettings.language));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => {
      setIsAudioPlaying(true);
      onPlaybackStart?.();
    };
    
    utterance.onend = () => {
      setIsAudioPlaying(false);
      setCurrentUtterance(null);
      onVoiceComplete?.();
    };
    
    utterance.onerror = () => {
      setIsAudioPlaying(false);
      setCurrentUtterance(null);
      toast({
        title: "Audio Error",
        description: "Failed to play audio. Please try again.",
        variant: "destructive",
      });
    };
    
    speechSynthesis.speak(utterance);
  };

  const handlePlayPause = () => {
    if (!audioSupported) return;
    
    if (isAudioPlaying) {
      speechSynthesis.pause();
      setIsAudioPlaying(false);
    } else if (speechSynthesis.paused) {
      speechSynthesis.resume();
      setIsAudioPlaying(true);
    } else if (currentText) {
      playAudio(currentText);
    }
  };

  const handleReplay = () => {
    if (!audioSupported || !currentText) return;
    speechSynthesis.cancel();
    setTimeout(() => playAudio(currentText), 100);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      speechSynthesis.cancel();
      setIsAudioPlaying(false);
    }
  };

  const avatarConfigs = {
    professional: {
      gradient: 'from-slate-500 to-slate-700',
      bgColor: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200'
    },
    friendly: {
      gradient: 'from-blue-500 to-indigo-600',
      bgColor: 'from-green-50 to-blue-50',
      borderColor: 'border-green-200'
    },
    corporate: {
      gradient: 'from-gray-600 to-gray-800',
      bgColor: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200'
    }
  };

  const config = avatarConfigs[avatarStyle];

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Container */}
      <Card className={`p-8 bg-gradient-to-br ${config.bgColor} border-2 ${config.borderColor} shadow-2xl relative overflow-hidden`}>
        <div className="relative">
          {/* Background Animation */}
          {(isAudioPlaying || isPlaying) && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 animate-pulse rounded-full"></div>
          )}
          
          {/* Avatar Circle */}
          <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${config.gradient} flex items-center justify-center transition-all duration-500 ${
            (isAudioPlaying || isPlaying) ? 'animate-pulse scale-105 shadow-2xl' : 'scale-100 shadow-lg'
          }`}>
            {/* Avatar Face */}
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-inner">
              <div className="flex flex-col items-center">
                {/* Eyes */}
                <div className="flex gap-3 mb-3">
                  <div className={`w-4 h-4 rounded-full bg-slate-700 transition-all duration-200 ${
                    (isAudioPlaying || isPlaying) ? 'animate-bounce' : ''
                  }`}></div>
                  <div className={`w-4 h-4 rounded-full bg-slate-700 transition-all duration-200 ${
                    (isAudioPlaying || isPlaying) ? 'animate-bounce' : ''
                  }`} style={{ animationDelay: '0.1s' }}></div>
                </div>
                
                {/* Mouth with animation */}
                <div 
                  className={`bg-slate-700 rounded-full transition-all duration-150`}
                  style={{
                    width: (isAudioPlaying || isPlaying) ? '16px' : '12px',
                    height: (isAudioPlaying || isPlaying) ? '8px' : '6px',
                    transform: (isAudioPlaying || isPlaying) ? 'scaleY(1.2)' : 'scaleY(1)'
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Sound Waves */}
          {(isAudioPlaying || isPlaying) && !isMuted && (
            <div className="absolute -inset-6">
              <div className="absolute inset-0 rounded-full border-2 border-blue-300/40 animate-ping"></div>
              <div className="absolute inset-3 rounded-full border-2 border-blue-400/40 animate-ping" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute inset-6 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDelay: '0.6s' }}></div>
            </div>
          )}

          {/* Audio Controls */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handlePlayPause}
              disabled={!audioSupported || !currentText}
              className="bg-white/90 hover:bg-white shadow-lg"
            >
              {isAudioPlaying ? <Pause size={16} /> : <Play size={16} />}
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleReplay}
              disabled={!audioSupported || !currentText}
              className="bg-white/90 hover:bg-white shadow-lg"
            >
              <RotateCcw size={16} />
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleMuteToggle}
              className="bg-white/90 hover:bg-white shadow-lg"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Speech Bubble */}
      {currentText && (
        <Card className="max-w-lg p-6 bg-white shadow-xl relative border-l-4 border-blue-500">
          <div className="absolute -top-3 left-8 w-6 h-6 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className={`w-2 h-2 rounded-full ${
                isAudioPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              {isAudioPlaying ? 'AI is speaking...' : 'Ready to speak'}
            </div>
            
            <p className="text-gray-800 leading-relaxed text-lg">
              {currentText}
            </p>
            
            {!audioSupported && (
              <div className="text-xs text-red-500 border-t pt-2">
                Audio not supported in this browser
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Status Indicators */}
      <div className="flex items-center gap-4 text-sm">
        <div className={`flex items-center gap-2 ${
          isAudioPlaying ? 'text-green-600' : 'text-gray-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isAudioPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
          }`}></div>
          {isAudioPlaying ? 'Speaking' : 'Ready'}
        </div>
        
        <div className={`flex items-center gap-2 ${
          isMuted ? 'text-red-600' : 'text-blue-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isMuted ? 'bg-red-500' : 'bg-blue-500'
          }`}></div>
          {isMuted ? 'Muted' : 'Audio On'}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAvatarWithAudio;
