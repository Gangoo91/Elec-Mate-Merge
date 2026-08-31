import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { PLUG_IN_SOLAR_FACTS } from '@/lib/plugInSolarAssessment';
import { totalPvModuleDcW, type PlugInSolarData } from '@/types/plug-in-solar';
import {
  DEVICE_TYPE_OPTIONS,
  LOCATION_OPTIONS,
  MOUNTING_ARRANGEMENT_OPTIONS,
  PLUG_FUSE_OPTIONS,
  SOCKET_IP_OPTIONS,
  usePlugInSolarSmartForm,
} from '@/hooks/inspection/usePlugInSolarSmartForm';
import {
  findRegisteredDevice,
  registerPickerOptions,
  REGISTER_SNAPSHOT_DATE,
  REGISTER_URL,
} from '@/data/plugInSolarDeviceRegister';
import {
  cardCn,
  cardFlowCn,
  ReadingCheck,
  ChipGroup,
  Field,
  inputCn,
  Picker,
  SectionHeader,
  SourceNote,
  TriStateChips,
} from './PlugInSolarPrimitives';
import PlugInSolarPhotos from './PlugInSolarPhotos';

/**
 * Tab 2 — Device and siting.
 *
 * The panel-capacity readout is derived from count × Pmax rather than typed,
 * so the 960 W and 2,000 W thresholds can never disagree with the figures above
 * them. Both numbers come from PLUG_IN_SOLAR_FACTS, shared with the SEO pages.
 */

interface Props {
  data: PlugInSolarData;
  onUpdate: <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => void;
  reportId: string | null;
}

const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const MOUNTING_SURFACE_OPTIONS = [
  { value: 'masonry-or-render', label: 'Masonry or render', description: '' },
  { value: 'metal-balcony-railing', label: 'Metal balcony railing', description: '' },
  { value: 'ground-or-freestanding', label: 'Ground or freestanding', description: '' },
  {
    value: 'acm-mcm-cladding',
    label: 'ACM or MCM cladding',
    description: 'Installation not permitted.',
  },
  { value: 'hpl-cladding', label: 'HPL cladding', description: 'Installation not permitted.' },
  { value: 'timber-cladding', label: 'Timber cladding', description: 'Installation not permitted.' },
  { value: 'timber-balcony', label: 'Timber balcony', description: 'Installation not permitted.' },
  { value: 'unknown', label: 'Not established', description: '' },
];

const PROTECTION_CLASS_OPTIONS = [
  { value: 'I', label: 'Class I', description: 'With protective earth.' },
  { value: 'II', label: 'Class II', description: 'Double insulated.' },
  { value: 'III', label: 'Class III', description: 'SELV or PELV only.' },
  { value: 'unknown', label: 'Not established', description: '' },
];

