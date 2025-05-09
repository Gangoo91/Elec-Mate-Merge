
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CopyableOverview = () => {
  const [copied, setCopied] = useState(false);

  const overview = `# ElecMate - Electrician Training Platform (Complete Rundown)

## CORE COMPONENTS (COMPLETED)
- React/TypeScript-based application with Tailwind CSS and Shadcn UI
- Responsive design with mobile and desktop views
- Main navigation with sidebar, header, and footer
- Authentication system framework with user profiles and roles

## CURRENT FEATURES (IMPLEMENTED)

### Course Management
- Complete EAL course catalog with Level 2, 3, and 4 courses
- Course navigation system with unit filtering by level
- Unit detail views with specific content for different unit codes
- Course unit linking system with URL parameter preservation

### Apprentice Tools
- Study timer for tracking off-job training (20% requirement)
- Resource completion tracking system
- Training management card with multiple tracking views
- Digital logbook for recording training activities
- Certificates manager for qualification tracking

### AI Tooling
- AI Assistant for general electrical queries
- Regulations Assistant for UK electrical standards
- Circuit Designer AI for electrical installations
- Visual Analysis tool for fault detection
- Report Writer for generating documentation
- Each tool interfaces with Supabase edge functions

### Career Progression
- Comprehensive career pathways with salary ranges
- Detailed career path cards showing skills and requirements
- Career advancement tips and progression paths
- Training course catalog with searchable interface
- Professional accreditation resource listings
- Business builder resources for entrepreneurs

### Electrical Tools
- Multiple electrical calculators (Ohm's Law, Power Factor, Cable Sizing)
- Voltage drop calculator
- Instrumentation calculator
- Project management system
- On-job tools for apprentices

### Mental Health Resources
- Crisis resources section
- Support network information
- Work-life balance tools
- Mental health guides specific to the trade

### Community Features
- Apprentice chat system
- Electrical professionals discussion board
- Mentor connection system
- Leaderboards for training activities

### Job Resources
- Job vacancies browser
- Location-based job filtering
- Live pricing for electrical materials

## FEATURES TO BE COMPLETED

### Content Development (High Priority)
- Complete educational content for all Level 2 units:
  * Health & Safety (ELEC2/01)
  * Electrical Theory (ELEC2/04)
  * Installation Methods (ELEC2/05A)
  * Craft Skills (ELEC2/05B)
  * Electrical Science (ELEC2/08)
- Develop Level 3 and Level 4 course materials
- Create interactive assessments for each unit
- Add video-based learning content

### AI Systems Enhancement
- Improve AI response quality and context awareness
- Add more specialized electrical AI tools
- Integrate AI with course content for personalized learning
- Develop an AI-driven exam preparation system
- Create installation guide AI for step-by-step assistance

### System Enhancements
- Complete backend integration for user progress tracking
- Implement persistent storage for completion data
- Add offline mode capabilities
- Improve automated training tracking system
- Enhance mobile UI for complex calculators

### Additional Tools
- Expand calculators with more electrical formulas
- Add conduit fill calculator
- Implement cable management planner
- Create materials estimator tool
- Add regulations reference section with search

### Admin Features
- Course content management system
- User progress analytics dashboard
- Certification verification system
- Content creation tools for trainers
- Student progress reporting

### Business Model
- Subscription tier implementation
- Payment processing system
- Enterprise account management
- Institution licensing system
- Training organization portal

## TECHNICAL ARCHITECTURE
- React Router for navigation
- Context-based state management
- Hooks-based feature implementation
- Supabase for backend services and edge functions
- AI integration through OpenAI API
- Time tracking with localStorage and DB persistence
- Responsive UI with mobile-first approach

## PROJECT STATUS
- Core infrastructure: 85% complete
- AI Tools: 75% complete
- Career resources: 70% complete
- Content development: 25% complete
- Business features: 10% complete
- Overall project: ~45% complete`;

  const handleCopy = () => {
    navigator.clipboard.writeText(overview)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard",
          description: "You can now paste the overview anywhere you need it."
        });
        setTimeout(() => setCopied(false), 3000);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Failed to copy",
          description: "Please try again or copy manually."
        });
      });
  };

  return (
    <div className="p-4 bg-elec-gray rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-elec-yellow">Project Overview</h2>
        <Button 
          onClick={handleCopy}
          variant="outline" 
          size="sm"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10"
        >
          {copied ? (
            <>
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> 
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> 
              Copy Overview
            </>
          )}
        </Button>
      </div>
      <div className="bg-elec-gray/50 border border-elec-yellow/20 rounded-md p-4 max-h-[400px] overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm font-mono text-elec-light">
          {overview}
        </pre>
      </div>
    </div>
  );
};

export default CopyableOverview;
