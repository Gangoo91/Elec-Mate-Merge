import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Bug, Loader2 } from 'lucide-react';

const DebugToolsButton = () => {
  const [isDebugging, setIsDebugging] = useState(false);
  const { toast } = useToast();

  const runDebugTest = async () => {
    setIsDebugging(true);
    
    try {
      console.log('🧪 Starting Firecrawl debug test...');
      
      const { data, error } = await supabase.functions.invoke('firecrawl-debug-test', {
        body: { 
          testUrl: 'https://www.screwfix.com/search?search=wire+strippers&page_size=20',
          extractionMode: 'extract'
        }
      });
      
      if (error) {
        console.error('❌ Debug test error:', error);
        toast({
          title: "Debug Test Failed",
          description: error.message || "Could not run debug test",
          variant: "destructive",
          duration: 5000,
        });
        return;
      }
      
      console.log('🧪 Debug test results:', data);
      
      if (data?.success) {
        const { analysis, detailedResults } = data;
        
        toast({
          title: "Debug Test Complete",
          description: `${analysis.successfulMethods}/${analysis.totalMethods} extraction methods worked. Check console for details.`,
          duration: 8000,
        });
        
        // Log detailed results
        console.log('📊 Analysis:', analysis);
        console.log('🔍 Detailed Results:', detailedResults);
        
        // Show recommendations
        if (analysis.recommendations.length > 0) {
          console.log('💡 Recommendations:');
          analysis.recommendations.forEach((rec, index) => {
            console.log(`${index + 1}. ${rec}`);
          });
        }
      } else {
        toast({
          title: "Debug Test Failed",
          description: data?.error || "Unknown error during debug test",
          variant: "destructive",
          duration: 5000,
        });
      }
      
    } catch (error) {
      console.error('❌ Debug test failed:', error);
      toast({
        title: "Debug Test Error",
        description: "Failed to run debug test. Check console for details.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsDebugging(false);
    }
  };

  return (
    <Button
      onClick={runDebugTest}
      disabled={isDebugging}
      variant="outline"
      size="sm"
      className="border-elec-yellow/50 hover:border-elec-yellow hover:bg-elec-yellow/10"
    >
      {isDebugging ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Running Debug Test...
        </>
      ) : (
        <>
          <Bug className="h-4 w-4 mr-2" />
          Debug Scraper
        </>
      )}
    </Button>
  );
};

export default DebugToolsButton;