/**
 * Star Signs — content source.
 *
 * Everything the site renders lives here as plain data so the pages stay
 * presentational. Swap any of these arrays for a CMS/API call later; the
 * component props are already shaped the way a fetch would return them.
 */

export type Accent = "blue" | "yellow";

export type SignForm =
  | "channel"
  | "halo"
  | "neon"
  | "monument"
  | "pylon"
  | "blade";

/* ------------------------------------------------------------------ */
/* Company                                                             */
/* ------------------------------------------------------------------ */

export const company = {
  name: "Star Signs",
  legal: "Star Signs Fabrication, LLC",
  founded: 1998,
  tagline: "Built to be seen.",
  city: "Richmond",
  state: "Virginia",
  stateShort: "VA",
  address: {
    line1: "1408 Altamont Avenue",
    line2: "Scott's Addition",
    city: "Richmond",
    state: "VA",
    zip: "23230",
  },
  phone: "(804) 555-0182",
  phoneHref: "tel:+18045550182",
  email: "shop@starsigns.example",
  hours: [
    { days: "Mon — Thu", time: "7:00 – 17:00" },
    { days: "Friday", time: "7:00 – 15:00" },
    { days: "Sat — Sun", time: "On call" },
  ],
  service_area:
    "Richmond, Norfolk, Virginia Beach, Charlottesville, Arlington, Alexandria, Roanoke and the greater Mid-Atlantic.",
  licence: "VA Class A Contractor #2705-118842",
} as const;

export const stats = [
  { value: 27, suffix: "", label: "Years in the trade", note: "Est. 1998" },
  { value: 3100, suffix: "+", label: "Signs fabricated", note: "And counting" },
  { value: 96, suffix: "%", label: "Permits cleared first pass", note: "Last 24 months" },
  { value: 48, suffix: "h", label: "Emergency service window", note: "Statewide" },
] as const;

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  kicker: string;
  summary: string;
  body: string[];
  accent: Accent;
  form: SignForm;
  specs: { k: string; v: string }[];
  includes: string[];
  leadTime: string;
  from: string;
};

