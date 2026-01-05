import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CIRCUIT_TEMPLATES, getTemplatesByCategory } from '@/data/circuitTemplates';
import { Loader2, CheckCircle, AlertCircle, Database } from 'lucide-react';

export const CircuitTemplateManager = () => {
  const [loading, setLoading] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const { toast } = useToast();

  const seedTemplates = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to seed templates',
          variant: 'destructive'
        });
        return;
      }

      // Insert all templates as public templates
      const templateInserts = CIRCUIT_TEMPLATES.map(template => ({
        user_id: user.id,
        name: template.name,
        description: template.description,
        category: template.category,
        is_public: true,
        template_data: template.templateData as any,
        usage_count: 0
      }));

      const { error } = await supabase
        .from('circuit_templates')
        .insert(templateInserts);

      if (error) {
        console.error('Error seeding templates:', error);
        toast({
          title: 'Error seeding templates',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setSeeded(true);
        toast({
          title: 'Templates seeded successfully',
          description: `${CIRCUIT_TEMPLATES.length} circuit templates have been added to the database`,
        });
      }
    } catch (error: any) {
      console.error('Exception seeding templates:', error);
      toast({
        title: 'Exception occurred',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteAllTemplates = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to delete templates',
          variant: 'destructive'
        });
        return;
      }

      const { error } = await supabase
        .from('circuit_templates')
        .delete()
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting templates:', error);
        toast({
          title: 'Error deleting templates',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        setSeeded(false);
        toast({
          title: 'Templates deleted',
          description: 'All your circuit templates have been removed',
        });
      }
    } catch (error: any) {
      console.error('Exception deleting templates:', error);
      toast({
        title: 'Exception occurred',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Circuit Template Manager
          </CardTitle>
          <CardDescription>
            Seed the database with {CIRCUIT_TEMPLATES.length} pre-configured circuit templates for faster form completion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={seedTemplates} 
              disabled={loading || seeded}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {seeded && <CheckCircle className="mr-2 h-4 w-4" />}
              {seeded ? 'Templates Seeded' : 'Seed Templates'}
            </Button>
            
            <Button 
              onClick={deleteAllTemplates} 
              disabled={loading}
              variant="destructive"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Clear All Templates
            </Button>
          </div>

          {seeded && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              Templates are now available in circuit forms
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Template Preview</CardTitle>
          <CardDescription>
            Preview of all {CIRCUIT_TEMPLATES.length} circuit templates that will be added
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="domestic">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="domestic">
                Domestic ({getTemplatesByCategory('domestic').length})
              </TabsTrigger>
              <TabsTrigger value="commercial">
                Commercial ({getTemplatesByCategory('commercial').length})
              </TabsTrigger>
              <TabsTrigger value="industrial">
                Industrial ({getTemplatesByCategory('industrial').length})
              </TabsTrigger>
            </TabsList>

            {(['domestic', 'commercial', 'industrial'] as const).map(category => (
              <TabsContent key={category} value={category} className="space-y-2">
                {getTemplatesByCategory(category).map(template => (
                  <Card key={template.id}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{template.icon}</span>
                          <div>
                            <CardTitle className="text-base">{template.name}</CardTitle>
                            <CardDescription className="text-xs">
                              {template.description}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 text-xs space-y-1">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-medium">Rating:</span> {template.templateData.protectiveDeviceRating}
                        </div>
                        <div>
                          <span className="font-medium">Cable:</span> {template.templateData.cableCsa}
                        </div>
                        <div>
                          <span className="font-medium">Type:</span> {template.templateData.protectiveDeviceType}
                        </div>
                        <div>
                          <span className="font-medium">Max Demand:</span> {template.templateData.maxDemand}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
