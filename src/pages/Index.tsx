
import React, { useState } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import InterviewScreen from '../components/InterviewScreen';
import ReportScreen from '../components/ReportScreen';
import Dashboard from '../components/Dashboard';
import CompanyDashboard from '../components/enterprise/CompanyDashboard';
import InterviewTemplateManager from '../components/enterprise/InterviewTemplateManager';
import { InterviewData } from '../types/interview';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'interview' | 'report' | 'dashboard' | 'enterprise' | 'templates'>('welcome');
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [userType, setUserType] = useState<'candidate' | 'enterprise'>('candidate');

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
    if (userType === 'enterprise') {
      setCurrentScreen('enterprise');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setInterviewData(null);
  };

  const handleCreateInterview = () => {
    // Logic for creating new enterprise interview
    console.log('Creating new enterprise interview');
  };

  const handleManageTemplates = () => {
    setCurrentScreen('templates');
  };

  const handleViewAnalytics = () => {
    console.log('Viewing analytics');
  };

  const handleSaveTemplate = (template: any) => {
    console.log('Saving template:', template);
    setCurrentScreen('enterprise');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStartInterview={handleStartInterview}
          onViewDashboard={handleViewDashboard}
          onSwitchToEnterprise={() => setUserType('enterprise')}
          userType={userType}
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
      {currentScreen === 'enterprise' && (
        <CompanyDashboard 
          companyId="demo-company"
          onCreateInterview={handleCreateInterview}
          onManageTemplates={handleManageTemplates}
          onViewAnalytics={handleViewAnalytics}
        />
      )}
      {currentScreen === 'templates' && (
        <InterviewTemplateManager 
          onBack={() => setCurrentScreen('enterprise')}
          onSave={handleSaveTemplate}
        />
      )}
    </div>
  );
};

export default Index;
