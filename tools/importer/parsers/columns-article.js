/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Columns): multiple columns/rows; row 1 is block name.
 * Column count derived from source: the inner grid holds two direct children —
 * an image column and a text column (breadcrumbs, heading, author/meta).
 */
export default function parse(element, { document }) {
  // Locate the inner grid whose direct children are the columns.
  const grid = element.querySelector('.grid-layout') || element.querySelector(':scope > div');
  const columnEls = grid
    ? Array.from(grid.querySelectorAll(':scope > div'))
    : Array.from(element.querySelectorAll(':scope > div'));

  // Empty-block guard.
  if (!columnEls.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Single content row: one cell per column, preserving each column's inner content.
  const row = columnEls.map((col) => col);
  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
