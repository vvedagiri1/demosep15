/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Cards): each subsequent row is one card.
 * This gallery instance is image-only (no titles/descriptions/CTAs), so each
 * card row holds a single cell containing the card image.
 */
export default function parse(element, { document }) {
  // Each direct child div is one card wrapping an image.
  let cardEls = Array.from(element.querySelectorAll(':scope > div'));
  if (!cardEls.length) {
    cardEls = Array.from(element.children);
  }

  const cells = [];

  cardEls.forEach((card) => {
    const img = card.querySelector('img');
    const cell = [];
    if (img) cell.push(img);
    // Include any text content if a card ever carries it (defensive).
    const textNodes = Array.from(card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, a'));
    cell.push(...textNodes);
    if (cell.length) cells.push([cell]);
  });

  // Empty-block guard.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
