
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Search } from 'lucide-react';

const RegulationReference = () => {
  const navigate = useNavigate();
  
  const regulationTopics = [
    { title: 'Part 1: Scope & Definitions', description: 'Fundamental concepts and terminology' },
    { title: 'Part 4: Protection for Safety', description: 'Shock protection and fault protection' },
    { title: 'Part 5: Selection & Erection', description: 'Equipment selection and installation' },
    { title: 'Part 6: Inspection & Testing', description: 'Verification procedures and requirements' },
  ];

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          BS7671 Regulation Reference
        </CardTitle>
        <CardDescription className="text-gray-300">
          Quick access to key regulations and standards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {regulationTopics.map((topic, index) => (
            <div key={index} className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium text-foreground mb-1">{topic.title}</h4>
              <p className="text-sm text-gray-400">{topic.description}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            onClick={() => navigate('/tools/regulation-search')}
          >
            <Search className="h-4 w-4 mr-2" />
            Search Regulations
          </Button>
          <Button variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black">
            <FileText className="h-4 w-4 mr-2" />
            Quick Reference
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegulationReference;
