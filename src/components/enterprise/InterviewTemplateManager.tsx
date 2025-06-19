
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Save, ArrowLeft, Trash2 } from 'lucide-react';
import { InterviewTemplate } from '../../types/enterprise';
import { questionCategories, getQuestionsByCategory } from '../../data/questionBank';

interface InterviewTemplateManagerProps {
  onBack: () => void;
  onSave: (template: Partial<InterviewTemplate>) => void;
}

const InterviewTemplateManager: React.FC<InterviewTemplateManagerProps> = ({
  onBack,
  onSave
}) => {
  const [template, setTemplate] = useState<Partial<InterviewTemplate>>({
    name: '',
    description: '',
    categories: [],
    questionCount: 5,
    estimatedDuration: 30,
    difficulty: 'intermediate',
    jobRole: '',
    isActive: true,
    customQuestions: []
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    
    setSelectedCategories(updated);
    setTemplate(prev => ({ ...prev, categories: updated }));
  };

  const handleSave = () => {
    if (!template.name || !template.jobRole || selectedCategories.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    onSave({
      ...template,
      categories: selectedCategories,
      estimatedDuration: Math.ceil(template.questionCount! * 5), // 5 minutes per question
    });
  };

  const previewQuestions = selectedCategories.length > 0 
    ? getQuestionsByCategory(selectedCategories[0], 3)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Interview Template</h1>
            <p className="text-gray-600">Create and customize interview templates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name*</Label>
                  <Input
                    id="name"
                    value={template.name || ''}
                    onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Frontend Developer Interview"
                  />
                </div>

                <div>
                  <Label htmlFor="jobRole">Job Role*</Label>
                  <Input
                    id="jobRole"
                    value={template.jobRole || ''}
                    onChange={(e) => setTemplate(prev => ({ ...prev, jobRole: e.target.value }))}
                    placeholder="e.g., Senior Frontend Developer"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={template.description || ''}
                    onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of this interview template"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="questionCount">Number of Questions</Label>
                    <Select
                      value={template.questionCount?.toString()}
                      onValueChange={(value) => setTemplate(prev => ({ ...prev, questionCount: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select
                      value={template.difficulty}
                      onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => 
                        setTemplate(prev => ({ ...prev, difficulty: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Question Categories*</CardTitle>
                <p className="text-sm text-gray-600">
                  Select categories that best match the role requirements
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(questionCategories).map(([key, label]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={selectedCategories.includes(key)}
                        onCheckedChange={(checked) => handleCategoryChange(key, checked as boolean)}
                      />
                      <Label htmlFor={key} className="text-sm font-medium">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            {/* Template Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Template Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Questions</p>
                  <p className="font-semibold">{template.questionCount} questions</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Duration</p>
                  <p className="font-semibold">{Math.ceil((template.questionCount || 0) * 5)} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCategories.map(category => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {questionCategories[category]}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Preview */}
            {previewQuestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Sample Questions</CardTitle>
                  <p className="text-sm text-gray-600">
                    Preview from {questionCategories[selectedCategories[0]]}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {previewQuestions.map((question, index) => (
                    <div key={question.id} className="text-sm">
                      <p className="font-medium">{index + 1}. {question.text}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
                <Save size={20} className="mr-2" />
                Save Template
              </Button>
              <Button variant="outline" onClick={onBack} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewTemplateManager;
