/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-collage. Base: hero.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Hero): 1 column, 3 rows.
 *   Row 1: block name
 *   Row 2: background/collage image(s) (optional)
 *   Row 3: title (heading), subheading, call-to-action(s)
 */
export default function parse(element, { document }) {
  // --- Content extraction (validated against source.html) ---
  const heading = element.querySelector('h1, h2, .h1-heading, [class*="heading"]');
  const subheading = element.querySelector('p.subheading, p[class*="subheading"], p');
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a, a.button')
  );
  // Collage images (source uses multiple .cover-image); fall back to any img.
  const images = Array.from(
    element.querySelectorAll('img.cover-image, img[class*="cover"]')
  );
  const fallbackImages = images.length
    ? images
    : Array.from(element.querySelectorAll('img'));

  // Empty-block guard.
  if (!heading && !subheading && fallbackImages.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 2: image(s) — optional.
  if (fallbackImages.length) {
    cells.push([fallbackImages]);
  }

  // Row 3: content cell — heading, subheading, CTAs.
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-collage', cells });
  element.replaceWith(block);
}
