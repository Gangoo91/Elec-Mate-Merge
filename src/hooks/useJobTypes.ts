
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Define job type configurations with their dynamic attributes
export interface JobAttribute {
  key: string;
  label: string;
  type: 'select' | 'number' | 'text';
  options?: { value: string; label: string }[];
  required?: boolean;
  unit?: string;
  min?: number;
  max?: number;
}

export interface JobTypeConfig {
  job_type: string;
  job_category: string;
  unit: string;
  attributes?: JobAttribute[];
}

const jobTypeConfigs: JobTypeConfig[] = [
  // EV Charging
  { 
    job_type: 'EV Charger Install (7kW)', 
    job_category: 'EV Charging', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 100, required: true },
      { key: 'installation_type', label: 'Installation type', type: 'select', options: [
        { value: 'wall_mounted', label: 'Wall mounted' },
        { value: 'post_mounted', label: 'Post mounted' },
        { value: 'garage_internal', label: 'Garage (internal)' }
      ], required: true }
    ]
  },
  { 
    job_type: 'EV Charger Install (22kW)', 
    job_category: 'EV Charging', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 100, required: true },
      { key: 'three_phase_supply', label: 'Three-phase supply available?', type: 'select', options: [
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No - needs upgrade' }
      ], required: true }
    ]
  },
  { job_type: 'EV Charger Circuit Install', job_category: 'EV Charging', unit: 'per job' },
  
  // Installation & Wiring - Expanded
  { 
    job_type: 'Rewire Full House', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'bedrooms', label: 'Number of bedrooms', type: 'select', options: [
        { value: '1', label: '1 bedroom' },
        { value: '2', label: '2 bedrooms' },
        { value: '3', label: '3 bedrooms' },
        { value: '4', label: '4 bedrooms' },
        { value: '5', label: '5+ bedrooms' }
      ], required: true },
      { key: 'property_type', label: 'Property type', type: 'select', options: [
        { value: 'flat', label: 'Flat/Apartment' },
        { value: 'terraced', label: 'Terraced house' },
        { value: 'semi_detached', label: 'Semi-detached' },
        { value: 'detached', label: 'Detached house' },
        { value: 'bungalow', label: 'Bungalow' }
      ], required: true },
      { key: 'floors', label: 'Number of floors', type: 'select', options: [
        { value: '1', label: '1 floor' },
        { value: '2', label: '2 floors' },
        { value: '3', label: '3+ floors' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Rewire Full Flat', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'bedrooms', label: 'Number of bedrooms', type: 'select', options: [
        { value: '1', label: '1 bedroom' },
        { value: '2', label: '2 bedrooms' },
        { value: '3', label: '3 bedrooms' },
        { value: '4', label: '4+ bedrooms' }
      ], required: true },
      { key: 'floor_level', label: 'Floor level', type: 'select', options: [
        { value: 'ground', label: 'Ground floor' },
        { value: 'first', label: '1st floor' },
        { value: 'second', label: '2nd floor' },
        { value: 'third_plus', label: '3rd floor+' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Kitchen Rewire', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'kitchen_size', label: 'Kitchen size', type: 'select', options: [
        { value: 'small', label: 'Small (galley/compact)' },
        { value: 'medium', label: 'Medium (standard)' },
        { value: 'large', label: 'Large (open plan)' }
      ], required: true },
      { key: 'appliances', label: 'Number of appliances', type: 'number', min: 1, max: 15, required: true }
    ]
  },
  { 
    job_type: 'Bathroom Rewire', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'bathroom_type', label: 'Bathroom type', type: 'select', options: [
        { value: 'ensuite', label: 'En-suite' },
        { value: 'family', label: 'Family bathroom' },
        { value: 'wet_room', label: 'Wet room' }
      ], required: true },
      { key: 'electric_shower', label: 'Electric shower circuit?', type: 'select', options: [
        { value: 'yes', label: 'Yes - included' },
        { value: 'no', label: 'No electric shower' }
      ], required: true }
    ]
  },
  { 
    job_type: 'New Ring Final Circuit', 
    job_category: 'Installation & Wiring', 
    unit: 'per circuit',
    attributes: [
      { key: 'socket_count', label: 'Number of sockets', type: 'number', min: 1, max: 20, required: true },
      { key: 'cable_length', label: 'Approximate cable length', type: 'number', unit: 'metres', min: 10, max: 100, required: true }
    ]
  },
  { 
    job_type: 'New Lighting Circuit', 
    job_category: 'Installation & Wiring', 
    unit: 'per circuit',
    attributes: [
      { key: 'light_points', label: 'Number of light points', type: 'number', min: 1, max: 25, required: true },
      { key: 'switching_type', label: 'Switching type', type: 'select', options: [
        { value: 'standard', label: 'Standard switching' },
        { value: 'two_way', label: 'Two-way switching' },
        { value: 'intermediate', label: 'Intermediate switching' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Partial Rewire', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'circuits_affected', label: 'Number of circuits', type: 'number', min: 1, max: 20, required: true },
      { key: 'rooms_affected', label: 'Rooms affected', type: 'number', min: 1, max: 15, required: true }
    ]
  },
  { 
    job_type: 'Outside Socket Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 50, required: true },
      { key: 'socket_type', label: 'Socket type', type: 'select', options: [
        { value: 'standard', label: 'Standard 13A' },
        { value: 'weatherproof', label: 'Weatherproof IP65' },
        { value: 'rcd_protected', label: 'RCD protected' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Downlight Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per point',
    attributes: [
      { key: 'number_of_lights', label: 'Number of downlights', type: 'number', min: 1, max: 50, required: true },
      { key: 'ceiling_type', label: 'Ceiling type', type: 'select', options: [
        { value: 'plasterboard', label: 'Plasterboard' },
        { value: 'concrete', label: 'Concrete' },
        { value: 'suspended', label: 'Suspended ceiling' }
      ], required: true }
    ]
  },
  { job_type: 'Smoke/Heat Alarm Install', job_category: 'Installation & Wiring', unit: 'each' },
  { job_type: 'Extractor Fan Installation', job_category: 'Installation & Wiring', unit: 'per job' },
  { job_type: 'Oven/Hob Connection', job_category: 'Installation & Wiring', unit: 'per job' },
  { 
    job_type: 'Cooker Circuit Install', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 30, required: true },
      { key: 'appliance_rating', label: 'Appliance rating', type: 'select', options: [
        { value: '32A', label: '32A (up to 7.4kW)' },
        { value: '40A', label: '40A (up to 9.2kW)' },
        { value: '45A', label: '45A (up to 10.4kW)' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Electric Shower Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'shower_rating', label: 'Shower rating', type: 'select', options: [
        { value: '8.5kW', label: '8.5kW' },
        { value: '9.5kW', label: '9.5kW' },
        { value: '10.5kW', label: '10.5kW' }
      ], required: true },
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 25, required: true }
    ]
  },
  { 
    job_type: 'Security Light Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per light',
    attributes: [
      { key: 'light_type', label: 'Light type', type: 'select', options: [
        { value: 'pir_floodlight', label: 'PIR floodlight' },
        { value: 'security_floodlight', label: 'Security floodlight' },
        { value: 'wall_light', label: 'Wall-mounted light' }
      ], required: true },
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 30, required: true }
    ]
  },
  { 
    job_type: 'Floodlight Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per light',
    attributes: [
      { key: 'wattage', label: 'Light wattage', type: 'select', options: [
        { value: '10w', label: '10W LED' },
        { value: '20w', label: '20W LED' },
        { value: '50w', label: '50W LED' },
        { value: '100w', label: '100W LED' }
      ], required: true },
      { key: 'mounting_height', label: 'Mounting height', type: 'select', options: [
        { value: 'low', label: 'Low (2-3m)' },
        { value: 'medium', label: 'Medium (3-5m)' },
        { value: 'high', label: 'High (5m+)' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Data Point (Cat6) Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per point',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 100, required: true },
      { key: 'termination_type', label: 'Termination type', type: 'select', options: [
        { value: 'rj45_socket', label: 'RJ45 wall socket' },
        { value: 'patch_panel', label: 'Patch panel' },
        { value: 'direct_connection', label: 'Direct connection' }
      ], required: true }
    ]
  },
  { 
    job_type: 'TV/Aerial Point Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per point',
    attributes: [
      { key: 'cable_type', label: 'Cable type', type: 'select', options: [
        { value: 'coax_rg6', label: 'Coaxial (RG6)' },
        { value: 'cat6_hdmi', label: 'Cat6 + HDMI' },
        { value: 'satellite', label: 'Satellite cable' }
      ], required: true },
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 50, required: true }
    ]
  },
  { 
    job_type: 'Garden Office Supply', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 5, max: 100, required: true },
      { key: 'supply_type', label: 'Supply type', type: 'select', options: [
        { value: 'swa_overhead', label: 'SWA cable (overhead)' },
        { value: 'swa_underground', label: 'SWA cable (underground)' },
        { value: 'ducted', label: 'Ducted underground' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Garage Supply Installation', 
    job_category: 'Installation & Wiring', 
    unit: 'per job',
    attributes: [
      { key: 'cable_length', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 50, required: true },
      { key: 'supply_rating', label: 'Supply rating', type: 'select', options: [
        { value: '16A', label: '16A (lighting & sockets)' },
        { value: '32A', label: '32A (includes welding outlet)' },
        { value: '63A', label: '63A (workshop supply)' }
      ], required: true }
    ]
  },
  
  // Emergency & Call-outs
  { job_type: 'Emergency Call-out (first hour)', job_category: 'Emergency & Call-outs', unit: 'per hour' },
  { job_type: 'Out of Hours Call-out', job_category: 'Emergency & Call-outs', unit: 'per hour' },
  { job_type: 'Fault Finding', job_category: 'Emergency & Call-outs', unit: 'per hour' },
  
  // Consumer Units & Boards
  { 
    job_type: 'Consumer Unit Replacement', 
    job_category: 'Consumer Units & Boards', 
    unit: 'per job',
    attributes: [
      { key: 'way_count', label: 'Number of ways', type: 'select', options: [
        { value: '6', label: '6-way' },
        { value: '10', label: '10-way' },
        { value: '12', label: '12-way' },
        { value: '16', label: '16-way' },
        { value: '20', label: '20-way' }
      ], required: true },
      { key: 'rcbo_upgrade', label: 'RCBO upgrade?', type: 'select', options: [
        { value: 'yes', label: 'Yes - all RCBO' },
        { value: 'partial', label: 'Partial RCBO' },
        { value: 'no', label: 'Standard RCD + MCB' }
      ], required: true }
    ]
  },
  { job_type: 'Additional Circuit Installation', job_category: 'Consumer Units & Boards', unit: 'per circuit' },
  { job_type: 'RCD Protection Upgrade', job_category: 'Consumer Units & Boards', unit: 'per job' },
  
  // Repairs & Maintenance
  { 
    job_type: 'Socket Replacement', 
    job_category: 'Repairs & Maintenance', 
    unit: 'per socket',
    attributes: [
      { key: 'socket_type', label: 'Socket type', type: 'select', options: [
        { value: 'standard', label: 'Standard 13A' },
        { value: 'usb_socket', label: 'USB charging socket' },
        { value: 'outdoor', label: 'Outdoor socket' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Light Switch Replacement', 
    job_category: 'Repairs & Maintenance', 
    unit: 'per switch',
    attributes: [
      { key: 'switch_type', label: 'Switch type', type: 'select', options: [
        { value: 'single', label: 'Single gang' },
        { value: 'double', label: 'Double gang' },
        { value: 'dimmer', label: 'Dimmer switch' }
      ], required: true }
    ]
  },
  { job_type: 'Circuit Breaker Replacement', job_category: 'Repairs & Maintenance', unit: 'per breaker' },
  { job_type: 'RCD Replacement', job_category: 'Repairs & Maintenance', unit: 'per RCD' },
  { job_type: 'Power Loss Investigation', job_category: 'Repairs & Maintenance', unit: 'per hour' },
  { job_type: 'Appliance Repair', job_category: 'Repairs & Maintenance', unit: 'per hour' },

  // Commercial & Industrial
  { 
    job_type: 'Emergency Lighting Installation', 
    job_category: 'Commercial & Industrial', 
    unit: 'per fitting',
    attributes: [
      { key: 'fitting_type', label: 'Fitting type', type: 'select', options: [
        { value: 'bulkhead', label: 'LED bulkhead' },
        { value: 'exit_sign', label: 'Exit sign' },
        { value: 'downlight', label: 'Emergency downlight' }
      ], required: true }
    ]
  },
  { 
    job_type: 'Fire Alarm Installation', 
    job_category: 'Commercial & Industrial', 
    unit: 'per point',
    attributes: [
      { key: 'detector_type', label: 'Detector type', type: 'select', options: [
        { value: 'smoke', label: 'Smoke detector' },
        { value: 'heat', label: 'Heat detector' },
        { value: 'beam', label: 'Beam detector' }
      ], required: true }
    ]
  },
  { job_type: 'Three-Phase Supply Installation', job_category: 'Commercial & Industrial', unit: 'per job' },
  { job_type: 'Motor Control Installation', job_category: 'Commercial & Industrial', unit: 'per motor' },
  { job_type: 'Distribution Board Installation', job_category: 'Commercial & Industrial', unit: 'per board' },

  // Testing & Certification
  { 
    job_type: 'EICR Testing', 
    job_category: 'Testing & Certification', 
    unit: 'per property',
    attributes: [
      { key: 'circuits', label: 'Number of circuits', type: 'number', min: 1, max: 50, required: true },
      { key: 'property_type', label: 'Property type', type: 'select', options: [
        { value: 'domestic', label: 'Domestic property' },
        { value: 'commercial', label: 'Commercial property' },
        { value: 'industrial', label: 'Industrial property' }
      ], required: true }
    ]
  },
  { 
    job_type: 'PAT Testing', 
    job_category: 'Testing & Certification', 
    unit: 'per appliance',
    attributes: [
      { key: 'appliance_count', label: 'Number of appliances', type: 'number', min: 1, max: 500, required: true }
    ]
  },
  { job_type: 'Electrical Installation Certificate', job_category: 'Testing & Certification', unit: 'per certificate' },
  { job_type: 'Minor Works Certificate', job_category: 'Testing & Certification', unit: 'per certificate' },
  { job_type: 'Landlord Safety Check', job_category: 'Testing & Certification', unit: 'per property' },
];

export const useJobTypes = () => {
  return useQuery({
    queryKey: ['job-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_pricing_baseline')
        .select('job_type, job_category, unit')
        .order('job_category, job_type');

      if (error) throw error;

      // Use our comprehensive job type configurations as the primary source
      const finalData = jobTypeConfigs;

      // Group by category for better UX
      const grouped = finalData.reduce((acc: Record<string, JobTypeConfig[]>, item) => {
        if (!acc[item.job_category]) {
          acc[item.job_category] = [];
        }
        
        // Avoid duplicates (same job_type might have different complexity levels)
        const exists = acc[item.job_category].find(existing => 
          existing.job_type === item.job_type
        );
        
        if (!exists) {
          acc[item.job_category].push(item);
        }
        
        return acc;
      }, {});

      return {
        all: finalData,
        byCategory: grouped,
        types: [...new Set(finalData.map(item => item.job_type))].sort(),
        configs: jobTypeConfigs
      };
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });
};

// Helper function to get job attributes by job type
export const getJobTypeConfig = (jobType: string): JobTypeConfig | undefined => {
  return jobTypeConfigs.find(config => config.job_type === jobType);
};