export const services: Service[] = [
  {
    slug: "illuminated-channel-letters",
    index: "01",
    title: "Illuminated Channel Letters",
    short: "Channel Letters",
    kicker: "Front-lit · Halo-lit · Combination",
    summary:
      "Individually fabricated aluminium letterforms with LED illumination. The workhorse of the American storefront, and the thing we build more of than anything else.",
    body: [
      "A channel letter is a small building. It has a skin, a structure, a power supply and a service life measured in decades. We return-weld the cans in-house from 0.063\" aluminium rather than riveting them, which is slower, costs more, and is the reason our letters do not weep rust down a façade in year six.",
      "Front-lit letters push light through an acrylic face — bright, legible from the road, the right call for highway-speed reading. Halo-lit letters are opaque in front and throw their light onto the wall behind, which reads as considerably more expensive and photographs beautifully at dusk. Combination letters do both, and are the correct answer more often than most people expect.",
      "Every set ships with a UL-listed power supply, a labelled disconnect, and a raceway or direct-mount pattern drawn to your wall condition. We photograph the finished install at night and send you the file.",
    ],
    accent: "yellow",
    form: "channel",
    specs: [
      { k: "Return depth", v: "3\" – 8\" fabricated aluminium" },
      { k: "Face", v: "3/16\" acrylic, translucent vinyl or polycarbonate" },
      { k: "Trim cap", v: "1\" Jewelite, colour-matched" },
      { k: "Illumination", v: "UL-listed LED modules, 5-year lamp warranty" },
      { k: "Finish", v: "Matthews polyurethane, any RAL or Pantone" },
      { k: "Mounting", v: "Raceway, backer panel or flush direct-mount" },
    ],
    includes: [
      "Site survey and wall condition report",
      "Scaled shop drawings for landlord and city",
      "Permit application and expediting",
      "Fabrication, finishing and bench test",
      "Certified installation with lift",
      "Night photography of the finished sign",
    ],
    leadTime: "4 – 6 weeks from approved drawings",
    from: "$4,800",
  },
  {
    slug: "monument-and-pylon-signs",
    index: "02",
    title: "Monument & Pylon Signs",
    short: "Monument & Pylon",
    kicker: "Ground-set · Multi-tenant · Highway",
    summary:
      "Freestanding structures that have to survive weather, mowers, trucks and twenty winters. Engineered, stamped and set on footings we pour ourselves.",
    body: [
      "Monument signs sit low and read as permanent — masonry or ACM-clad cabinets on a poured footing, usually with an illuminated push-through or routed-and-backed face. Pylons go up, not out: the answer when your building sits back from a road people drive at fifty-five.",
      "Both are structures, and in Virginia both need sealed engineering before a locality will look at them. We carry the wind-load calculations, the footing detail and the electrical riser in the same drawing set, which is why our submissions tend to clear on the first pass.",
      "Multi-tenant cabinets get individually serviceable tenant panels on a track system, so a turnover in suite 4 does not mean pulling the whole face.",
    ],
    accent: "blue",
    form: "monument",
    specs: [
      { k: "Structure", v: "Steel tube on poured concrete footing" },
      { k: "Engineering", v: "VA-sealed drawings, 90–115 mph wind load" },
      { k: "Cladding", v: "ACM, brick veneer, stone or painted aluminium" },
      { k: "Faces", v: "Routed-and-backed, push-through or flex-face" },
      { k: "Tenant panels", v: "Track-mounted, individually serviceable" },
      { k: "Extras", v: "Address numerals, landscape uplighting, EMC displays" },
    ],
    includes: [
      "Survey, utility locate and soil check",
      "Sealed structural and electrical engineering",
      "Full permit package and zoning variance support",
      "Footing excavation and pour",
      "Fabrication and finishing",
      "Set, wire and commission",
    ],
    leadTime: "8 – 12 weeks including permitting",
    from: "$14,500",
  },
  {
    slug: "storefront-awning-blade-signs",
    index: "03",
    title: "Storefront, Awning & Blade Signs",
    short: "Storefront & Blade",
    kicker: "Main Street · Historic districts · Retail",
    summary:
      "The pedestrian-scale work. Projecting blades, dimensional letters, gold-leaf glass, painted awnings and anything a historic review board is going to read twice.",
    body: [
      "Downtown work is a different discipline from highway work. The viewer is eight feet away and moving at walking pace, so the material tells as much of the story as the letterform does. We spend the money on edges here: a real welded blade bracket, a genuinely flat painted panel, a hand-applied gold leaf that will still look like gold in fifteen years.",
      "Old & Historic District work in Richmond, Alexandria and Fredericksburg comes with its own approval track and its own vocabulary. We have sat in front of those boards enough times to know what gets a nod and what gets a continuance, and we draw the submission accordingly.",
      "Awnings are fabricated in-house on welded aluminium frames with Sunbrella or Ferrari shell, graphics either silkscreened or cut and heat-welded.",
    ],
    accent: "yellow",
    form: "blade",
    specs: [
      { k: "Blade brackets", v: "Welded steel, powder-coated or blackened" },
      { k: "Panels", v: "MDO, HDU, aluminium or reclaimed timber" },
      { k: "Lettering", v: "Cut acrylic, cast metal, vinyl or hand-lettered" },
      { k: "Gilding", v: "23kt surface and water gilding on glass" },
      { k: "Awnings", v: "Welded frame, Sunbrella or Ferrari shell" },
      { k: "Lighting", v: "Gooseneck, concealed LED or unlit" },
    ],
    includes: [
      "Façade measure and photo-mockup on your building",
      "Historic district / ARB submission drawings",
      "Landlord approval package",
      "Fabrication and finishing",
      "Installation with masonry-appropriate anchors",
    ],
    leadTime: "3 – 5 weeks, plus review board calendar",
    from: "$2,400",
  },
  {
    slug: "neon-and-custom-fabrication",
    index: "04",
    title: "Neon & Custom Fabrication",
    short: "Neon & Custom",
    kicker: "Real glass · Bent by hand · Restoration",
    summary:
      "Genuine glass neon, bent on our own bench. Plus the one-off pieces that do not fit any other category — sculptural, kinetic, oversized, strange.",
    body: [
      "We still bend glass. Not LED neon-look flex tube — actual leaded glass filled with neon or argon, pumped and electroded on site. It is more expensive, it takes longer, and there is no substitute for it. The colour comes from the gas and the coating, so it is continuous rather than pixelated, and the light has a depth that flex tube has never once managed.",
      "Neon glows red-orange. Argon with a mercury drop glows blue. Everything else in the palette comes from the phosphor coating inside the tube, and we hold about forty of them.",
      "We also restore. If you have inherited a mid-century sign with a dead transformer and a cracked tube, send us photographs — that work is the best part of the job.",
    ],
    accent: "yellow",
    form: "neon",
    specs: [
      { k: "Glass", v: "10 – 15 mm leaded, hand-bent in-house" },
      { k: "Gases", v: "Neon (red-orange), argon/mercury (blue)" },
      { k: "Colour range", v: "~40 phosphor-coated tube colours" },
      { k: "Transformers", v: "Electronic, UL-2161 with GFCI protection" },
      { k: "Service life", v: "15 – 30 years on tube, typical" },
      { k: "Restoration", v: "Re-bend, re-pump, re-electrode, repaint" },
    ],
    includes: [
      "Full-size pattern drawing",
      "Glass bending and processing",
      "Housing or backer fabrication",
      "Burn-in and colour verification",
      "Installation and transformer commissioning",
    ],
    leadTime: "5 – 8 weeks",
    from: "$3,200",
  },
  {
    slug: "wayfinding-and-ada",
    index: "05",
    title: "Wayfinding & ADA Systems",
    short: "Wayfinding & ADA",
    kicker: "Campuses · Healthcare · Civic",
    summary:
      "Sign families rather than single signs. A nomenclature, a hierarchy, a message schedule and a code-compliant kit of parts that a facilities team can extend for years.",
    body: [
      "A wayfinding system is mostly a document. Before anything is fabricated we build a message schedule — every sign, every location, every line of copy, every arrow direction — and walk it with you. That document is what prevents the forty-sign reprint six weeks after install.",
      "ADA compliance is not optional and it is not vague: 2010 Standards §703 governs character height, stroke, finish, contrast, Grade 2 braille, and mounting at 48–60 inches to baseline. We fabricate to it and we document it, so your CO inspection is uneventful.",
      "Systems ship with a maintenance manual, spare blanks, and the source files. You own your own signage.",
    ],
    accent: "blue",
    form: "channel",
    specs: [
      { k: "Standard", v: "2010 ADA Standards §703, fully documented" },
      { k: "Tactile", v: "Raised 1/32\" characters, Grade 2 braille" },
      { k: "Materials", v: "Photopolymer, acrylic, aluminium, phenolic" },
      { k: "Finish", v: "Non-glare, 70%+ LRV contrast verified" },
      { k: "Inserts", v: "Window or slide-in for changeable rooms" },
      { k: "Deliverables", v: "Message schedule, location plan, spec manual" },
    ],
    includes: [
      "Wayfinding audit and decision-point mapping",
      "Nomenclature and message schedule",
      "Sign-type family design",
      "Code review and contrast verification",
      "Phased fabrication and install",
      "Facilities manual and spare stock",
    ],
    leadTime: "6 – 14 weeks depending on system size",
    from: "$9,000",
  },
  {
    slug: "vehicle-and-fleet-graphics",
    index: "06",
    title: "Vehicle & Fleet Graphics",
    short: "Vehicle & Fleet",
    kicker: "Wraps · Partials · Fleet programmes",
    summary:
      "A van parked on a job site is the cheapest signage anyone will ever buy. We template, print, laminate and install so it still looks deliberate in year five.",
    body: [
      "Every wrap starts from a real template for your exact year, make, model and wheelbase — not a stretched stock outline. Body lines, door handles, rivets and reveals get designed around rather than apologised for.",
      "We print on cast vinyl with a matched overlaminate and let it outgas properly before it goes near a vehicle. Installation happens indoors in a heated bay, because vinyl applied in a cold parking lot lifts at the edges and everybody knows it.",
      "Fleet programmes get a locked spec sheet and a colour standard, so the truck you buy in 2029 matches the one you bought in 2026.",
    ],
    accent: "yellow",
    form: "channel",
    specs: [
      { k: "Film", v: "3M 2080 / Avery 1105 cast, matched laminate" },
      { k: "Print", v: "Latex, 1200 dpi, colour-managed to proof" },
      { k: "Templates", v: "Vehicle-specific, verified against the unit" },
      { k: "Install", v: "Indoor heated bay, post-heat and seal" },
      { k: "Durability", v: "5 – 7 years vertical surfaces" },
      { k: "Fleet", v: "Locked spec sheet and colour standard" },
    ],
    includes: [
      "Vehicle measure and template verification",
      "Design mocked on your actual unit",
      "Print, laminate and outgas",
      "Indoor installation and post-heat",
      "Care sheet and warranty registration",
    ],
    leadTime: "2 – 3 weeks per unit",
    from: "$1,950",
  },
];

