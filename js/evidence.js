// Reads the real capture date from a proof file, on the user's device.
// Uses the exifr library for photos (loaded in index.html as a global).

// ---- Real capture date of a proof file ----
// The browser's file.lastModified is when the file was last saved on this device
// (downloaded, copied, forwarded), NOT when it was recorded. So we read the date
// stored inside the file instead, and say so honestly when there is none.
const fmtDate = (d) =>
  new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

async function photoDate(file) {
  if (!window.exifr) return null;
  try {
    const t = await exifr.parse(file, ["DateTimeOriginal", "CreateDate"]);
    const d = t?.DateTimeOriginal || t?.CreateDate;
    return d instanceof Date && !isNaN(d) ? d : null;
  } catch (e) {
    return null;
  }
}

// MP4 / MOV videos keep their creation time in the "mvhd" box,
// counted in seconds from 1 Jan 1904 (UTC). It can sit at the start or the end of the file.
async function videoDate(file) {
  const CHUNK = 4 * 1024 * 1024;
  const parts = [[0, Math.min(file.size, CHUNK)]];
  if (file.size > CHUNK)
    parts.push([Math.max(0, file.size - CHUNK), file.size]);
  for (const [a, b] of parts) {
    const buf = new Uint8Array(await file.slice(a, b).arrayBuffer());
    for (let i = 4; i < buf.length - 24; i++) {
      if (
        buf[i] === 0x6d &&
        buf[i + 1] === 0x76 &&
        buf[i + 2] === 0x68 &&
        buf[i + 3] === 0x64
      ) {
        // "mvhd"
        const dv = new DataView(buf.buffer, buf.byteOffset + i + 4);
        const version = dv.getUint8(0);
        const secs =
          version === 1 ? Number(dv.getBigUint64(4)) : dv.getUint32(4);
        if (!secs) return null;
        const d = new Date(Date.UTC(1904, 0, 1) + secs * 1000);
        return d.getFullYear() > 2000 && d <= new Date() ? d : null;
      }
    }
  }
  return null;
}

async function captureDate(file) {
  try {
    if (file.type.startsWith("image/")) return await photoDate(file);
    if (
      file.type.startsWith("video/") ||
      /\.(mp4|mov|m4v|3gp)$/i.test(file.name)
    )
      return await videoDate(file);
  } catch (e) {}
  return null; // audio and anything else: we don't guess
}

export { fmtDate, captureDate };
