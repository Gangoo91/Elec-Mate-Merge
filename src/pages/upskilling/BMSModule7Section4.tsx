/**
 * BMS Module 7 · Section 4 — Controller set-up and software
 *
 * Rebuilt 10 Oct 2026 on the learning primitives. The page teaches what "loading the strategy"
 * actually puts into a controller (and how that differs from firmware and from the live values
 * operators change), the general ways an engineer connects to a controller (a local engineering
 * port, over the controller network, or remotely through a secure route), backups taken before
 * and after every change, keeping one master copy that matches what is in the controllers,
 * handing over software copies, licences and passwords, and where the electrician's job stops:
 * power cycling, battery-backed memory, and never changing software without the controls
 * engineer. The old page ("Software Upload and Controller Setup") presented USB as the common
 * upload method and ignored network loading, and carried unsourced figures (a "6-digit" BACnet
 * device ID, a 24 V DC "±5%" tolerance, a fixed termination value, example IP addressing) and
 * an invented data-centre case study with a "two-week delay". All of that is gone; addressing
 * now lives in 7.3 and comms wiring in Module 5.
 */
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PrevNext } from '@/components/study-centre/course-kit';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Controller set-up and software | BMS Module 7.4 | Elec-Mate';
const DESCRIPTION =
  'What loading a BMS strategy means, how engineers connect to controllers, backups before and after changes, version control, handover of passwords and licences.';

