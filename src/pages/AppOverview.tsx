
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AppOverview = () => {
  const { toast } = useToast();
  const overviewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!overviewRef.current) return;
    
    try {
      await navigator.clipboard.writeText(overviewRef.current.innerText);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "App overview has been copied to your clipboard",
      });
      
      // Reset the copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try selecting and copying the text manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/">
            <Button variant="outline" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-elec-yellow">Elec-Mate App Overview</h1>
        </div>
        <Button 
          onClick={handleCopy} 
          className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
        >
          {copied ? (
            <Check className="h-4 w-4 mr-2" />
          ) : (
            <Copy className="h-4 w-4 mr-2" />
          )}
          {copied ? "Copied" : "Copy Overview"}
        </Button>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray/50 mb-8">
        <CardContent className="p-6">
          <div ref={overviewRef} className="text-white whitespace-pre-wrap">
{`# Elec-Mate Application Overview

## App Purpose and Target Audience
Elec-Mate is a comprehensive platform designed specifically for electrical professionals and apprentices. It serves as an all-in-one solution providing learning resources, off-job training tools, electrician's toolkit, community support, mentor connection capabilities, and mental health resources.

## Core Features

### Learning and Development
- **Apprentice Learning Hub**: Structured courses for electrical apprentices with EAL curriculum alignment
- **Health & Safety Modules**: Dedicated sections covering electrical safety regulations and best practices
- **Craft Skills Training**: Hands-on technical skills development modules
- **Installation Methods**: Detailed guides on proper electrical installation procedures
- **Interactive Quizzes**: Knowledge assessment tools with progress tracking
- **Video Lessons**: Multimedia learning content

### Professional Tools
- **Electrician's Toolbox**: Digital tools for professional electricians
- **Electrical Calculations**: Specialized calculators for cable sizing, voltage drop, etc.
- **Job Documentation**: Templates and tools for work documentation
- **On-Job Training Support**: Resources for practical workplace learning
- **Live Pricing**: Real-time updates on electrical materials and labor rates

### Community Features
- **Mentor Connect**: Platform connecting apprentices with experienced mentors
- **Messaging System**: Direct communication between users
- **Toolbox Talk**: Professional forums and knowledge sharing
- **Job Vacancies**: Electrical industry employment listings
- **Leaderboards**: Gamified progress tracking and comparisons

### Support Services
- **Mental Health Resources**: Well-being support specifically for tradespeople
- **Career Progression**: Career development guidance and pathways
- **AI Tools**: Advanced assistance for electrical problems

## Business Model
- **Subscription Tiers**:
  - Apprentice tier (lowest price point)
  - Electrician tier (mid-range)
  - Employer tier (premium)
- **Trial Period**: Users can test features before subscribing
- **Development Mode**: Testing environment for product development

## Technical Implementation
- **Front-end**: React with TypeScript, Tailwind CSS, and Shadcn UI
- **Backend Integration**: Supabase for authentication, database, and storage
- **Payment Processing**: Stripe integration for subscription management

## User Journey
1. Users land on the home page with sign-in/sign-up options
2. After authentication, they access a personalized dashboard
3. They can navigate to specialized hubs (apprentice, electrician, etc.)
4. Content is organized by course, unit, section, and subsection for educational material
5. Professional tools are grouped by function (calculations, documentation, etc.)
6. Community features facilitate industry networking and knowledge sharing

## Unique Value Proposition
Elec-Mate differentiates itself by offering a specialized platform that combines educational content, professional tools, and support services specifically tailored for the electrical trade, addressing both technical skills development and well-being in a single integrated platform.`}
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-elec-light/70">
        This overview can be copied and used when seeking business advice through ChatGPT or other consultation services.
      </div>
    </div>
  );
};

export default AppOverview;
