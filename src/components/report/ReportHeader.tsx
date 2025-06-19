
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Brain, TrendingUp, Star } from 'lucide-react';

interface ReportHeaderProps {
  candidateName: string;
  overallScore: number;
  selectedTab: 'overview' | 'detailed' | 'analytics';
  onTabChange: (tab: 'overview' | 'detailed' | 'analytics') => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({
  candidateName,
  overallScore,
  selectedTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'detailed', label: 'Detailed Analysis', icon: Brain },
    { id: 'analytics', label: 'Visual Analytics', icon: TrendingUp }
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl">
      <CardContent className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy size={32} className="text-yellow-300" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">AI Interview Report</h1>
              <p className="text-blue-100 text-lg">Comprehensive Performance Analysis</p>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              <Star className="text-yellow-300" size={24} />
              <span className="text-3xl font-bold">{overallScore}/10</span>
            </div>
            <p className="text-sm text-blue-100 mt-2">Overall Score</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all ${
                selectedTab === tab.id 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportHeader;
