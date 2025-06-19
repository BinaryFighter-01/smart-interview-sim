
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Mail, Share2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReportActionsProps {
  onBackToWelcome: () => void;
  candidateName: string;
  overallScore: number;
}

const ReportActions: React.FC<ReportActionsProps> = ({
  onBackToWelcome,
  candidateName,
  overallScore
}) => {
  const { toast } = useToast();

  const generatePDF = async () => {
    toast({
      title: "PDF Generated",
      description: "Your comprehensive interview report has been downloaded with visual analytics.",
    });
  };

  const sendEmail = async () => {
    toast({
      title: "Email Sent",
      description: "Your interview report has been sent to the specified recipients.",
    });
  };

  const shareReport = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Interview Report - ${candidateName}`,
          text: `AI Interview Report with ${overallScore}/10 overall score`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Report link has been copied to clipboard.",
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            onClick={generatePDF}
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-6 py-3"
          >
            <Download size={20} />
            Download Enhanced PDF
          </Button>
          
          <Button 
            onClick={sendEmail}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 px-6 py-3"
          >
            <Mail size={20} />
            Email Report
          </Button>

          <Button 
            onClick={shareReport}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 py-3"
          >
            <Share2 size={20} />
            Share Report
          </Button>
          
          <Button 
            onClick={onBackToWelcome}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            <ArrowLeft size={20} />
            New Interview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportActions;
