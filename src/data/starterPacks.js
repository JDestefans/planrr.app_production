export const STARTER_PACKS = {
  solo_county: {
    id: 'solo_county',
    name: 'County OES — Solo Director',
    description: 'Pre-built program for a 1-person county emergency management office with starter templates, exercise schedule, and training priorities.',
    icon: '🏛',
    plans: [
      {
        id: 'sp_eop_1', name: 'Emergency Operations Plan (EOP)', type: 'EOP', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.5 — Core operational plan required for accreditation.

TEMPLATE OUTLINE:
1. PURPOSE & SCOPE — Define the plan's authority, applicability, and geographic scope
2. SITUATION & ASSUMPTIONS — Hazard summary (reference your THIRA), demographics, critical infrastructure
3. CONCEPT OF OPERATIONS — EOC activation levels (Level 3/2/1), staffing, operational periods
4. ORGANIZATION & ASSIGNMENT OF RESPONSIBILITIES — EM Director, department heads, mutual aid partners
5. DIRECTION, CONTROL & COORDINATION — ICS integration, unified command triggers, multi-agency coordination
6. INFORMATION COLLECTION & DISSEMINATION — Public alert systems, media protocols, internal comms
7. ADMINISTRATION, FINANCE & LOGISTICS — Resource management, cost tracking, procurement authority
8. PLAN DEVELOPMENT & MAINTENANCE — Annual review cycle, after-action integration, stakeholder input process

HAZARD-SPECIFIC ANNEXES (add as separate plans):
- Severe Weather / Flood
- Wildfire / Smoke
- Earthquake
- HazMat / Industrial
- Public Health Emergency

NEXT STEPS: Fill in sections 1-3 first. Reference your THIRA for Section 2. The AI can draft section content — use the Doc Templates feature.`,
      },
      {
        id: 'sp_coop_1', name: 'Continuity of Operations Plan (COOP)', type: 'COOP', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.4 — Required for continuity planning compliance.

TEMPLATE OUTLINE:
1. ESSENTIAL FUNCTIONS — List the 5-8 functions your agency must perform within 12 hours of disruption
   • Emergency notification & warning
   • EOC activation & coordination
   • Damage assessment
   • Resource coordination
   • Public information
2. ORDERS OF SUCCESSION — Who takes over if the EM Director is unavailable (minimum 3 deep)
3. DELEGATION OF AUTHORITY — What decisions each successor can make
4. ALTERNATE FACILITIES — Primary EOC, alternate EOC, mobile command options
5. VITAL RECORDS — What documents/systems must be accessible (plans, contact lists, GIS data, financial records)
6. HUMAN RESOURCES — Staff notification, remote work capabilities, essential vs non-essential personnel
7. RECONSTITUTION — How to return to normal operations
8. TEST, TRAINING & EXERCISES — Annual COOP activation drill

NEXT STEPS: Start with Essential Functions and Orders of Succession — those are the most critical.`,
      },
      {
        id: 'sp_comms_1', name: 'Crisis Communications Plan', type: 'Communications', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.8 — Communications and warning.

TEMPLATE OUTLINE:
1. PUBLIC ALERT SYSTEMS — WEA, EAS, social media, Nixle/Everbridge, sirens
2. MEDIA RELATIONS — PIO designation, press release templates, briefing schedule
3. SOCIAL MEDIA PROTOCOL — Platforms, posting authority, rumor control procedures
4. INTERNAL COMMUNICATIONS — Staff notification system, EOC comms, interoperable radio channels
5. SPECIAL POPULATIONS — Language access plan, ADA compliance, notification for vulnerable populations
6. PRE-SCRIPTED MESSAGES — Templates for common scenarios (evacuation, shelter-in-place, boil water)

NEXT STEPS: Identify your PIO and set up your mass notification system first.`,
      },
      {
        id: 'sp_ipp_1', name: 'Integrated Preparedness Plan (IPP)', type: 'Training', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.11 — Replaces the old MYTEP. Required by HSEEP doctrine.

TEMPLATE OUTLINE:
1. PROGRAM PRIORITIES — Top 3-5 preparedness priorities from your THIRA/SPR
2. YEAR 1 EXERCISE SCHEDULE
   • Q1: Workshop — EOC Activation Procedures
   • Q2: Tabletop — Severe Weather Response
   • Q3: Functional — Communications / Warning
   • Q4: After-Action Review & IPP Update
3. YEAR 2 EXERCISE SCHEDULE
   • Q1: Tabletop — Continuity of Operations
   • Q2: Drill — Mass Notification System Test
   • Q3: Full-Scale or Functional — Multi-Agency Response
   • Q4: After-Action Review & IPP Update
4. YEAR 3 EXERCISE SCHEDULE
   • Progress toward full-scale exercise
   • Incorporate corrective actions from Years 1-2
5. TRAINING REQUIREMENTS — ICS courses, HSEEP, specialized skills aligned to exercise objectives
6. CORE CAPABILITIES ADDRESSED — Map each exercise to FEMA core capabilities

PROGRESSIVE APPROACH (for 1-person shops):
Year 1 = Discussion-based (low resource cost)
Year 2 = Mix of discussion + operations-based
Year 3 = Operations-based including full-scale

NEXT STEPS: Set your Year 1 exercises first. Use the Exercise module to create them.`,
      },
      {
        id: 'sp_recov_1', name: 'Disaster Recovery Plan', type: 'Recovery', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.5.4 — Recovery operations planning.

TEMPLATE OUTLINE:
1. SHORT-TERM RECOVERY (0-30 days) — Damage assessment, debris removal, temporary housing, utility restoration
2. INTERMEDIATE RECOVERY (30-180 days) — Temporary business operations, infrastructure repair, case management
3. LONG-TERM RECOVERY (180+ days) — Permanent rebuilding, community development, mitigation integration
4. RECOVERY ORGANIZATION — Local Disaster Recovery Manager, Recovery Support Functions, voluntary organizations
5. FINANCIAL RECOVERY — PDA process, FEMA PA/IA applications, SBA loans, insurance coordination
6. COMMUNITY ENGAGEMENT — Town halls, recovery newsletter, long-term recovery committee

NEXT STEPS: Focus on Short-Term Recovery first — that's what you'll activate most often.`,
      },
    ],
    exercises: [
      {
        id: 'sp_ex_1', name: 'Tabletop Exercise — Severe Weather', type: 'Tabletop', date: '', status: 'planned',
        objectives: '1. Test severe weather notification procedures\n2. Validate EOC activation criteria\n3. Exercise mutual aid request process',
        scenario: 'A major winter storm is forecast to impact the county with 60+ mph winds, heavy snow, and widespread power outages lasting 3-5 days. Critical infrastructure is at risk.',
        participants: '', aarDraft: '', aarFinal: '', corrective: [], strengths: [], afis: [],
      },
      {
        id: 'sp_ex_2', name: 'Workshop — EOC Procedures Review', type: 'Workshop', date: '', status: 'planned',
        objectives: '1. Review and update EOC activation levels\n2. Confirm staffing assignments and alternates\n3. Test EOC technology and communications systems',
        scenario: '', participants: '', aarDraft: '', aarFinal: '', corrective: [], strengths: [], afis: [],
      },
      {
        id: 'sp_ex_3', name: 'Drill — Mass Notification System Test', type: 'Drill', date: '', status: 'planned',
        objectives: '1. Verify mass notification system reaches all registered recipients\n2. Measure time from alert initiation to delivery\n3. Test bilingual messaging capability',
        scenario: 'Quarterly test of the county mass notification system.', participants: '', aarDraft: '', aarFinal: '', corrective: [], strengths: [], afis: [],
      },
    ],
    training: [
      { id: 'sp_tr_1', person: 'EM Director', type: 'IS-100.c — Introduction to ICS', date: '', status: 'planned', notes: 'NIMS required. Complete within 90 days of appointment.' },
      { id: 'sp_tr_2', person: 'EM Director', type: 'IS-200.c — ICS for Single Resources', date: '', status: 'planned', notes: 'NIMS required.' },
      { id: 'sp_tr_3', person: 'EM Director', type: 'IS-700.b — NIMS Introduction', date: '', status: 'planned', notes: 'NIMS required.' },
      { id: 'sp_tr_4', person: 'EM Director', type: 'IS-800.d — National Response Framework', date: '', status: 'planned', notes: 'NIMS required.' },
      { id: 'sp_tr_5', person: 'EM Director', type: 'G-191 — ICS/EOC Interface', date: '', status: 'planned', notes: 'Essential for EOC operations management.' },
      { id: 'sp_tr_6', person: 'EM Director', type: 'L-146 — HSEEP', date: '', status: 'planned', notes: 'Required to design and evaluate exercises per HSEEP doctrine.' },
      { id: 'sp_tr_7', person: 'EM Director', type: 'IS-235.c — Emergency Planning', date: '', status: 'planned', notes: 'Directly supports EOP development — EMAP 4.5.' },
      { id: 'sp_tr_8', person: 'EM Director', type: 'IS-393 — Introduction to Hazard Mitigation', date: '', status: 'planned', notes: 'Supports EMAP 4.2 mitigation planning.' },
    ],
  },
  municipal_small: {
    id: 'municipal_small',
    name: 'Municipal EM — Small City/Town',
    description: 'Starter program for a small municipal EM office with city-focused plans, exercise templates, and essential training.',
    icon: '🏘',
    plans: [
      {
        id: 'sp_m_eop_1', name: 'City Emergency Operations Plan', type: 'EOP', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.5 — City-level EOP coordinating with county and neighbors.

TEMPLATE OUTLINE:
1. PURPOSE & SCOPE — City limits, population served, mutual aid relationships with county
2. SITUATION — Top hazards for the city (coordinate with county THIRA)
3. CONCEPT OF OPERATIONS — City EOC activation, coordination with county EOC, department roles
4. ROLES & RESPONSIBILITIES — Mayor/City Manager, Police Chief, Fire Chief, Public Works, EM Coordinator
5. EVACUATION — City evacuation routes, shelter locations, transportation resources
6. PUBLIC INFORMATION — City website, social media, press releases, coordination with county PIO

NEXT STEPS: Coordinate with your county EM on mutual aid and EOC integration.`,
      },
      {
        id: 'sp_m_coop_1', name: 'COOP — City Government', type: 'COOP', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.4 — Ensure city services continue during disruption.

TEMPLATE OUTLINE:
1. ESSENTIAL CITY SERVICES — Public safety dispatch, water/sewer, building inspection, payroll
2. ORDERS OF SUCCESSION — City Manager → Assistant CM → Department heads
3. ALTERNATE FACILITIES — City hall backup, mobile operations capability
4. IT RECOVERY — City network, email, financial systems, GIS

NEXT STEPS: Identify your top 5 essential functions that must continue within 12 hours.`,
      },
      {
        id: 'sp_m_evac_1', name: 'Evacuation Plan', type: 'Evacuation', status: 'draft', lastReview: '', nextReview: '',
        notes: `EMAP 4.5.3 — Protective action planning.

TEMPLATE OUTLINE:
1. EVACUATION ZONES — Map-based zone definitions with population estimates
2. ROUTES — Primary and alternate routes, traffic control points
3. TRANSPORTATION — Resources for those without vehicles, school buses, transit
4. SPECIAL NEEDS — Hospitals, nursing homes, schools, mobility-impaired residents
5. SHELTERING — Shelter locations, capacity, pet-friendly options, ARC coordination
6. RE-ENTRY — Criteria and process for allowing residents to return

NEXT STEPS: Define your evacuation zones first, then identify routes.`,
      },
    ],
    exercises: [
      {
        id: 'sp_m_ex_1', name: 'Tabletop — Active Threat Response', type: 'Tabletop', date: '', status: 'planned',
        objectives: '1. Test multi-department coordination for active threat\n2. Validate notification and lockdown procedures\n3. Exercise reunification process',
        scenario: 'Active threat situation at a city facility during business hours. Multiple departments responding.',
        participants: '', aarDraft: '', aarFinal: '', corrective: [], strengths: [], afis: [],
      },
      {
        id: 'sp_m_ex_2', name: 'Tabletop — Water System Disruption', type: 'Tabletop', date: '', status: 'planned',
        objectives: '1. Test boil water notification procedures\n2. Coordinate water distribution with mutual aid partners\n3. Exercise public communication protocols',
        scenario: 'Main water line break contaminates city water supply. Boil water advisory needed for 48+ hours.',
        participants: '', aarDraft: '', aarFinal: '', corrective: [], strengths: [], afis: [],
      },
    ],
    training: [
      { id: 'sp_m_tr_1', person: 'EM Coordinator', type: 'IS-100.c — Introduction to ICS', date: '', status: 'planned', notes: 'NIMS required.' },
      { id: 'sp_m_tr_2', person: 'EM Coordinator', type: 'IS-700.b — NIMS Introduction', date: '', status: 'planned', notes: 'NIMS required.' },
      { id: 'sp_m_tr_3', person: 'EM Coordinator', type: 'IS-235.c — Emergency Planning', date: '', status: 'planned', notes: 'Directly supports plan development.' },
      { id: 'sp_m_tr_4', person: 'EM Coordinator', type: 'G-300 — Intermediate ICS', date: '', status: 'planned', notes: 'For city-level incident management.' },
    ],
  },
};

export function applyStarterPack(currentData, packId) {
  const pack = STARTER_PACKS[packId];
  if (!pack) return currentData;
  return {
    ...currentData,
    plans: [...(currentData.plans || []), ...pack.plans],
    exercises: [...(currentData.exercises || []), ...pack.exercises],
    training: [...(currentData.training || []), ...pack.training],
  };
}
