/**
 * InspectorProfileList
 *
 * Left column profile selector showing all inspector profiles.
 * Allows selecting, setting default, and creating new profiles.
 */

import React from 'react';
import { User, Star, Plus, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { InspectorProfile } from '@/hooks/useInspectorProfiles';

interface InspectorProfileListProps {
  profiles: InspectorProfile[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onSetDefault: (id: string) => void;
  onCreate: () => void;
  isLoading?: boolean;
  className?: string;
}

export const InspectorProfileList: React.FC<InspectorProfileListProps> = ({
  profiles,
  selectedId,
  onSelect,
  onSetDefault,
  onCreate,
  isLoading = false,
  className,
}) => {
  return (
    <Card className={cn('bg-card border-border', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          Inspector Profiles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-16 rounded-lg bg-muted/50 animate-pulse"
              />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No profiles yet</p>
            <p className="text-xs mt-1">Create one to auto-fill certificates</p>
          </div>
        ) : (
          profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isSelected={profile.id === selectedId}
              onSelect={() => onSelect(profile.id)}
              onSetDefault={() => onSetDefault(profile.id)}
            />
          ))
        )}

        <Button
          variant="outline"
          className="w-full h-12 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
          onClick={onCreate}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </CardContent>
    </Card>
  );
};

interface ProfileCardProps {
  profile: InspectorProfile;
  isSelected: boolean;
  onSelect: () => void;
  onSetDefault: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  isSelected,
  onSelect,
  onSetDefault,
}) => {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full p-3 rounded-lg border text-left transition-all',
        'hover:bg-muted/50',
        isSelected
          ? 'border-primary bg-primary/10'
          : 'border-border bg-card hover:border-primary/30'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm truncate">{profile.name}</span>
            {profile.isDefault && (
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 shrink-0" />
            )}
          </div>
          {profile.companyName && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{profile.companyName}</span>
            </div>
          )}
        </div>

        {!profile.isDefault && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetDefault();
            }}
            className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-amber-400 transition-colors"
            title="Set as default"
          >
            <Star className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </button>
  );
};

export default InspectorProfileList;
