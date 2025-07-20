export function formatTime(isoString) {
  const date = new Date(isoString);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour24: true,
  });
}
