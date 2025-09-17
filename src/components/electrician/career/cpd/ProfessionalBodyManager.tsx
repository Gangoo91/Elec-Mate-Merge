import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { 
  Award, 
  Plus, 
  Edit3, 
  Trash2, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { professionalBodyService, UserProfessionalMembership } from '@/services/professionalBodyService';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProfessionalBodySelector from './ProfessionalBodySelector';

interface ProfessionalBodyManagerProps {
  onClose?: () => void;
}

const ProfessionalBodyManager: React.FC<ProfessionalBodyManagerProps> = ({ onClose }) => {
  const [memberships, setMemberships] = useState<UserProfessionalMembership[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [membershipToDelete, setMembershipToDelete] = useState<UserProfessionalMembership | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadMemberships();
  }, []);

  const loadMemberships = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const userMemberships = await professionalBodyService.getUserMemberships(user.id);
      setMemberships(userMemberships);
    } catch (error) {
      console.error('Error loading memberships:', error);
      toast({
        title: "Error loading memberships",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMembership = (newMemberships: UserProfessionalMembership[]) => {
    setMemberships(newMemberships);
    setShowAddDialog(false);
    toast({
      title: "Professional body added",
      description: "Your new professional body membership has been added successfully."
    });
  };

  const handleDeleteMembership = async () => {
    if (!membershipToDelete) return;

    setDeleting(true);
    try {
      await professionalBodyService.removeUserMembership(membershipToDelete.id);
      setMemberships(prev => prev.filter(m => m.id !== membershipToDelete.id));
      setShowDeleteDialog(false);
      setMembershipToDelete(null);
      
      toast({
        title: "Membership removed",
        description: "Professional body membership has been removed successfully."
      });
    } catch (error) {
      console.error('Error removing membership:', error);
      toast({
        title: "Error removing membership",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isRenewalDue = (renewalDate: string) => {
    const renewal = new Date(renewalDate);
    const today = new Date();
    const daysUntilRenewal = Math.ceil((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilRenewal <= 30;
  };

  const getRenewalStatus = (renewalDate: string) => {
    const renewal = new Date(renewalDate);
    const today = new Date();
    const daysUntilRenewal = Math.ceil((renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilRenewal < 0) {
      return { status: 'overdue', color: 'text-red-600', icon: AlertTriangle };
    } else if (daysUntilRenewal <= 30) {
      return { status: 'due-soon', color: 'text-yellow-600', icon: AlertTriangle };
    } else {
      return { status: 'current', color: 'text-green-600', icon: CheckCircle };
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Professional Body Memberships</h2>
          <p className="text-muted-foreground">
            Manage your professional body memberships and CPD requirements
          </p>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow text-elec-dark hover:bg-amber-400">
              <Plus className="h-4 w-4 mr-2" />
              Add Membership
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Add Professional Body Membership</DialogTitle>
              <DialogDescription>
                Select your professional body and enter your membership details
              </DialogDescription>
            </DialogHeader>
            <ProfessionalBodySelector onComplete={handleAddMembership} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Memberships List */}
      {memberships.length === 0 ? (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-8 text-center space-y-4">
            <Award className="h-12 w-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-white">No Professional Body Memberships</h3>
              <p className="text-muted-foreground">
                Add your professional body memberships to enable CPD tracking and compliance monitoring
              </p>
            </div>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-elec-yellow text-elec-dark hover:bg-amber-400"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Membership
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {memberships.map((membership) => {
            const renewalStatus = membership.renewal_date 
              ? getRenewalStatus(membership.renewal_date)
              : null;
            const StatusIcon = renewalStatus?.icon;

            return (
              <Card key={membership.id} className="border-elec-yellow/20 bg-elec-gray">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Award className="h-6 w-6 text-elec-yellow" />
                      <div>
                        <CardTitle className="text-white">
                          {membership.professional_body?.name}
                        </CardTitle>
                        <CardDescription>
                          {membership.professional_body?.code} • {membership.professional_body?.description}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {membership.is_active ? (
                        <Badge variant="default" className="bg-green-600 text-white">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-red-600 text-white">
                          Inactive
                        </Badge>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setMembershipToDelete(membership);
                          setShowDeleteDialog(true);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Membership Details */}
                    <div>
                      <div className="text-sm font-medium text-white">Membership Number</div>
                      <div className="text-muted-foreground">
                        {membership.membership_number || 'Not provided'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-white">Registration Date</div>
                      <div className="text-muted-foreground">
                        {membership.registration_date ? formatDate(membership.registration_date) : 'Not provided'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-white">Next Renewal</div>
                      <div className={`flex items-center space-x-2 ${renewalStatus?.color || 'text-muted-foreground'}`}>
                        {StatusIcon && <StatusIcon className="h-4 w-4" />}
                        <span>
                          {membership.renewal_date ? formatDate(membership.renewal_date) : 'Not set'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CPD Requirements */}
                  <div className="p-4 bg-elec-dark/50 rounded border border-elec-yellow/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-white">CPD Requirements</div>
                        <div className="text-muted-foreground text-sm">
                          {membership.professional_body?.annual_cpd_hours} hours annually
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(membership.professional_body?.website_url, '_blank')}
                        className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
                      >
                        View Guidelines
                      </Button>
                    </div>
                  </div>

                  {/* Renewal Warning */}
                  {membership.renewal_date && isRenewalDue(membership.renewal_date) && (
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                      <div className="flex items-center space-x-2 text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Renewal due soon: {formatDate(membership.renewal_date)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Remove Professional Body Membership"
        description={`Are you sure you want to remove your ${membershipToDelete?.professional_body?.name} membership? This action cannot be undone and will affect your CPD tracking.`}
        confirmText="Remove Membership"
        cancelText="Cancel"
        onConfirm={handleDeleteMembership}
        variant="destructive"
        loading={deleting}
      />
    </div>
  );
};

export default ProfessionalBodyManager;