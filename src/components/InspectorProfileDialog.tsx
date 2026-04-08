import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  MobileTabs,
  MobileTabsList,
  MobileTabsTrigger,
  MobileTabsContent,
} from '@/components/ui/mobile-tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Star, Trash2 } from 'lucide-react';
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
  'EAL Level 4 Inspection & Testing',
];

const InspectorProfileDialog = ({ onProfileSelected }: InspectorProfileDialogProps) => {
  const { profiles, addProfile, updateProfile, deleteProfile, setDefaultProfile } =
    useInspectorProfiles();
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
    const updated = current.includes(qual) ? current.filter((q) => q !== qual) : [...current, qual];
    setFormData({ ...formData, qualifications: updated });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="text-xs font-medium text-white/40 hover:text-white/60 touch-manipulation"
        >
          Manage Profiles
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto bg-background border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="text-sm font-bold text-white">
            Inspector Profiles
          </DialogTitle>
        </DialogHeader>

        <MobileTabs value={activeTab} onValueChange={setActiveTab}>
          <MobileTabsList className="grid w-full grid-cols-2 bg-white/[0.06] border-white/[0.08]">
            <MobileTabsTrigger
              value="manage"
              className="text-white/60 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow data-[state=active]:border-elec-yellow/30"
            >
              Manage Profiles
            </MobileTabsTrigger>
            <MobileTabsTrigger
              value="form"
              className="text-white/60 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow data-[state=active]:border-elec-yellow/30"
            >
              {editingProfile ? 'Edit Profile' : 'New Profile'}
            </MobileTabsTrigger>
          </MobileTabsList>

          <MobileTabsContent value="manage" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Saved Profiles</h3>
              <button
                onClick={() => {
                  resetForm();
                  setActiveTab('form');
                }}
                className="text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
              >
                + New
              </button>
            </div>

            <div className="grid gap-4">
              {profiles.map((profile) => (
                <Card key={profile.id} className="bg-white/[0.06] border-white/[0.08]">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2 text-white">
                          {profile.name}
                          {profile.isDefault && (
                            <Star className="h-4 w-4 text-elec-yellow fill-current" />
                          )}
                        </CardTitle>
                        <p className="text-sm text-white/40 mt-1">{profile.companyName}</p>
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
                          className="border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:text-white"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDefaultProfile(profile.id)}
                          disabled={profile.isDefault}
                          className="border-white/[0.08] text-white/60 hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteProfile(profile.id)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-white border-red-500/30 text-red-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {profile.qualifications.map((qual) => (
                        <Badge
                          key={qual}
                          variant="secondary"
                          className="text-xs bg-elec-yellow/20 text-white/60 border border-elec-yellow/30"
                        >
                          {qual}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-white/40 space-y-1">
                      {profile.companyPhone && <div>Tel: {profile.companyPhone}</div>}
                      {profile.companyEmail && <div>Email: {profile.companyEmail}</div>}
                      {profile.registrationNumber && <div>Reg: {profile.registrationNumber}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {profiles.length === 0 && (
                <div className="text-center py-8 text-white/40 bg-white/[0.06] rounded-lg border border-white/[0.08]">
                  No profiles saved yet. Create your first profile to get started.
                </div>
              )}
            </div>
          </MobileTabsContent>

          <MobileTabsContent value="form" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="profileName" className="text-white/60">
                  Inspector Name *
                </Label>
                <Input
                  id="profileName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name of inspector"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  id="defaultProfile"
                  checked={formData.isDefault}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isDefault: checked as boolean })
                  }
                  className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                />
                <Label htmlFor="defaultProfile" className="text-white/60">
                  Set as default profile
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-white/60">Qualifications</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2 p-3 border border-white/[0.08] rounded-md bg-white/[0.06]">
                {qualificationOptions.map((qual) => (
                  <div key={qual} className="flex items-center space-x-2">
                    <Checkbox
                      id={qual}
                      checked={formData.qualifications.includes(qual)}
                      onCheckedChange={() => toggleQualification(qual)}
                      className="border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
                    />
                    <Label htmlFor={qual} className="text-sm text-white/60 cursor-pointer">
                      {qual}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName" className="text-white/60">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Company or organisation name"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber" className="text-white/60">
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="Company registration number"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="companyAddress" className="text-white/60">
                Company Address
              </Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                placeholder="Full company address"
                rows={3}
                className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyPhone" className="text-white/60">
                  Phone Number
                </Label>
                <Input
                  id="companyPhone"
                  value={formData.companyPhone}
                  onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
                  placeholder="Company phone number"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="companyEmail" className="text-white/60">
                  Email Address
                </Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                  placeholder="Company email address"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div>
              <Label className="text-white/60">Registration Scheme</Label>
              <Input
                value={formData.registrationScheme}
                onChange={(e) => setFormData({ ...formData, registrationScheme: e.target.value })}
                placeholder="e.g., NICEIC, NAPIT, ELECSA"
                className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="registrationNumber" className="text-white/60">
                  Registration Number
                </Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  placeholder="Registration number"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div>
                <Label htmlFor="insuranceProvider" className="text-white/60">
                  Insurance Provider
                </Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  placeholder="e.g., AXA, Hiscox"
                  className="bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  resetForm();
                  setActiveTab('manage');
                }}
                className="border-white/[0.08] text-white/60 hover:bg-white/[0.06] hover:text-white"
              >
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
