
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface RadarDataPoint {
  category: string;
  score: number;
}

interface SkillRadarChartProps {
  data: RadarDataPoint[];
}

const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Radar Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            score: { label: "Score", color: "#3B82F6" }
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default SkillRadarChart;
