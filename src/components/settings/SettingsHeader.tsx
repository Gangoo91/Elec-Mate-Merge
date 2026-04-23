import React from 'react';
import { PageHero } from '@/components/college/primitives';

/**
 * Thin wrapper around PageHero for the Settings page.
 * Kept as a component so consumers can override title/description
 * without touching the shell.
 */
const SettingsHeader = ({
  title = 'Settings',
  description,
  actions,
}: {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}) => {
  return <PageHero eyebrow="Account" title={title} description={description} actions={actions} />;
};

export default SettingsHeader;
