export default function decorate(block) {
  const rows = [...block.children];

  const textCol = document.createElement('div');
  textCol.className = 'hero-collage-text';
  const mediaCol = document.createElement('div');
  mediaCol.className = 'hero-collage-media';

  rows.forEach((row) => {
    const cell = row.firstElementChild || row;
    if (cell.querySelector('picture, img')) {
      [...cell.querySelectorAll('picture, img')].forEach((el) => {
        const media = el.closest('picture') || el;
        mediaCol.append(media);
      });
    } else {
      [...cell.childNodes].forEach((node) => textCol.append(node));
    }
  });

  block.textContent = '';
  if (textCol.childNodes.length) block.append(textCol);
  if (mediaCol.childElementCount) block.append(mediaCol);
}
