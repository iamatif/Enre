export function smoothScrollToElement(el: HTMLElement | null, offset = 0, duration = 900) {
  if (!el) return;
  const startY = window.scrollY;
  const targetY = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
}
