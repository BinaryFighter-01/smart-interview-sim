
export interface Company {
  id: string;
  name: string;
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  domain: string;
  subscription: SubscriptionPlan;
  settings: CompanySettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanySettings {
  avatarStyle: 'professional' | 'friendly' | 'corporate';
  defaultLanguage: string;
  allowCandidateRescheduling: boolean;
  requireCandidateConsent: boolean;
  autoGenerateReports: boolean;
  emailNotifications: boolean;
  customBranding: boolean;
}

export interface SubscriptionPlan {
  type: 'free' | 'professional' | 'enterprise';
  interviewsPerMonth: number;
  maxUsers: number;
  features: string[];
  price: number;
  billingCycle: 'monthly' | 'yearly';
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'hr_manager' | 'interviewer' | 'candidate';
  companyId?: string;
  permissions: Permission[];
  lastLogin?: Date;
  isActive: boolean;
  createdAt: Date;
}

export interface Permission {
  resource: string;
  actions: ('create' | 'read' | 'update' | 'delete')[];
}

export interface InterviewTemplate {
  id: string;
  name: string;
  description: string;
  companyId: string;
  categories: string[];
  questionCount: number;
  estimatedDuration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  jobRole: string;
  isActive: boolean;
  customQuestions: Question[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interview {
  id: string;
  candidateName: string;
  candidateEmail: string;
  companyId: string;
  templateId: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  scheduledAt?: Date;
  startTime?: Date;
  endTime?: Date;
  interviewerNotes?: string;
  recordingUrl?: string;
  reportId?: string;
  metadata: InterviewMetadata;
}

export interface InterviewMetadata {
  userAgent: string;
  ipAddress: string;
  location?: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browserVersion: string;
  connectionQuality: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AnalyticsData {
  companyId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  totalInterviews: number;
  completionRate: number;
  averageScore: number;
  topPerformingQuestions: QuestionAnalytics[];
  candidateInsights: CandidateInsights;
  timeToComplete: number;
}

export interface QuestionAnalytics {
  questionId: number;
  category: string;
  averageScore: number;
  responseTime: number;
  difficultyRating: number;
}

export interface CandidateInsights {
  averageExperience: number;
  topSkills: string[];
  commonWeaknesses: string[];
  emotionalAnalysis: EmotionalAnalysis;
}

export interface EmotionalAnalysis {
  confidence: number;
  stress: number;
  engagement: number;
  authenticity: number;
}

export interface AvatarConfig {
  provider: 'did' | 'synthesia' | 'deepbrain';
  avatarId: string;
  voice: {
    language: string;
    accent: string;
    speed: number;
    pitch: number;
  };
  appearance: {
    clothing: string;
    background: string;
    lighting: string;
  };
}

export interface IntegrationConfig {
  ats: {
    provider?: 'greenhouse' | 'lever' | 'workday';
    apiKey?: string;
    webhookUrl?: string;
  };
  calendar: {
    provider?: 'google' | 'outlook';
    clientId?: string;
  };
  notifications: {
    slack?: {
      webhookUrl: string;
      channel: string;
    };
    email?: {
      provider: 'sendgrid' | 'mailgun';
      apiKey: string;
    };
  };
}
