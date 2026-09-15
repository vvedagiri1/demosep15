/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-overlay. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Hero): 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background image (optional)
 *   Row 3: title (heading), subheading, call-to-action(s)
 */
export default function parse(element, { document }) {
  // Background image — source uses img.cover-image / .utility-overlay.
  const bgImage = element.querySelector(
    'img.cover-image, img[class*="overlay"], img'
  );
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p[class*="subheading"], p');
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a, a.button')
  );

  // Empty-block guard.
  if (!heading && !subheading && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: background image — optional.
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 3: content cell — heading, subheading, CTA(s).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-overlay', cells });
  element.replaceWith(block);
}
