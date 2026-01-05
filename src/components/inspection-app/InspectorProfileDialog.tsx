
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Star, Trash2, Settings } from 'lucide-react';
import { InspectorProfile, useInspectorProfiles } from '@/hooks/useInspectorProfiles';

interface InspectorProfileDialogProps {
  onProfileSelected?: (profile: InspectorProfile) => void;
}

const qualificationOptions = [
  'C&G 2391-50 (Inspection & Testing)',
  'C&G 2391-52 (Inspection & Testing)', 
  '18th Edition BS7671',
  'C&G 2394/2395 (Design & Verification)',
  'AM2 (Achievement Measurement)',
  'EAL Level 3 Inspection & Testing',
  'EAL Level 4 Inspection & Testing'
];

const InspectorProfileDialog = ({ onProfileSelected }: InspectorProfileDialogProps) => {
  const { profiles, addProfile, updateProfile, deleteProfile, setDefaultProfile } = useInspectorProfiles();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('manage');
  const [editingProfile, setEditingProfile] = useState<InspectorProfile | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    qualifications: [] as string[],
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    registrationScheme: 'none',
    registrationNumber: '',
    registrationExpiry: '',
    insuranceProvider: 'none',
    insurancePolicyNumber: '',
    insuranceCoverage: '',
    insuranceExpiry: '',
    signatureData: '',
    isDefault: false,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      qualifications: [],
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      registrationScheme: 'none',
      registrationNumber: '',
      registrationExpiry: '',
      insuranceProvider: 'none',
      insurancePolicyNumber: '',
      insuranceCoverage: '',
      insuranceExpiry: '',
      signatureData: '',
      isDefault: false,
    });
    setEditingProfile(null);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingProfile) {
      updateProfile(editingProfile.id, formData);
    } else {
      addProfile(formData);
    }

    resetForm();
    setActiveTab('manage');
  };

  const handleEdit = (profile: InspectorProfile) => {
    setFormData({
      name: profile.name,
      qualifications: profile.qualifications,
      companyName: profile.companyName,
      companyAddress: profile.companyAddress,
      companyPhone: profile.companyPhone,
      companyEmail: profile.companyEmail,
      registrationScheme: profile.registrationScheme || 'none',
      registrationNumber: profile.registrationNumber || '',
      registrationExpiry: profile.registrationExpiry || '',
      insuranceProvider: profile.insuranceProvider || 'none',
      insurancePolicyNumber: profile.insurancePolicyNumber || '',
      insuranceCoverage: profile.insuranceCoverage || '',
      insuranceExpiry: profile.insuranceExpiry || '',
      signatureData: profile.signatureData || '',
      isDefault: profile.isDefault,
    });
    setEditingProfile(profile);
    setActiveTab('form');
  };

  const toggleQualification = (qual: string) => {
    const current = formData.qualifications;
    const updated = current.includes(qual)
      ? current.filter(q => q !== qual)
      : [...current, qual];
    setFormData({ ...formData, qualifications: updated });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-card border-border text-gray-300 hover:bg-muted hover:text-foreground">
          <Settings className="h-4 w-4" />
          Manage Profiles
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Settings className="h-5 w-5 text-elec-yellow" />
            Inspector Profile Management
          </DialogTitle>
        </DialogHeader>

        <MobileTabs value={activeTab} onValueChange={setActiveTab}>
          <MobileTabsList className="grid w-full grid-cols-2 bg-muted border-border">
            <MobileTabsTrigger value="manage" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">Manage Profiles</MobileTabsTrigger>
            <MobileTabsTrigger value="form" className="text-gray-300 data-[state=active]:bg-elec-yellow data-[state=active]:text-black">
              {editingProfile ? 'Edit Profile' : 'New Profile'}
            </MobileTabsTrigger>
          </MobileTabsList>

          <MobileTabsContent value="manage" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-foreground">Saved Profiles</h3>
              <Button 
                onClick={() => {
                  resetForm();
                  setActiveTab('form');
                }}
                size="sm"
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Profile
              </Button>
            </div>

            <div className="grid gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id} className="bg-muted border-border">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2 text-foreground">
                          {profile.name}
                          {profile.isDefault && (
                            <Star className="h-4 w-4 text-elec-yellow fill-current" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-gray-400 mt-1">
                          {profile.companyName}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            onProfileSelected?.(profile);
                            setOpen(false);
                          }}
                          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
                        >
                          Use Profile
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(profile)}
                          className="border-neutral-500 text-gray-300 hover:bg-neutral-600 hover:text-foreground"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDefaultProfile(profile.id)}
                          disabled={profile.isDefault}
                          className="border-neutral-500 text-gray-300 hover:bg-neutral-600 hover:text-foreground disabled:opacity-50"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProfile(profile.id)}
                          className="bg-red-900 hover:bg-red-800 text-foreground border-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {profile.qualifications.map((qual) => (
                        <Badge key={qual} variant="secondary" className="text-xs bg-elec-yellow/20 text-gray-300 border border-elec-yellow/30">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-gray-400 space-y-1">
                      {profile.companyPhone && <div>Tel: {profile.companyPhone}</div>}
                      {profile.companyEmail && <div>Email: {profile.companyEmail}</div>}
                      {profile.registrationNumber && <div>Reg: {profile.registrationNumber}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {profiles.length === 0 && (
                <div className="text-center py-8 text-gray-400 bg-muted rounded-lg border border-border">
                  No profiles saved yet. Create your first profile to get started.
                </div>
              )}
            </div>
          </MobileTabsContent>

          <MobileTabsContent value="form" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profileName" className="text-gray-300">Inspector Name *</Label>
                <Input
                  id="profileName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name of inspector"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="defaultProfile"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, isDefault: checked as boolean })
                  }
                  className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                />
                <Label htmlFor="defaultProfile" className="text-gray-300">Set as default profile</Label>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Qualifications</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 p-3 border border-border rounded-md bg-muted">
                {qualificationOptions.map((qual) => (
                  <div key={qual} className="flex items-center space-x-2">
                    <Checkbox
                      id={qual}
                      checked={formData.qualifications.includes(qual)}
                      onCheckedChange={() => toggleQualification(qual)}
                      className="border-gray-500 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                    <Label htmlFor={qual} className="text-sm text-gray-300 cursor-pointer">{qual}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company or organisation name"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber" className="text-gray-300">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="Company registration number"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyAddress" className="text-gray-300">Company Address</Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                placeholder="Full company address"
                rows={3}
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyPhone" className="text-gray-300">Phone Number</Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  placeholder="Company phone number"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="companyEmail" className="text-gray-300">Email Address</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  placeholder="Company email address"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Registration Scheme</Label>
              <Input
                value={formData.registrationScheme}
                onChange={(e) => setFormData({ ...formData, registrationScheme: e.target.value })}
                placeholder="e.g., NICEIC, NAPIT, ELECSA"
                className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationNumber" className="text-gray-300">Registration Number</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="Registration number"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="insuranceProvider" className="text-gray-300">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  placeholder="e.g., AXA, Hiscox"
                  className="bg-muted border-border text-foreground placeholder:text-gray-400 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => {
                resetForm();
                setActiveTab('manage');
              }} className="border-border text-gray-300 hover:bg-muted hover:text-foreground">
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!formData.name.trim()}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50"
              >
                {editingProfile ? 'Update Profile' : 'Save Profile'}
              </Button>
            </div>
          </MobileTabsContent>
        </MobileTabs>
      </DialogContent>
    </Dialog>
  );
};

export default InspectorProfileDialog;
