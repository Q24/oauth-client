export function clearQueryParameters(): void {
  window.history.replaceState({}, document.title, window.location.pathname);
}