const outcomes = [
  'Explain what "loading the strategy" puts into a BMS controller, and how it differs from firmware and from live operator settings',
  'Describe in general terms the ways an engineer connects to a controller: a local engineering port, the controller network, or a secure remote route',
  'Explain why a backup is taken from the controller before a change and again after it, and why the laptop copy is not automatically the latest',
  'Describe how one master copy, a version name and a change record keep the site copy matching the controllers',
  'List the software items that belong in the handover: backup copies, engineering tools, licences and passwords, with defaults changed',
  'Decide what an electrician should and should not do around controllers, including power cycling, battery-backed memory and software changes',
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A controls engineer says she is "loading the strategy" into a new outstation. What is she putting into it?',
    options: [
      'The manufacturer firmware that lets the controller boot and talk on the network',
      'Site-specific logic and settings for the plant it runs',
      'The head-end graphics and alarm screens that operators use to view the plant',
      'The addresses of every field device, which the controller cannot work without',
    ],
    correctIndex: 1,
    explanation:
      "The strategy is the application software written for this plant on this site: point configuration, control logic, setpoints, schedules, alarms and trend logs. Firmware is the maker's own operating software, which is loaded separately and is the same on every controller of that type. Graphics live on the head end, not in the outstation.",
  },
  {
    id: 2,
    question:
      'The engineer has the original strategy file on her laptop from install. Since then the facilities team have changed several setpoints and the holiday schedule. Before she makes a change, what should she do first?',
    options: [
      'Download the laptop file, because it is the approved design version',
      'Ask the facilities team to write down the settings they changed',
      'Reset the controller to defaults so she starts from a known state',
      'Take a fresh backup from the controller and work from that',
    ],
    correctIndex: 3,
    explanation:
      "Settings changed from the head end live in the controller, not in the file on her laptop. Pulling a backup from the controller captures what is really running. Downloading the old laptop file would quietly overwrite the facilities team's changes; asking them to remember is no substitute for a copy.",
  },
  {
    id: 3,
    question: 'Why is a second backup taken after a strategy change has been loaded and tested?',
    options: [
      'So the master and site copies match what is now running',
      'Because the first backup is wiped automatically when new software is loaded',
      'Because the controller will not restart until a backup has been read from it',
      'So the head end can rebuild its graphics from the newly loaded file',
    ],
    correctIndex: 0,
    explanation:
      'The before-backup is your way back if the change goes wrong. The after-backup is the new record of truth. Without it, the next person to work on the controller finds a site copy that no longer matches the plant and is back to guessing.',
  },
  {
    id: 4,
    question:
      'An electrician is asked to isolate a control panel containing a BMS outstation for a morning. Which step matters most before switching off?',
    options: [
      'Unplugging the comms cable so the network does not raise a lost-device alarm',
      'Removing the memory backup battery so it does not drain while the panel is off',
      'Agreeing it with the controls engineer and site, and knowing how plant restarts',
      'Setting every Hand/Off/Auto switch to Hand so the plant keeps running throughout',
    ],
    correctIndex: 2,
    explanation:
      "Power loss and restart are part of the controller's design, but the people relying on the plant need warning, and someone needs to know how the restart routine will bring plant back. Removing the battery could lose the clock or stored data; running plant in Hand bypasses the controls and is not the electrician's call.",
  },
  {
    id: 5,
    question:
      "After a long power cut, a building's heating comes on at the wrong times every day, although the plant itself runs normally. What is the most likely cause?",
    options: [
      'The strategy has been corrupted and must be reloaded from the laptop',
      'A failed outside air sensor is driving the optimum start routine early',
      'The controller clock is wrong, perhaps from a flat clock battery',
      'The time schedules were deleted when the head-end PC restarted itself',
    ],
    correctIndex: 2,
    explanation:
      'Plant that runs normally but at the wrong times points at time, not logic. Controllers keep their real-time clock running through a power loss with a backup battery or similar store; if that has failed, the clock may come back wrong and every schedule shifts with it. Check the clock and battery before anyone reloads software.',
  },
  {
    id: 6,
    question: 'Which item does NOT belong in the software part of a BMS handover?',
    options: [
      "The maker's default admin password, left as it was for support",
      'Backup copies of the strategy for every controller and the head end',
      'Licence details for the head-end and any engineering software the client needs',
      'A record of the firmware and software versions installed on each controller',
    ],
    correctIndex: 0,
    explanation:
      'Every factory default login must be replaced before the building starts relying on the system; defaults are a well-known way into building control systems. The client should receive backups, licence details and a version record, and named credentials for each user level.',
  },
  {
    id: 7,
    question:
      'Why should field controllers and the head end not be reachable directly from the public internet?',
    options: [
      'Because internet traffic would slow the whole controller network down',
      'Because the strategy cannot be backed up over an internet link',
      'Because BMS protocols will not pass through a broadband router',
      'Because anyone who reaches an exposed controller can change it',
    ],
    correctIndex: 3,
    explanation:
      'Many controller protocols were designed for closed networks and trust whoever talks to them. Exposed to the internet, a controller can be found and altered. Remote access, where it is needed, goes through a secure route such as a VPN or secure remote access gateway that a competent person manages.',
  },
  {
    id: 8,
    question:
      'A tenant complains the office is too cold. The facilities manager asks the electrician on site to "just power the controller off and on again". What is the right response?',
    options: [
      'Do it, because a restart clears most controller faults',
      'Decline, report the symptom and leave it to the controls engineer',
      'Do it, but only after removing the backup battery to force a full reset',
      'Decline, but change the setpoint at the controller display instead',
    ],
    correctIndex: 1,
    explanation:
      'A restart can hide the evidence (alarms, overrides, a stuck output) and on some controllers can lose data or clock settings. Changing setpoints is a software change and belongs to whoever is responsible for the strategy. Report what you saw and leave the diagnosis to the controls engineer.',
  },
  {
    id: 9,
    question:
      'What is the main reason to name strategy files with the controller, a version and a date, and keep a short change record?',
    options: [
      'So anyone can tell which copy is current and what changed',
      'Because the controller refuses files that do not follow a naming rule',
      'So the client can be billed for each change separately',
      'Because the engineering software deletes files older than the current version',
    ],
    correctIndex: 0,
    explanation:
      'The point of version control is certainty: which copy is current, which controller it belongs to, who changed what and why. Controllers do not care what the file is called; people coming back to the site in a year do.',
  },
  {
    id: 10,
    question:
      "When does the electrician's work most directly decide whether loading the strategy goes smoothly?",
    options: [
      'When the engineer is choosing and tuning the control loop settings',
      'When the head-end graphics and floor plans are being drawn up',
      'Before loading: steady power, proved comms and correct addresses',
      'After handover, when the client first changes a schedule from the head end',
    ],
    correctIndex: 2,
    explanation:
      'Loading and testing the strategy assumes the controller is powered, labelled, addressed and talking on a proved network. Those are electrical and installation tasks. Loop settings and graphics are controls work; a client changing a schedule later is operation, not set-up.',
  },
];

