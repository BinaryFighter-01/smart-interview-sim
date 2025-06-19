
import React, { useState } from 'react';
import { InterviewData } from '../types/interview';
import ReportHeader from './report/ReportHeader';
import CandidateProfile from './report/CandidateProfile';
import PerformanceBreakdown from './report/PerformanceBreakdown';
import SkillRadarChart from './report/SkillRadarChart';
import ScoreDistributionChart from './report/ScoreDistributionChart';
import DetailedAnalysis from './report/DetailedAnalysis';
import ReportActions from './report/ReportActions';

interface EnhancedReportScreenProps {
  interviewData: InterviewData;
  onBackToWelcome: () => void;
}

const EnhancedReportScreen: React.FC<EnhancedReportScreenProps> = ({ 
  interviewData, 
  onBackToWelcome 
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'detailed' | 'analytics'>('overview');

  function getColorForCategory(category: string): string {
    const colors: Record<string, string> = {
      technical: '#3B82F6',
      behavioral: '#10B981',
      leadership: '#8B5CF6',
      communication: '#F59E0B',
      problemSolving: '#EF4444',
      cultural: '#6366F1'
    };
    return colors[category] || '#6B7280';
  }

  // Enhanced data processing for charts
  const categoryScores = interviewData.questions.reduce((acc, question) => {
    const score = interviewData.scores.find(s => s.questionId === question.id);
    if (score) {
      const existing = acc.find(item => item.category === question.category);
      if (existing) {
        existing.totalScore += score.score;
        existing.count += 1;
        existing.averageScore = existing.totalScore / existing.count;
      } else {
        acc.push({
          category: question.category,
          totalScore: score.score,
          count: 1,
          averageScore: score.score
        });
      }
    }
    return acc;
  }, [] as Array<{category: string, totalScore: number, count: number, averageScore: number}>);

  const radarData = categoryScores.map(item => ({
    category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    score: Math.round(item.averageScore * 10)
  }));

  const pieData = categoryScores.map(item => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    value: Math.round(item.averageScore),
    color: getColorForCategory(item.category)
  }));

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6">
        <ReportHeader
          candidateName={interviewData.candidateName}
          overallScore={interviewData.overallScore}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            <CandidateProfile
              candidateName={interviewData.candidateName}
              startTime={interviewData.startTime}
              endTime={interviewData.endTime}
              questionCount={interviewData.questions.length}
            />
            <PerformanceBreakdown categoryScores={categoryScores} />
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <SkillRadarChart data={radarData} />
            <ScoreDistributionChart data={pieData} />
          </div>
        )}

        {selectedTab === 'detailed' && (
          <DetailedAnalysis
            questions={interviewData.questions}
            responses={interviewData.responses}
            scores={interviewData.scores}
          />
        )}

        <ReportActions
          onBackToWelcome={onBackToWelcome}
          candidateName={interviewData.candidateName}
          overallScore={interviewData.overallScore}
        />
      </div>
    </div>
  );
};

export default EnhancedReportScreen;
