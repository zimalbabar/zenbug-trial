export default function collectMetadata() {
  return {
    url: window.location.href,
    browser: navigator.userAgent,
    os: navigator.platform,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
  };
}
