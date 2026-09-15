/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-testimonial. Base: tabs.
 * Source: https://www.wknd-trendsetters.site/
 * Generated: 2026-09-15
 *
 * Library convention (Tabs): 2 columns; row 1 is block name.
 * Each subsequent row is one tab: cell 1 = tab label, cell 2 = tab content.
 * Source keeps labels in `.tab-menu .tab-menu-link` buttons and content in
 * `.tabs-content .tab-pane` panels, linked by index (data-tab-target/index).
 */
export default function parse(element, { document }) {
  const panes = Array.from(
    element.querySelectorAll('.tabs-content .tab-pane, .tab-pane')
  );
  const menuLinks = Array.from(
    element.querySelectorAll('.tab-menu .tab-menu-link, [role="tab"]')
  );

  // Empty-block guard.
  if (!panes.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  panes.forEach((pane, i) => {
    // Label cell: prefer the matching menu button's inner content; fall back to
    // deriving a text label from the pane.
    const menu = menuLinks[i];
    let labelCell;
    if (menu) {
      // Use the button's inner content (avatar + name + role).
      labelCell = Array.from(menu.childNodes);
    } else {
      const name = pane.querySelector('strong, h1, h2, h3, h4, h5, h6');
      labelCell = name ? [name.cloneNode(true)] : [`Tab ${i + 1}`];
    }

    // Content cell: the full pane content.
    const contentCell = Array.from(pane.childNodes);

    cells.push([labelCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
