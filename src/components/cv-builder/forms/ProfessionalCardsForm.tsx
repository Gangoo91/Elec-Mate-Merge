
import React, { useState } from "react";
import { CreditCard, Car, Plus, X } from "lucide-react";
import { CVData, ProfessionalCards } from "../types";

interface ProfessionalCardsFormProps {
  cvData: CVData;
  onChange: (data: CVData) => void;
}

const ECS_CARD_TYPES = [
  { value: 'Gold', label: 'Gold Card - Approved Electrician' },
  { value: 'Blue', label: 'Blue Card - Electrician' },
  { value: 'White', label: 'White Card - Provisional' },
  { value: 'Yellow', label: 'Yellow Card - Trainee' },
  { value: 'Green', label: 'Green Card - Apprentice' },
  { value: 'Black', label: 'Black Card - Manager/Senior' },
];

const DRIVING_LICENCE_OPTIONS = [
  'Full UK Licence',
  'Category B (Car)',
  'Category C (HGV)',
  'Category C1 (Medium vehicles)',
  'Category D (Bus)',
  'Forklift',
  'MEWP (Cherry Picker)',
  'IPAF',
];

export const ProfessionalCardsForm: React.FC<ProfessionalCardsFormProps> = ({ cvData, onChange }) => {
  const [newLicence, setNewLicence] = useState('');

  const updateCards = (field: keyof ProfessionalCards, value: string | string[]) => {
    onChange({
      ...cvData,
      professionalCards: {
        ...cvData.professionalCards,
        [field]: value
      }
    });
  };

  const addLicence = (licence: string) => {
    if (licence && !cvData.professionalCards.drivingLicence.includes(licence)) {
      updateCards('drivingLicence', [...cvData.professionalCards.drivingLicence, licence]);
      setNewLicence('');
    }
  };

  const removeLicence = (licence: string) => {
    updateCards(
      'drivingLicence',
      cvData.professionalCards.drivingLicence.filter(l => l !== licence)
    );
  };

  return (
    <div className="space-y-8">
      {/* ECS Card Section */}
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-elec-yellow" />
          ECS Card
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Your Electrotechnical Certification Scheme card shows your competency level.
        </p>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light">
              ECS Card Type
            </label>
            <select
              value={cvData.professionalCards.ecsCardType || ''}
              onChange={(e) => updateCards('ecsCardType', e.target.value as ProfessionalCards['ecsCardType'])}
              className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
            >
              <option value="">Select card type...</option>
              {ECS_CARD_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Card Number
              </label>
              <input
                type="text"
                value={cvData.professionalCards.ecsCardNumber || ''}
                onChange={(e) => updateCards('ecsCardNumber', e.target.value)}
                className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                placeholder="ECS card number"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Expiry Date
              </label>
              <input
                type="date"
                value={cvData.professionalCards.ecsExpiry || ''}
                onChange={(e) => updateCards('ecsExpiry', e.target.value)}
                className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSCS Card Section */}
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-400" />
          CSCS Card (Optional)
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Construction Skills Certification Scheme card for site access.
        </p>

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-elec-light">
              CSCS Card Type
            </label>
            <input
              type="text"
              value={cvData.professionalCards.cscsCardType || ''}
              onChange={(e) => updateCards('cscsCardType', e.target.value)}
              className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
              placeholder="e.g., Blue Skilled Worker"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Card Number
              </label>
              <input
                type="text"
                value={cvData.professionalCards.cscsCardNumber || ''}
                onChange={(e) => updateCards('cscsCardNumber', e.target.value)}
                className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
                placeholder="CSCS card number"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-elec-light">
                Expiry Date
              </label>
              <input
                type="date"
                value={cvData.professionalCards.cscsExpiry || ''}
                onChange={(e) => updateCards('cscsExpiry', e.target.value)}
                className="flex min-h-[48px] w-full rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Driving Licences Section */}
      <div>
        <h3 className="text-lg font-semibold text-elec-light mb-4 flex items-center gap-2">
          <Car className="h-5 w-5 text-green-400" />
          Driving Licences & Tickets
        </h3>
        <p className="text-sm text-elec-light/60 mb-6">
          Add any driving licences or equipment tickets you hold.
        </p>

        {/* Current Licences */}
        {cvData.professionalCards.drivingLicence.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {cvData.professionalCards.drivingLicence.map((licence, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30"
              >
                <span className="text-sm font-medium">{licence}</span>
                <button
                  onClick={() => removeLicence(licence)}
                  className="p-0.5 hover:bg-green-500/30 rounded touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Add Buttons */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-elec-light">
            Quick Add
          </label>
          <div className="flex flex-wrap gap-2">
            {DRIVING_LICENCE_OPTIONS
              .filter(opt => !cvData.professionalCards.drivingLicence.includes(opt))
              .map((option) => (
                <button
                  key={option}
                  onClick={() => addLicence(option)}
                  className="flex items-center gap-1 px-3 py-2 text-sm bg-elec-gray/50 text-elec-light/80 rounded-lg border border-elec-light/20 hover:bg-elec-gray/70 touch-manipulation active:scale-95"
                >
                  <Plus className="h-3 w-3" />
                  {option}
                </button>
              ))}
          </div>
        </div>

        {/* Custom Licence Input */}
        <div className="mt-4 space-y-3">
          <label className="text-sm font-semibold text-elec-light">
            Add Custom Licence/Ticket
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newLicence}
              onChange={(e) => setNewLicence(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addLicence(newLicence)}
              className="flex min-h-[48px] flex-1 rounded-md border border-input bg-card px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-manipulation"
              placeholder="e.g., PASMA, Abrasive Wheels"
            />
            <button
              onClick={() => addLicence(newLicence)}
              disabled={!newLicence}
              className="px-4 min-h-[48px] rounded-lg bg-elec-yellow text-black font-medium touch-manipulation active:scale-95 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