/* ------------------------------------------------------------------ */
/* Work                                                                */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  client: string;
  wordmark: string;
  sector: string;
  location: string;
  year: number;
  scope: string[];
  summary: string;
  accent: Accent;
  form: SignForm;
  brief: string;
  approach: string[];
  outcome: string;
  facts: { k: string; v: string }[];
  serviceSlugs: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ardent-coffee-roasters",
    client: "Ardent Coffee Roasters",
    wordmark: "ARDENT",
    sector: "Hospitality",
    location: "Scott's Addition, Richmond",
    year: 2025,
    scope: ["Halo-lit channel letters", "Projecting blade", "Window gilding"],
    summary:
      "A halo-lit wordmark on a 1920s warehouse wall that could not take a raceway, plus a welded blade sign for the corner approach.",
    accent: "yellow",
    form: "halo",
    brief:
      "Ardent took a corner bay in a brick warehouse with a protected façade and a landlord who would not permit a raceway or any surface-mounted conduit. They needed to be legible from Broad Street at thirty-five miles an hour and warm enough to pull people in on foot.",
    approach: [
      "Surveyed the wall and found the mortar joints could carry threaded rod, but the brick face could not. Every stud landed in a joint.",
      "Specified halo-lit returns in blackened aluminium so the letters read as solid mass by day and as warm light by night.",
      "Ran the power through a single core drill into the mechanical chase, so there is no visible conduit anywhere on the façade.",
      "Added a welded blade at the corner to catch the pedestrian approach the flat wall sign could not.",
    ],
    outcome:
      "Cleared historic review on first submission. The blade sign now shows up in roughly a third of the photographs guests post from the block.",
    facts: [
      { k: "Letter height", v: "22 inches" },
      { k: "Return depth", v: "5 inches, blackened aluminium" },
      { k: "Illumination", v: "3000K halo, dimmable" },
      { k: "Anchoring", v: "Threaded rod into mortar joints only" },
      { k: "Permit", v: "Approved first pass, 19 days" },
    ],
    serviceSlugs: ["illuminated-channel-letters", "storefront-awning-blade-signs"],
    featured: true,
  },
  {
    slug: "tidewater-surf-co",
    client: "Tidewater Surf Co.",
    wordmark: "TIDEWATER",
    sector: "Retail",
    location: "Virginia Beach",
    year: 2025,
    scope: ["Hand-bent neon", "Storefront letters", "Interior signage"],
    summary:
      "Real argon neon in the window, because the salt air eats everything else and the owner wanted the sign his father would have recognised.",
    accent: "blue",
    form: "neon",
    brief:
      "An oceanfront shop two blocks from the water, replacing a failed LED flex-tube sign that had lasted four seasons. The brief was explicitly nostalgic and explicitly durable.",
    approach: [
      "Bent the script in 12 mm glass on our own bench, argon with a mercury drop for the cold blue.",
      "Mounted the tube on a blackened standoff frame inside the glazing line, so the salt never touches it.",
      "Sealed every exterior penetration and specified marine-grade stainless for anything outboard.",
      "Fitted an electronic transformer with GFCI on a photocell and timer.",
    ],
    outcome:
      "Two full seasons on the original tube with zero service calls, in the single worst environment for signage in the Commonwealth.",
    facts: [
      { k: "Glass", v: "12 mm, hand-bent, 41 linear feet" },
      { k: "Gas", v: "Argon + mercury" },
      { k: "Location", v: "Inboard of glazing line" },
      { k: "Hardware", v: "316 marine stainless" },
      { k: "Service calls", v: "Zero in 24 months" },
    ],
    serviceSlugs: ["neon-and-custom-fabrication", "storefront-awning-blade-signs"],
    featured: true,
  },
  {
    slug: "monroe-medical-park",
    client: "Monroe Medical Park",
    wordmark: "MONROE",
    sector: "Healthcare",
    location: "Charlottesville",
    year: 2024,
    scope: ["Monument sign", "Wayfinding system", "ADA interior"],
    summary:
      "A 140-sign wayfinding family across four buildings, built on a message schedule we walked with the facilities team before anything was cut.",
    accent: "blue",
    form: "monument",
    brief:
      "Four buildings, two parking structures, eleven practice groups and a patient population that was getting lost between the garage and the elevator lobby. The previous signage had grown by accretion over eighteen years.",
    approach: [
      "Walked every route a patient could take and mapped the decision points. Found twenty-two of them; the old system addressed nine.",
      "Built a nomenclature that survives tenant turnover — buildings by letter, floors by number, practices by suite rather than by name.",
      "Designed a six-type family from one detail vocabulary, so facilities can order a new door sign in 2032 and have it match.",
      "Verified every tactile sign against 2010 ADA §703 and documented the contrast ratios.",
    ],
    outcome:
      "Front-desk wayfinding questions dropped by a figure the practice manager described as 'the reason we did this'. The system has since been extended twice without our involvement, which is the point.",
    facts: [
      { k: "Signs", v: "140 across 6 types" },
      { k: "Decision points", v: "22 mapped" },
      { k: "Buildings", v: "4 plus 2 garages" },
      { k: "Compliance", v: "2010 ADA §703, documented" },
      { k: "Phasing", v: "3 phases, zero closures" },
    ],
    serviceSlugs: ["wayfinding-and-ada", "monument-and-pylon-signs"],
    featured: true,
  },
  {
    slug: "the-bellwether",
    client: "The Bellwether",
    wordmark: "BELLWETHER",
    sector: "Hospitality",
    location: "Downtown Norfolk",
    year: 2024,
    scope: ["Rooftop channel letters", "Porte-cochère", "Interior dimensional"],
    summary:
      "Nine-foot rooftop letters on a structure that had to be engineered for coastal wind load before a single can was welded.",
    accent: "yellow",
    form: "channel",
    brief:
      "A hotel conversion that needed to be visible from the waterfront and from I-264, on a roof with an existing parapet that had never carried a load.",
    approach: [
      "Brought in a structural engineer before design, not after — the parapet dictated the letter spacing, so the letterform spacing followed the steel.",
      "Fabricated a galvanised support frame independent of the parapet, tied back to the roof structure.",
      "Ran a 115 mph wind-load calculation and had the package sealed before submission.",
      "Specified combination-lit letters: front-lit face for the highway read, halo for the close-in waterfront view.",
    ],
    outcome:
      "Visible from the Elizabeth River ferry. Cleared a coastal wind-load review that the owner had been told would take three months, in five weeks.",
    facts: [
      { k: "Letter height", v: "9 feet" },
      { k: "Wind load", v: "115 mph, sealed" },
      { k: "Frame", v: "Galvanised steel, roof-tied" },
      { k: "Illumination", v: "Combination front + halo" },
      { k: "Review", v: "5 weeks to approval" },
    ],
    serviceSlugs: ["illuminated-channel-letters", "monument-and-pylon-signs"],
  },
  {
    slug: "shenandoah-provisions",
    client: "Shenandoah Provisions",
    wordmark: "SHENANDOAH",
    sector: "Retail",
    location: "Roanoke",
    year: 2024,
    scope: ["Hand-painted wall", "Blade sign", "Gold leaf glass"],
    summary:
      "A hand-lettered wall sign and 23kt gilded glass for a market that wanted nothing on the building to look like it was made this decade.",
    accent: "yellow",
    form: "blade",
    brief:
      "A restored 1912 market hall in a historic district. The review board had rejected the previous applicant twice. The owner wanted materials, not imitations of materials.",
    approach: [
      "Hand-lettered the wall in mineral paint, laid out full-size on paper first and pounced onto the brick.",
      "Water-gilded the door glass in 23kt with a matte centre and burnished outline.",
      "Welded the blade bracket from mild steel and blackened it rather than powder-coating, so it will patina.",
      "Submitted photographic precedent from the same block, 1940s, with the drawing set.",
    ],
    outcome:
      "Unanimous approval. The board chair asked for our contact details for another applicant, which is the highest compliment that process offers.",
    facts: [
      { k: "Wall sign", v: "Hand-lettered, mineral paint" },
      { k: "Gilding", v: "23kt, water-gilded" },
      { k: "Bracket", v: "Blackened mild steel" },
      { k: "Review", v: "Unanimous, first pass" },
      { k: "Building", v: "1912, contributing structure" },
    ],
    serviceSlugs: ["storefront-awning-blade-signs", "neon-and-custom-fabrication"],
  },
  {
    slug: "cobalt-labs",
    client: "Cobalt Labs",
    wordmark: "COBALT",
    sector: "Corporate",
    location: "Arlington",
    year: 2025,
    scope: ["Pylon sign", "Lobby dimensional", "Campus wayfinding"],
    summary:
      "A 24-foot pylon and a campus identity system for a biotech tenant who needed to be findable without looking like a retail park.",
    accent: "blue",
    form: "pylon",
    brief:
      "A three-building campus set back 300 feet from the road, with a tenant roster that changes and a landlord brand that had to stay dominant.",
    approach: [
      "Designed the pylon as a single monolithic form in anodised aluminium with push-through acrylic, so the light reads as coming from inside the mass.",
      "Put tenant panels on a concealed track — a turnover is a twenty-minute swap, not a reface.",
      "Held the campus wayfinding to the same detail vocabulary at a quarter of the scale.",
      "Uplit the pylon base rather than flood-lighting the face, which kept it from looking like a gas station.",
    ],
    outcome:
      "Two tenant changes so far, both handled by the landlord's own maintenance team in under an hour.",
    facts: [
      { k: "Height", v: "24 feet" },
      { k: "Cladding", v: "Anodised aluminium" },
      { k: "Faces", v: "Push-through acrylic" },
      { k: "Tenants", v: "6 track-mounted panels" },
      { k: "Swap time", v: "Under 60 minutes" },
    ],
    serviceSlugs: ["monument-and-pylon-signs", "wayfinding-and-ada"],
  },
  {
    slug: "rivanna-brewing",
    client: "Rivanna Brewing",
    wordmark: "RIVANNA",
    sector: "Hospitality",
    location: "Charlottesville",
    year: 2023,
    scope: ["Neon restoration", "Patio signage", "Tap wall"],
    summary:
      "Restored a 1961 neon sign the client found in the building they bought, then built a taproom identity around it.",
    accent: "yellow",
    form: "neon",
    brief:
      "A former auto parts warehouse came with a dead neon sign in the rafters. The client wanted it working and wanted the rest of the building to defer to it.",
    approach: [
      "Documented the original before touching it — every bend, every colour, every electrode position.",
      "Re-bent four broken sections in matching glass, re-pumped and re-electroded the whole piece.",
      "Kept the original porcelain housing and its honest wear. Cleaned, did not repaint.",
      "Designed everything else in the building deliberately quieter, so the 1961 piece stays the loudest thing in the room.",
    ],
    outcome:
      "The sign is sixty-four years old and lit seven nights a week. It is also, by a wide margin, the most photographed object in the building.",
    facts: [
      { k: "Original", v: "1961, maker unknown" },
      { k: "Re-bent", v: "4 sections, matched glass" },
      { k: "Housing", v: "Original porcelain, cleaned only" },
      { k: "Transformer", v: "New electronic, GFCI" },
      { k: "Nights lit", v: "7 per week" },
    ],
    serviceSlugs: ["neon-and-custom-fabrication"],
  },
  {
    slug: "fairwinds-auto-group",
    client: "Fairwinds Auto Group",
    wordmark: "FAIRWINDS",
    sector: "Automotive",
    location: "Alexandria",
    year: 2023,
    scope: ["Pylon sign", "Building letters", "Fleet graphics"],
    summary:
      "A full dealership identity — highway pylon, building letters, and a 34-vehicle fleet programme on a locked colour standard.",
    accent: "yellow",
    form: "pylon",
    brief:
      "A dealership group consolidating three franchises onto one site, with manufacturer brand standards to satisfy and a fleet that had drifted into four different shades of the same blue.",
    approach: [
      "Reconciled three manufacturer sign standards against one site plan and one sign ordinance before drawing anything.",
      "Built the pylon as a shared structure with independently serviceable franchise cabinets.",
      "Colour-matched the fleet to a single Pantone and locked it into a spec sheet the group now issues with every vehicle order.",
      "Templated each of the six vehicle types against actual units rather than stock outlines.",
    ],
    outcome:
      "Every vehicle bought since matches. The group has added eleven units to the programme without a single colour question.",
    facts: [
      { k: "Pylon", v: "28 feet, 3 franchise cabinets" },
      { k: "Fleet", v: "34 units at launch" },
      { k: "Added since", v: "11 units, zero variance" },
      { k: "Standard", v: "Single locked Pantone" },
      { k: "Templates", v: "6 vehicle types verified" },
    ],
    serviceSlugs: ["monument-and-pylon-signs", "vehicle-and-fleet-graphics"],
  },
  {
    slug: "jamestown-ferry-terminal",
    client: "Jamestown Ferry Terminal",
    wordmark: "JAMESTOWN",
    sector: "Civic",
    location: "Williamsburg",
    year: 2022,
    scope: ["Wayfinding system", "ADA compliance", "Exterior monument"],
    summary:
      "A public terminal system designed for people who have never been there before, carrying luggage, in the rain, at night.",
    accent: "blue",
    form: "monument",
    brief:
      "A state-operated ferry terminal with vehicle queuing, pedestrian access, and a visitor population that is almost entirely first-time.",
    approach: [
      "Designed for the worst case: first visit, low light, hands full, poor weather, second language.",
      "Split vehicle and pedestrian wayfinding into two visually distinct tracks that never compete for attention.",
      "Oversized every character beyond ADA minimums, because the minimum is a floor and this is a public facility.",
      "Specified anti-glare faces and 78% LRV contrast throughout, verified on site at night.",
    ],
    outcome:
      "Adopted by the operating authority as the reference standard for two further terminals.",
    facts: [
      { k: "Signs", v: "62" },
      { k: "Tracks", v: "Vehicle + pedestrian, separated" },
      { k: "Contrast", v: "78% LRV verified on site" },
      { k: "Characters", v: "Above ADA minimum throughout" },
      { k: "Adopted", v: "2 further terminals" },
    ],
    serviceSlugs: ["wayfinding-and-ada", "monument-and-pylon-signs"],
  },
];

