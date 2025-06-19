
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import InterviewScreen from '../components/InterviewScreen';
import ReportScreen from '../components/ReportScreen';
import Dashboard from '../components/Dashboard';
import { InterviewData } from '../types/interview';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'interview' | 'report' | 'dashboard'>('welcome');
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);

  const handleStartInterview = (candidateName: string) => {
    setInterviewData({
      candidateName,
      startTime: new Date(),
      questions: [],
      responses: [],
      scores: [],
      overallScore: 0,
      feedback: []
    });
    setCurrentScreen('interview');
  };

  const handleInterviewComplete = (data: InterviewData) => {
    setInterviewData(data);
    setCurrentScreen('report');
  };

  const handleViewDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setInterviewData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStartInterview={handleStartInterview}
          onViewDashboard={handleViewDashboard}
        />
      )}
      {currentScreen === 'interview' && interviewData && (
        <InterviewScreen 
          candidateName={interviewData.candidateName}
          onComplete={handleInterviewComplete}
        />
      )}
      {currentScreen === 'report' && interviewData && (
        <ReportScreen 
          interviewData={interviewData}
          onBackToWelcome={handleBackToWelcome}
        />
      )}
      {currentScreen === 'dashboard' && (
        <Dashboard onBackToWelcome={handleBackToWelcome} />
      )}
    </div>
  );
};

export default Index;
