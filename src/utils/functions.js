//for some funtions
export function isStringEmpty(string) {
  return /^\s*$/.test(string);
}

export function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
