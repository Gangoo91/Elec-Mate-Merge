
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FetchStatusProps {
  isLoading: boolean;
  lastFetched: string | null;
  jobCount: number | null;
}

const JobListingsFetcher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastFetched, setLastFetched] = useState<string | null>(null);
  const [jobCount, setJobCount] = useState<number | null>(null);

  const fetchStats = async () => {
    try {
      // First query to get the count
      const { data: countData } = await supabase
        .from("job_listings")
        .select("count");
      
      if (countData && countData.length > 0) {
        setJobCount(countData[0].count);
      }
      
      // Second query to get the latest updated_at timestamp
      const { data: timeData } = await supabase
        .from("job_listings")
        .select("updated_at")
        .order("updated_at", { ascending: false })
        .limit(1);
      
      if (timeData && timeData.length > 0) {
        setLastFetched(timeData[0].updated_at);
      }
    } catch (error) {
      console.error("Error fetching job stats:", error);
    }
  };

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const triggerJobFetch = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("fetch-job-listings");
      
      if (error) throw error;
      
      toast({
        title: "Job Listings Updated",
        description: data.message || "Successfully updated job listings",
      });
      
      // Refresh the stats
      fetchStats();
    } catch (error) {
      console.error("Error triggering job fetch:", error);
      toast({
        title: "Error",
        description: "Failed to update job listings. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray h-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-xl">
          Job Listings Automation
          <Button 
            onClick={triggerJobFetch} 
            disabled={isLoading} 
            size="sm" 
            variant="outline"
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "Updating..." : "Update Now"}
          </Button>
        </CardTitle>
        <CardDescription className="text-muted-foreground/70">
          Fetched from Reed and TotalJobs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-elec-card/50 rounded-md p-3">
            <p className="text-sm font-medium text-muted-foreground mb-1">Total Job Listings</p>
            {jobCount !== null ? (
              <p className="text-2xl font-bold text-elec-yellow">{jobCount}</p>
            ) : (
              <Skeleton className="h-8 w-16" />
            )}
          </div>
          <div className="bg-elec-card/50 rounded-md p-3">
            <p className="text-sm font-medium text-muted-foreground mb-1">Last Updated</p>
            {lastFetched ? (
              <p className="text-2xl font-bold text-elec-light">{new Date(lastFetched).toLocaleDateString()}</p>
            ) : (
              <Skeleton className="h-8 w-24" />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobListingsFetcher;