const BMSModule7Section4 = () => {
  useSEO(TITLE, DESCRIPTION);
  return (
    <HubPage>
      <HubMasthead
        section="Module 7 · Section 4"
        title="Controller set-up and software"
        backTo="/study-centre/upskilling/bms-module-7"
      />
      <HubBody>
        <p className="max-w-3xl text-[15px] leading-relaxed text-white lg:text-[17px]">
          What actually goes into a BMS controller, how it gets there, and how the site keeps a true
          copy of it, with a clear line on what the electrician touches and what is left to the
          controls engineer.
        </p>

        <TLDR
          points={[
            "Loading the strategy means writing the site-specific logic and settings into a controller. It is separate from firmware, which is the maker's own software, and from live values that operators change later.",
            'Engineers connect through a local engineering port on the controller, over the controller network, or remotely through a secure route. The method depends on the manufacturer; the discipline is the same.',
            "Back up from the controller before any change and again after it. The copy on someone's laptop is not necessarily what is running.",
            'One master copy per controller, named with a version and date, a short change record, and a site copy that matches. Backups, licences and passwords are handed over with defaults changed.',
            'The electrician powers, wires and proves the controller. Power cycling it, touching the memory battery or changing software is agreed with, or left to, the controls engineer.',
          ]}
        />

        <LearningOutcomes outcomes={outcomes} />

        <SectionRule />
        <ContentEyebrow>What goes into a controller</ContentEyebrow>

        <ConceptBlock
          title="Loading the strategy: turning a blank controller into this plant's controller"
          plainEnglish="The controller arrives knowing how to be a controller. Loading the strategy teaches it how to run this particular air handling unit, boiler room or floor of fan coils."
          onSite="When the controls engineer says the outstation is 'loaded', ask whether it has also been 'proved'. Loaded means the software is in; proved means someone has checked it does what the description of operation says."
        >
          <p>
            A new outstation out of the box can boot, show a status light and talk on its network,
            but it does not know what is wired to it or what the plant is meant to do. The{' '}
            <strong>strategy</strong> (also called the application software, the control program or
            the configuration, depending on who you ask) is what fills that gap. It is written by
            the controls engineer from the points schedule and the description of operation you met
            in 7.1, and it is specific to one controller on one site.
          </p>
          <p>A typical strategy carries:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Point configuration</strong>: which terminal is which input or output, the
              sensor type, the scaling, and the point names and addresses from 7.3.
            </li>
            <li>
              <strong>Control logic</strong>: the function blocks, loops and sequences from 7.2,
              such as fan start sequences, valve control loops and duty/standby changeover.
            </li>
            <li>
              <strong>Starting values</strong>: setpoints, limits and timer settings, set to what
              the specification asks for.
            </li>
            <li>
              <strong>Time schedules and calendars</strong>: occupied periods, holidays and
              exceptions.
            </li>
            <li>
              <strong>Alarms and trend logs</strong>: what raises an alarm, at what priority, and
              which values are recorded and how often.
            </li>
          </ul>
          <p>
            Before commissioning starts, the application software should be loaded and proved, with
            backup copies available on site and a proved way of resetting the software. That is the
            order the rest of this module assumes: the strategy is in and working before anyone
            starts witnessing plant.
          </p>
        </ConceptBlock>

        <ConceptBlock
          title="Three layers: firmware, strategy and live values"
          plainEnglish="Firmware is the controller's own operating system. The strategy is the site's program. Live values are the numbers people tweak afterwards. They are stored and changed in different ways."
          onSite="If someone says 'the software was updated', find out which layer. A firmware update, a strategy change and a facilities manager moving a setpoint are three very different events."
        >
          <p>
            It helps to keep three things apart, because they are changed by different people and
            for different reasons.
          </p>
          <p>
            <strong>Firmware</strong> is written by the manufacturer. It is the same on every
            controller of that model and version, and it lets the device run a strategy and talk its
            protocol. It is updated now and again, sometimes to fix faults and sometimes to close
            security holes. A firmware update is a controls engineer's job, done with the
            manufacturer's instructions, because a newer firmware can change how an existing
            strategy behaves.
          </p>
          <p>
            <strong>The strategy</strong> is the site-specific program described above. It changes
            when the design changes: a new pump, a revised sequence, an extra point.
          </p>
          <p>
            <strong>Live values</strong> are the settings that operators are allowed to change from
            the head end or a local display: a setpoint, a schedule time, a holiday date, an alarm
            limit. They are written into the controller's memory while it runs. That is the reason
            the file on the engineer's laptop drifts away from what is in the controller, and it is
            the thread running through the rest of this page.
          </p>
        </ConceptBlock>

        <Pullquote>
          The copy on the laptop is what was loaded. The copy in the controller is what is running.
          After a few months of operation they are rarely the same.
        </Pullquote>

        <InlineCheck
          id="bms-7-4-layers"
          question="The facilities manager changes the occupied start time on a Monday schedule from the head end. Which layer has changed?"
          options={[
            'The firmware, because the controller has been reprogrammed',
            'A live value held in the controller, not the original strategy file',
            "The strategy file on the controls engineer's laptop",
            'Nothing, because schedules are held only on the head end',
          ]}
          correctIndex={1}
          explanation="Operator changes such as schedule times and setpoints are written into the controller while it runs. The firmware is untouched and the engineer's original file still holds the old time. That gap is exactly why a fresh backup is taken from the controller before any further work."
        />

        <SectionRule />
        <ContentEyebrow>Getting software in</ContentEyebrow>

        <ConceptBlock
          title="How engineers connect to a controller"
          plainEnglish="Either plug a laptop into the controller itself, plug into the network the controller sits on, or reach it from somewhere else through a secure connection."
          onSite="You do not need to know any one manufacturer's tool. You do need to know which of these routes the engineer will use, because each one depends on something you installed."
        >
          <p>
            Every manufacturer has its own engineering software and its own preferred way in, so
            there is no single method to learn. In general terms there are three routes:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>A local engineering port.</strong> Most controllers have a service or
              engineering connection on the device: on some it is a USB socket, on others a network
              socket or a serial connection. The engineer plugs a laptop in at the panel and talks
              to that controller, and sometimes to others on the same bus through it.
            </li>
            <li>
              <strong>Over the controller network.</strong> On an IP-based system, or a field bus
              reached through a router or supervisory controller, the engineer can connect at one
              point and load several controllers without opening every panel. The head end may also
              be able to send and retrieve programs. Protocols such as BACnet include services for
              program transfer and for backing up and restoring a device's database, which is what
              makes this possible on open systems.
            </li>
            <li>
              <strong>Remotely.</strong> Once the system is running, changes and backups are often
              done from off site. That must go through a secure route, such as a VPN or a secure
              remote access gateway managed by someone competent, never by leaving controllers or
              the head end open to the public internet.
            </li>
          </ul>
          <p>
            Loading over the network is convenient, but it only works if the network does. A
            controller with the wrong address, a bus with a polarity or termination fault, or an IP
            switch that has not been configured yet will stop a network load where a laptop on the
            local port would not. That is why the order matters: power, wiring and addressing first
            (Sections 5.2, 5.3 and 7.3), then software.
          </p>
          <p>
            <strong>What has to be true before the strategy goes in.</strong> When a strategy is
            loaded and the controller restarts, outputs can change state: a fan can start, a valve
            can drive open. Treat the plant as live from the moment the engineer starts the
            download. Most of the other conditions for a smooth load are electrical, and they are
            the electrician's to deliver:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Steady supply to the controller.</strong> A controller that loses power part
              way through a load can be left with a half-written program. The supply should be the
              designed one, not a temporary lead that might be knocked out.
            </li>
            <li>
              <strong>Field wiring terminated and proved.</strong> Inputs and outputs connected to
              the right terminals, labelled to the points schedule, with no foreign voltages on
              low-voltage inputs.
            </li>
            <li>
              <strong>Comms wiring and addressing proved.</strong> Correct polarity, termination and
              screen treatment on serial buses, and the addresses set as the points schedule says.
            </li>
            <li>
              <strong>Plant in a known, safe state.</strong> Safety interlocks in place and working
              (3.6), Hand/Off/Auto selectors where the controls engineer wants them, and anyone
              working on the plant told that it may start.
            </li>
            <li>
              <strong>Someone at the plant.</strong> While the engineer loads and restarts a
              controller from a laptop, it helps to have a person who can see the plant and say what
              actually moved, and who can stop it locally if something starts that should not.
            </li>
          </ul>
          <p>
            None of this needs you to understand the strategy. It needs you to hand over a
            controller that is powered, wired, labelled and talking, and to say clearly if any of
            that is not yet true.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-4-network-load"
          question="The controls engineer can load the IP controllers on floors 1 and 2 over the network, but the floor 3 controllers on a serial bus will not respond. A laptop on a floor 3 local port works. Where should you look first?"
          options={[
            "The floor 3 controllers' firmware, in case it is an older version",
            "The engineer's laptop network card and its IP settings",
            'The floor 3 strategy file, in case it was saved corrupted',
            'The floor 3 bus wiring, addressing and the router serving it',
          ]}
          correctIndex={3}
          explanation="The controllers accept a load from a laptop on the local port, so the controllers, their firmware and the file are fine, and the laptop works on floors 1 and 2. What fails is the route to floor 3: bus polarity, termination, addresses and the router or supervisory controller joining the bus to the IP network, most of which are installation items."
        />

        <SectionRule />
        <ContentEyebrow>Backups</ContentEyebrow>

        <ConceptBlock
          title="Back up before every change, and again after it"
          plainEnglish="Before you change anything, take a copy of what is there. After you have changed it and tested it, take another copy. The first is your way back; the second is the new record."
          onSite="On a live building, back up every controller and the head-end database before integration or upgrade work starts, and keep before-and-after records of what was changed."
        >
          <p>
            The backup that matters is the one taken <strong>from the controller</strong>, because
            only that captures the live values that operators have changed since the strategy was
            first loaded. A file on a laptop, a USB stick or a shared drive is only as good as the
            last time someone remembered to update it.
          </p>
          <p>
            <strong>Before a change</strong>, the backup gives a known point to return to if the
            change goes wrong or the plant behaves badly afterwards. It also captures settings that
            would otherwise be lost: if the engineer works from an old file and downloads it, every
            setpoint and schedule changed since that file was saved goes back to its old value,
            often without anyone noticing until someone complains.
          </p>
          <p>
            <strong>After a change</strong>, once it has been loaded and tested, a second backup
            becomes the new reference. Without it, the master copy and the controller disagree from
            day one.
          </p>
          <p>
            Backups should also be routine, not only tied to changes. Routine backup of the
            application software is a normal operating procedure for a BMS, and the head-end
            configuration needs its own documented backup. A backup you have never restored is a
            hope rather than a backup: one industry framework asks for backups to be proved by a
            restore test at least once a year on mid-level systems.
          </p>
          <p>
            Where backups are kept matters as much as taking them. A copy that lives only on one
            engineer's laptop leaves with that engineer. The client should hold a copy on site or in
            their own storage, and the controls contractor should hold another. Treat the files as
            sensitive: a strategy backup describes the plant, the network and sometimes the user
            accounts, so it should not sit on an open shared drive or a loose memory stick.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="Downloading the install file over a running system"
          whatHappens="An engineer returns to add a point, opens the strategy file saved at handover, makes the change and downloads it. It works. A week later the client asks why the heating now starts early and the summer holiday dates have vanished: every live value changed since handover has been overwritten with the original settings."
          doInstead="Always retrieve a fresh backup from the controller first, make the change to that copy, load and test it, then take and file a new backup. Compare the before and after copies if the tool allows, so only the intended change has gone in."
        />

        <SectionRule />
        <ContentEyebrow>Version control</ContentEyebrow>

        <ConceptBlock
          title="One master copy, and a site copy that matches the controllers"
          plainEnglish="For each controller there should be one current copy everyone agrees is right, with a name that says what it is and a note of what changed."
          onSite="If you find three strategy files for the same controller on a site PC and nobody knows which is current, say so. The next fault-finding visit depends on it."
        >
          <p>
            Version control sounds like a software term, and it is, but on a BMS it comes down to a
            few habits that anyone can check:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>A clear name</strong> for every file: the controller it belongs to, a version,
              and the date. "AHU2 outstation, version 4, with date" tells the next engineer
              something; "final_final_new" tells them nothing.
            </li>
            <li>
              <strong>A short change record</strong>: who changed what, when, and why. One line per
              change is enough if it is honest.
            </li>
            <li>
              <strong>One master</strong>, held where the client can get to it, with older versions
              kept but clearly marked as superseded.
            </li>
            <li>
              <strong>A site copy that matches.</strong> The copy held on site, the copy held by the
              controls contractor and the program in each controller should be the same version.
              After any change all three are brought back into line.
            </li>
            <li>
              <strong>A matching points schedule.</strong> The points schedule kept true in 7.3 and
              the strategy describe the same controller. If one changes, so does the other.
            </li>
          </ul>
          <p>
            It is also good practice to keep a record of each controller's model, serial number,
            firmware version and software version. That record lets the owner check later whether a
            published security weakness affects their equipment, and it tells a future engineer
            which tool and version they need before they set off for site.
          </p>
          <p>
            <strong>Firmware updates and end of support.</strong> Controllers should be kept on
            firmware that the manufacturer still supports with security updates. A firmware update
            is planned like a strategy change: back up first, check with the manufacturer's
            information that the running strategy will work on the new version, load it, test the
            plant, back up again and update the version record.
          </p>
          <p>
            Equipment eventually stops receiving security fixes. At that point it is approaching the
            end of its supported life. Good practice is to identify such equipment at handover, plan
            when it will be replaced, and consider other protection, such as tighter network
            separation, until then. The version record described above is what makes that possible:
            you cannot plan around equipment nobody has written down.
          </p>
          <p>
            None of this is the electrician's to do, but you will often be the person on site when a
            replacement or extra controller is fitted on an older system. A new unit may arrive with
            newer firmware than its neighbours. Mention the version on the label to the controls
            engineer before it goes on the network.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-4-site-copy"
          question="At a maintenance visit the controls engineer finds the boiler room controller is running version 6 of its strategy, but the site copy in the plant room cabinet is version 4. What is the correct fix?"
          options={[
            'Load version 4 into the controller so it matches the site copy',
            'Leave the copies alone, as only the controller version matters',
            'Back up the controller and bring both copies up to version 6',
            'Delete version 4 from the cabinet so nobody can load it again',
          ]}
          correctIndex={2}
          explanation="The controller is running version 6, so that is what the site and master copies must reflect, with a note of why they differed. Loading version 4 would undo two rounds of changes. Leaving it means the next person works from the wrong copy. Deleting old versions loses history; mark them superseded instead."
        />

        <SectionRule />
        <ContentEyebrow>Handover of software</ContentEyebrow>

        <ConceptBlock
          title="Backups, tools, licences and passwords belong to the client"
          plainEnglish="When the job is finished, the building owner should be able to keep the system running without depending on one person's laptop or memory."
          onSite="If you are asked to collect handover information, the software items are as real as the O&M manuals and the as-fitted drawings. Ask for them by name."
        >
          <p>
            The software side of a BMS handover is easy to forget because there is nothing to pick
            up. The client should receive, as a minimum:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              <strong>Backup copies</strong> of the strategy for every controller and of the head
              end, at the versions actually running.
            </li>
            <li>
              <strong>Tools needed to use them</strong>: any special tools and backup software for
              all parts of the system, or clear details of what is needed and where to obtain it.
            </li>
            <li>
              <strong>Licence details</strong> for the head-end software and any engineering
              software the client is meant to hold, including who the licence is registered to and
              when it needs renewing.
            </li>
            <li>
              <strong>Passwords and user levels</strong>: a password scheme with different levels
              for different classes of user, every user with their own account rather than a shared
              login, and every factory default login replaced before the building starts to rely on
              the system.
            </li>
            <li>
              <strong>A version record</strong>: which software and firmware is in each controller,
              matched to the backups.
            </li>
          </ul>
          <p>
            Passwords handed over should be recorded securely and controlled by the owner, not left
            on a sticky label inside the panel door. Losing control of passwords is a real failure
            mode: a building where the only person who knows the start-up password has left, or has
            changed it on the way out, can find itself unable to use its own control workstation
            after a power cut.
          </p>
        </ConceptBlock>

        <CommonMistake
          title="The password list taped inside the panel door"
          whatHappens="To make handover easy, the installer writes the engineer and administrator passwords on a label inside the outstation panel, or leaves the manufacturer defaults in place so 'anyone can get in'. Anyone with a panel key, or anyone who looks up the default for that make, now has full control of the plant."
          doInstead="Change every default before the system goes into service, give each user their own account at the right level, and hand the credentials to the client in a secure record that the client controls. Tell the client who holds administrator access and how to change it when people leave."
        />

        <Scenario
          title="Nobody can log in after the weekend shutdown"
          situation="A school's electrical contractor changes a distribution board over a half-term weekend. The BMS head end PC and the outstations are switched off and back on. On Monday the site team find the head end asks for a password nobody has. The controls firm that installed the system has since been replaced, and the handover file holds no password record, no backups and no licence details."
          whatToDo="Do not try to reset or reload anything. Report it to the school and to the current controls contractor. The outstations should still be running their strategies, so the plant is likely working on its own; check that the heating and ventilation are actually running. The controls contractor will need to recover access through the manufacturer, which may take time, and should take fresh backups from every controller as soon as they are in."
          whyItMatters="The electrical work did nothing wrong, but it exposed a handover that was never completed. Backups, passwords and licences held by the client are what make a BMS survive a change of contractor. On your own jobs, ask before a planned shutdown whether the client has them."
        />

        <SectionRule />
        <ContentEyebrow>Where the electrician's job stops</ContentEyebrow>

        <ConceptBlock
          title="Power cycling controllers: a planned event, not a fix"
          plainEnglish="Turning a controller off and on again is something it is designed to survive, but it is not a cure, and it should be agreed and watched."
          onSite="After any planned or unplanned loss of supply to a panel, check that the controller has come back healthy, the plant has restarted as it should, and any new alarms are reported."
        >
          <p>
            Controllers are designed to cope with a loss of supply. A BMS specification should say
            what the system does on a total power failure, and commissioning should prove that the
            defined restart routine works when power comes back. Plant may be brought back one item
            at a time rather than all at once, and some outputs may hold off until the controller
            has checked its inputs.
          </p>
          <p>That does not make a restart a harmless reset button. Switching a controller off:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>stops the plant it runs, and anything waiting on it, for as long as it is off;</li>
            <li>
              clears the evidence: active alarms, overrides and the state of outputs at the moment
              of the fault;
            </li>
            <li>
              can, on some controllers, lose data or clock settings if the backup battery or memory
              is not in good order.
            </li>
          </ul>
          <p>
            So when you need to isolate a controller for electrical work, agree it with the controls
            engineer or the site team first, tell the people relying on the plant, and stay to watch
            it come back. When a client asks you to "just reboot it" because the building is too hot
            or cold, report the symptom instead and leave the diagnosis to the controls engineer.
            Section 7.7 covers fault finding properly.
          </p>
          <p>
            <strong>Battery-backed memory and the clock.</strong> A controller keeps its real-time
            clock running while the supply is off, and many models also hold logged data or live
            values in memory that depends on a backup battery or similar store. Checking the standby
            battery, and checking that the outstation restarts by itself after the supply returns,
            are both routine maintenance tasks for outstations.
          </p>
          <p>
            Why it matters to you: if the battery is flat and the controller loses power, it may
            come back with the wrong time, so every schedule and optimum start runs at the wrong
            hour. On some controllers it may also lose trend data or settings held in that memory.
            The strategy itself is usually kept in memory that does not need a battery, but you
            cannot assume that for every make and age of controller. If a controller's clock is
            wrong after a power cut, report it: it may be the first sign of a flat battery.
          </p>
          <p>
            Replacing a memory battery is a manufacturer-specific task. Some models need it done
            with the controller powered so nothing is lost; others give a different method. Leave it
            to the controls engineer, or follow their instructions exactly, and make sure a fresh
            backup exists before anyone starts.
          </p>
        </ConceptBlock>

        <Pullquote>
          Whoever changes the software owns the backup before, the backup after, the change record
          and the site copy. If you cannot do all four, do not do the first.
        </Pullquote>

        <ConceptBlock
          title="What you do, and what you leave to the controls engineer"
          plainEnglish="You make the controller safe, powered, wired and talking. The controls engineer owns what is inside it."
          onSite="If a client or main contractor asks you to change a setpoint, override a point or load a file 'because you are here anyway', the answer is to call the controls engineer. You are protecting yourself and the system."
        >
          <p>A sensible split on most jobs:</p>
          <p>
            <strong>The electrician does:</strong> install, power and label controllers; terminate
            and prove field and comms wiring; set hardware addresses where the controls engineer
            asks; prove supplies before the strategy is loaded; isolate panels safely when it has
            been agreed; check the controller comes back healthy after a loss of supply; report
            faults, wrong clocks, alarms and anything that looks out of place.
          </p>
          <p>
            <strong>The electrician does not:</strong> load, change or delete strategies; update
            firmware; reset a controller to factory defaults or clear its memory; change setpoints,
            schedules or alarm limits except where they are a trained and authorised operator; leave
            points in override; remove memory batteries; or connect a laptop to a controller with
            the manufacturer's tool unless trained on it and asked to by the person responsible for
            the strategy.
          </p>
          <p>
            The reason is not that electricians cannot learn this; many move into controls
            engineering. It is that a strategy change made without the master copy, the change
            record and the follow-up backup breaks everything else on this page. Whoever changes the
            software has to own all of it.
          </p>
        </ConceptBlock>

        <InlineCheck
          id="bms-7-4-boundary"
          question="On a maintenance visit you notice an outstation's memory backup battery is due for replacement. What should you do?"
          options={[
            'Report it, so the controls engineer changes it after a backup',
            'Change it yourself with the panel isolated, so you work dead',
            'Change it with the panel live, as every make needs that method',
            'Leave it alone until the controller raises a low battery alarm',
          ]}
          correctIndex={0}
          explanation="Replacing a memory battery is manufacturer-specific: some models need it done powered so nothing is lost, others use a different method. Leave it to the controls engineer, or follow their instructions exactly, with a fresh backup taken first. Changing it dead can lose the clock or data, assuming every make is the same is the trap, and waiting for an alarm risks a wrong clock after the next power cut."
        />

        <FAQ
          items={[
            {
              question: 'Is a strategy file something I can open and read?',
              answer:
                "Usually only with the manufacturer's engineering software, often licensed. You do not need to. What you can read is the description of operation and the points schedule, which tell you what the strategy is meant to do and which terminal is which.",
            },
            {
              question: 'Will a controller lose its program in a power cut?',
              answer:
                'It should not. Controllers are designed to survive a loss of supply and restart on their own, and the strategy is usually held in memory that does not depend on a battery. What can be lost on some models, if the backup battery or memory store has failed, is the clock or data held in memory. That is why the battery is a maintenance item and why backups exist.',
            },
            {
              question: 'Who owns the strategy software at the end of the job?',
              answer:
                'That depends on the contract, so it should be settled before handover rather than after. Whatever the arrangement, the client needs backups of what is running, licence details, passwords and a version record, so the system can be maintained by someone other than the original installer.',
            },
            {
              question:
                'The client wants remote access so the controls contractor can log in. Can I just put the head end on the office broadband?',
              answer:
                "No. Controllers and the head end should not be exposed directly to the internet. Remote access is set up through a secure route such as a VPN or remote access gateway, agreed with the client's IT team and managed by someone competent. Sections 5.6 and 6.6 cover this in more depth.",
            },
            {
              question:
                'Can I plug my own laptop into the engineering port to see what is going on?',
              answer:
                "Only if you are trained on that manufacturer's tool and the person responsible for the strategy has asked you to. Engineering tools can write to the controller as easily as they read from it, and a careless connection can change settings or stop plant. Reading values from the head end, with your own operator login, is the safer route.",
            },
          ]}
        />

        <KeyTakeaways
          points={[
            "The strategy is the site-specific program: points, logic, setpoints, schedules, alarms and trends. Firmware is the maker's software. Live values are what operators change later.",
            'Engineers load strategies through a local engineering port, over the controller network, or remotely through a secure route. Network loading depends on wiring and addressing you installed.',
            'Back up from the controller before a change and again after it. The laptop copy is not the running copy.',
            'Keep one master copy per controller, named with a version and date, with a change record, and bring the site copy back into line after every change.',
            'Hand over backups, tools, licence details, passwords by user level and a version record, with all default passwords changed.',
            'A power cycle is a planned event: agree it, watch the restart and report what you see. Do not use it as a fix.',
            'Leave memory batteries, firmware and every software change to the controls engineer.',
          ]}
        />

        <Quiz questions={quizQuestions} title="Check yourself" />

        <PrevNext
          noun="section"
          prevHref="/study-centre/upskilling/bms-module-7-section-3"
          prevLabel="Addressing and point mapping"
          nextHref="/study-centre/upskilling/bms-module-7-section-5"
          nextLabel="Commissioning"
        />
      </HubBody>
    </HubPage>
  );
};

export default BMSModule7Section4;
