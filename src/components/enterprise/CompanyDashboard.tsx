
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  FileText, 
  Settings, 
  Plus,
  BarChart3,
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';
import { AnalyticsData, Interview, InterviewTemplate } from '../../types/enterprise';

interface CompanyDashboardProps {
  companyId: string;
  onCreateInterview: () => void;
  onManageTemplates: () => void;
  onViewAnalytics: () => void;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
  companyId,
  onCreateInterview,
  onManageTemplates,
  onViewAnalytics
}) => {
  const [recentInterviews, setRecentInterviews] = useState<Interview[]>([]);
  const [templates, setTemplates] = useState<InterviewTemplate[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setRecentInterviews([
      {
        id: '1',
        candidateName: 'John Smith',
        candidateEmail: 'john@example.com',
        companyId,
        templateId: 'template-1',
        status: 'completed',
        startTime: new Date('2024-01-15T10:00:00'),
        endTime: new Date('2024-01-15T10:45:00'),
        metadata: {
          userAgent: 'Chrome',
          ipAddress: '192.168.1.1',
          deviceType: 'desktop',
          browserVersion: 'Chrome 120',
          connectionQuality: 'excellent'
        }
      },
      {
        id: '2',
        candidateName: 'Sarah Johnson',
        candidateEmail: 'sarah@example.com',
        companyId,
        templateId: 'template-2',
        status: 'in_progress',
        startTime: new Date('2024-01-15T14:00:00'),
        metadata: {
          userAgent: 'Firefox',
          ipAddress: '192.168.1.2',
          deviceType: 'desktop',
          browserVersion: 'Firefox 121',
          connectionQuality: 'good'
        }
      }
    ]);

    setTemplates([
      {
        id: 'template-1',
        name: 'Software Engineer - Frontend',
        description: 'Technical interview for frontend developers',
        companyId,
        categories: ['technical', 'problemSolving'],
        questionCount: 8,
        estimatedDuration: 45,
        difficulty: 'intermediate',
        jobRole: 'Frontend Developer',
        isActive: true,
        customQuestions: [],
        createdBy: 'admin',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ]);

    setAnalytics({
      companyId,
      period: 'monthly',
      totalInterviews: 124,
      completionRate: 0.87,
      averageScore: 7.4,
      topPerformingQuestions: [],
      candidateInsights: {
        averageExperience: 3.2,
        topSkills: ['JavaScript', 'React', 'Problem Solving'],
        commonWeaknesses: ['System Design', 'Leadership'],
        emotionalAnalysis: {
          confidence: 0.72,
          stress: 0.28,
          engagement: 0.85,
          authenticity: 0.91
        }
      },
      timeToComplete: 38
    });

    setLoading(false);
  }, [companyId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Dashboard</h1>
            <p className="text-gray-600">Manage your AI-powered interviews</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={onCreateInterview} className="bg-blue-600 hover:bg-blue-700">
              <Plus size={20} className="mr-2" />
              New Interview
            </Button>
            <Button variant="outline" onClick={onManageTemplates}>
              <Settings size={20} className="mr-2" />
              Templates
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.totalInterviews}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {Math.round((analytics?.completionRate || 0) * 100)}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.averageScore}/10</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Duration</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics?.timeToComplete}m</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="interviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interviews">Recent Interviews</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="interviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={20} />
                  Recent Interview Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{interview.candidateName}</h3>
                          <p className="text-sm text-gray-600">{interview.candidateEmail}</p>
                          <p className="text-xs text-gray-500">
                            {interview.startTime?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(interview.status)}>
                          {interview.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Interview Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{template.questionCount} questions</Badge>
                          <Badge variant="outline">{template.estimatedDuration}min</Badge>
                          <Badge variant="outline">{template.difficulty}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Use</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 size={20} />
                    Performance Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Candidate Confidence</span>
                    <span className="font-semibold">
                      {Math.round((analytics?.candidateInsights.emotionalAnalysis.confidence || 0) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Engagement Level</span>
                    <span className="font-semibold">
                      {Math.round((analytics?.candidateInsights.emotionalAnalysis.engagement || 0) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Experience</span>
                    <span className="font-semibold">
                      {analytics?.candidateInsights.averageExperience} years
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Skills Identified</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics?.candidateInsights.topSkills.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyDashboard;
