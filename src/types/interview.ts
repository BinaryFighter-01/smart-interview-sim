
export interface Question {
  id: number;
  text: string;
  category: 'behavioral' | 'technical' | 'situational' | 'leadership' | 'problemSolving' | 'communication' | 'cultural' | 'managerial' | 'sales' | 'customerService' | 'analytical' | 'creative';
  expectedPoints: string[];
}

export interface Response {
  questionId: number;
  transcript: string;
  audioBlob?: Blob;
  timestamp: Date;
  duration: number;
}

export interface Score {
  questionId: number;
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export interface InterviewData {
  candidateName: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  responses: Response[];
  scores: Score[];
  overallScore: number;
  feedback: string[];
  recommendation?: string;
}
