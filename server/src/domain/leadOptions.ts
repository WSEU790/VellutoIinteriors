/**
 * Lead form option lists — shared by the React form and the API validator so
 * they can never drift apart. Keep this file free of Node/browser-specific code.
 */
export const RENOVATION_TYPES = [
  'Luxury Kitchen Remodeling',
  'Custom Kitchen Cabinetry',
  'Kitchen Design and Space Planning',
  'Cabinet Installation',
  'Kitchen Countertops and Backsplashes',
  'Kitchen Lighting and Finishing',
  'Bathroom Renovations',
  'Custom Closets and Storage',
  'Complete Interior Renovations',
  'Other / Not sure yet',
] as const;

export const BUDGET_RANGES = ['Under $50,000', '$50,000 – $100,000', '$100,000 – $200,000', '$200,000 – $350,000', '$350,000+', 'Not yet determined'] as const;

export const TIMELINES = ['As soon as possible', 'Within 3 months', '3 – 6 months', '6 – 12 months', 'More than 12 months', 'Just exploring'] as const;

export const LEAD_LIMITS = {
  nameMax: 120,
  emailMax: 200,
  phoneMax: 40,
  addressMax: 200,
  descriptionMin: 20,
  descriptionMax: 4000,
} as const;

export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as const;
