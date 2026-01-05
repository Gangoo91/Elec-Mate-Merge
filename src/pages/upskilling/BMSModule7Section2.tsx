import { ArrowLeft, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { CompactLoadingSkeleton } from '@/components/ui/loading-skeleton';

// Lazy load components for better performance
const BMSModule7Section2Intro = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2Intro').then(module => ({ default: module.BMSModule7Section2Intro })));
const BMSModule7Section2LearningOutcomes = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2LearningOutcomes').then(module => ({ default: module.BMSModule7Section2LearningOutcomes })));
const BMSModule7Section2ContentPart1 = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2ContentPart1').then(module => ({ default: module.BMSModule7Section2ContentPart1 })));
const BMSModule7Section2ContentPart2 = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2ContentPart2').then(module => ({ default: module.BMSModule7Section2ContentPart2 })));
const BMSModule7Section2ContentPart3 = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2ContentPart3').then(module => ({ default: module.BMSModule7Section2ContentPart3 })));
const BMSModule7Section2ContentPart4 = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2ContentPart4').then(module => ({ default: module.BMSModule7Section2ContentPart4 })));
const BMSModule7Section2Practical = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2Practical').then(module => ({ default: module.BMSModule7Section2Practical })));
const BMSModule7Section2RealWorld = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2RealWorld').then(module => ({ default: module.BMSModule7Section2RealWorld })));
const BMSModule7Section2Summary = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2Summary').then(module => ({ default: module.BMSModule7Section2Summary })));
const BMSModule7Section2FAQ = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2FAQ').then(module => ({ default: module.BMSModule7Section2FAQ })));
const BMSModule7Section2Quiz = lazy(() => import('@/components/upskilling/bms/BMSModule7Section2Quiz').then(module => ({ default: module.BMSModule7Section2Quiz })));

const BMSModule7Section2 = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../bms-module-7">
          <Button variant="ghost" className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Code className="h-8 w-8 text-yellow-400" />
            <Badge variant="secondary" className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0">
              Module 7 - Section 2
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Programming Methods
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Function Blocks, Boolean Logic, and PID Control
          </p>
        </div>
      </header>

      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8 module-content">
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2Intro />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2LearningOutcomes />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2ContentPart1 />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2ContentPart2 />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2ContentPart3 />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2ContentPart4 />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2Practical />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2RealWorld />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2Summary />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2FAQ />
          </Suspense>
          
          <Suspense fallback={<CompactLoadingSkeleton />}>
            <BMSModule7Section2Quiz />
          </Suspense>

        </div>
      </main>
    </div>
  );
};

export default BMSModule7Section2;