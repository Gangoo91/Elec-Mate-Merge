
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ClipboardCheck, BookOpen, CheckSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TestSequenceHeaderProps {
  onToggleQuickRef: () => void;
  onToggleChecklist: () => void;
  showQuickRef: boolean;
  checklistCompletion: number;
}

const TestSequenceHeader = ({ 
  onToggleQuickRef, 
  onToggleChecklist, 
  showQuickRef, 
  checklistCompletion 
}: TestSequenceHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="border-border text-gray-300 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Main Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-elec-yellow/10 rounded-xl border border-elec-yellow/30">
            <ClipboardCheck className="h-8 w-8 text-elec-yellow" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Electrical Test Sequence</h1>
            <p className="text-gray-400 mt-1">
              Complete guide to the correct order for electrical installation testing according to BS7671
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">Safety First</Badge>
          <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">BS7671 Compliant</Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button 
          onClick={onToggleQuickRef}
          variant="outline"
          className="border-border text-gray-300 hover:bg-muted"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          {showQuickRef ? 'Hide' : 'Show'} Quick Reference
        </Button>
        <Button 
          onClick={onToggleChecklist}
          variant="outline"
          className="border-border text-gray-300 hover:bg-muted"
        >
          <CheckSquare className="h-4 w-4 mr-2" />
          Testing Checklist ({checklistCompletion}%)
        </Button>
      </div>
    </div>
  );
};

export default TestSequenceHeader;