export const sectors = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.sector))).sort(),
];

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type Step = {
  index: string;
  title: string;
  duration: string;
  summary: string;
  detail: string[];
  deliverable: string;
  /** What the deliverable actually is, shown when the badge is opened. */
  deliverableNote: string;
};

export const processSteps: Step[] = [
  {
    index: "01",
    title: "Survey",
    duration: "Week 1",
    summary:
      "We come to the building. Photographs, measurements, wall construction, power availability, sight lines and the local sign ordinance.",
    detail: [
      "Measure the façade and establish the buildable envelope under the local ordinance.",
      "Identify wall construction and what it can actually carry.",
      "Locate existing power and assess what the new sign will need.",
      "Photograph the approach from every direction a customer arrives from.",
    ],
    deliverable: "Site survey report with photographs and a code summary",
    deliverableNote:
      "A PDF, usually six to ten pages: the measured façade, photographs of every approach, what the wall is made of and what it can carry, where the power is, and the clauses of the local ordinance that apply to you. It is yours whether or not you hire us — take it to another shop if you want a second number.",
  },
  {
    index: "02",
    title: "Design",
    duration: "Weeks 1 – 2",
    summary:
      "Concepts mocked onto photographs of your actual building, at the actual size, seen from the actual road.",
    detail: [
      "Two or three directions, rendered on your building rather than on a white background.",
      "Day and night renderings for anything illuminated, because they are different signs.",
      "Legibility checked against viewing distance and approach speed.",
      "One round of revisions included, and in practice usually two.",
    ],
    deliverable: "Photo-mounted renderings, day and night",
    deliverableNote:
      "Two or three directions, each mounted on a photograph of your own building at the size it will actually be built, plus a night version of anything illuminated. You approve one of these, and the approved one is what gets drawn.",
  },
  {
    index: "03",
    title: "Engineering & drawings",
    duration: "Weeks 2 – 3",
    summary:
      "Scaled shop drawings, electrical riser, mounting detail, and sealed structural engineering where the code requires it.",
    detail: [
      "Full fabrication drawings dimensioned to the eighth.",
      "Mounting detail drawn to the wall condition found during survey.",
      "Electrical riser diagram and load calculation.",
      "Virginia-sealed structural engineering for freestanding and rooftop work.",
    ],
    deliverable: "Stamped drawing set, ready for submission",
    deliverableNote:
      "The fabrication drawings dimensioned to the eighth, the mounting detail drawn to your wall, the electrical riser and load calculation, and a Virginia engineer's seal where the code asks for one. This is the set the city reviews and the set the shop builds from — they are the same drawings.",
  },
  {
    index: "04",
    title: "Permitting",
    duration: "Weeks 3 – 8",
    summary:
      "We file it, we track it, and we go to the hearing. This is the part that derails projects, so we own it.",
    detail: [
      "Zoning and building permit applications filed on your behalf.",
      "Landlord and property-manager approval packages.",
      "Historic district and architectural review board submissions and hearings.",
      "Corrections handled directly with the reviewer — you hear about it after it is fixed.",
    ],
    deliverable: "Issued permit, in hand before fabrication starts",
    deliverableNote:
      "The issued permit, the approved drawings stamped by the reviewer, and any landlord or review-board approvals. Nothing is cut until this is in the folder, which is why we have never had to rework a finished sign to satisfy a correction.",
  },
  {
    index: "05",
    title: "Fabrication",
    duration: "Weeks 4 – 9",
    summary:
      "Built in our Scott's Addition shop. Welded, finished, wired and bench-tested before it ever leaves the building.",
    detail: [
      "Aluminium cut, formed and welded in-house.",
      "Finished in our paint booth to your colour standard.",
      "Wired to UL standards and labelled.",
      "Lit and burned in on the bench for 24 hours before it ships.",
    ],
    deliverable: "Bench-test photographs, lit, before install",
    deliverableNote:
      "Photographs of your sign lit on our bench after a 24-hour burn-in, with the paint colour checked against the standard you approved. If something is wrong, it is wrong here — in the shop, where fixing it costs a morning instead of a lift rental.",
  },
  {
    index: "06",
    title: "Install & service",
    duration: "Week 9 onward",
    summary:
      "Our own crews and our own lifts. Then a warranty that means something and a 48-hour statewide service window.",
    detail: [
      "Installed by our employees, not a subcontracted crew.",
      "Site left clean, inspection scheduled and attended.",
      "Night photography of the finished sign, files sent to you.",
      "Five-year warranty on LED, one year on labour, 48-hour service response.",
    ],
    deliverable: "Final photography, warranty and service agreement",
    deliverableNote:
      "Night photography of the finished sign in files you can actually use, the five-year LED and one-year labour warranty in writing, and the service agreement with the 48-hour response window. The inspection certificate follows once the locality closes the permit.",
  },
];

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "spec"; rows: { k: string; v: string }[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: number;
  author: string;
  accent: Accent;
  body: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "what-a-sign-permit-actually-costs-in-richmond",
    title: "What a sign permit actually costs in Richmond",
    excerpt:
      "The fee is the small part. Here is the real number, the real timeline, and the three things that cause almost every rejection we see.",
    date: "2026-08-14",
    category: "Permitting",
    readingTime: 7,
    author: "Dana Whitfield",
    accent: "blue",
    body: [
      {
        type: "p",
        text: "Nearly every client asks about the permit fee. It is almost never the number that matters. The fee for a wall sign in the City of Richmond is modest — the cost that actually lands on your project is time, and time is bought with the quality of the submission.",
      },
      { type: "h", text: "The two clocks" },
      {
        type: "p",
        text: "There are two clocks running on any sign permit. The first is the review clock, which the city controls. The second is the correction clock, which you control entirely. A clean submission runs one cycle of the first clock. A sloppy one runs three cycles of both, and that is where a four-week project becomes a fourteen-week project.",
      },
      { type: "h", text: "Where submissions actually fail" },
      {
        type: "p",
        text: "We have tracked our own corrections for the last six years. Three causes account for the overwhelming majority of them.",
      },
      {
        type: "list",
        items: [
          "Sign area calculated differently than the ordinance defines it. Most ordinances measure the smallest rectangle enclosing all copy and graphics — not the area of the letters. Individual-letter signs get this wrong constantly.",
          "No electrical detail on an illuminated sign. If it lights up, the reviewer needs the riser, the load and the disconnect location. A drawing without them is an incomplete application, not a rejected one, and incomplete applications quietly sit.",
          "Mounting detail that does not match the wall. A generic anchor detail on a drawing for a 1920s brick façade will come back. The reviewer knows what is behind that brick even if the applicant does not.",
        ],
      },
      { type: "h", text: "What it actually costs" },
      {
        type: "p",
        text: "Here is what we budget on a typical illuminated wall sign inside the city, assuming no variance and no historic district review.",
      },
      {
        type: "spec",
        rows: [
          { k: "Permit fee", v: "Modest — typically the smallest line item" },
          { k: "Drawings & engineering", v: "Included in our scope" },
          { k: "Expediting & corrections", v: "Included in our scope" },
          { k: "Realistic timeline", v: "3 – 5 weeks, clean submission" },
          { k: "Historic district", v: "Add one review board cycle" },
          { k: "Variance required", v: "Add 8 – 12 weeks" },
        ],
      },
      { type: "h", text: "The one thing worth knowing" },
      {
        type: "p",
        text: "Find out whether you need a variance before you fall in love with a design. A five-minute check of the ordinance against your frontage is the single highest-leverage thing anyone can do at the start of a sign project, and it is free.",
      },
      {
        type: "quote",
        text: "The cheapest permit is the one you only file once.",
      },
    ],
  },
  {
    slug: "channel-letters-vs-flat-cut",
    title: "Channel letters vs. flat cut: which one your storefront needs",
    excerpt:
      "One of these costs four times the other. Most of the time that is the right call, and sometimes it is money thrown at a wall nobody reads.",
    date: "2026-07-02",
    category: "Specification",
    readingTime: 6,
    author: "Marcus Bell",
    accent: "yellow",
    body: [
      {
        type: "p",
        text: "A flat-cut letter is a solid piece of material — aluminium, acrylic, brass — cut to shape and pinned off the wall. A channel letter is a fabricated box with a face, a return and a light source inside. They look superficially similar in a rendering and behave nothing alike on a building.",
      },
      { type: "h", text: "The question is not budget. It is darkness." },
      {
        type: "p",
        text: "Ask one thing: what percentage of the hours you want customers to notice you are hours when it is dark outside? For a coffee shop closing at three, that number is close to zero and a flat-cut letter with a good gooseneck is a better sign than a channel letter. For a restaurant doing seventy percent of its covers after sunset, it is the whole business.",
      },
      { type: "h", text: "What flat cut does better" },
      {
        type: "list",
        items: [
          "Material honesty. Real brass reads as real brass. A channel letter face is always acrylic.",
          "Thin strokes. A delicate serif or a light-weight sans cannot be built as a channel letter below a certain stroke width; the return needs somewhere to live.",
          "Historic districts. Review boards tend to prefer them, sometimes to the point of requiring them.",
          "Cost. Typically a quarter to a third of an equivalent illuminated set.",
        ],
      },
      { type: "h", text: "What channel letters do better" },
      {
        type: "list",
        items: [
          "Being seen at night, which is the entire point.",
          "Distance. A front-lit face is legible at ranges no reflected-light sign can reach.",
          "Halo lighting, which is the single most flattering thing you can do to a letterform on a wall.",
          "Service life. A sealed, drained, powder-coated can outlasts pinned letters on a wet wall.",
        ],
      },
      { type: "h", text: "The answer most people land on" },
      {
        type: "p",
        text: "Halo-lit fabricated letters with an opaque face. You get the material read of flat cut during the day, and light at night. It costs more than either option, and it is what we build most often, because it is usually right.",
      },
    ],
  },
  {
    slug: "why-your-sign-looks-dim",
    title: "Why your sign looks dim at 9pm (and what to do about it)",
    excerpt:
      "Nine times out of ten it is not the LEDs. Here is the diagnostic order we work through on a service call.",
    date: "2026-05-28",
    category: "Service",
    readingTime: 5,
    author: "Ruth Okonkwo",
    accent: "yellow",
    body: [
      {
        type: "p",
        text: "A dim sign is rarely a dead sign. It is usually a sign telling you something specific, and the failure mode is readable if you know the order to check things in.",
      },
      { type: "h", text: "The diagnostic order" },
      {
        type: "list",
        items: [
          "Is it dim, or is it uneven? Uneven means modules. Uniformly dim across the whole sign means power or face.",
          "Check the face before the electronics. Ten years of UV turns a white acrylic face yellow and drops transmission substantially. The LEDs behind it are fine; the window is dirty.",
          "Measure the supply voltage under load. A long run on undersized wire drops voltage, and LED output falls with it. This is the single most common real cause we find.",
          "Check the power supply temperature. A supply running hot in a sealed raceway derates itself, and it will do it every summer.",
          "Only then suspect the modules. Good LED modules do not fail early. They fail at the end of a long life, gradually, and usually all together.",
        ],
      },
      { type: "h", text: "The two cheap fixes nobody thinks of" },
      {
        type: "p",
        text: "Replacing a yellowed acrylic face costs a fraction of a relamp and frequently restores the sign completely. And adding a photocell where there is a timer means the sign comes on when it is actually dark, rather than at a fixed hour that drifts four hours out of phase across the year.",
      },
      {
        type: "quote",
        text: "A sign that is on at the wrong time is a sign that is off.",
      },
    ],
  },
  {
    slug: "real-neon-is-not-dead",
    title: "Real neon is not dead — here's when to specify it",
    excerpt:
      "LED flex tube is cheaper, easier and correct for most jobs. Then there are the jobs where it is obviously, visibly wrong.",
    date: "2026-04-09",
    category: "Craft",
    readingTime: 8,
    author: "Marcus Bell",
    accent: "yellow",
    body: [
      {
        type: "p",
        text: "We sell both. We are not romantics about this — LED neon-look tube is the right specification for a large share of the work that comes through the shop, and pretending otherwise would cost our clients money for no return.",
      },
      { type: "h", text: "What the eye actually notices" },
      {
        type: "p",
        text: "Glass neon is a continuous line of light. LED flex is a row of point sources behind a diffuser. At three feet, in a photograph, on a phone, they are hard to tell apart. In a room, at an angle, moving past it, they are not remotely the same object. The difference is in the ends of strokes, in tight bends, and in the way glass throws light onto a surface behind it.",
      },
      { type: "h", text: "Specify glass when" },
      {
        type: "list",
        items: [
          "The sign is the brand. If people will photograph it deliberately, build it in glass.",
          "It is an interior piece at close viewing distance.",
          "You are restoring or matching something historic.",
          "You need a colour that phosphor does well and LED does badly — deep gold, true ruby, certain pinks.",
          "The design has tight radii or crossovers where flex tube kinks visibly.",
        ],
      },
      { type: "h", text: "Specify LED when" },
      {
        type: "list",
        items: [
          "It is going outdoors above the second floor where service means a lift.",
          "The run is very long and the budget is finite.",
          "It needs to dim, change colour or animate.",
          "Impact risk is high — a loading dock, a car park, anywhere near a door.",
        ],
      },
      { type: "h", text: "The honest cost comparison" },
      {
        type: "spec",
        rows: [
          { k: "Glass, initial", v: "Roughly 2 – 3× LED equivalent" },
          { k: "Glass, service life", v: "15 – 30 years typical" },
          { k: "LED flex, initial", v: "Baseline" },
          { k: "LED flex, service life", v: "5 – 10 years typical" },
          { k: "Glass repair", v: "Section re-bent, sign preserved" },
          { k: "LED repair", v: "Usually a full replacement run" },
        ],
      },
      {
        type: "p",
        text: "Over twenty years the numbers are much closer than the quotes suggest. That is not an argument for glass everywhere. It is an argument against assuming glass is an indulgence.",
      },
    ],
  },
  {
    slug: "ada-signage-rules-people-get-wrong",
    title: "ADA signage: the rules people get wrong most often",
    excerpt:
      "Braille is the part everyone remembers and the part that is rarely wrong. These five are where projects actually fail inspection.",
    date: "2026-02-19",
    category: "Compliance",
    readingTime: 6,
    author: "Dana Whitfield",
    accent: "blue",
    body: [
      {
        type: "p",
        text: "The 2010 ADA Standards are specific, public and not especially long. Almost every failure we are called in to fix comes from the same handful of clauses, and braille — the thing everybody worries about — is hardly ever one of them.",
      },
      { type: "h", text: "1. Mounting height and location" },
      {
        type: "p",
        text: "Tactile signs mount with the baseline of the lowest character between 48 and 60 inches above the floor, on the latch side of the door. Not on the door. A sign on a door that swings is a sign that moves, and it fails. If there is no wall space on the latch side, the standard tells you where it goes instead — but you have to read that far.",
      },
      { type: "h", text: "2. Finish and glare" },
      {
        type: "p",
        text: "Characters and backgrounds must be non-glare. A beautifully specified polished stainless sign with etched characters is non-compliant no matter how good it looks, and this catches high-design projects constantly.",
      },
      { type: "h", text: "3. Contrast" },
      {
        type: "p",
        text: "Light on dark or dark on light. The standard does not give a numeric ratio for tactile signage, which leads people to assume anything goes. It does not. We hold to 70% LRV difference as a working floor and document it, because 'we thought it looked contrasty' is not a defence.",
      },
      { type: "h", text: "4. Character style" },
      {
        type: "p",
        text: "Sans serif, non-italic, non-script, uppercase for tactile characters. Your brand's condensed display face is almost certainly out of spec — character width is governed too, measured on the uppercase O.",
      },
      { type: "h", text: "5. Which signs even need it" },
      {
        type: "p",
        text: "Signs identifying a permanent room or space need tactile characters and braille. Directional and informational signs do not — but they still have visual character requirements. Applying tactile rules to everything is expensive; applying them to nothing fails inspection.",
      },
    ],
  },
  {
    slug: "reading-a-shop-drawing",
    title: "Reading a shop drawing: a field guide for owners",
    excerpt:
      "You are going to be asked to sign one. Here is what every part of it means and the four things worth checking before you do.",
    date: "2025-12-05",
    category: "Process",
    readingTime: 7,
    author: "Ruth Okonkwo",
    accent: "blue",
    body: [
      {
        type: "p",
        text: "A shop drawing is a contract drawn to scale. Once you sign it, it is what gets built — not the pretty rendering, not the conversation in the parking lot. It is worth twenty minutes.",
      },
      { type: "h", text: "What you are looking at" },
      {
        type: "spec",
        rows: [
          { k: "Elevation", v: "The sign seen straight on, dimensioned" },
          { k: "Section", v: "A cut through it, showing construction" },
          { k: "Mounting detail", v: "How it attaches, and to what" },
          { k: "Electrical riser", v: "Where power comes from, and the load" },
          { k: "Colour schedule", v: "Every finish, by standard name" },
          { k: "Site plan", v: "Where on the building, for freestanding work" },
        ],
      },
      { type: "h", text: "The four things to check" },
      {
        type: "list",
        items: [
          "Spelling, and then spelling again. Have someone who has not read it before read it. A misspelled sign is a remake, and whoever signed the drawing owns it.",
          "Overall dimensions against the ordinance limit. If the drawing says 42 square feet and your frontage allows 40, it will come back from the city, and the drawing was approved by you.",
          "Colour call-outs by standard, not by name. 'Brand blue' is not a colour. A Pantone or RAL number is.",
          "The mounting detail against what you know about your wall. If the building has EIFS over stud and the detail shows masonry anchors, say so now.",
        ],
      },
      { type: "h", text: "The revision block" },
      {
        type: "p",
        text: "Bottom right corner, almost always. It tells you which version you are holding and what changed. If someone sends you a new drawing, check that block before assuming only the thing you asked about moved.",
      },
      {
        type: "quote",
        text: "Twenty minutes on a drawing is cheaper than six weeks on a remake.",
      },
    ],
  },
];

