
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SubsectionProps } from '@/components/apprentice/content/subsection1_1/types';

const SubsectionRenderer: React.FC<SubsectionProps> = ({ 
  subsectionId, 
  isCompleted,
  markAsComplete 
}) => {
  // This is a placeholder renderer that will eventually render dynamic content
  // based on the subsectionId
  
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <h2>Subsection Content for ID: {subsectionId}</h2>
        <p>
          This is a placeholder for subsection content. In a complete implementation,
          this would dynamically load content based on the subsection ID.
        </p>
        
        <ul>
          <li>Key point 1 for this subsection</li>
          <li>Key point 2 for this subsection</li>
          <li>Key point 3 for this subsection</li>
        </ul>
        
        <div className="my-8 p-4 bg-blue-900/20 border border-blue-700/30 rounded-md">
          <h3 className="text-blue-400">Important Information</h3>
          <p>
            This highlighted section contains important information or safety 
            warnings relevant to this subsection's content.
          </p>
        </div>
      </div>
      
      {/* Mark as complete button */}
      <div className="flex justify-end pt-4 border-t border-yellow-600/20">
        <Button 
          variant="outline"
          className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-yellow-600 hover:text-black'}`}
          onClick={markAsComplete}
          disabled={isCompleted}
        >
          {isCompleted ? 'Completed' : 'Mark as Complete'}
          {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default SubsectionRenderer;
