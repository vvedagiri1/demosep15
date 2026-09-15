/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters site-wide cleanup.
 * Removes non-authorable site chrome (nav, footer, skip link, breadcrumbs)
 * and strips Astro build-artifact attributes.
 *
 * All selectors verified against migration-work/cleaned.html:
 *   - a.skip-link .................. "Skip to main content" link (body top)
 *   - div.navbar ................... global top navigation + mega menu
 *   - footer.footer ................ global site footer
 *   - .breadcrumbs ................. breadcrumb trail inside featured-case-study section
 *   - data-astro-cid-* ............. Astro framework build attributes (non-authorable)
 *
 * NOTE: The hero-collage block is authored as <header class="section secondary-section">
 * inside #main-content, so we must NOT remove `header` broadly — only `div.navbar`.
 */

const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome (selectors from cleaned.html).
    WebImporter.DOMUtils.remove(element, [
      'a.skip-link',
      'div.navbar',
      'footer.footer',
      '.breadcrumbs',
    ]);

    // Strip Astro build-artifact attributes (e.g. data-astro-cid-37fxchfa,
    // data-astro-cid-rbygaycu) — present in cleaned.html, not authorable.
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith('data-astro-cid')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}