export const postCategories = [
  "All",
  ...Array.from(new Set(posts.map((p) => p.category))).sort(),
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqGroup = {
  id: string;
  title: string;
  blurb: string;
  items: { q: string; a: string }[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: "cost-and-timeline",
    title: "Cost & timeline",
    blurb: "The two questions everyone opens with, answered without hedging.",
    items: [
      {
        q: "What does a sign actually cost?",
        a: "A projecting blade sign for a small storefront starts around $2,400. A set of illuminated channel letters typically runs $4,800 to $18,000 depending on size, letter count and mounting condition. A ground-set monument sign with engineering and footings starts around $14,500. We publish starting prices on every service page rather than making you ask, and we give you a fixed number after the site survey — not a range that moves.",
      },
      {
        q: "How long does the whole thing take?",
        a: "For a non-illuminated storefront sign with no historic review: three to five weeks. For illuminated channel letters: four to six weeks from approved drawings, plus permitting. For a monument or pylon sign: eight to twelve weeks, and permitting is most of that. The fabrication is rarely the long pole — approvals are.",
      },
      {
        q: "What drives the price up the most?",
        a: "Height, in almost every case. A sign that needs a boom lift, a lane closure or a night install carries costs that have nothing to do with the sign itself. After that: letter count, because thirty small letters cost more than six large ones, and structural engineering on anything freestanding or roof-mounted.",
      },
      {
        q: "Do you take deposits?",
        a: "Fifty percent to start design and engineering, the balance on installation. We do not start fabrication until the permit is issued, so you are never holding a finished sign you cannot legally hang.",
      },
    ],
  },
  {
    id: "permits-and-approvals",
    title: "Permits & approvals",
    blurb: "The part that derails projects. We handle all of it.",
    items: [
      {
        q: "Do I need a permit?",
        a: "In every Virginia locality we work in, yes — for essentially any exterior sign, and frequently for a face change on an existing cabinet. Interior signage generally does not require one unless it is illuminated and tied into building power. We confirm this during the survey rather than guessing.",
      },
      {
        q: "Who files it?",
        a: "We do. Application, drawings, engineering, fees, corrections and hearings. You are not going to city hall. If a reviewer sends a correction, we handle it and tell you afterwards.",
      },
      {
        q: "What if my building is in a historic district?",
        a: "Then there is a review board in the path, and it meets on a fixed calendar — miss a submission deadline and you wait a month. We have worked in Richmond's Old & Historic Districts, Alexandria and Fredericksburg extensively, and we build the submission the way those boards want to receive it, including photographic precedent where it helps.",
      },
      {
        q: "What if the sign I want exceeds what the ordinance allows?",
        a: "You need a variance, and you should know that before you get attached to a design. It adds eight to twelve weeks and it is not guaranteed. We check your frontage against the ordinance during the survey and tell you at that point, not after you have approved a rendering.",
      },
      {
        q: "Does my landlord have to approve it?",
        a: "Almost always, and their criteria are frequently stricter than the city's. We produce a landlord approval package alongside the permit set, because getting one and not the other wastes the same amount of time.",
      },
    ],
  },
  {
    id: "design-and-fabrication",
    title: "Design & fabrication",
    blurb: "What happens between the handshake and the lift showing up.",
    items: [
      {
        q: "I don't have a logo. Can you design one?",
        a: "We can design a wordmark and a signage identity. We are a sign shop with a design studio in it, not a branding agency — if you need a full identity system with brand guidelines, we will tell you that and recommend someone. What we are genuinely good at is making a mark work at forty feet in the rain.",
      },
      {
        q: "Will I see it before it's built?",
        a: "Yes, mounted on a photograph of your actual building, at actual size, from the angle your customers arrive from. For anything illuminated you get a day view and a night view, because they are effectively two different signs and approving one is not approving the other.",
      },
      {
        q: "Do you build in-house or subcontract?",
        a: "In-house. Aluminium fabrication, welding, paint booth, glass bending, print and finishing all happen in our Scott's Addition shop. Installation is by our own employees on our own equipment. The only thing we bring in is sealed structural engineering.",
      },
      {
        q: "Can you match an existing sign?",
        a: "Usually. Send photographs, including one straight-on and one close enough to read the material. If it is an older piece we can often match the original fabrication method rather than approximating it in modern materials.",
      },
    ],
  },
  {
    id: "installation-and-service",
    title: "Installation & service",
    blurb: "What happens after, which is most of a sign's life.",
    items: [
      {
        q: "What's the warranty?",
        a: "Five years on LED components, one year on labour and installation, and the manufacturer's warranty on paint finishes. Glass neon is warranted for one year against workmanship; the tube itself typically runs fifteen to thirty years.",
      },
      {
        q: "How fast do you respond to a service call?",
        a: "Forty-eight hours anywhere in Virginia for a sign we built, and we get to most Richmond-area calls the next business day. A dark sign on a Friday night is a real problem and we treat it as one.",
      },
      {
        q: "Do you service signs you didn't build?",
        a: "Yes, and a good portion of our service work is exactly that. We will tell you honestly if a sign is worth repairing or if you are better off replacing it — including when the answer costs us the bigger job.",
      },
      {
        q: "Will installation close my business?",
        a: "Rarely. Most storefront installs take a few hours and we schedule around your trading hours. If a lane or sidewalk closure is required we handle the permit for that too, and we will do it at night if that is what keeps your doors open.",
      },
      {
        q: "Do you handle removal and disposal of the old sign?",
        a: "Yes, included on any replacement job. We also patch and make good the wall behind it, which is a step a surprising number of shops leave to the customer.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

export const team = [
  {
    name: "Marcus Bell",
    role: "Founder & Master Fabricator",
    since: 1998,
    note: "Bends the glass. Has opinions about trim cap.",
    initials: "MB",
  },
  {
    name: "Dana Whitfield",
    role: "Permitting & Code",
    since: 2009,
    note: "Knows which reviewer wants the riser on sheet two.",
    initials: "DW",
  },
  {
    name: "Ruth Okonkwo",
    role: "Design Director",
    since: 2014,
    note: "Draws it full size on paper before it touches a screen.",
    initials: "RO",
  },
  {
    name: "Tomás Herrera",
    role: "Install Superintendent",
    since: 2011,
    note: "Runs the lifts. Has never dropped a letter.",
    initials: "TH",
  },
] as const;

export const capabilities = [
  "Aluminium fabrication & welding",
  "In-house paint booth",
  "Hand-bent glass neon",
  "CNC routing",
  "Large-format printing",
  "UL-listed electrical assembly",
  "Sealed structural engineering",
  "Owned lift fleet to 85 ft",
] as const;

export const ticker = [
  "CHANNEL LETTERS",
  "MONUMENT SIGNS",
  "HAND-BENT NEON",
  "WAYFINDING",
  "PYLON SIGNS",
  "ADA COMPLIANT",
  "VEHICLE WRAPS",
  "PERMIT EXPEDITING",
  "48-HOUR SERVICE",
  "EST. 1998",
] as const;

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const projectsForService = (slug: string) =>
  projects.filter((p) => p.serviceSlugs.includes(slug));

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

export const formatDateShort = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They told us on day one that our first design wouldn't clear the ordinance, and redrew it before we'd paid anything. Every other shop we spoke to would have let us find out from the city eight weeks later.",
    name: "Priya Raman",
    role: "Owner",
    company: "Ardent Coffee Roasters",
    initials: "PR",
    projectSlug: "ardent-coffee-roasters",
  },
  {
    quote:
      "The sign has been through two nor'easters and a hurricane watch. It has not needed a single service call. The one before it lasted four seasons.",
    name: "Dale Hutchins",
    role: "Founder",
    company: "Tidewater Surf Co.",
    initials: "DH",
    projectSlug: "tidewater-surf-co",
  },
  {
    quote:
      "A hundred and forty signs across four buildings, phased around a working clinic, and we never closed a corridor. The message schedule they built is still how we order new signage three years on.",
    name: "Angela Foss",
    role: "Facilities Director",
    company: "Monroe Medical Park",
    initials: "AF",
    projectSlug: "monroe-medical-park",
  },
  {
    quote:
      "We were quoted three months for the coastal wind-load review. Star Signs had the sealed package approved in five weeks because they brought the engineer in before the design, not after.",
    name: "Marcus Oyelaran",
    role: "Development Manager",
    company: "The Bellwether",
    initials: "MO",
    projectSlug: "the-bellwether",
  },
  {
    quote:
      "Our review board had turned down the previous applicant twice. Star Signs got a unanimous approval on the first pass, and the chair asked for their number.",
    name: "Nora Beckwith",
    role: "General Manager",
    company: "Shenandoah Provisions",
    initials: "NB",
    projectSlug: "shenandoah-provisions",
  },
];
