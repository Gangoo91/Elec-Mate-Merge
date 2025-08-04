import React, { useState } from 'react';
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Clock, PoundSterling, TrendingUp } from "lucide-react";
import { jobTypePresets, getJobPresetsByCategory, getJobPresetOptions, JobPreset } from "./JobTypePresets";

interface JobPresetSelectorProps {
  onPresetSelected: (preset: JobPreset) => void;
}

export function JobPresetSelector({ onPresetSelected }: JobPresetSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPreset, setSelectedPreset] = useState<string>("");

  const categories = getJobPresetsByCategory();
  const categoryOptions = categories.map(cat => ({ value: cat, label: cat }));
  const presetOptions = getJobPresetOptions(selectedCategory);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = jobTypePresets.find(p => p.id === presetId);
    if (preset) {
      onPresetSelected(preset);
    }
  };

  const selectedPresetData = jobTypePresets.find(p => p.id === selectedPreset);

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-elec-yellow" />
          Job Type Presets
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MobileSelectWrapper
          label="Job Category"
          placeholder="Select category"
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          options={categoryOptions}
          hint="Filter presets by work type"
        />

        <MobileSelectWrapper
          label="Job Type"
          placeholder="Select a preset job type"
          value={selectedPreset}
          onValueChange={handlePresetChange}
          options={presetOptions}
          hint="Choose a preset to auto-fill typical values"
        />

        {selectedPresetData && (
          <div className="bg-elec-dark/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">{selectedPresetData.name}</h4>
              <Badge variant="secondary" className="text-xs">
                {selectedPresetData.category}
              </Badge>
            </div>
            <p className="text-sm text-elec-light/70">{selectedPresetData.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                  <Clock className="h-3 w-3" />
                </div>
                <div className="text-white font-medium">{selectedPresetData.defaults.labourHours}h</div>
              </div>
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                  <PoundSterling className="h-3 w-3" />
                </div>
                <div className="text-white font-medium">£{selectedPresetData.defaults.hourlyRate}/h</div>
              </div>
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <div className="text-white font-medium">{selectedPresetData.defaults.overheadPercentage}%</div>
                <div className="text-xs text-elec-light/70">overhead</div>
              </div>
              <div className="text-center py-2">
                <div className="flex items-center justify-center gap-2 text-elec-yellow mb-1">
                  <TrendingUp className="h-3 w-3" />
                </div>
                <div className="text-white font-medium">{selectedPresetData.defaults.desiredProfitMargin}%</div>
                <div className="text-xs text-elec-light/70">profit</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}