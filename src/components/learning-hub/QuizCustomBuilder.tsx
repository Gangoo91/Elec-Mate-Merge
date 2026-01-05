
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuizCustomBuilder = () => {
  const focusAreas = [
    'Part 4 - Protection',
    'Part 5 - Installation', 
    'Part 6 - Testing',
    'Part 7 - Special Locations'
  ];

  return (
    <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-2 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-elec-yellow">Create Custom Assessment</CardTitle>
        <CardDescription className="text-gray-300">
          Build personalised quizzes focusing on specific topics or regulations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Choose Your Focus Areas:</h4>
            <div className="space-y-2">
              {focusAreas.map((topic, index) => (
                <label key={index} className="flex items-center gap-2 text-sm text-gray-300">
                  <input type="checkbox" className="rounded" />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Quiz Settings:</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Number of Questions</label>
                <select className="w-full p-2 bg-muted border border-border rounded text-foreground">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Difficulty Level</label>
                <select className="w-full p-2 bg-muted border border-border rounded text-foreground">
                  <option>Mixed</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Create Custom Quiz
          </Button>
          <Button variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black">
            Save Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCustomBuilder;
