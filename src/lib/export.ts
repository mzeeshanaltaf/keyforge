/** Serialize generated values to a pretty-printed JSON array. */
export function toJSON(values: string[], key = "value"): string {
  const rows = values.map((v, i) => ({ index: i + 1, [key]: v }));
  return JSON.stringify(rows, null, 2);
}

/** Serialize generated values to CSV with an index column. RFC-4180 escaping. */
export function toCSV(values: string[], header = "value"): string {
  const escape = (s: string) =>
    /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  const lines = [
    `index,${escape(header)}`,
    ...values.map((v, i) => `${i + 1},${escape(v)}`),
  ];
  return lines.join("\r\n");
}

/** Trigger a client-side file download for the given text content. */
export function downloadFile(
  filename: string,
  content: string,
  mime: string,
): void {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Copy text to the clipboard, with a legacy fallback for older browsers. */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  ta.remove();
}
