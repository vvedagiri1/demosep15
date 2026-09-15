/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Cards): 2 columns; row 1 is block name.
 * Each subsequent row is one card: cell 1 = image, cell 2 = text content
 * (tags/date meta, heading, optional CTA link).
 * Source cards are `a.article-card` link wrappers.
 */
export default function parse(element, { document }) {
  let cardEls = Array.from(
    element.querySelectorAll(':scope > a.article-card, :scope > a.card-link')
  );
  if (!cardEls.length) {
    cardEls = Array.from(element.querySelectorAll(':scope > a'));
  }

  // Empty-block guard.
  if (!cardEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  cardEls.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const body = card.querySelector('.article-card-body');

    // Cell 1: image.
    const imageCell = img || '';

    // Cell 2: text content — body plus a CTA link preserving the card href.
    const textCell = [];
    if (body) {
      textCell.push(...Array.from(body.childNodes));
    } else {
      // Fall back to any headings/text if body wrapper absent.
      textCell.push(...Array.from(card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span')));
    }
    const href = card.getAttribute('href');
    if (href) {
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading ? heading.textContent.trim() : 'Read more';
      textCell.push(link);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
