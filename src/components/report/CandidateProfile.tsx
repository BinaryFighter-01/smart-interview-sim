
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface CandidateProfileProps {
  candidateName: string;
  startTime: Date;
  endTime?: Date;
  questionCount: number;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  candidateName,
  startTime,
  endTime,
  questionCount
}) => {
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
    if (endTime) {
      const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 60000);
      return `${duration} minutes`;
    }
    return 'N/A';
  };

  return (
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
          <p className="text-xl font-medium">{candidateName}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Interview Date</h4>
          <p className="text-lg">{formatDateTime(startTime)}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Duration</h4>
          <p className="text-lg">{getInterviewDuration()}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-700 mb-1">Questions Answered</h4>
          <p className="text-lg">{questionCount}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CandidateProfile;
