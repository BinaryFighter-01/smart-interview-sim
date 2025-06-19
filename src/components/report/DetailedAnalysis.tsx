
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Question, Response, Score } from '../../types/interview';

interface DetailedAnalysisProps {
  questions: Question[];
  responses: Response[];
  scores: Score[];
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  questions,
  responses,
  scores
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Question Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const response = responses.find(r => r.questionId === question.id);
            const score = scores.find(s => s.questionId === question.id);
            
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
  );
};

export default DetailedAnalysis;
