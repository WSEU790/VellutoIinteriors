# Content and Imagery Guide

## Replacing sample imagery

1. Export photography as **WebP or JPEG**, about 2400 px on the long edge for hero images and 1600 px for gallery images, quality 75–85.
2. Place the files in `public/images/projects/<project-slug>/`.
3. Update the paths and **alt text** in `src/data/projects.ts` and `src/data/services.ts`. Alt text should describe what is visible, for example "Walnut kitchen island with honed quartzite top in a Boca Raton residence".
4. Set `isSample: false` on real projects. The "Sample Concept" badge and notice then disappear for that project.
5. When no sample projects remain, remove `<SampleNotice />` from `Home.tsx` and `Portfolio.tsx`.
6. Replace the hero image in `src/pages/Home.tsx` and the `PageHero` images on the other pages.

Only show work Velluto Interiors actually completed, and only with the homeowner's permission.

## Adding a project

Append an object to `projects` in `src/data/projects.ts`. Its detail page, portfolio card, filter category and sitemap entry are created automatically. Add `beforeAfter` to enable the comparison slider.

## Testimonials

Add verified reviews (with the client's written permission) to `src/data/testimonials.ts`. The homepage switches from the placeholder to the testimonial grid automatically. Do not add schema.org review markup for reviews collected on the site itself.

## Contact details

Set `VITE_PUBLIC_PHONE`, `VITE_PUBLIC_EMAIL` and `VITE_PUBLIC_INSTAGRAM_URL` in `.env` and rebuild. They then appear in the footer, the contact page and the structured data. A physical address is deliberately not included. If you add one, also add a `PostalAddress` to `businessSchema()` in `src/lib/schema.ts`.

## Social sharing image

`public/images/og-default.jpg` (1200 × 630) is used for link previews. Replace it with a branded photograph when one is available.
