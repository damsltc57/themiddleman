// Static, sub-byte colour dithering prevents visible bands in the near-black ramp.
// This is quantisation correction, not animated or decorative grain.
const hero = document.querySelector('.central-hero');
const canvas = document.createElement('canvas');
canvas.className = 'hero-background';
canvas.setAttribute('aria-hidden', 'true');
const context = canvas.getContext('2d', { alpha: false });
if (hero && context) {
  let frame = 0, previous = '';
  const draw = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    const width = Math.round(hero.clientWidth * ratio);
    const height = Math.round(hero.clientHeight * ratio);
    const size = `${width}:${height}`;
    if (!width || !height || size === previous) return;
    previous = size;
    canvas.width = width; canvas.height = height;
    const image = context.createImageData(width, height);
    const center = [30, 22, 17], edge = [10, 8, 7];
    let seed = 21;
    for (let y = 0; y < height; y++) {
      const dy = (y / height - .45) / .78;
      for (let x = 0; x < width; x++) {
        const dx = (x / width - .5) / .71;
        const distance = Math.min(1, Math.hypot(dx, dy));
        // Cosine falloff has no stop boundaries or slope discontinuities.
        const light = .5 + .5 * Math.cos(Math.PI * distance);
        seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
        const threshold = (seed >>> 0) / 4294967296;
        const offset = (y * width + x) * 4;
        for (let c = 0; c < 3; c++) {
          const value = edge[c] + (center[c] - edge[c]) * light;
          image.data[offset + c] = Math.floor(value + threshold);
        }
        image.data[offset + 3] = 255;
      }
    }
    context.putImageData(image, 0, 0);
    if (!canvas.isConnected) hero.prepend(canvas);
  };
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame); frame = requestAnimationFrame(draw);
  });
  observer.observe(hero);
  window.addEventListener('pagehide', event => {
    if (!event.persisted) { observer.disconnect(); cancelAnimationFrame(frame); }
  });
  draw();
}
