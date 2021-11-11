/**
 * destroy an iframe in a IE11 friendly-manner.
 * @param iFrame the iframe to destroy
 */
export function destroyIframe(iFrame: HTMLIFrameElement): void {
  // We use parent.removeChild instead of element.remove to support IE.
  if (iFrame.parentElement) {
    iFrame.parentElement.removeChild(iFrame);
  }
}

/**
 * Stores Promises for the load Iframe functions temporarily.
 *
 * If a method is called concurrently with the same URL, only 1 iframe instance
 * will be created. The rest of these concurrent calls will return the saved
 * Promise.
 */
const iframeStore: {
  [key: string]: Promise<string> | undefined;
} = {};

/**
 * Loads a URL and returns the resulting URL.
 *
 * @param url the url to load
 * @returns the loaded url
 */
export function loadIframeUrl(url: string): Promise<string> {
  const storedPromise = iframeStore[url];
  if (storedPromise) {
    return storedPromise;
  }

  const promise = new Promise<string>((resolve, reject) => {
    const iFrame = document.createElement("iframe");
    iFrame.id = url;
    iFrame.style.display = "none";

    iFrame.onload = () => {
      if (!iFrame.contentWindow) {
        reject("iframe does not have content window");
        return;
      }
      resolve(iFrame.contentWindow.location.href);
    };
  }).finally(() => {
    if (iframeStore[url]) {
      delete iframeStore[url];
    }
  });

  iframeStore[url] = promise;

  return promise;
}
