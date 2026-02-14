import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  AlertTriangle,
  Zap,
  PoundSterling,
  Phone,
  Clock,
  ShieldCheck,
  FileText,
  CheckCircle2,
  Wrench,
  Brain,
  Receipt,
  Flame,
} from 'lucide-react';

export default function EmergencyElectricalRepairsPage() {
  return (
    <GuideTemplate
      title="Emergency Electrical Repairs | What Counts & Cost UK"
      description="What qualifies as an emergency electrical repair in the UK, typical call-out charges, common electrical emergencies, temporary vs permanent fixes, when to call an electrician vs the DNO, and how to stay safe while waiting for help."
      datePublished="2026-01-25"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Guides', href: '/guides' },
        { label: 'Emergency Repairs', href: '/guides/emergency-electrical-repairs' },
      ]}
      tocItems={[
        { id: 'what-qualifies', label: 'What Qualifies as an Emergency?' },
        { id: 'common-emergencies', label: 'Common Electrical Emergencies' },
        { id: 'call-out-charges', label: 'Call-Out Charges UK' },
        { id: 'temporary-vs-permanent', label: 'Temporary vs Permanent Fix' },
        { id: 'electrician-vs-dno', label: 'Electrician vs DNO' },
        { id: 'staying-safe', label: 'Staying Safe While Waiting' },
        { id: 'offering-emergency-services', label: 'Offering Emergency Services' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Essential Guide"
      badgeIcon={AlertTriangle}
      heroTitle={
        <>
          Emergency Electrical Repairs:{' '}
          <span className="text-yellow-400">What Counts and What It Costs</span>
        </>
      }
      heroSubtitle="Not every electrical problem is an emergency, but the ones that are need immediate attention. This guide explains what qualifies as an electrical emergency in the UK, typical call-out charges for emergency electricians, the most common emergencies and how they are resolved, and the difference between a temporary make-safe and a permanent repair."
      readingTime={10}
      keyTakeaways={[
        'A genuine electrical emergency involves immediate risk to life, risk of fire, or total loss of supply to a property. Nuisance tripping, flickering lights, and faulty sockets are urgent but not emergencies.',
        'Emergency electrician call-out charges in the UK range from £100 to £250 for the first hour, with additional time charged at £60 to £90 per hour. Evening, weekend, and bank holiday rates are typically 50-100% higher.',
        'Always call the DNO (105) for supply-side faults (meter, service head, mains cable) rather than an electrician, as the DNO handles these free of charge.',
        'A temporary make-safe (isolating a faulty circuit and restoring power to the rest of the property) is often the correct first response, with a permanent repair scheduled for normal working hours.',
        'Elec-Mate helps electricians who offer emergency call-out services to price emergency work accurately, generate certificates for the repair, and invoice the customer on the spot.',
      ]}
      sections={[
        {
          id: 'what-qualifies',
          heading: 'What Qualifies as an Electrical Emergency?',
          content: (
            <>
              <p>
                An electrical emergency is a situation where there is an immediate risk to life, a
                risk of fire, or a complete loss of electrical supply to a property. Not every
                electrical problem is an emergency, and understanding the difference saves customers
                money and prevents electricians being called out unnecessarily at premium rates.
              </p>
              <div className="space-y-4 mt-6">
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <h3 className="font-bold text-white text-lg">Genuine Emergencies</h3>
                  </div>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>Burning smell from sockets, switches, or the consumer unit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>Visible sparking, arcing, or smoke from any electrical equipment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>
                        Electric shock received from touching any part of the installation
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>Exposed live conductors that cannot be made safe by the occupant</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>
                        Complete loss of supply where the DNO has confirmed the fault is internal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>Water ingress into electrical equipment or distribution boards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span>Fallen power line or damaged overhead service cable</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Urgent but Not Emergency</h3>
                  </div>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>
                        RCD tripping intermittently (can often be managed by isolating the circuit)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>
                        Single circuit not working (lights or sockets on one circuit only)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>
                        Flickering lights (annoying but rarely dangerous in the short term)
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Broken socket or switch (can wait if the circuit is isolated)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-6">
                If there is any doubt about whether a situation is an emergency, the safest course
                of action is to turn off the main switch at the consumer unit and call an
                electrician. It is always better to be cautious with electrical faults.
              </p>
            </>
          ),
        },
        {
          id: 'common-emergencies',
          heading: 'Common Electrical Emergencies',
          content: (
            <>
              <p>
                The majority of emergency call-outs fall into a small number of categories. For
                electricians, knowing the common scenarios helps you prepare your van with the right
                materials and diagnose the fault more quickly on arrival.
              </p>
              <div className="space-y-4 mt-6">
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Total Loss of Power</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    First check whether the fault is supply-side (DNO) or customer-side. If
                    neighbours also have no power, it is a supply fault and the DNO should be called
                    on 105. If only the property is affected, check the consumer unit. A tripped
                    main switch, failed main RCD, or blown service fuse are common causes. Loose
                    connections at the meter tails or a failed isolator switch can also cause total
                    loss.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">
                      Burning Smell from Consumer Unit
                    </h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    This is always serious and usually caused by a loose connection that has been
                    arcing under load. The heat generated can melt plastic, char the busbar, and in
                    the worst case start a fire. The customer should turn off the main switch
                    immediately. The repair typically involves replacing the affected MCB/RCBO,
                    remaking the connection, and potentially replacing the entire{' '}
                    <SEOInternalLink href="/guides/consumer-unit-change">
                      consumer unit
                    </SEOInternalLink>{' '}
                    if there is significant damage.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">RCD Keeps Tripping</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    While intermittent{' '}
                    <SEOInternalLink href="/guides/rcd-keeps-tripping">
                      RCD tripping
                    </SEOInternalLink>{' '}
                    is usually urgent rather than emergency, persistent tripping that prevents any
                    circuits from being used becomes an emergency, particularly for vulnerable
                    occupants who need power for medical equipment, heating, or lighting. The fault
                    is usually an insulation breakdown on one circuit, which can be isolated to
                    restore power to the remaining circuits.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white text-lg">Water and Electricity</h3>
                  </div>
                  <p className="text-white text-sm leading-relaxed">
                    Leaks, floods, and burst pipes that affect electrical equipment are dangerous.
                    Water in a consumer unit, water dripping onto sockets, or flooded rooms with
                    floor-level sockets all require immediate isolation. The customer should not
                    touch the consumer unit if it is wet. In this scenario, the DNO can remotely
                    disconnect or the electrician can isolate upstream of the affected area.
                  </p>
                </div>
              </div>
            </>
          ),
        },
        {
          id: 'call-out-charges',
          heading: 'Emergency Electrician Call-Out Charges UK',
          content: (
            <>
              <p>
                Emergency call-out charges vary by region, time of day, and the individual
                electrician. However, there are common charging structures that customers should
                expect and electricians should consider when setting their prices.
              </p>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 pr-4 text-white font-bold">Charge Type</th>
                      <th className="py-3 pr-4 text-white font-bold">Typical Range</th>
                      <th className="py-3 text-white font-bold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Call-out fee (daytime, weekday)</td>
                      <td className="py-3 pr-4">£80-£150</td>
                      <td className="py-3">Covers travel and first 30-60 minutes on site</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Call-out fee (evening/weekend)</td>
                      <td className="py-3 pr-4">£120-£250</td>
                      <td className="py-3">50-100% premium over daytime rates</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Additional hourly rate</td>
                      <td className="py-3 pr-4">£60-£90/hr</td>
                      <td className="py-3">After the first hour included in call-out fee</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Bank holiday call-out</td>
                      <td className="py-3 pr-4">£150-£300</td>
                      <td className="py-3">Double time or more is standard</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Make-safe only (no permanent repair)</td>
                      <td className="py-3 pr-4">£100-£200</td>
                      <td className="py-3">Isolate, make safe, advise on permanent fix</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-3 pr-4">Consumer unit replacement (emergency)</td>
                      <td className="py-3 pr-4">£600-£1,500</td>
                      <td className="py-3">Premium over standard CU change due to urgency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                These prices are typical for England and Wales in 2026. London and the South East
                are at the higher end; the Midlands and North are typically lower. Scotland and
                Northern Ireland may differ. Always agree the call-out charge with the customer
                before attending to avoid disputes.
              </p>
              <SEOAppBridge
                title="Price emergency work accurately on the spot"
                description="Elec-Mate's AI Cost Engineer generates accurate pricing for any electrical job in seconds, including emergency premiums. Create a professional quote from your van and send it to the customer before you start work."
                icon={PoundSterling}
              />
            </>
          ),
        },
        {
          id: 'temporary-vs-permanent',
          heading: 'Temporary Make-Safe vs Permanent Repair',
          content: (
            <>
              <p>
                In emergency situations, the first priority is always to make the situation safe.
                This does not necessarily mean completing the full repair there and then. A
                temporary make-safe restores safety and, where possible, partial or full power to
                the property, with a permanent repair scheduled for normal working hours.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                  <h3 className="font-bold text-white text-lg mb-3">Temporary Make-Safe</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Isolate the faulty circuit at the consumer unit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Restore power to unaffected circuits</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Disconnect and make safe damaged equipment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Label isolated circuits with clear warnings</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Advise the customer on limitations and next steps</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                  <h3 className="font-bold text-white text-lg mb-3">Permanent Repair</h3>
                  <ul className="space-y-2 text-white text-sm leading-relaxed">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Full diagnosis and fault finding</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Replace damaged components with correct specification parts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Full testing to BS 7671 requirements</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Issue appropriate certificate (EIC or minor works)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                      <span>Building control notification if notifiable work</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-6">
                A make-safe is not a bodge. It is a legitimate and often necessary first response
                that prioritises safety over completeness. The key is clear communication with the
                customer about what has been done, what remains to be done, and when the permanent
                repair will take place. Always document the make-safe in writing.
              </p>
            </>
          ),
        },
        {
          id: 'electrician-vs-dno',
          heading: 'When to Call an Electrician vs the DNO',
          content: (
            <>
              <p>
                One of the most common mistakes during an electrical emergency is calling the wrong
                person. The responsibility for the electrical supply is split between the DNO
                (Distribution Network Operator) and the property owner at the meter.
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-6">
                <h3 className="font-bold text-white text-lg mb-4">Who to Call</h3>
                <ul className="space-y-3 text-white">
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Call 105 (DNO)</strong> — for power cuts
                      affecting multiple properties, damaged overhead lines, problems with the
                      service cable, meter, or service head (cut-out), and supply voltage issues.
                      The DNO attends free of charge for faults on their equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Call an Electrician</strong> — for faults
                      downstream of the meter (consumer unit, circuits, accessories, fixed
                      equipment), tripping RCDs or MCBs, burning smells from internal wiring, faulty
                      sockets or switches, and any work on your own installation.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">Call 999</strong> — if there is a fire,
                      someone has received a serious electric shock and is unconscious or injured,
                      or a power line has come down and is in contact with the ground or a
                      structure. Do not approach fallen power lines under any circumstances.
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                If you are an electrician attending an emergency and discover that the fault is on
                the supply side (upstream of the meter), do not attempt to work on the DNO's
                equipment. Advise the customer to call 105 and make the property safe on the
                customer side if needed. Working on DNO equipment without authorisation is illegal
                and extremely dangerous.
              </p>
            </>
          ),
        },
        {
          id: 'staying-safe',
          heading: 'Staying Safe While Waiting for Help',
          content: (
            <>
              <p>
                If a customer is waiting for an emergency electrician, there are several things they
                can do to stay safe:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <span className="font-semibold text-white">Turn off the main switch</span> — if
                  there is a burning smell, sparking, or any sign of fire, turn off the main switch
                  at the consumer unit. If the consumer unit itself is the source of the problem, do
                  not touch it and call 999.
                </li>
                <li>
                  <span className="font-semibold text-white">Do not touch anything wet</span> — if
                  water has come into contact with electrical equipment, do not attempt to unplug,
                  switch off, or move the equipment. Water conducts electricity and you could
                  receive a fatal shock.
                </li>
                <li>
                  <span className="font-semibold text-white">Keep everyone away</span> — if there
                  are exposed live conductors or damaged equipment, keep all people and animals away
                  from the area. Use physical barriers if possible.
                </li>
                <li>
                  <span className="font-semibold text-white">Do not attempt DIY repairs</span> —
                  electrical work must be carried out by a{' '}
                  <SEOInternalLink href="/guides/how-to-become-electrician">
                    qualified electrician
                  </SEOInternalLink>
                  . DIY electrical repairs during an emergency are extremely dangerous.
                </li>
                <li>
                  <span className="font-semibold text-white">Use torches, not candles</span> — if
                  the power is off, use battery-powered torches or phone torches. Candles introduce
                  a fire risk, particularly if the electrical fault has also caused other damage.
                </li>
              </ul>
            </>
          ),
        },
        {
          id: 'offering-emergency-services',
          heading: 'Offering Emergency Call-Out Services as an Electrician',
          content: (
            <>
              <p>
                Emergency call-out work can be a profitable addition to your business, but it
                requires preparation. You need the right materials in your van, clear pricing
                communicated upfront, and the ability to generate documentation on site.
              </p>
              <p>
                Keep your van stocked with the most common emergency repair materials: a selection
                of MCBs and RCBOs in common ratings, spare consumer unit if you specialise in CU
                changes, cable in common sizes, junction boxes, wiring accessories, cable clips, and
                a good selection of connectors. Time spent driving to the wholesaler during an
                emergency call-out is unprofitable time.
              </p>
              <p>
                Always agree pricing with the customer before you start work. State your call-out
                fee clearly over the phone, and if the job requires parts or additional labour
                beyond the make-safe, provide a quote before proceeding. Customers in an emergency
                are vulnerable and it is both unethical and potentially illegal under consumer
                protection legislation to take advantage of their situation.
              </p>
              <p>
                After completing the work, issue the appropriate certificate. Even a make-safe
                should be documented with a minor works certificate or a written report describing
                what was done, what was isolated, and what remains to be done. This protects both
                you and the customer.
              </p>
              <SEOAppBridge
                title="Invoice and certify emergency work on the spot"
                description="Elec-Mate generates minor works certificates, professional invoices with online payment links, and written reports from your phone. Complete the paperwork before you leave site."
                icon={Receipt}
              />
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'How much does an emergency electrician cost in the UK?',
          answer:
            'Emergency electrician call-out charges in the UK typically range from £80 to £250 for the initial call-out (covering travel and the first 30-60 minutes on site), with additional time charged at £60 to £90 per hour. Evening calls (after 6pm) are usually 50% more than daytime rates, and weekend or bank holiday calls are typically double. These prices are for the call-out and diagnosis only; parts and extensive repairs are charged on top. London and the South East are at the higher end of these ranges, while the Midlands and North tend to be lower. Always ask for the call-out fee upfront before booking, and confirm whether the fee includes any labour time or whether labour is charged separately from the moment the electrician arrives.',
        },
        {
          question: 'Is a tripping RCD an electrical emergency?',
          answer:
            'An RCD that trips occasionally is urgent but not usually an emergency. If you can identify the circuit that is causing the trip and isolate it (switch off that MCB), the RCD should stay on and power will be restored to the remaining circuits. Book an electrician for a normal appointment to diagnose and fix the faulty circuit. However, if the RCD trips immediately on every circuit and you cannot restore power to any part of the property, this becomes an emergency, particularly for vulnerable people who depend on electricity for heating, medical equipment, or mobility. In this case, call an emergency electrician.',
        },
        {
          question: 'What should I do if I smell burning from my fuse board?',
          answer:
            'A burning smell from the consumer unit (fuse board) is always a genuine emergency. Turn off the main switch immediately if you can do so safely. Do not touch the consumer unit if it appears damaged, melted, discoloured, or if you can see sparking or flame. Call an emergency electrician straight away. If there is visible fire or smoke, call 999 first. The most common cause is a loose connection that has been arcing under load, generating extreme heat. This can melt plastic components and damage the busbar. The repair usually involves replacing the affected protective device and remaking the connection, but if the damage is extensive, the entire consumer unit may need replacing.',
        },
        {
          question: 'Can I do emergency electrical repairs myself?',
          answer:
            'No. Electrical work in England and Wales is controlled by Part P of the Building Regulations, and most types of electrical work must be carried out by a competent person (a qualified electrician registered with a competent person scheme such as NICEIC, NAPIT, or ELECSA) or notified to Building Control. Beyond the legal requirements, emergency electrical work is inherently dangerous because you are dealing with a fault condition where normal safety assumptions may not apply. Circuits that should be dead may still be live, insulation may be compromised, and protective devices may not be functioning correctly. The only safe actions for a non-electrician are turning off the main switch and calling for professional help.',
        },
        {
          question: 'Do I need a certificate for emergency electrical repairs?',
          answer:
            'Yes. Any electrical work that involves a permanent repair must be certified in accordance with BS 7671. For most emergency repairs, a minor works certificate is appropriate. If the work involves replacing a consumer unit or installing a new circuit, an Electrical Installation Certificate (EIC) is required, and the work must be notified to Building Control. Even a temporary make-safe should be documented in writing, describing what was done, which circuits were isolated, and what permanent work is needed. This protects both the electrician and the customer. Elec-Mate generates BS 7671 compliant certificates on site, so you can complete the paperwork before you leave.',
        },
        {
          question: 'What is the difference between a make-safe and a repair?',
          answer:
            'A make-safe addresses the immediate danger without necessarily fixing the underlying fault. It typically involves isolating the faulty circuit, disconnecting damaged equipment, and restoring power to the rest of the property through the unaffected circuits. A make-safe is a legitimate first response when the permanent repair requires parts that are not available at that moment, when the full repair would take too long to complete during an emergency call-out (especially at night), or when the customer needs time to arrange the budget for a larger repair. The permanent repair follows later during normal working hours, when the correct parts are available and the work can be done properly, tested fully, and certified.',
        },
        {
          question: 'How can Elec-Mate help electricians with emergency work?',
          answer:
            'Elec-Mate supports emergency call-out work in several practical ways. The AI Cost Engineer generates accurate pricing for any repair in seconds, so you can quote the customer before starting work. The certificate generator creates BS 7671 compliant minor works certificates and EICs on your phone, so you can certify the work before you leave site. The invoice builder creates professional invoices with online payment links, helping you get paid immediately rather than chasing payment days later. All certificates and invoices are stored digitally with full audit trails, which is essential if the work is later subject to an insurance claim or dispute.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/rcd-keeps-tripping',
          title: 'RCD Keeps Tripping',
          description: 'Common causes and step-by-step diagnosis for persistent RCD tripping.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/consumer-unit-change',
          title: 'Consumer Unit Change',
          description: 'Complete guide to consumer unit replacement, regulations, and costs.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/safe-isolation-procedure',
          title: 'Safe Isolation Procedure',
          description: 'GS 38 prove-test-prove method for safe working on electrical circuits.',
          icon: ShieldCheck,
          category: 'Guide',
        },
        {
          href: '/guides/how-to-price-electrical-jobs',
          title: 'How to Price Electrical Jobs',
          description:
            'Pricing methods, hourly rate calculation, and quoting tips for UK electricians.',
          icon: PoundSterling,
          category: 'Guide',
        },
        {
          href: '/guides/circuit-breaker-tripping',
          title: 'Circuit Breaker Tripping',
          description: 'Why MCBs trip and how to diagnose the cause safely.',
          icon: AlertTriangle,
          category: 'Guide',
        },
        {
          href: '/tools/electrician-invoice-app',
          title: 'Electrician Invoice App',
          description: 'Create and send professional invoices with online payment links from site.',
          icon: Receipt,
          category: 'Tool',
        },
      ]}
      ctaHeading="Handle Emergency Work Like a Pro"
      ctaSubheading="Accurate pricing, on-site certificates, instant invoicing, and online payment links. Elec-Mate gives emergency electricians the tools to work professionally under pressure. 7-day free trial."
    />
  );
}
