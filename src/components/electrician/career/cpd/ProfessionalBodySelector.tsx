import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Clock, Users, BookOpen, ExternalLink } from 'lucide-react';
import { professionalBodyService, ProfessionalBody, UserProfessionalMembership } from '@/services/professionalBodyService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ProfessionalBodySelectorProps {
  onComplete: (memberships: UserProfessionalMembership[]) => void;
}

const ProfessionalBodySelector: React.FC<ProfessionalBodySelectorProps> = ({ onComplete }) => {
  const [professionalBodies, setProfessionalBodies] = useState<ProfessionalBody[]>([]);
  const [selectedBodies, setSelectedBodies] = useState<string[]>([]);
  const [membershipNumbers, setMembershipNumbers] = useState<Record<string, string>>({});
  const [renewalDates, setRenewalDates] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfessionalBodies();
  }, []);

  const loadProfessionalBodies = async () => {
    try {
      const bodies = await professionalBodyService.getAllProfessionalBodies();
      setProfessionalBodies(bodies);
    } catch (error) {
      console.error('Error loading professional bodies:', error);
      toast({
        title: "Error loading professional bodies",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBodySelection = (bodyId: string, checked: boolean) => {
    if (checked) {
      setSelectedBodies(prev => [...prev, bodyId]);
    } else {
      setSelectedBodies(prev => prev.filter(id => id !== bodyId));
      setMembershipNumbers(prev => ({ ...prev, [bodyId]: '' }));
      setRenewalDates(prev => ({ ...prev, [bodyId]: '' }));
    }
  };

  const handleMembershipNumberChange = (bodyId: string, value: string) => {
    setMembershipNumbers(prev => ({ ...prev, [bodyId]: value }));
  };

  const handleRenewalDateChange = (bodyId: string, value: string) => {
    setRenewalDates(prev => ({ ...prev, [bodyId]: value }));
  };

  const handleComplete = async () => {
    if (selectedBodies.length === 0) {
      toast({
        title: "No professional bodies selected",
        description: "Please select at least one professional body.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const memberships: UserProfessionalMembership[] = [];

      for (const bodyId of selectedBodies) {
        const renewalDate = renewalDates[bodyId] ? new Date(renewalDates[bodyId]) : null;
        const registrationDate = new Date();
        registrationDate.setFullYear(registrationDate.getFullYear() - 1); // Default to 1 year ago

        const membership = await professionalBodyService.addUserMembership({
          user_id: user.id,
          professional_body_id: bodyId,
          membership_number: membershipNumbers[bodyId] || undefined,
          registration_date: registrationDate.toISOString().split('T')[0],
          renewal_date: renewalDate ? renewalDate.toISOString().split('T')[0] : undefined,
          is_active: true
        });

        memberships.push(membership);
      }

      toast({
        title: "Professional bodies added",
        description: `Successfully added ${memberships.length} professional body membership(s).`,
      });

      onComplete(memberships);
    } catch (error) {
      console.error('Error saving memberships:', error);
      toast({
        title: "Error saving memberships",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Professional Bodies</h2>
        <p className="text-muted-foreground">
          Choose the professional bodies you're registered with to track their specific CPD requirements.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {professionalBodies.map((body) => (
          <Card 
            key={body.id} 
            className={`relative transition-all ${
              selectedBodies.includes(body.id) 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={body.id}
                    checked={selectedBodies.includes(body.id)}
                    onCheckedChange={(checked) => handleBodySelection(body.id, checked as boolean)}
                  />
                  <div>
                    <CardTitle className="text-lg">{body.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {body.description}
                    </CardDescription>
                  </div>
                </div>
                {body.website_url && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={body.website_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Annual CPD: {body.annual_cpd_hours} hours</span>
                </div>
                <Badge variant="secondary">
                  {body.assessment_cycle}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Categories ({body.categories.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {body.categories.slice(0, 3).map((category) => (
                    <Badge key={category.id} variant="outline" className="text-xs">
                      {category.name} ({category.min_hours}h)
                    </Badge>
                  ))}
                  {body.categories.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{body.categories.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {selectedBodies.includes(body.id) && (
                <div className="space-y-3 pt-3 border-t">
                  <div className="space-y-2">
                    <Label htmlFor={`membership-${body.id}`} className="text-sm">
                      Membership Number (Optional)
                    </Label>
                    <Input
                      id={`membership-${body.id}`}
                      placeholder="Enter your membership number"
                      value={membershipNumbers[body.id] || ''}
                      onChange={(e) => handleMembershipNumberChange(body.id, e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`renewal-${body.id}`} className="text-sm">
                      Next Renewal Date (Optional)
                    </Label>
                    <Input
                      id={`renewal-${body.id}`}
                      type="date"
                      value={renewalDates[body.id] || ''}
                      onChange={(e) => handleRenewalDateChange(body.id, e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedBodies.length > 0 && (
        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleComplete} 
            disabled={saving}
            size="lg"
            className="min-w-[200px]"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Setting up...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Setup ({selectedBodies.length} selected)
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfessionalBodySelector;