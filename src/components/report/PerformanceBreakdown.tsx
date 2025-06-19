
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CategoryScore {
  category: string;
  averageScore: number;
}

interface PerformanceBreakdownProps {
  categoryScores: CategoryScore[];
}

const PerformanceBreakdown: React.FC<PerformanceBreakdownProps> = ({
  categoryScores
}) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Performance Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {categoryScores.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium capitalize">{category.category}</span>
                <span className="font-bold">{category.averageScore.toFixed(1)}/10</span>
              </div>
              <Progress 
                value={category.averageScore * 10} 
                className="h-3"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceBreakdown;
