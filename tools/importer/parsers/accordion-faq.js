/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Accordion): 2 columns; row 1 is block name.
 * Each subsequent row is one item: cell 1 = title, cell 2 = content.
 * Source items are `details.faq-item` with a `summary.faq-question` (title,
 * excluding the toggle SVG) and a `.faq-answer` (content).
 */
export default function parse(element, { document }) {
  const items = Array.from(
    element.querySelectorAll(':scope > details.faq-item, details.faq-item, :scope > details')
  );

  // Empty-block guard.
  if (!items.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  items.forEach((item) => {
    const summary = item.querySelector('summary .faq-question, summary, .faq-question');
    // Title: prefer the label span (skips the decorative SVG icon).
    const titleSpan = summary ? summary.querySelector('span') : null;
    const titleCell = titleSpan
      ? titleSpan
      : (summary ? summary.textContent.trim() : '');

    // Content: the answer body.
    const answer = item.querySelector('.faq-answer');
    const contentCell = answer || '';

    cells.push([titleCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
