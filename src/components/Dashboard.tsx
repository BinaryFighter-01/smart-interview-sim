
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, Clock, Trophy, TrendingUp, Users, FileText } from 'lucide-react';

interface DashboardProps {
  onBackToWelcome: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBackToWelcome }) => {
  // Mock data for demonstration
  const [interviews] = useState([
    {
      id: 1,
      candidateName: "John Smith",
      date: new Date('2024-01-15'),
      duration: "12 minutes",
      overallScore: 8.5,
      recommendation: "Recommended for next round",
      status: "completed"
    },
    {
      id: 2,
      candidateName: "Sarah Johnson",
      date: new Date('2024-01-14'),
      duration: "15 minutes",
      overallScore: 7.2,
      recommendation: "Consider for next round",
      status: "completed"
    },
    {
      id: 3,
      candidateName: "Mike Davis",
      date: new Date('2024-01-13'),
      duration: "18 minutes",
      overallScore: 9.1,
      recommendation: "Recommended for next round",
      status: "completed"
    }
  ]);

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes('Recommended')) return 'bg-green-100 text-green-800';
    if (recommendation.includes('Consider')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const averageScore = interviews.reduce((sum, interview) => sum + interview.overallScore, 0) / interviews.length;
  const totalInterviews = interviews.length;
  const recommendedCandidates = interviews.filter(i => i.recommendation.includes('Recommended')).length;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Interview Dashboard</h1>
                <p className="text-indigo-100">Manage and review all interview sessions</p>
              </div>
              <Button 
                onClick={onBackToWelcome}
                variant="outline"
                className="bg-white text-indigo-600 hover:bg-indigo-50 border-white flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{totalInterviews}</p>
                </div>
                <Users className="text-blue-600" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">{averageScore.toFixed(1)}/10</p>
                </div>
                <Trophy className="text-yellow-600" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Recommended</p>
                  <p className="text-3xl font-bold text-gray-900">{recommendedCandidates}</p>
                </div>
                <TrendingUp className="text-green-600" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Success Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{Math.round((recommendedCandidates / totalInterviews) * 100)}%</p>
                </div>
                <FileText className="text-purple-600" size={32} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar size={24} />
              Recent Interviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card key={interview.id} className="border hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                          <Badge 
                            className={getRecommendationColor(interview.recommendation)}
                          >
                            {interview.recommendation}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            {interview.date.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            {interview.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-lg ${getScoreColor(interview.overallScore)}`}>
                          <Trophy size={16} />
                          {interview.overallScore}/10
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                onClick={onBackToWelcome}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 h-auto flex flex-col items-center gap-2"
              >
                <Users size={24} />
                <span>Start New Interview</span>
              </Button>
              
              <Button 
                variant="outline"
                className="py-3 h-auto flex flex-col items-center gap-2"
                onClick={() => {/* Export functionality would go here */}}
              >
                <FileText size={24} />
                <span>Export All Reports</span>
              </Button>
              
              <Button 
                variant="outline"
                className="py-3 h-auto flex flex-col items-center gap-2"
                onClick={() => {/* Settings functionality would go here */}}
              >
                <TrendingUp size={24} />
                <span>Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
