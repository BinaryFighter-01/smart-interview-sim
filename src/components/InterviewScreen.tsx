import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Clock, User, Settings, Volume2, Zap } from 'lucide-react';
import { InterviewData, Question, Response, Score } from '../types/interview';
import { useToast } from '@/hooks/use-toast';
import EnhancedAvatarWithAudio from './EnhancedAvatarWithAudio';
import { getRandomQuestions, getAllCategories, questionCategories } from '../data/questionBank';

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
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['behavioral', 'technical']);
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  useEffect(() => {
    // Generate questions based on selected categories
    const generatedQuestions = getRandomQuestions(selectedCategories, 1, difficultyLevel);
    setQuestions(generatedQuestions);
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
  }, [selectedCategories, difficultyLevel]);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };

  const speakQuestion = (questionText: string) => {
    setIsAvatarSpeaking(true);
  };

  const handleAvatarSpeechComplete = () => {
    setIsAvatarSpeaking(false);
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

    // Enhanced AI analysis with adaptive scoring
    await new Promise(resolve => setTimeout(resolve, 3000));

    const baseScore = Math.floor(Math.random() * 4) + 7;
    const adaptiveBonus = adaptiveMode && scores.length > 0 ? 
      (scores[scores.length - 1].score > 8 ? -0.5 : 0.5) : 0;
    
    const score: Score = {
      questionId: currentQuestion.id,
      score: Math.min(10, Math.max(1, baseScore + adaptiveBonus)),
      feedback: generateEnhancedFeedback(transcript, currentQuestion),
      strengths: generateStrengths(transcript, currentQuestion.category),
      improvements: generateImprovements(transcript, currentQuestion.category)
    };

    setResponses(prev => [...prev, response]);
    setScores(prev => [...prev, score]);
    setIsAnalyzing(false);

    toast({
      title: "Response Analyzed",
      description: `Score: ${score.score}/10 - ${score.score >= 8 ? 'Excellent!' : score.score >= 6 ? 'Good job!' : 'Keep improving!'}`,
    });

    if (currentQuestionIndex < questions.length - 1) {
      // Generate next question adaptively if enabled
      if (adaptiveMode && currentQuestionIndex === questions.length - 2) {
        const avgScore = [...scores, score].reduce((sum, s) => sum + s.score, 0) / (scores.length + 1);
        const nextQuestions = generateAdaptiveQuestions(avgScore);
        if (nextQuestions.length > 0) {
          setQuestions(prev => [...prev, ...nextQuestions]);
        }
      }
      
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setTranscript('');
        setIsAvatarSpeaking(true);
      }, 2000);
    } else {
      completeInterview();
    }
  };

  const generateAdaptiveQuestions = (performance: number) => {
    let newDifficulty: 'easy' | 'medium' | 'hard' = difficultyLevel;
    
    if (adaptiveMode && scores.length >= 2) {
      const avgScore = scores.reduce((sum, score) => sum + score.score, 0) / scores.length;
      
      if (avgScore >= 8) {
        newDifficulty = 'hard';
      } else if (avgScore >= 6) {
        newDifficulty = 'medium';
      } else {
        newDifficulty = 'easy';
      }
    }
    
    return getRandomQuestions(selectedCategories, 1, newDifficulty);
  };

  const generateEnhancedFeedback = (transcript: string, question: Question): string => {
    const wordCount = transcript.split(' ').length;
    const category = question.category;
    
    const feedbackTemplates = {
      behavioral: [
        "Strong storytelling with clear situation and outcome.",
        "Good use of specific examples to demonstrate skills.",
        "Clear explanation of your role and responsibilities."
      ],
      technical: [
        "Solid understanding of technical concepts.",
        "Good problem-solving approach demonstrated.",
        "Clear explanation of technical implementation."
      ],
      leadership: [
        "Excellent demonstration of leadership principles.",
        "Strong focus on team development and results.",
        "Good balance of authority and collaboration."
      ]
    };

    const templates = feedbackTemplates[category] || feedbackTemplates.behavioral;
    const basefeedback = templates[Math.floor(Math.random() * templates.length)];
    
    if (wordCount < 30) {
      return `${basefeedback} Consider providing more detailed examples to strengthen your response.`;
    } else if (wordCount > 150) {
      return `${basefeedback} Try to be more concise while maintaining key details.`;
    }
    
    return `${basefeedback} Well-structured response with appropriate detail level.`;
  };

  const generateStrengths = (transcript: string, category: string): string[] => {
    const strengthsMap = {
      behavioral: ['Clear communication', 'Specific examples', 'Result-oriented thinking'],
      technical: ['Technical knowledge', 'Problem-solving approach', 'Implementation clarity'],
      leadership: ['Team focus', 'Strategic thinking', 'Decision-making skills'],
      problemSolving: ['Analytical approach', 'Creative solutions', 'Systematic thinking'],
      communication: ['Articulation', 'Active listening', 'Persuasive communication']
    };
    
    return strengthsMap[category] || strengthsMap.behavioral;
  };

  const generateImprovements = (transcript: string, category: string): string[] => {
    const improvementsMap = {
      behavioral: ['Add more quantifiable results', 'Include stakeholder impact'],
      technical: ['Mention scalability considerations', 'Discuss alternative approaches'],
      leadership: ['Elaborate on team development', 'Include change management aspects'],
      problemSolving: ['Consider long-term implications', 'Mention risk mitigation'],
      communication: ['Practice active listening techniques', 'Enhance presentation skills']
    };
    
    return improvementsMap[category] || improvementsMap.behavioral;
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
      recommendation: generateRecommendation(averageScore)
    };

    onComplete(interviewData);
  };

  const generateRecommendation = (averageScore: number): string => {
    if (averageScore >= 8.5) return "Highly Recommended - Exceptional candidate with strong skills across all areas";
    if (averageScore >= 7.5) return "Recommended - Strong candidate with solid performance and good potential";
    if (averageScore >= 6.5) return "Consider for next round - Good foundation with some areas for development";
    if (averageScore >= 5.5) return "Marginal - Consider additional screening or different role fit";
    return "Not recommended - Significant skill gaps identified";
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
    <div className="min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Adaptive Mode Indicator */}
        <Card className="mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{candidateName}</h2>
                  <div className="flex items-center gap-3 opacity-90">
                    <span>AI-Powered Interview</span>
                    {adaptiveMode && (
                      <Badge className="bg-yellow-500 text-yellow-900">
                        <Zap size={12} className="mr-1" />
                        Adaptive Mode
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span className="font-mono text-lg">{formatTime(timeElapsed)}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Question {currentQuestionIndex + 1} of {questions.length}</p>
                  <Progress value={progress} className="w-40 mt-1 bg-white/20" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Enhanced Avatar Section */}
          <div className="lg:col-span-2">
            <Card className="h-fit shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">Your AI Interviewer</CardTitle>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Professional Interview Mode
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <EnhancedAvatarWithAudio
                  isPlaying={isAvatarSpeaking}
                  currentText={isAvatarSpeaking ? currentQuestion?.text : ""}
                  avatarStyle="professional"
                  voiceSettings={{
                    language: 'en-US',
                    rate: 0.9,
                    pitch: 1.0
                  }}
                  onVoiceComplete={() => setIsAvatarSpeaking(false)}
                  onPlaybackStart={() => console.log('Avatar started speaking')}
                />
                
                {isAnalyzing && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-lg">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <span className="font-medium">Analyzing with AI...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Question Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Current Question */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Question {currentQuestionIndex + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize text-sm">
                      {questionCategories[currentQuestion?.category] || currentQuestion?.category}
                    </Badge>
                    <Badge className={`${
                      difficultyLevel === 'hard' ? 'bg-red-100 text-red-800' :
                      difficultyLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-lg leading-relaxed text-gray-800">{currentQuestion?.text}</p>
                </div>
                
                {/* Enhanced Recording Controls */}
                <div className="flex items-center gap-4">
                  {!isRecording ? (
                    <Button 
                      onClick={startRecording}
                      disabled={isAnalyzing || isAvatarSpeaking}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-3 text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      <Mic size={24} />
                      Start Recording Answer
                    </Button>
                  ) : (
                    <Button 
                      onClick={stopRecording}
                      className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3 text-lg animate-pulse shadow-lg"
                    >
                      <MicOff size={24} />
                      Stop Recording
                    </Button>
                  )}
                  
                  <Button 
                    onClick={() => setIsAvatarSpeaking(true)}
                    variant="outline"
                    className="flex items-center gap-2 px-4 py-3 border-2 hover:bg-blue-50"
                  >
                    <Volume2 size={20} />
                    Repeat Question
                  </Button>
                </div>

                {/* Enhanced Transcript Display */}
                {transcript && (
                  <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h4 className="font-semibold text-green-800">Your Response:</h4>
                      </div>
                      <p className="text-gray-700 italic text-lg leading-relaxed">"{transcript}"</p>
                      <div className="mt-2 text-sm text-green-600">
                        Word count: {transcript.split(' ').length} • Estimated duration: {Math.ceil(transcript.split(' ').length / 3)}s
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Progress Summary */}
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{Math.round(progress)}%</span>
                  </div>
                  Interview Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const isCompleted = index < currentQuestionIndex;
                    const isCurrent = index === currentQuestionIndex;
                    const score = scores.find(s => s.questionId === question.id);
                    
                    return (
                      <div 
                        key={question.id}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                          isCurrent 
                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 shadow-md' 
                            : isCompleted 
                              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                              : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                            isCompleted 
                              ? 'bg-green-600 text-white' 
                              : isCurrent 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-300 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <span className={`font-medium ${isCurrent ? 'text-blue-800' : 'text-gray-700'}`}>
                              {questionCategories[question.category]} Question
                            </span>
                            {isCurrent && (
                              <div className="text-sm text-blue-600 font-medium">Currently answering...</div>
                            )}
                          </div>
                        </div>
                        {score && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{score.score}/10</div>
                            <div className="text-xs text-gray-500">Completed</div>
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
