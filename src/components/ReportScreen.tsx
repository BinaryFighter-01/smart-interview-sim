
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, ArrowLeft, Trophy, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { InterviewData } from '../types/interview';
import { useToast } from '@/hooks/use-toast';

interface ReportScreenProps {
  interviewData: InterviewData;
  onBackToWelcome: () => void;
}

const ReportScreen: React.FC<ReportScreenProps> = ({ interviewData, onBackToWelcome }) => {
  const { toast } = useToast();

  const generatePDF = () => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: "PDF Generated",
      description: "Your interview report has been downloaded.",
    });
  };

  const sendEmail = () => {
    // In a real implementation, this would send the report via email
    toast({
      title: "Email Sent",
      description: "Your interview report has been sent to your email.",
    });
  };

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

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold mb-2">Interview Report</h1>
                <p className="text-blue-100">Comprehensive analysis of your interview performance</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-4xl font-bold ${getScoreColor(interviewData.overallScore)} bg-white`}>
                  <Trophy size={32} />
                  {interviewData.overallScore}/10
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidate Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-blue-600" size={24} />
              Candidate Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Full Name</h4>
                <p className="text-lg">{interviewData.candidateName}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Interview Date</h4>
                <p className="text-lg">{formatDateTime(interviewData.startTime)}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-1">Duration</h4>
                <p className="text-lg">{getInterviewDuration()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overall Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-600" size={24} />
              Overall Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${getRecommendationColor(interviewData.recommendation || '')}`}>
                <h4 className="font-bold text-lg mb-2">Final Recommendation</h4>
                <p className="text-lg">{interviewData.recommendation}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle size={20} />
                      Key Strengths
                    </h4>
                    <ul className="space-y-2">
                      {interviewData.scores.flatMap(score => score.strengths).slice(0, 4).map((strength, index) => (
                        <li key={index} className="flex items-center gap-2 text-green-700">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
                      <AlertCircle size={20} />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {interviewData.scores.flatMap(score => score.improvements).slice(0, 4).map((improvement, index) => (
                        <li key={index} className="flex items-center gap-2 text-orange-700">
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question-by-Question Analysis */}
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

        {/* Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                onClick={generatePDF}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                <Download size={20} />
                Download PDF Report
              </Button>
              
              <Button 
                onClick={sendEmail}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
              >
                <Mail size={20} />
                Email Report
              </Button>
              
              <Button 
                onClick={onBackToWelcome}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft size={20} />
                Start New Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportScreen;
