import React from 'react';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import { cardCn, SectionHeader, SourceNote } from './PlugInSolarPrimitives';

/**
 * Photographic evidence.
 *
 * On this certificate photographs are not decoration — they are the proof
 * behind the two findings most likely to be challenged. The consumer-unit shot
 * is what supports a Type AC call months later, and the mounting-surface shot is
 * what defends a "that is HPL cladding, so no" decision to a managing agent who
 * would rather hear yes.
 *
 * Photos are stored against the REPORT, not the device (ELE-1606), so they
 * follow the certificate from the phone at the board to the desk afterwards.
 *
 * AI scanning is deliberately off. The scanner is trained to read consumer-unit
 * boards into circuit schedules; pointed at a balcony railing it would invent
 * something. `onScanPhoto` is required by the gallery, so it resolves to null.
 */

interface Props {
  reportId: string | null;
  /** Distinguishes the two evidence sets on the same report. */
  itemId: 'consumer-unit' | 'siting';
  title: string;
  blurb: string;
}

const PlugInSolarPhotos: React.FC<Props> = ({ reportId, itemId, title, blurb }) => {
  const { photos, isUploading, uploadPhoto, deletePhoto } = useInspectionPhotos({
    reportId: reportId ?? '',
    reportType: 'plug-in-solar',
    itemId,
  });

  if (!reportId) {
    return (
      <section className={cardCn}>
        <SectionHeader title={title} />
        <SourceNote>
          Photographs can be added once the certificate has saved. Enter the client and property
          on this step and it will save automatically.
        </SourceNote>
      </section>
    );
  }

  return (
    <section className={cardCn}>
      <SectionHeader title={title} />
      <SourceNote>{blurb}</SourceNote>
      {/* The hook resolves with the stored photo and takes optional fault-code
          arguments the EICR uses; neither applies here, so the result is
          discarded to match the upload component's void contract. */}
      <InspectionPhotoUpload
        onPhotoCapture={async (file) => {
          await uploadPhoto(file);
        }}
        isUploading={isUploading}
      />
      {photos.length > 0 && (
        <InspectionPhotoGallery
          photos={photos}
          onDeletePhoto={deletePhoto}
          onScanPhoto={async () => null}
          isScanning={null}
        />
      )}
    </section>
  );
};

export default PlugInSolarPhotos;
