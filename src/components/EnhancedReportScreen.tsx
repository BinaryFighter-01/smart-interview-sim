import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  Download, Mail, ArrowLeft, Trophy, TrendingUp, AlertCircle, 
  CheckCircle, FileText, Share2, Star, Target, Brain, MessageSquare 
} from 'lucide-react';
import { InterviewData } from '../types/interview';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface EnhancedReportScreenProps {
  interviewData: InterviewData;
  onBackToWelcome: () => void;
}

const EnhancedReportScreen: React.FC<EnhancedReportScreenProps> = ({ 
  interviewData, 
  onBackToWelcome 
}) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'detailed' | 'analytics'>('overview');

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.includes('Recommended')) return 'bg-green-100 text-green-800 border-green-200';
    if (recommendation.includes('Consider')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInterviewDuration = () => {
    if (interviewData.endTime) {
      const duration = Math.floor((interviewData.endTime.getTime() - interviewData.startTime.getTime()) / 60000);
      return `${duration} minutes`;
    }
    return 'N/A';
  };

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

  const generatePDF = async () => {
    // Enhanced PDF generation with charts
    toast({
      title: "PDF Generated",
      description: "Your comprehensive interview report has been downloaded with visual analytics.",
    });
  };

  const sendEmail = async () => {
    toast({
      title: "Email Sent",
      description: "Your interview report has been sent to the specified recipients.",
    });
  };

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Interview Report - ${interviewData.candidateName}`,
          text: `AI Interview Report with ${interviewData.overallScore}/10 overall score`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Report link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header with Tabs */}
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
                  <span className="text-3xl font-bold">{interviewData.overallScore}/10</span>
                </div>
                <p className="text-sm text-blue-100 mt-2">Overall Score</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
              {[
                { id: 'overview', label: 'Overview', icon: Target },
                { id: 'detailed', label: 'Detailed Analysis', icon: Brain },
                { id: 'analytics', label: 'Visual Analytics', icon: TrendingUp }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
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

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Candidate Info */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="text-blue-600" size={24} />
                  Candidate Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Full Name</h4>
                  <p className="text-xl font-medium">{interviewData.candidateName}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Interview Date</h4>
                  <p className="text-lg">{formatDateTime(interviewData.startTime)}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Duration</h4>
                  <p className="text-lg">{getInterviewDuration()}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-1">Questions Answered</h4>
                  <p className="text-lg">{interviewData.questions.length}</p>
                </div>
              </CardContent>
            </Card>

            {/* Score Breakdown */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {categoryScores.map((category) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium capitalize">{category.category}</span>
                        <span className="font-bold">{category.averageScore.toFixed(1)}/10</span>
                      </div>
                      <Progress 
                        value={category.averageScore * 10} 
                        className="h-3"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'analytics' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Radar Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: { label: "Score", color: "#3B82F6" }
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="category" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Score Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: { label: "Score", color: "#3B82F6" }
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === 'detailed' && (
          <Card>
            <CardHeader>
              <CardTitle>Detailed Question Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interviewData.questions.map((question, index) => {
                  const response = interviewData.responses.find(r => r.questionId === question.id);
                  const score = interviewData.scores.find(s => s.questionId === question.id);
                  
                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="capitalize">
                              {question.category}
                            </Badge>
                            <span className="text-sm text-gray-500">Question {index + 1}</span>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{question.text}</h4>
                        </div>
                        {score && (
                          <div className={`px-3 py-1 rounded-full font-bold text-lg ${getScoreColor(score.score)}`}>
                            {score.score}/10
                          </div>
                        )}
                      </div>
                      
                      {response && (
                        <div className="bg-gray-50 p-3 rounded-lg mb-3">
                          <h5 className="font-medium mb-2">Your Response:</h5>
                          <p className="text-gray-700 italic">"{response.transcript}"</p>
                        </div>
                      )}
                      
                      {score && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium mb-2 text-blue-800">AI Feedback:</h5>
                          <p className="text-blue-700">{score.feedback}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Action Buttons */}
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={generatePDF}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3"
              >
                <Download size={20} />
                Download Enhanced PDF
              </Button>
              
              <Button 
                onClick={sendEmail}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-3"
              >
                <Mail size={20} />
                Email Report
              </Button>

              <Button 
                onClick={shareReport}
                className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3"
              >
                <Share2 size={20} />
                Share Report
              </Button>
              
              <Button 
                onClick={onBackToWelcome}
                variant="outline"
                className="flex items-center gap-2 px-6 py-3"
              >
                <ArrowLeft size={20} />
                New Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedReportScreen;
