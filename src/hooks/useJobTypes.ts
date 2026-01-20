
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
  {
    job_type: 'Smoke/Heat Alarm Install',
    job_category: 'Installation & Wiring',
    unit: 'each',
    attributes: [
      { key: 'alarm_type', label: 'Alarm type', type: 'select', options: [
        { value: 'smoke', label: 'Smoke detector' },
        { value: 'heat', label: 'Heat detector' },
        { value: 'combined', label: 'Combined smoke/heat' },
        { value: 'co', label: 'Carbon monoxide' }
      ], required: true },
      { key: 'interlinked', label: 'Interlinked?', type: 'select', options: [
        { value: 'yes', label: 'Yes - interlinked' },
        { value: 'no', label: 'No - standalone' }
      ], required: true }
    ]
  },
  {
    job_type: 'Extractor Fan Installation',
    job_category: 'Installation & Wiring',
    unit: 'per job',
    attributes: [
      { key: 'room_type', label: 'Room', type: 'select', options: [
        { value: 'bathroom', label: 'Bathroom' },
        { value: 'kitchen', label: 'Kitchen' },
        { value: 'utility', label: 'Utility room' }
      ], required: true },
      { key: 'fan_type', label: 'Fan type', type: 'select', options: [
        { value: 'axial', label: 'Axial (wall/window)' },
        { value: 'centrifugal', label: 'Centrifugal (inline)' },
        { value: 'ceiling', label: 'Ceiling mounted' }
      ], required: true }
    ]
  },
  {
    job_type: 'Oven/Hob Connection',
    job_category: 'Installation & Wiring',
    unit: 'per job',
    attributes: [
      { key: 'appliance_type', label: 'Appliance type', type: 'select', options: [
        { value: 'electric_oven', label: 'Electric oven' },
        { value: 'induction_hob', label: 'Induction hob' },
        { value: 'ceramic_hob', label: 'Ceramic hob' },
        { value: 'range_cooker', label: 'Range cooker' }
      ], required: true },
      { key: 'existing_circuit', label: 'Existing circuit?', type: 'select', options: [
        { value: 'yes', label: 'Yes - existing circuit' },
        { value: 'no', label: 'No - new circuit needed' }
      ], required: true }
    ]
  },
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
  // Additional Socket Installations
  {
    job_type: 'Single Socket Installation',
    job_category: 'Installation & Wiring',
    unit: 'per socket',
    attributes: [
      { key: 'location', label: 'Location', type: 'select', options: [
        { value: 'spur_off_ring', label: 'Spur off ring (nearby)' },
        { value: 'new_spur', label: 'New spur (extended run)' },
        { value: 'back_to_back', label: 'Back-to-back existing' }
      ], required: true }
    ]
  },
  {
    job_type: 'Double Socket Installation',
    job_category: 'Installation & Wiring',
    unit: 'per socket',
    attributes: [
      { key: 'location', label: 'Location', type: 'select', options: [
        { value: 'spur_off_ring', label: 'Spur off ring (nearby)' },
        { value: 'new_spur', label: 'New spur (extended run)' },
        { value: 'back_to_back', label: 'Back-to-back existing' }
      ], required: true }
    ]
  },
  {
    job_type: 'USB Socket Installation',
    job_category: 'Installation & Wiring',
    unit: 'per socket',
    attributes: [
      { key: 'usb_type', label: 'USB type', type: 'select', options: [
        { value: 'usb_a', label: 'USB-A only' },
        { value: 'usb_c', label: 'USB-C only' },
        { value: 'both', label: 'USB-A + USB-C' }
      ], required: true }
    ]
  },
  // Light Fittings
  {
    job_type: 'Pendant Light Installation',
    job_category: 'Installation & Wiring',
    unit: 'per fitting',
    attributes: [
      { key: 'weight', label: 'Fitting weight', type: 'select', options: [
        { value: 'light', label: 'Light (under 5kg)' },
        { value: 'medium', label: 'Medium (5-15kg)' },
        { value: 'heavy', label: 'Heavy (15kg+, chandelier)' }
      ], required: true }
    ]
  },
  {
    job_type: 'Wall Light Installation',
    job_category: 'Installation & Wiring',
    unit: 'per fitting',
    attributes: [
      { key: 'wiring', label: 'Wiring situation', type: 'select', options: [
        { value: 'existing', label: 'Existing wiring point' },
        { value: 'new_chase', label: 'New (requires chasing)' },
        { value: 'surface', label: 'Surface wiring acceptable' }
      ], required: true }
    ]
  },
  {
    job_type: 'Track Lighting Installation',
    job_category: 'Installation & Wiring',
    unit: 'per track',
    attributes: [
      { key: 'track_length', label: 'Track length', type: 'select', options: [
        { value: '1m', label: '1m track' },
        { value: '2m', label: '2m track' },
        { value: '3m', label: '3m+ track' }
      ], required: true },
      { key: 'spot_count', label: 'Number of spots', type: 'number', min: 2, max: 10, required: true }
    ]
  },
  {
    job_type: 'LED Strip Installation',
    job_category: 'Installation & Wiring',
    unit: 'per metre',
    attributes: [
      { key: 'location', label: 'Location', type: 'select', options: [
        { value: 'under_cabinet', label: 'Under cabinet' },
        { value: 'cove_lighting', label: 'Cove/coffer lighting' },
        { value: 'stair_lighting', label: 'Stair lighting' },
        { value: 'outdoor', label: 'Outdoor (IP rated)' }
      ], required: true }
    ]
  },
  // Heating & Hot Water
  {
    job_type: 'Heated Towel Rail Installation',
    job_category: 'Installation & Wiring',
    unit: 'per job',
    attributes: [
      { key: 'power_type', label: 'Power type', type: 'select', options: [
        { value: 'fused_spur', label: 'Fused spur (hardwired)' },
        { value: 'plug_in', label: 'Plug-in element' },
        { value: 'timer_spur', label: 'With timer switch' }
      ], required: true }
    ]
  },
  {
    job_type: 'Immersion Heater Installation',
    job_category: 'Installation & Wiring',
    unit: 'per job',
    attributes: [
      { key: 'rating', label: 'Immersion rating', type: 'select', options: [
        { value: '3kW', label: '3kW standard' },
        { value: 'dual', label: 'Dual element' }
      ], required: true },
      { key: 'timer', label: 'Timer required?', type: 'select', options: [
        { value: 'yes', label: 'Yes - with timer' },
        { value: 'no', label: 'No - switch only' }
      ], required: true }
    ]
  },
  {
    job_type: 'Storage Heater Installation',
    job_category: 'Installation & Wiring',
    unit: 'per heater',
    attributes: [
      { key: 'output', label: 'Heat output', type: 'select', options: [
        { value: 'small', label: 'Small (1.7kW)' },
        { value: 'medium', label: 'Medium (2.5kW)' },
        { value: 'large', label: 'Large (3.4kW)' }
      ], required: true },
      { key: 'economy_7', label: 'Economy 7 meter?', type: 'select', options: [
        { value: 'yes', label: 'Yes - existing E7' },
        { value: 'no', label: 'No - standard meter' }
      ], required: true }
    ]
  },
  {
    job_type: 'Underfloor Heating Installation',
    job_category: 'Installation & Wiring',
    unit: 'per sqm',
    attributes: [
      { key: 'room_size', label: 'Room size', type: 'number', unit: 'sqm', min: 1, max: 100, required: true },
      { key: 'floor_type', label: 'Floor type', type: 'select', options: [
        { value: 'tile', label: 'Tile/stone floor' },
        { value: 'laminate', label: 'Laminate/wood' },
        { value: 'carpet', label: 'Carpet' }
      ], required: true }
    ]
  },
  {
    job_type: 'Electric Panel Heater Installation',
    job_category: 'Installation & Wiring',
    unit: 'per heater',
    attributes: [
      { key: 'wattage', label: 'Heater wattage', type: 'select', options: [
        { value: '1000W', label: '1000W' },
        { value: '1500W', label: '1500W' },
        { value: '2000W', label: '2000W' }
      ], required: true }
    ]
  },
  // Smart Home
  {
    job_type: 'Smart Doorbell Installation',
    job_category: 'Smart Home',
    unit: 'per job',
    attributes: [
      { key: 'brand', label: 'Doorbell type', type: 'select', options: [
        { value: 'ring', label: 'Ring' },
        { value: 'nest', label: 'Nest/Google' },
        { value: 'eufy', label: 'Eufy' },
        { value: 'other', label: 'Other brand' }
      ], required: true },
      { key: 'transformer', label: 'Transformer required?', type: 'select', options: [
        { value: 'yes', label: 'Yes - new transformer' },
        { value: 'existing', label: 'Existing transformer OK' },
        { value: 'battery', label: 'Battery powered' }
      ], required: true }
    ]
  },
  {
    job_type: 'Wired Doorbell Installation',
    job_category: 'Installation & Wiring',
    unit: 'per job',
    attributes: [
      { key: 'cable_run', label: 'Cable run length', type: 'number', unit: 'metres', min: 1, max: 30, required: true }
    ]
  },
  {
    job_type: 'Smart Thermostat Installation',
    job_category: 'Smart Home',
    unit: 'per job',
    attributes: [
      { key: 'brand', label: 'Thermostat type', type: 'select', options: [
        { value: 'hive', label: 'Hive' },
        { value: 'nest', label: 'Nest' },
        { value: 'tado', label: 'Tado' },
        { value: 'other', label: 'Other' }
      ], required: true }
    ]
  },
  {
    job_type: 'Smart Switch Installation',
    job_category: 'Smart Home',
    unit: 'per switch',
    attributes: [
      { key: 'neutral_required', label: 'Neutral wire present?', type: 'select', options: [
        { value: 'yes', label: 'Yes - neutral available' },
        { value: 'no', label: 'No - needs workaround' }
      ], required: true }
    ]
  },
  {
    job_type: 'Home Automation Hub Setup',
    job_category: 'Smart Home',
    unit: 'per job',
    attributes: [
      { key: 'hub_type', label: 'Hub type', type: 'select', options: [
        { value: 'apple', label: 'Apple HomeKit' },
        { value: 'alexa', label: 'Amazon Alexa' },
        { value: 'google', label: 'Google Home' },
        { value: 'smartthings', label: 'SmartThings' }
      ], required: true },
      { key: 'device_count', label: 'Devices to integrate', type: 'number', min: 1, max: 50, required: true }
    ]
  },

  // Emergency & Call-outs
  { job_type: 'Emergency Call-out (first hour)', job_category: 'Emergency & Call-outs', unit: 'per hour' },
  { job_type: 'Out of Hours Call-out', job_category: 'Emergency & Call-outs', unit: 'per hour' },
  {
    job_type: 'Fault Finding',
    job_category: 'Emergency & Call-outs',
    unit: 'per hour',
    attributes: [
      { key: 'fault_type', label: 'Fault type', type: 'select', options: [
        { value: 'no_power', label: 'No power/lights' },
        { value: 'tripping', label: 'Tripping RCD/MCB' },
        { value: 'flickering', label: 'Flickering lights' },
        { value: 'burning_smell', label: 'Burning smell' },
        { value: 'other', label: 'Other electrical fault' }
      ], required: true }
    ]
  },
  { job_type: 'RCD Tripping Investigation', job_category: 'Emergency & Call-outs', unit: 'per job' },
  { job_type: 'No Power Investigation', job_category: 'Emergency & Call-outs', unit: 'per job' },
  { job_type: 'Flickering Lights Repair', job_category: 'Emergency & Call-outs', unit: 'per job' },
  { job_type: 'Burning Smell Investigation', job_category: 'Emergency & Call-outs', unit: 'per job' },
  { job_type: 'Circuit Repair', job_category: 'Emergency & Call-outs', unit: 'per circuit' },
  
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
  { job_type: 'RCBO Upgrade', job_category: 'Consumer Units & Boards', unit: 'per way' },
  { job_type: 'MCB Replacement', job_category: 'Consumer Units & Boards', unit: 'per MCB' },
  { job_type: 'Surge Protection Device', job_category: 'Consumer Units & Boards', unit: 'per job' },

  // Earthing & Bonding
  {
    job_type: 'Earthing Upgrade',
    job_category: 'Earthing & Bonding',
    unit: 'per job',
    attributes: [
      { key: 'current_system', label: 'Current system', type: 'select', options: [
        { value: 'tncs', label: 'TN-C-S (PME)' },
        { value: 'tns', label: 'TN-S' },
        { value: 'tt', label: 'TT system' }
      ], required: true }
    ]
  },
  { job_type: 'Main Bonding Installation', job_category: 'Earthing & Bonding', unit: 'per service' },
  { job_type: 'Supplementary Bonding (Bathroom)', job_category: 'Earthing & Bonding', unit: 'per job' },
  { job_type: 'Supplementary Bonding (Kitchen)', job_category: 'Earthing & Bonding', unit: 'per job' },
  { job_type: 'Earth Rod Installation', job_category: 'Earthing & Bonding', unit: 'per rod' },
  { job_type: 'Earth Electrode Testing', job_category: 'Earthing & Bonding', unit: 'per test' },

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
