
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  Play, 
  Users, 
  FileText, 
  Brain, 
  Building2,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';
import AvatarAnimation from './AvatarAnimation';

interface WelcomeScreenProps {
  onStartInterview: (candidateName: string) => void;
  onViewDashboard: () => void;
  onSwitchToEnterprise?: () => void;
  userType?: 'candidate' | 'enterprise';
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStartInterview, 
  onViewDashboard, 
  onSwitchToEnterprise,
  userType = 'candidate'
}) => {
  const [candidateName, setCandidateName] = useState('');
  const [isIntroPlaying, setIsIntroPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const introSteps = [
    "Hello! I'm your AI interviewer. I'm here to conduct a professional interview with you today.",
    "During this interview, I'll ask you 5-7 questions about your experience and skills.",
    "Please speak clearly into your microphone after each question. Take your time to think before responding.",
    "I'll analyze your responses for clarity, relevance, and confidence to provide you with detailed feedback.",
    "When you're ready, please enter your name below and we'll begin the interview process."
  ];

  const startIntroduction = () => {
    setIsIntroPlaying(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (isIntroPlaying && currentStep < introSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    } else if (currentStep >= introSteps.length) {
      setIsIntroPlaying(false);
    }
  }, [currentStep, isIntroPlaying]);

  const handleStartInterview = () => {
    if (candidateName.trim()) {
      onStartInterview(candidateName.trim());
    }
  };

  const enterpriseFeatures = [
    {
      icon: Building2,
      title: "Multi-Company Support",
      description: "Dedicated workspaces for each organization with custom branding"
    },
    {
      icon: Users,
      title: "Team Collaboration", 
      description: "Multiple HR managers and interviewers with role-based permissions"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights on candidate performance and hiring trends"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC2 compliance, SSO integration, and data encryption"
    },
    {
      icon: Zap,
      title: "Custom Templates",
      description: "Create role-specific interview templates with custom questions"
    },
    {
      icon: Globe,
      title: "Multi-language Support",
      description: "Conduct interviews in 25+ languages with native voice support"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
              AI Interview Assistant
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Experience the future of hiring with our AI-powered interview platform. 
              Realistic avatars, intelligent analysis, and comprehensive reporting.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-200">500K+</div>
                <div className="text-sm text-blue-300">Interviews Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-200">95%</div>
                <div className="text-sm text-blue-300">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-200">12+</div>
                <div className="text-sm text-blue-300">Question Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-200">24/7</div>
                <div className="text-sm text-blue-300">Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs value={userType} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-12">
            <TabsTrigger value="candidate" onClick={() => onSwitchToEnterprise && onSwitchToEnterprise()}>
              For Candidates
            </TabsTrigger>
            <TabsTrigger value="enterprise" onClick={() => onSwitchToEnterprise && onSwitchToEnterprise()}>
              For Enterprise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="candidate" className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-8">
                <AvatarAnimation 
                  isPlaying={isIntroPlaying}
                  currentText={isIntroPlaying ? introSteps[currentStep] : ""}
                />
                
                {!isIntroPlaying && (
                  <Button 
                    onClick={startIntroduction}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Play size={24} className="mr-3" />
                    Meet Your AI Interviewer
                  </Button>
                )}
              </div>

              {/* Features & Start Form */}
              <div className="space-y-8">
                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Brain className="text-blue-600 mx-auto mb-3" size={32} />
                      <h3 className="font-bold mb-2">AI Analysis</h3>
                      <p className="text-sm text-gray-600">Real-time response evaluation with GPT-4</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Mic className="text-green-600 mx-auto mb-3" size={32} />
                      <h3 className="font-bold mb-2">Voice Recognition</h3>
                      <p className="text-sm text-gray-600">Advanced speech-to-text technology</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <FileText className="text-purple-600 mx-auto mb-3" size={32} />
                      <h3 className="font-bold mb-2">Detailed Reports</h3>
                      <p className="text-sm text-gray-600">Comprehensive performance analysis</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <Star className="text-orange-600 mx-auto mb-3" size={32} />
                      <h3 className="font-bold mb-2">Professional</h3>
                      <p className="text-sm text-gray-600">Industry-standard questions</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Start Interview Form */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-gray-800">Ready to Begin?</CardTitle>
                    <p className="text-gray-600">Start your AI-powered interview experience</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label htmlFor="candidateName" className="block text-sm font-medium text-gray-700 mb-2">
                        Your Full Name
                      </label>
                      <Input
                        id="candidateName"
                        type="text"
                        placeholder="Enter your full name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full h-12 text-lg"
                      />
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        onClick={handleStartInterview}
                        disabled={!candidateName.trim()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        Start Interview
                      </Button>
                      
                      <Button 
                        onClick={onViewDashboard}
                        variant="outline"
                        className="px-8 py-4 border-2 border-gray-300 hover:border-gray-400 text-lg transition-all duration-300 hover:shadow-lg"
                      >
                        View History
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-12">
            {/* Enterprise Hero */}
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2 text-sm font-semibold mb-4">
                Enterprise Solution
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Scale Your Hiring with AI
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete interview management platform for enterprise teams. 
                Custom branding, advanced analytics, and seamless integrations.
              </p>
            </div>

            {/* Enterprise Features */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {enterpriseFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8">
                    <div className="mb-4">
                      <feature.icon className="text-blue-600" size={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enterprise CTA */}
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring?</h3>
                <p className="text-xl mb-8 text-blue-100">
                  Join leading companies using AI to streamline their interview process
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={onViewDashboard}
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-xl"
                  >
                    <Building2 size={24} className="mr-3" />
                    View Enterprise Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
                  >
                    Schedule Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted by Leading Companies</h3>
            <p className="text-gray-600">Join thousands of organizations revolutionizing their hiring process</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {/* Mock company logos */}
            {['TechCorp', 'InnovateLab', 'StartupHub', 'GlobalTech'].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-600">{company}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
