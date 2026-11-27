/**
 * Portfolio entries.
 *
 * IMPORTANT: every entry below is a SAMPLE design concept shown with a generated
 * illustration. They are not completed Velluto Interiors projects. Replace them
 * with real projects (and set `isSample: false`) once photography and project
 * details are supplied.
 */
export type ProjectCategory = 'Kitchens' | 'Cabinetry' | 'Bathrooms' | 'Closets' | 'Interiors';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** Design direction, not a claimed client location. */
  style: string;
  summary: string;
  description: string[];
  cover: string;
  coverAlt: string;
  gallery: { src: string; alt: string }[];
  beforeAfter?: { before: string; after: string; beforeAlt: string; afterAlt: string };
  scope: string[];
  materials: string[];
  isSample: boolean;
}

const img = (n: string) => `/images/samples/${n}.svg`;

export const categories: ProjectCategory[] = ['Kitchens', 'Cabinetry', 'Bathrooms', 'Closets', 'Interiors'];

export const projects: Project[] = [
  {
    slug: 'noir-and-brass-kitchen',
    title: 'Noir & Brass Kitchen',
    category: 'Kitchens',
    style: 'Contemporary European',
    summary: 'A concept for a deep charcoal kitchen warmed by brushed brass and honed stone.',
    description: [
      'This design concept explores a moody, architectural kitchen: full-height charcoal cabinetry, a sculpted brass hood and a waterfall-edge island that anchors the room.',
      'Layered lighting — recessed ceiling points, under-cabinet washes and three pendants — keeps the palette warm after dark.',
    ],
    cover: img('hero-kitchen'),
    coverAlt: 'Sample illustration of a charcoal kitchen with brass hood and pendants',
    gallery: [
      { src: img('kitchen-noir'), alt: 'Sample illustration: charcoal cabinetry elevation with brass hardware' },
      { src: img('craft-detail'), alt: 'Sample illustration: cabinet door profile details' },
      { src: img('space-plan'), alt: 'Sample space plan drawing for the kitchen layout' },
    ],
    beforeAfter: {
      before: img('before-kitchen'),
      after: img('kitchen-noir'),
      beforeAlt: 'Sample illustration of a dated oak kitchen before renovation',
      afterAlt: 'Sample illustration of the same kitchen reimagined in charcoal and brass',
    },
    scope: ['Kitchen design & space planning', 'Custom cabinetry', 'Stone countertops', 'Lighting plan'],
    materials: ['Charcoal lacquer cabinetry', 'Honed quartzite', 'Brushed brass', 'Wide-plank oak flooring'],
    isSample: true,
  },
  {
    slug: 'ivory-and-walnut-kitchen',
    title: 'Ivory & Walnut Kitchen',
    category: 'Kitchens',
    style: 'Transitional Coastal',
    summary: 'A light-filled concept pairing ivory shaker cabinetry with a walnut island.',
    description: [
      'A bright, calm kitchen concept suited to South Florida light: ivory cabinetry, a pale stone backsplash and a warm walnut island providing contrast.',
      'Tall pantry columns flank the room to keep everyday items out of sight.',
    ],
    cover: img('kitchen-ivory'),
    coverAlt: 'Sample illustration of an ivory kitchen with walnut island and brass pendants',
    gallery: [
      { src: img('kitchen-ivory'), alt: 'Sample illustration: ivory kitchen elevation' },
      { src: img('space-plan'), alt: 'Sample space plan drawing' },
    ],
    beforeAfter: {
      before: img('before-kitchen'),
      after: img('kitchen-ivory'),
      beforeAlt: 'Sample illustration of a dated kitchen before renovation',
      afterAlt: 'Sample illustration of an ivory and walnut kitchen after renovation',
    },
    scope: ['Luxury kitchen remodeling', 'Cabinet installation', 'Countertops & backsplash'],
    materials: ['Painted ivory cabinetry', 'Walnut veneer island', 'Calacatta-look quartz', 'Aged brass'],
    isSample: true,
  },
  {
    slug: 'sage-kitchen',
    title: 'Sage Atelier Kitchen',
    category: 'Cabinetry',
    style: 'Modern Classic',
    summary: 'A concept study in muted sage cabinetry with inset doors and brass accents.',
    description: ['A cabinetry-led concept with muted sage inset doors, a statement hood and a matching island for a cohesive, tailored look.'],
    cover: img('kitchen-sage'),
    coverAlt: 'Sample illustration of a sage green kitchen with brass details',
    gallery: [
      { src: img('kitchen-sage'), alt: 'Sample illustration: sage cabinetry elevation' },
      { src: img('craft-detail'), alt: 'Sample illustration: door profile study' },
    ],
    scope: ['Custom kitchen cabinetry', 'Hardware curation'],
    materials: ['Sage painted cabinetry', 'White oak interiors', 'Unlacquered brass'],
    isSample: true,
  },
  {
    slug: 'walnut-and-stone-kitchen',
    title: 'Walnut & Stone Kitchen',
    category: 'Kitchens',
    style: 'Warm Minimalist',
    summary: 'Rich walnut cabinetry framed by a dramatic dark stone backsplash.',
    description: ['A warm minimalist concept centred on book-matched walnut, a dark stone backsplash and slim brass profiles.'],
    cover: img('kitchen-walnut'),
    coverAlt: 'Sample illustration of a walnut kitchen with dark stone backsplash',
    gallery: [{ src: img('kitchen-walnut'), alt: 'Sample illustration: walnut kitchen elevation' }],
    scope: ['Countertops & backsplashes', 'Kitchen lighting & finishing'],
    materials: ['Walnut cabinetry', 'Dark leathered granite', 'Brushed brass'],
    isSample: true,
  },
  {
    slug: 'ivory-stone-primary-bath',
    title: 'Ivory Stone Primary Bath',
    category: 'Bathrooms',
    style: 'Spa Serenity',
    summary: 'A serene primary bath concept with floating vanity and freestanding tub.',
    description: ['A calm, spa-like primary bath concept: veined stone walls, a floating double vanity, round brass-framed mirrors and a sculptural freestanding tub.'],
    cover: img('bath-ivory'),
    coverAlt: 'Sample illustration of an ivory stone bathroom with freestanding tub',
    gallery: [
      { src: img('bath-ivory'), alt: 'Sample illustration: ivory primary bath' },
      { src: img('bath-noir'), alt: 'Sample illustration: alternative dark marble palette' },
    ],
    scope: ['Bathroom renovation', 'Vanity cabinetry'],
    materials: ['Honed marble', 'Oak vanity', 'Brushed brass fittings'],
    isSample: true,
  },
  {
    slug: 'walnut-dressing-room',
    title: 'Walnut Dressing Room',
    category: 'Closets',
    style: 'Boutique',
    summary: 'A boutique-style walk-in with lit hanging sections and a drawer island.',
    description: ['A boutique-inspired dressing room concept with alternating hanging and shelving bays, integrated lighting and a central drawer island.'],
    cover: img('closet-walnut'),
    coverAlt: 'Sample illustration of a walnut dressing room with island',
    gallery: [
      { src: img('closet-walnut'), alt: 'Sample illustration: walnut dressing room' },
      { src: img('closet-ivory'), alt: 'Sample illustration: ivory closet alternative' },
    ],
    scope: ['Custom closets & storage', 'Integrated lighting'],
    materials: ['Walnut veneer', 'Brass hanging rails', 'LED profile lighting'],
    isSample: true,
  },
  {
    slug: 'coastal-interior',
    title: 'Coastal Living Interior',
    category: 'Interiors',
    style: 'Coastal Modern',
    summary: 'A whole-interior concept opening the home to light and views.',
    description: ['A complete interior concept focused on openness: floor-to-ceiling glazing, a restrained palette and continuous flooring linking living spaces with the kitchen.'],
    cover: img('interior-ivory'),
    coverAlt: 'Sample illustration of a bright living room with tall windows',
    gallery: [
      { src: img('interior-ivory'), alt: 'Sample illustration: living space' },
      { src: img('kitchen-ivory'), alt: 'Sample illustration: adjoining kitchen' },
    ],
    scope: ['Complete interior renovation', 'Kitchen remodeling', 'Millwork'],
    materials: ['Oak flooring', 'Limewash walls', 'Linen upholstery'],
    isSample: true,
  },
  {
    slug: 'noir-marble-bath',
    title: 'Noir Marble Bath',
    category: 'Bathrooms',
    style: 'Dramatic Contemporary',
    summary: 'A dramatic guest bath concept in dark marble and brass.',
    description: ['A dramatic bathroom concept with dark marble surfaces, glowing mirrors and warm brass fittings.'],
    cover: img('bath-noir'),
    coverAlt: 'Sample illustration of a dark marble bathroom',
    gallery: [{ src: img('bath-noir'), alt: 'Sample illustration: dark marble bathroom' }],
    scope: ['Bathroom renovation'],
    materials: ['Nero marble', 'Brushed brass', 'Smoked glass'],
    isSample: true,
  },
];
