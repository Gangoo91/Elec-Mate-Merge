import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SavedDesign {
  id: string;
  project_name: string;
  client_name: string | null;
  installation_address: string | null;
  circuits: any;
  test_expectations: any;
  status: string;
  exported_at: string | null;
  created_at: string;
}

export default function TestingProjects() {
  const [designs, setDesigns] = useState<SavedDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadDesigns();
  }, []);

  const loadDesigns = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_designs')
        .select('*')
        .in('status', ['design_complete', 'ready_for_testing'])
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDesigns(data || []);
    } catch (error) {
      toast({ title: 'Failed to load projects', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const startTesting = (design: SavedDesign) => {
    navigate(`/electrician/inspection-testing?design_id=${design.id}`);
  };

  if (loading) return <div className="p-8">Loading projects...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Testing Projects</h1>
        <p className="text-muted-foreground">Designs ready for on-site testing and certification</p>
      </div>

      {designs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No designs ready for testing</p>
            <p className="text-sm text-muted-foreground mt-2">Complete a design in the AI Planner to see it here</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {designs.map((design) => (
            <Card key={design.id} className="hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{design.project_name}</span>
                  <FileText className="h-5 w-5 text-primary" />
                </CardTitle>
                <CardDescription>{design.client_name || 'No client specified'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{design.installation_address || 'Not specified'}</p>
                </div>
                
                <div className="text-sm">
                  <p className="text-muted-foreground">Circuits</p>
                  <p className="font-medium">{Array.isArray(design.circuits) ? design.circuits.length : 0} circuits</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Exported {new Date(design.exported_at || design.created_at).toLocaleDateString()}</span>
                </div>

                <Button onClick={() => startTesting(design)} className="w-full mt-4">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Start Testing
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
