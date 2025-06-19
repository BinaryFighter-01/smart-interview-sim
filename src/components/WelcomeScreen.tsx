
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Play, Users, FileText, Brain } from 'lucide-react';
import AvatarAnimation from './AvatarAnimation';

interface WelcomeScreenProps {
  onStartInterview: (candidateName: string) => void;
  onViewDashboard: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartInterview, onViewDashboard }) => {
  const [candidateName, setCandidateName] = useState('');
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const introSteps = [
    "Hello! I'm your AI interviewer. I'm here to conduct a professional interview with you today.",
    "During this interview, I'll ask you 5-7 questions about your experience and skills.",
    "Please speak clearly into your microphone after each question. Take your time to think before responding.",
    "I'll analyze your responses for clarity, relevance, and confidence to provide you with detailed feedback.",
    "When you're ready, please enter your name below and we'll begin the interview process."
  ];

  const startIntroduction = () => {
    setIsIntroPlaying(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isIntroPlaying && currentStep < introSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else if (currentStep >= introSteps.length) {
      setIsIntroPlaying(false);
    }
  }, [currentStep, isIntroPlaying]);

  const handleStartInterview = () => {
    if (candidateName.trim()) {
      onStartInterview(candidateName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid lg:grid-cols-2 gap-8 items-center">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-6">
          <AvatarAnimation 
            isPlaying={isIntroPlaying}
            currentText={isIntroPlaying ? introSteps[currentStep] : ""}
          />
          
          {!isIntroPlaying && (
            <Button 
              onClick={startIntroduction}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Play size={20} />
              Meet Your AI Interviewer
            </Button>
          )}
        </div>

        {/* Welcome Content */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              AI Interview Assistant
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in">
              Experience a professional interview with our AI-powered system that provides real-time feedback and detailed analysis.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <Brain className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-gray-600">Real-time response evaluation</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <Mic className="text-green-600" size={24} />
                <div>
                  <h3 className="font-semibold">Voice Recognition</h3>
                  <p className="text-sm text-gray-600">Advanced speech-to-text</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <FileText className="text-purple-600" size={24} />
                <div>
                  <h3 className="font-semibold">Detailed Report</h3>
                  <p className="text-sm text-gray-600">Comprehensive feedback</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="text-orange-600" size={24} />
                <div>
                  <h3 className="font-semibold">Professional</h3>
                  <p className="text-sm text-gray-600">Industry-standard questions</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Interview Form */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Ready to Begin?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name
                </label>
                <Input
                  id="candidateName"
                  type="text"
                  placeholder="Enter your full name"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleStartInterview}
                  disabled={!candidateName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  Start Interview
                </Button>
                
                <Button 
                  onClick={onViewDashboard}
                  variant="outline"
                  className="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 transition-colors duration-300"
                >
                  View History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
