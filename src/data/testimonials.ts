export interface Testimonial {
  quote: string;
  name: string;
  location?: string;
  projectType?: string;
}

/**
 * Verified client testimonials only. Leave empty until real, permission-granted
 * reviews are available — the homepage shows a tasteful placeholder state
 * instead of inventing quotes.
 */
export const testimonials: Testimonial[] = [];
