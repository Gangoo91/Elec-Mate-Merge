
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
    <Card className="bg-gradient-to-br from-neutral-800 to-neutral-700 border-2 border-elec-yellow/20 rounded-xl sm:rounded-2xl">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-elec-yellow text-base sm:text-lg md:text-xl">Create Custom Assessment</CardTitle>
        <CardDescription className="text-white text-xs sm:text-sm">
          Build personalised quizzes focusing on specific topics or regulations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-foreground text-sm sm:text-base">Choose Your Focus Areas:</h4>
            <div className="space-y-2 sm:space-y-3">
              {focusAreas.map((topic, index) => (
                <label
                  key={index}
                  className="flex items-center gap-3 text-sm text-white min-h-[44px] p-2 sm:p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 active:scale-[0.98] transition-all touch-manipulation"
                >
                  <input type="checkbox" className="rounded h-5 w-5 touch-manipulation" />
                  <span>{topic}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h4 className="font-medium text-foreground text-sm sm:text-base">Quiz Settings:</h4>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-white/80 mb-1.5 sm:mb-2">Number of Questions</label>
                <select className="w-full min-h-[44px] p-3 bg-muted border border-border rounded-lg text-foreground text-base touch-manipulation">
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-white/80 mb-1.5 sm:mb-2">Difficulty Level</label>
                <select className="w-full min-h-[44px] p-3 bg-muted border border-border rounded-lg text-foreground text-base touch-manipulation">
                  <option>Mixed</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
          <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90 min-h-[44px] text-sm sm:text-base touch-manipulation active:scale-[0.98]">
            Create Custom Quiz
          </Button>
          <Button variant="outline" className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] text-sm sm:text-base touch-manipulation active:scale-[0.98]">
            Save Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCustomBuilder;
