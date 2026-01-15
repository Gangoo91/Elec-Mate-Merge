/**
 * InspectorProfileDetails
 *
 * Right column form for viewing/editing inspector profile details.
 * Shows data source badge and allows editing.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Save, X, Pencil, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { InspectorProfile } from '@/hooks/useInspectorProfiles';
import { DataSource, getSourceDisplayInfo } from '@/services/profileDataService';

interface InspectorProfileDetailsProps {
  profile: InspectorProfile | null;
  dataSource?: DataSource;
  isVerified?: boolean;
  onUpdate: (id: string, updates: Partial<InspectorProfile>) => Promise<void>;
  className?: string;
}

export const InspectorProfileDetails: React.FC<InspectorProfileDetailsProps> = ({
  profile,
  dataSource,
  isVerified = false,
  onUpdate,
  className,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<InspectorProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Reset form when profile changes (personal details only - company details are in Settings)
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        registrationScheme: profile.registrationScheme,
        registrationNumber: profile.registrationNumber,
        registrationExpiry: profile.registrationExpiry,
      });
    }
    setIsEditing(false);
  }, [profile?.id]);

  const handleChange = (field: keyof InspectorProfile, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    try {
      await onUpdate(profile.id, formData);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name,
        registrationScheme: profile.registrationScheme,
        registrationNumber: profile.registrationNumber,
        registrationExpiry: profile.registrationExpiry,
      });
    }
    setIsEditing(false);
  };

  const sourceInfo = dataSource ? getSourceDisplayInfo(dataSource) : null;

  if (!profile) {
    return (
      <Card className={cn('bg-card border-border', className)}>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>Select a profile to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('bg-card border-border', className)}>
      <CardHeader className="pb-4 border-b border-border">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Profile Details</CardTitle>
          <div className="flex items-center gap-2">
            {sourceInfo && dataSource === 'elec_id' && (
              <Badge className={cn(sourceInfo.bgColor, sourceInfo.color, 'border', sourceInfo.borderColor)}>
                <Shield className="h-3 w-3 mr-1" />
                From Elec-ID
              </Badge>
            )}
            {!isEditing ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="h-8 px-2"
              >
                <Pencil className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  className="h-8 px-2"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="h-8 px-3"
                >
                  <Save className="h-3.5 w-3.5 mr-1" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Personal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Full Name"
              value={formData.name || ''}
              onChange={(v) => handleChange('name', v)}
              disabled={!isEditing}
            />
            <FormField
              label="Registration Number"
              value={formData.registrationNumber || ''}
              onChange={(v) => handleChange('registrationNumber', v)}
              disabled={!isEditing}
            />
            <FormField
              label="Registration Scheme"
              value={formData.registrationScheme || ''}
              onChange={(v) => handleChange('registrationScheme', v)}
              disabled={!isEditing}
            />
            <FormField
              label="Registration Expiry"
              value={formData.registrationExpiry || ''}
              onChange={(v) => handleChange('registrationExpiry', v)}
              disabled={!isEditing}
              type="date"
            />
          </div>
        </div>

        {/* Company Details - Link to Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Company</h3>
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-3">
              Company details are managed centrally and apply to all your certificates, quotes, and invoices.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/settings?tab=company')}
              className="h-9"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Company Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type?: string;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  type = 'text',
  className,
}) => {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          'h-10',
          disabled && 'bg-muted/30 cursor-default'
        )}
      />
    </div>
  );
};

export default InspectorProfileDetails;
