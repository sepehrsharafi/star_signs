/**
 * Placeholder photography.
 *
 * These are stock images standing in for Star Signs' own work. Replacing them
 * with real project photographs — especially finished signs at dusk — is the
 * single biggest visual upgrade available to this site. Each entry keeps its
 * `alt` so swapping the `src` is the only change needed.
 */

export type Photo = { src: string; alt: string };

const u = (name: string) => `/photos/${name}.jpg`;

export const photos = {
  /** A bespoke illuminated storefront generated for the positioning section. */
  localLandmark: {
    src: "/photos/local-landmark-v3.png",
    alt: "An illuminated star blade sign turning a brick neighborhood storefront into a landmark at blue hour",
  },
  /** Street-level brick building — the hero. */
  cityBuilding: {
    src: u("cityBuilding"),
    alt: "A brick commercial building on a city corner, the kind of façade a storefront sign is mounted to",
  },
  /** Hands over an architectural drawing. */
  drawing: {
    src: u("drawing"),
    alt: "Hands working over a scaled architectural drawing at a drafting desk",
  },
  /** Overhead of someone sketching. */
  drafting: {
    src: u("drafting"),
    alt: "Overhead view of a designer sketching a layout on paper",
  },
  /** Sparks — fabrication. */
  fabrication: {
    src: u("fabrication"),
    alt: "Sparks flying in a metal fabrication shop",
  },
  /** Site work / installation. */
  install: {
    src: u("install"),
    alt: "A crew working on site during an installation",
  },
  /** Empty industrial interior — the shop floor. */
  shopFloor: {
    src: u("shopFloor"),
    alt: "An open industrial interior with concrete floors and high ceilings",
  },
  /** Retail interior. */
  retail: {
    src: u("retail"),
    alt: "The interior of a clothing store with garments on rails",
  },
  /** Café interior. */
  cafe: {
    src: u("cafe"),
    alt: "A bright café interior with timber seating",
  },
  /** Restaurant at night. */
  restaurant: {
    src: u("restaurant"),
    alt: "A restaurant interior lit by hanging pendant lights",
  },
  /** Bar / hospitality with people. */
  hospitality: {
    src: u("hospitality"),
    alt: "People eating together at a long table in a busy restaurant",
  },
  /** Corporate glass tower. */
  corporate: {
    src: u("corporate"),
    alt: "A blue glass office tower seen from below",
  },
  /** Dark towers. */
  towers: {
    src: u("towers"),
    alt: "Office towers photographed from street level",
  },
  /** Vehicle in a garage. */
  fleet: {
    src: u("fleet"),
    alt: "A vehicle parked in a dark garage under blue light",
  },
  /** City street. */
  street: {
    src: u("street"),
    alt: "A city street lined with commercial buildings",
  },
  /** Meeting / consultation. */
  meeting: {
    src: u("meeting"),
    alt: "A team meeting around a boardroom table",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;

/* ------------------------------------------------------------------ */
/* Mappings — kept here so content.ts stays about words, not assets    */
/* ------------------------------------------------------------------ */

export const servicePhoto: Record<string, PhotoKey> = {
  "illuminated-channel-letters": "retail",
  "monument-and-pylon-signs": "corporate",
  "storefront-awning-blade-signs": "cafe",
  "neon-and-custom-fabrication": "restaurant",
  "wayfinding-and-ada": "towers",
  "vehicle-and-fleet-graphics": "fleet",
};

/** Keyed by process step index. */
export const stepPhoto: Record<string, PhotoKey> = {
  "01": "cityBuilding",
  "02": "drafting",
  "03": "drawing",
  "04": "meeting",
  "05": "fabrication",
  "06": "install",
};

export const sectorPhoto: Record<string, PhotoKey> = {
  Hospitality: "restaurant",
  Retail: "retail",
  Healthcare: "corporate",
  Corporate: "towers",
  Automotive: "fleet",
  Civic: "street",
};
