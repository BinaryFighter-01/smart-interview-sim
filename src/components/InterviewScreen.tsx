
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, Clock, User } from 'lucide-react';
import { InterviewData, Question, Response, Score } from '../types/interview';
import { useToast } from '@/hooks/use-toast';
import AvatarAnimation from './AvatarAnimation';

interface InterviewScreenProps {
  candidateName: string;
  onComplete: (data: InterviewData) => void;
}

const InterviewScreen: React.FC<InterviewScreenProps> = ({ candidateName, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [scores, setScores] = useState<Score[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const defaultQuestions: Question[] = [
    {
      id: 1,
      text: "Tell me about yourself and your professional background.",
      category: 'behavioral',
      expectedPoints: ['experience', 'skills', 'achievements', 'career goals']
    },
    {
      id: 2,
      text: "Describe a challenging project you've worked on and how you overcame the obstacles.",
      category: 'behavioral',
      expectedPoints: ['problem-solving', 'resilience', 'teamwork', 'results']
    },
    {
      id: 3,
      text: "What are your greatest strengths and how do they apply to this role?",
      category: 'behavioral',
      expectedPoints: ['self-awareness', 'relevant skills', 'examples', 'job alignment']
    },
    {
      id: 4,
      text: "Tell me about a time when you had to work with a difficult team member.",
      category: 'situational',
      expectedPoints: ['communication', 'conflict resolution', 'professionalism', 'outcome']
    },
    {
      id: 5,
      text: "Where do you see yourself in 5 years and how does this position fit into your career goals?",
      category: 'behavioral',
      expectedPoints: ['career planning', 'ambition', 'company fit', 'growth mindset']
    }
  ];

  useEffect(() => {
    setQuestions(defaultQuestions);
    startTimer();
    
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
        }
      };
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const speakQuestion = (questionText: string) => {
    setIsAvatarSpeaking(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(questionText);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsAvatarSpeaking(false);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsAvatarSpeaking(false), 3000);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks: BlobPart[] = [];
      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        // Store audio blob for future use
      };

      setIsRecording(true);
      setTranscript('');
      mediaRecorderRef.current.start();

      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      toast({
        title: "Recording Started",
        description: "Please speak your answer clearly.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    setIsRecording(false);
    
    if (transcript.trim()) {
      analyzeResponse();
    } else {
      toast({
        title: "No Response Detected",
        description: "Please try recording again.",
        variant: "destructive",
      });
    }
  };

  const analyzeResponse = async () => {
    setIsAnalyzing(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    const response: Response = {
      questionId: currentQuestion.id,
      transcript: transcript,
      timestamp: new Date(),
      duration: 0
    };

    // Simulate AI analysis (in real implementation, this would call OpenAI API)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const score: Score = {
      questionId: currentQuestion.id,
      score: Math.floor(Math.random() * 4) + 7, // Random score between 7-10 for demo
      feedback: generateFeedback(transcript, currentQuestion),
      strengths: ['Clear communication', 'Relevant examples', 'Professional tone'],
      improvements: ['Could provide more specific details', 'Consider mentioning quantifiable results']
    };

    setResponses(prev => [...prev, response]);
    setScores(prev => [...prev, score]);
    setIsAnalyzing(false);

    toast({
      title: "Response Analyzed",
      description: `Score: ${score.score}/10`,
    });

    // Move to next question or complete interview
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setTranscript('');
        speakQuestion(questions[currentQuestionIndex + 1].text);
      }, 1500);
    } else {
      completeInterview();
    }
  };

  const generateFeedback = (transcript: string, question: Question): string => {
    const wordCount = transcript.split(' ').length;
    if (wordCount < 20) {
      return "Your response was brief. Consider providing more detailed examples and explanations.";
    } else if (wordCount > 200) {
      return "Good detailed response. Try to be more concise while maintaining the key points.";
    } else {
      return "Well-structured response with good balance of detail and clarity.";
    }
  };

  const completeInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const averageScore = scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
    
    const interviewData: InterviewData = {
      candidateName,
      startTime: new Date(Date.now() - timeElapsed * 1000),
      endTime: new Date(),
      questions,
      responses,
      scores,
      overallScore: Math.round(averageScore * 10) / 10,
      feedback: scores.map(s => s.feedback),
      recommendation: averageScore >= 8 ? "Recommended for next round" : averageScore >= 6 ? "Consider for next round" : "Needs improvement"
    };

    onComplete(interviewData);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (currentQuestion && !isAvatarSpeaking) {
      setTimeout(() => speakQuestion(currentQuestion.text), 1000);
    }
  }, [currentQuestionIndex]);

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <User size={24} />
                <div>
                  <h2 className="text-xl font-semibold">{candidateName}</h2>
                  <p className="opacity-90">AI Interview in Progress</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Question {currentQuestionIndex + 1} of {questions.length}</p>
                  <Progress value={progress} className="w-32 mt-1" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Avatar Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-center">Your AI Interviewer</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <AvatarAnimation 
                isPlaying={isAvatarSpeaking || isRecording}
                currentText={isAvatarSpeaking ? currentQuestion?.text : ""}
              />
              
              {isAnalyzing && (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    Analyzing your response...
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Question and Response Section */}
          <div className="space-y-6">
            {/* Current Question */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Question {currentQuestionIndex + 1}
                  <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {currentQuestion?.category}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">{currentQuestion?.text}</p>
                
                {/* Recording Controls */}
                <div className="flex items-center gap-4 mb-4">
                  {!isRecording ? (
                    <Button 
                      onClick={startRecording}
                      disabled={isAnalyzing || isAvatarSpeaking}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    >
                      <Mic size={20} />
                      Start Recording
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopRecording}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 animate-pulse"
                    >
                      <MicOff size={20} />
                      Stop Recording
                    </Button>
                  )}
                  
                  {!isAvatarSpeaking && (
                    <Button 
                      onClick={() => speakQuestion(currentQuestion?.text)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Play size={16} />
                      Repeat Question
                    </Button>
                  )}
                </div>

                {/* Transcript */}
                {transcript && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">Your Response:</h4>
                      <p className="text-gray-700 italic">"{transcript}"</p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {questions.map((question, index) => {
                    const isCompleted = index < currentQuestionIndex;
                    const isCurrent = index === currentQuestionIndex;
                    const score = scores.find(s => s.questionId === question.id);
                    
                    return (
                      <div 
                        key={question.id}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          isCurrent ? 'bg-blue-100 border-2 border-blue-300' : isCompleted ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            isCompleted ? 'bg-green-600 text-white' : isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <span className={`text-sm ${isCurrent ? 'font-semibold' : ''}`}>
                            {question.category} question
                          </span>
                        </div>
                        {score && (
                          <div className="text-right">
                            <span className="text-lg font-bold text-green-600">{score.score}/10</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScreen;
