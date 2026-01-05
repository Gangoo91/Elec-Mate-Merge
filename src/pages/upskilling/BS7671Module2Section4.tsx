import { ArrowLeft, ArrowRight, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Amendment3Intro } from '@/components/upskilling/Amendment3Intro';
import { Amendment3LearningOutcomes } from '@/components/upskilling/Amendment3LearningOutcomes';
import { Amendment3Content } from '@/components/upskilling/Amendment3Content';
import { Amendment3Quiz } from '@/components/upskilling/Amendment3Quiz';

const BS7671Module2Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        {/* Header */}
        <Link to="../bs7671-module-2">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 2
          </Button>
        </Link>

        {/* Title Section */}
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">
              Amendment 3 Highlights & Current Requirements
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-4xl">
            Understanding Amendment 3's bidirectional protection requirements and their impact on renewable energy installations
          </p>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-yellow-400/10 text-yellow-400 rounded-full text-sm font-medium">
              Module 2 • Section 4
            </span>
            <span className="px-3 py-1 bg-card text-yellow-400 rounded-full text-sm font-medium">
              45 minutes
            </span>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-12">
          <Amendment3LearningOutcomes />
        </div>

        {/* Introduction */}
        <div className="mb-12">
          <Amendment3Intro />
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <Amendment3Content />
        </div>

        {/* Assessment */}
        <div className="mb-12">
          <Amendment3Quiz />
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Link to="../bs7671-module-2-section-3">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-card w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Section
            </Button>
          </Link>
          <Link to="../bs7671-module-2">
            <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
              Complete Module 2
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module2Section4;