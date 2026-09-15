export default function decorate(block) {
  const rows = [...block.children];

  const media = document.createElement('div');
  media.className = 'hero-overlay-media';
  const content = document.createElement('div');
  content.className = 'hero-overlay-content';

  rows.forEach((row) => {
    const cell = row.firstElementChild || row;
    const pic = cell.querySelector('picture');
    // A cell holding only a background image goes to the media layer;
    // everything else (heading, subheading, CTA) goes to the content overlay.
    if (pic && !cell.textContent.trim()) {
      media.append(pic);
    } else {
      [...cell.childNodes].forEach((node) => content.append(node));
    }
  });

  block.textContent = '';
  if (media.childElementCount) block.append(media);
  block.append(content);
}
