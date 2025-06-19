import { Question } from '../types/interview';

export const questionCategories = {
  behavioral: 'Behavioral',
  technical: 'Technical',
  leadership: 'Leadership',
  problemSolving: 'Problem Solving',
  communication: 'Communication',
  cultural: 'Cultural Fit',
  situational: 'Situational',
  managerial: 'Managerial',
  sales: 'Sales & Marketing',
  customerService: 'Customer Service',
  analytical: 'Analytical',
  creative: 'Creative'
};

// Enhanced question bank with difficulty levels and more questions per category
export const questionBank: Record<string, Question[]> = {
  behavioral: [
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
      category: 'behavioral',
      expectedPoints: ['communication', 'conflict resolution', 'professionalism', 'outcome']
    },
    {
      id: 5,
      text: "Where do you see yourself in 5 years and how does this position fit into your career goals?",
      category: 'behavioral',
      expectedPoints: ['career planning', 'ambition', 'company fit', 'growth mindset']
    },
    {
      id: 6,
      text: "Describe a time when you failed at something important. What did you learn?",
      category: 'behavioral',
      expectedPoints: ['resilience', 'learning', 'accountability', 'growth']
    },
    {
      id: 7,
      text: "Tell me about a time when you had to learn a new skill quickly.",
      category: 'behavioral',
      expectedPoints: ['adaptability', 'learning agility', 'resourcefulness', 'results']
    },
    {
      id: 8,
      text: "Describe a situation where you had to work under tight deadline pressure.",
      category: 'behavioral',
      expectedPoints: ['time management', 'prioritization', 'stress handling', 'delivery']
    },
    {
      id: 9,
      text: "Give me an example of when you went above and beyond your job responsibilities.",
      category: 'behavioral',
      expectedPoints: ['initiative', 'dedication', 'value creation', 'impact']
    },
    {
      id: 10,
      text: "Tell me about a time when you had to give constructive feedback to a colleague.",
      category: 'behavioral',
      expectedPoints: ['communication', 'diplomacy', 'leadership', 'relationship building']
    },
    {
      id: 11,
      text: "Describe a situation where you had to adapt to significant changes at work.",
      category: 'behavioral',
      expectedPoints: ['flexibility', 'change management', 'positive attitude', 'adaptation']
    },
    {
      id: 12,
      text: "Tell me about your biggest professional achievement.",
      category: 'behavioral',
      expectedPoints: ['accomplishment', 'impact', 'skills demonstration', 'pride']
    }
  ],

  technical: [
    {
      id: 13,
      text: "Explain your experience with modern web development frameworks and which you prefer.",
      category: 'technical',
      expectedPoints: ['framework knowledge', 'comparison', 'preferences', 'experience depth']
    },
    {
      id: 14,
      text: "How do you approach debugging a complex technical issue?",
      category: 'technical',
      expectedPoints: ['methodology', 'tools', 'systematic approach', 'problem isolation']
    },
    {
      id: 15,
      text: "Describe your experience with database design and optimization.",
      category: 'technical',
      expectedPoints: ['database concepts', 'optimization techniques', 'performance', 'scaling']
    },
    {
      id: 16,
      text: "How do you ensure code quality and maintainability in your projects?",
      category: 'technical',
      expectedPoints: ['best practices', 'testing', 'documentation', 'code review']
    },
    {
      id: 17,
      text: "Explain your understanding of microservices architecture and its benefits.",
      category: 'technical',
      expectedPoints: ['architecture knowledge', 'scalability', 'benefits', 'challenges']
    },
    {
      id: 18,
      text: "How do you handle security considerations in your applications?",
      category: 'technical',
      expectedPoints: ['security practices', 'vulnerabilities', 'authentication', 'data protection']
    },
    {
      id: 19,
      text: "Describe your experience with cloud platforms and deployment strategies.",
      category: 'technical',
      expectedPoints: ['cloud knowledge', 'deployment', 'DevOps', 'scalability']
    },
    {
      id: 20,
      text: "How do you stay updated with new technologies and industry trends?",
      category: 'technical',
      expectedPoints: ['continuous learning', 'resources', 'community engagement', 'skill development']
    },
    {
      id: 21,
      text: "Explain your approach to API design and documentation.",
      category: 'technical',
      expectedPoints: ['API design', 'documentation', 'versioning', 'best practices']
    },
    {
      id: 22,
      text: "How do you handle performance optimization in web applications?",
      category: 'technical',
      expectedPoints: ['performance metrics', 'optimization techniques', 'monitoring', 'user experience']
    },
    {
      id: 23,
      text: "Describe your experience with version control and collaborative development.",
      category: 'technical',
      expectedPoints: ['Git workflow', 'collaboration', 'branching strategies', 'merge conflicts']
    },
    {
      id: 24,
      text: "How do you approach testing in your development process?",
      category: 'technical',
      expectedPoints: ['testing strategies', 'types of testing', 'automation', 'quality assurance']
    }
  ],

  leadership: [
    {
      id: 25,
      text: "Describe a time when you had to lead a team through a difficult situation.",
      category: 'leadership',
      expectedPoints: ['leadership skills', 'crisis management', 'team motivation', 'results']
    },
    {
      id: 26,
      text: "How do you motivate team members who are struggling with their performance?",
      category: 'leadership',
      expectedPoints: ['motivation techniques', 'performance management', 'coaching', 'support']
    },
    {
      id: 27,
      text: "Tell me about a time when you had to make an unpopular decision.",
      category: 'leadership',
      expectedPoints: ['decision making', 'courage', 'communication', 'stakeholder management']
    },
    {
      id: 28,
      text: "How do you handle conflicts between team members?",
      category: 'leadership',
      expectedPoints: ['conflict resolution', 'mediation', 'team dynamics', 'communication']
    },
    {
      id: 29,
      text: "Describe your leadership style and how you adapt it to different situations.",
      category: 'leadership',
      expectedPoints: ['leadership philosophy', 'adaptability', 'situational leadership', 'self-awareness']
    },
    {
      id: 30,
      text: "How do you delegate tasks and ensure they are completed successfully?",
      category: 'leadership',
      expectedPoints: ['delegation', 'trust', 'accountability', 'follow-up']
    },
    {
      id: 31,
      text: "Tell me about a time when you had to influence someone without authority.",
      category: 'leadership',
      expectedPoints: ['influence', 'persuasion', 'relationship building', 'results']
    },
    {
      id: 32,
      text: "How do you build and maintain team morale?",
      category: 'leadership',
      expectedPoints: ['team building', 'morale boosting', 'recognition', 'culture']
    },
    {
      id: 33,
      text: "Describe a time when you had to coach or mentor someone.",
      category: 'leadership',
      expectedPoints: ['mentoring', 'development', 'guidance', 'growth']
    },
    {
      id: 34,
      text: "How do you handle giving feedback to senior stakeholders?",
      category: 'leadership',
      expectedPoints: ['upward communication', 'diplomacy', 'courage', 'professionalism']
    },
    {
      id: 35,
      text: "Tell me about a time when you had to change your team's direction mid-project.",
      category: 'leadership',
      expectedPoints: ['change management', 'communication', 'adaptability', 'team alignment']
    },
    {
      id: 36,
      text: "How do you ensure your team meets ambitious deadlines?",
      category: 'leadership',
      expectedPoints: ['project management', 'prioritization', 'resource allocation', 'team coordination']
    }
  ],

  problemSolving: [
    {
      id: 37,
      text: "Walk me through your problem-solving process when faced with a complex challenge.",
      category: 'problemSolving',
      expectedPoints: ['methodology', 'analytical thinking', 'systematic approach', 'creativity']
    },
    {
      id: 38,
      text: "Describe a time when you had to solve a problem with limited resources.",
      category: 'problemSolving',
      expectedPoints: ['resourcefulness', 'creativity', 'prioritization', 'efficiency']
    },
    {
      id: 39,
      text: "Tell me about a time when you identified a problem that others had missed.",
      category: 'problemSolving',
      expectedPoints: ['observation skills', 'proactivity', 'analytical thinking', 'impact']
    },
    {
      id: 40,
      text: "How do you approach problems that don't have obvious solutions?",
      category: 'problemSolving',
      expectedPoints: ['creative thinking', 'research skills', 'experimentation', 'persistence']
    },
    {
      id: 41,
      text: "Describe a situation where you had to analyze data to solve a business problem.",
      category: 'problemSolving',
      expectedPoints: ['data analysis', 'business acumen', 'insights', 'recommendations']
    },
    {
      id: 42,
      text: "Tell me about a time when your first solution didn't work and how you adapted.",
      category: 'problemSolving',
      expectedPoints: ['resilience', 'adaptability', 'learning', 'persistence']
    },
    {
      id: 43,
      text: "How do you prioritize when dealing with multiple urgent problems?",
      category: 'problemSolving',
      expectedPoints: ['prioritization', 'decision making', 'time management', 'impact assessment']
    },
    {
      id: 44,
      text: "Describe a time when you had to solve a problem collaboratively.",
      category: 'problemSolving',
      expectedPoints: ['collaboration', 'teamwork', 'diverse perspectives', 'consensus building']
    },
    {
      id: 45,
      text: "How do you ensure you fully understand a problem before attempting to solve it?",
      category: 'problemSolving',
      expectedPoints: ['problem definition', 'root cause analysis', 'stakeholder input', 'research']
    },
    {
      id: 46,
      text: "Tell me about a time when you had to innovate to solve a recurring problem.",
      category: 'problemSolving',
      expectedPoints: ['innovation', 'process improvement', 'creative solutions', 'long-term thinking']
    },
    {
      id: 47,
      text: "How do you measure the success of your problem-solving efforts?",
      category: 'problemSolving',
      expectedPoints: ['metrics', 'evaluation', 'feedback', 'continuous improvement']
    },
    {
      id: 48,
      text: "Describe a problem you solved that had a significant positive impact.",
      category: 'problemSolving',
      expectedPoints: ['impact', 'business value', 'measurement', 'stakeholder benefit']
    }
  ],

  communication: [
    {
      id: 49,
      text: "Describe a time when you had to explain a complex concept to someone without technical background.",
      category: 'communication',
      expectedPoints: ['simplification', 'audience awareness', 'clarity', 'patience']
    },
    {
      id: 50,
      text: "How do you handle difficult conversations with colleagues or clients?",
      category: 'communication',
      expectedPoints: ['diplomacy', 'active listening', 'empathy', 'resolution']
    },
    {
      id: 51,
      text: "Tell me about a time when miscommunication caused a problem and how you resolved it.",
      category: 'communication',
      expectedPoints: ['problem resolution', 'accountability', 'process improvement', 'clarity']
    },
    {
      id: 52,
      text: "How do you adapt your communication style for different audiences?",
      category: 'communication',
      expectedPoints: ['audience analysis', 'adaptability', 'message tailoring', 'effectiveness']
    },
    {
      id: 53,
      text: "Describe a presentation you gave that was particularly challenging.",
      category: 'communication',
      expectedPoints: ['presentation skills', 'preparation', 'audience engagement', 'results']
    },
    {
      id: 54,
      text: "How do you ensure important information is effectively communicated across teams?",
      category: 'communication',
      expectedPoints: ['information management', 'channels', 'follow-up', 'clarity']
    },
    {
      id: 55,
      text: "Tell me about a time when you had to deliver bad news to stakeholders.",
      category: 'communication',
      expectedPoints: ['difficult conversations', 'transparency', 'empathy', 'solution focus']
    },
    {
      id: 56,
      text: "How do you handle communication in remote or distributed teams?",
      category: 'communication',
      expectedPoints: ['remote communication', 'tools', 'clarity', 'team cohesion']
    },
    {
      id: 57,
      text: "Describe a time when you had to persuade someone to see your point of view.",
      category: 'communication',
      expectedPoints: ['persuasion', 'reasoning', 'empathy', 'influence']
    },
    {
      id: 58,
      text: "How do you ensure you're actively listening in important conversations?",
      category: 'communication',
      expectedPoints: ['active listening', 'engagement', 'understanding', 'feedback']
    },
    {
      id: 59,
      text: "Tell me about a time when you had to communicate across cultural or language barriers.",
      category: 'communication',
      expectedPoints: ['cultural sensitivity', 'adaptation', 'patience', 'understanding']
    },
    {
      id: 60,
      text: "How do you handle situations where you need to communicate urgent information quickly?",
      category: 'communication',
      expectedPoints: ['urgency management', 'clarity', 'channels', 'follow-up']
    }
  ],

  cultural: [
    {
      id: 61,
      text: "What type of work environment do you thrive in?",
      category: 'cultural',
      expectedPoints: ['environment preferences', 'self-awareness', 'adaptability', 'fit']
    },
    {
      id: 62,
      text: "How do you handle working with people who have different work styles than you?",
      category: 'cultural',
      expectedPoints: ['diversity appreciation', 'adaptability', 'collaboration', 'respect']
    },
    {
      id: 63,
      text: "What does work-life balance mean to you?",
      category: 'cultural',
      expectedPoints: ['balance philosophy', 'priorities', 'boundaries', 'sustainability']
    },
    {
      id: 64,
      text: "How do you contribute to building a positive team culture?",
      category: 'cultural',
      expectedPoints: ['culture building', 'positivity', 'teamwork', 'contribution']
    },
    {
      id: 65,
      text: "Describe a time when you had to adapt to a new company culture.",
      category: 'cultural',
      expectedPoints: ['adaptability', 'observation', 'integration', 'learning']
    },
    {
      id: 66,
      text: "What motivates you to do your best work?",
      category: 'cultural',
      expectedPoints: ['motivation', 'values', 'drive', 'purpose']
    },
    {
      id: 67,
      text: "How do you handle stress and maintain productivity?",
      category: 'cultural',
      expectedPoints: ['stress management', 'coping strategies', 'resilience', 'productivity']
    },
    {
      id: 68,
      text: "What role does feedback play in your professional development?",
      category: 'cultural',
      expectedPoints: ['growth mindset', 'feedback receptivity', 'learning', 'improvement']
    },
    {
      id: 69,
      text: "How do you approach collaboration with people you disagree with?",
      category: 'cultural',
      expectedPoints: ['disagreement handling', 'respect', 'collaboration', 'professionalism']
    },
    {
      id: 70,
      text: "What does diversity and inclusion mean to you in the workplace?",
      category: 'cultural',
      expectedPoints: ['D&I understanding', 'values', 'contribution', 'awareness']
    },
    {
      id: 71,
      text: "How do you maintain enthusiasm for your work during challenging periods?",
      category: 'cultural',
      expectedPoints: ['resilience', 'motivation', 'perspective', 'persistence']
    },
    {
      id: 72,
      text: "What are your expectations from your manager and team?",
      category: 'cultural',
      expectedPoints: ['expectations', 'support needs', 'collaboration', 'growth']
    }
  ]
};

// Enhanced function with difficulty support
export const getQuestionsByCategory = (category: string, count: number = 5, difficulty?: 'easy' | 'medium' | 'hard'): Question[] => {
  const questions = questionBank[category] || [];
  
  // For now, return first 'count' questions. In a real implementation, 
  // you would filter by difficulty level stored in question metadata
  return questions.slice(0, count);
};

export const getRandomQuestions = (categories: string[], totalCount: number = 7, difficulty?: 'easy' | 'medium' | 'hard'): Question[] => {
  const questions: Question[] = [];
  const questionsPerCategory = Math.ceil(totalCount / categories.length);
  
  categories.forEach(category => {
    const categoryQuestions = questionBank[category] || [];
    const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
    questions.push(...shuffled.slice(0, questionsPerCategory));
  });
  
  return questions.slice(0, totalCount);
};

export const getAllCategories = (): string[] => {
  return Object.keys(questionBank);
};