const PlugInSolarDeviceSiting: React.FC<Props> = ({ data, onUpdate, reportId }) => {
  const { plugFuseCheck } = usePlugInSolarSmartForm(data);
  const totalDc = totalPvModuleDcW(data);
  const va = Number(data.inverterApparentPowerVa);
  const vaOver = Number.isFinite(va) && va > PLUG_IN_SOLAR_FACTS.maxApparentPowerVA;
  const dcOver = totalDc !== undefined && totalDc > PLUG_IN_SOLAR_FACTS.maxPvModuleDcW;
  const dcAssessment =
    totalDc !== undefined &&
    !dcOver &&
    totalDc > PLUG_IN_SOLAR_FACTS.professionalAssessmentThresholdW;

  return (
    <div className={cardFlowCn}>
      <section className={cardCn}>
        <SectionHeader title="The device" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Make" htmlFor="pis-make">
            <Input
              id="pis-make"
              value={data.deviceMake}
              onChange={(e) => onUpdate('deviceMake', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Model" htmlFor="pis-model">
            <Input
              id="pis-model"
              value={data.deviceModel}
              onChange={(e) => onUpdate('deviceModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <Field label="Device type">
          <Picker
            value={data.deviceType}
            onChange={(v) => onUpdate('deviceType', v as PlugInSolarData['deviceType'])}
            options={DEVICE_TYPE_OPTIONS}
            title="Device type"
            placeholder="Select type"
          />
          <SourceNote>
            How much of the DC side the customer assembles themselves. A multi-component kit
            leaves them connecting modules, which is where the connector rules bite.
          </SourceNote>
        </Field>

        <Field label="Serial number" htmlFor="pis-serial">
          <Input
            id="pis-serial"
            value={data.deviceSerial}
            onChange={(e) => onUpdate('deviceSerial', e.target.value)}
            className={inputCn}
          />
        </Field>

      </section>

      <section className={cardCn}>
        <SectionHeader title="Compliance evidence" />

        <Field label="Look up the device">
          <Picker
            value={data.registerSystemReference}
            onChange={(v) => {
              const found = findRegisteredDevice(v);
              onUpdate('registerSystemReference', v);
              if (found) {
                onUpdate('deviceMake', found.manufacturer);
                onUpdate('deviceModel', found.model);
                onUpdate('enaRegisterReference', found.systemReference);
                // Records only the register's own word, as at the snapshot date.
                // The electrician still confirms it against the live register.
                onUpdate('onEnaTypeTestRegister', found.status === 'compliant' ? 'yes' : 'no');
              }
            }}
            options={registerPickerOptions()}
            title="ENA Type Test Register"
            placeholder="Search the register snapshot"
          />
          <SourceNote>
            A snapshot of the ENA Type Test Register taken on {REGISTER_SNAPSHOT_DATE}, so you are
            not keying a system reference off a phone screen. The register is live and changes —
            what is shown here is what it published on that date, not our assessment of any
            product. Confirm against{' '}
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-elec-yellow underline"
            >
              the live register
            </a>{' '}
            before relying on it.
          </SourceNote>
        </Field>

        <Field label="Confirmed compliant on the ENA Type Test Register?">
          <TriStateChips
            value={data.onEnaTypeTestRegister}
            onChange={(v) => onUpdate('onEnaTypeTestRegister', v)}
          />
          <SourceNote>
            Registration alone is not enough — only devices assessed and identified as compliant
            count. A device merely submitted for registration does not demonstrate compliance.
          </SourceNote>
        </Field>

        <Field label="Register reference" htmlFor="pis-ena">
          <Input
            id="pis-ena"
            value={data.enaRegisterReference}
            onChange={(e) => onUpdate('enaRegisterReference', e.target.value)}
            className={inputCn}
            placeholder="ENA Direct Connect reference"
          />
        </Field>

        <Field label="Does the product carry its declaration of compliance?">
          <TriStateChips
            value={data.ipsDeclarationPresent}
            onChange={(v) => onUpdate('ipsDeclarationPresent', v)}
          />
        </Field>

      </section>

      <section className={cardCn}>
        <SectionHeader title="Ratings" />

        <Field label="Declared maximum apparent power (VA)" htmlFor="pis-va">
          <Input
            id="pis-va"
            inputMode="numeric"
            value={data.inverterApparentPowerVa}
            onChange={(e) => onUpdate('inverterApparentPowerVa', e.target.value)}
            className={cn(inputCn, vaOver && 'border-red-500/60 focus:border-red-500')}
            placeholder={String(PLUG_IN_SOLAR_FACTS.maxApparentPowerVA)}
          />
          <SourceNote>
            Limit is {PLUG_IN_SOLAR_FACTS.maxApparentPowerVA} VA, with maximum current{' '}
            {PLUG_IN_SOLAR_FACTS.maxCurrentA} A at the point of connection.
          </SourceNote>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Number of PV modules" htmlFor="pis-count">
            <Input
              id="pis-count"
              inputMode="numeric"
              value={data.pvModuleCount}
              onChange={(e) => onUpdate('pvModuleCount', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Pmax per module (W)" htmlFor="pis-pmax">
            <Input
              id="pis-pmax"
              inputMode="numeric"
              value={data.pvModulePmaxW}
              onChange={(e) => onUpdate('pvModulePmaxW', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Most modules in one series string" htmlFor="pis-series">
            <Input
              id="pis-series"
              inputMode="numeric"
              value={data.pvModulesInSeries}
              onChange={(e) => onUpdate('pvModulesInSeries', e.target.value)}
              className={inputCn}
              placeholder={String(PLUG_IN_SOLAR_FACTS.maxModulesInSeries)}
            />
          </Field>
          <Field label="Open circuit voltage at inverter (V DC)" htmlFor="pis-voc">
            <Input
              id="pis-voc"
              inputMode="decimal"
              value={data.arrayVocV}
              onChange={(e) => onUpdate('arrayVocV', e.target.value)}
              className={inputCn}
              placeholder={`≤ ${PLUG_IN_SOLAR_FACTS.maxArrayVocV}`}
            />
          </Field>
        </div>
        <SourceNote>
          Up to {PLUG_IN_SOLAR_FACTS.maxPvModules} modules on one inverter, no more than{' '}
          {PLUG_IN_SOLAR_FACTS.maxModulesInSeries} in series in any string, and open circuit
          voltage at the inverter inputs within {PLUG_IN_SOLAR_FACTS.maxArrayVocV} V DC — the
          limit exists because the risk of sustained DC arcing rises with voltage, and the
          customer makes these connections.
        </SourceNote>

        {totalDc !== undefined && (
          <div
            className={cn(
              'rounded-xl border p-3',
              // Border carries the state; a tinted fill over the warm card
              // background composites to brown. See PlugInSolarVerdict.
              'border-l-4 border-white/[0.1] bg-white/[0.05]',
              dcOver
                ? 'border-l-red-500'
                : dcAssessment
                  ? 'border-l-elec-yellow'
                  : 'border-l-white/25',
            )}
          >
            <p className="text-[13px] font-semibold text-white">
              Total PV module capacity: {totalDc} W DC
            </p>
            <p className="mt-1 text-[12px] leading-snug text-white">
              {dcOver
                ? `Above the ${PLUG_IN_SOLAR_FACTS.maxPvModuleDcW} W limit. This is not plug-in solar and needs a designed installation.`
                : dcAssessment
                  ? `Above ${PLUG_IN_SOLAR_FACTS.professionalAssessmentThresholdW} W, so the manufacturer is required to advise the customer to consider a professional assessment of the installation. This certificate is that assessment.`
                  : `Within the ${PLUG_IN_SOLAR_FACTS.maxPvModuleDcW} W limit.`}
            </p>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Protection class">
            <Picker
              value={data.protectionClass}
              onChange={(v) => onUpdate('protectionClass', v as PlugInSolarData['protectionClass'])}
              options={PROTECTION_CLASS_OPTIONS}
              title="Protection class"
              placeholder="Select"
            />
          </Field>
          <Field label="Plug fuse rating">
            <ChipGroup
              value={data.plugFuseRatingA}
              onChange={(v) => onUpdate('plugFuseRatingA', v)}
              options={PLUG_FUSE_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
            <ReadingCheck {...plugFuseCheck} />
          </Field>
        </div>

        <Field label="Is battery storage present, or intended to be used with it?">
          <ChipGroup
            value={data.hasBatteryStorage ? 'yes' : 'no'}
            onChange={(v) => onUpdate('hasBatteryStorage', v === 'yes')}
            options={YES_NO}
          />
          <SourceNote>
            Battery-integrated products are outside the scope of this route entirely, and the
            instructions must warn against using the device with a battery energy storage system.
          </SourceNote>
        </Field>
      </section>

      <section className={cardCn}>
        <SectionHeader title="Where it would go" />

        <Field label="Mounting surface">
          <Picker
            value={data.mountingSurface}
            onChange={(v) => onUpdate('mountingSurface', v as PlugInSolarData['mountingSurface'])}
            options={MOUNTING_SURFACE_OPTIONS}
            title="Mounting surface"
            placeholder="Select surface"
          />
          <SourceNote>
            Installation is not permitted on ACM or MCM cladding, HPL cladding, timber cladding or
            timber balconies.
          </SourceNote>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Inverter mounted">
            <Picker
              value={data.inverterLocation}
              onChange={(v) => onUpdate('inverterLocation', v as PlugInSolarData['inverterLocation'])}
              options={LOCATION_OPTIONS}
              title="Inverter location"
              placeholder="Select"
            />
          </Field>
          <Field label="Socket-outlet">
            <Picker
              value={data.socketLocation}
              onChange={(v) => onUpdate('socketLocation', v as PlugInSolarData['socketLocation'])}
              options={LOCATION_OPTIONS}
              title="Socket-outlet location"
              placeholder="Select"
            />
          </Field>
        </div>

        {data.inverterLocation === 'external' && data.socketLocation === 'external' && (
          <Field label="Socket-outlet IP rating">
            <Picker
              value={data.socketIpRating}
              onChange={(v) => onUpdate('socketIpRating', v)}
              options={SOCKET_IP_OPTIONS}
              title="Socket-outlet IP rating"
              placeholder="Select rating"
            />
            <SourceNote>
              With both the inverter and the socket outside, the socket requires
              {' '}{PLUG_IN_SOLAR_FACTS.minOutdoorSocketIp} or better.
            </SourceNote>
          </Field>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Mounting arrangement">
            <Picker
              value={data.mountingType}
              onChange={(v) => onUpdate('mountingType', v)}
              options={MOUNTING_ARRANGEMENT_OPTIONS}
              title="Mounting arrangement"
              placeholder="Select arrangement"
            />
          </Field>
          <Field label="Height above ground (m)" htmlFor="pis-height">
            <Input
              id="pis-height"
              inputMode="decimal"
              value={data.heightAboveGroundM}
              onChange={(e) => onUpdate('heightAboveGroundM', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

      </section>

      <section className={cardCn}>
        <SectionHeader title="Fire and structure" />
        <SourceNote>
          These are the questions that most often decide a flat or a block, and the ones a
          managing agent will want answered in writing.
        </SourceNote>

        <Field label="Is the building subject to external wall remediation works?">
          <TriStateChips
            value={data.subjectToExternalWallRemediation}
            onChange={(v) => onUpdate('subjectToExternalWallRemediation', v)}
          />
        </Field>

        <Field label="Would it fix to a wall forming a boundary between dwellings?">
          <ChipGroup
            value={data.onPartyBoundaryWall ? 'yes' : 'no'}
            onChange={(v) => onUpdate('onPartyBoundaryWall', v === 'yes')}
            options={YES_NO}
          />
        </Field>

        <Field label="Does the structure have a lightning protection system?">
          <ChipGroup
            value={data.hasLightningProtection ? 'yes' : 'no'}
            onChange={(v) => onUpdate('hasLightningProtection', v === 'yes')}
            options={YES_NO}
          />
        </Field>

        <Field label="Are the fixings reversible and non-permanent?">
          <TriStateChips
            value={data.fixingsReversible}
            onChange={(v) => onUpdate('fixingsReversible', v)}
          />
          <SourceNote>
            Attachment must not compromise the structural integrity, fire performance or
            weatherproofing of the building.
          </SourceNote>
        </Field>
      </section>
    <PlugInSolarPhotos
        reportId={reportId}
        itemId="siting"
        title="Evidence — mounting position"
        blurb="Photograph the proposed mounting surface and its surroundings. The fire restrictions turn on what the wall is actually made of, and that is a judgement worth being able to show."
      />

    </div>
  );
};

export default PlugInSolarDeviceSiting;
