/* ==========================================================================
   printHtmlDocument — render a self-contained HTML document to PDF via the
   browser's own print engine. Writes the HTML into an off-screen iframe,
   waits for fonts + images, then prints THAT window so the app UI isn't
   included. The user picks "Save as PDF" in the print dialog — vector-crisp
   output that matches a headless-Chrome render. Shared by the OTJ and
   portfolio evidence packs.
   ========================================================================== */

export async function printHtmlDocument(html: string): Promise<void> {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.cssText =
    'position:fixed;right:0;bottom:0;width:0;height:0;border:0;overflow:hidden';
  document.body.appendChild(iframe);

  const idoc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!idoc || !win) {
    document.body.removeChild(iframe);
    throw new Error('Could not prepare the document for printing');
  }

  idoc.open();
  idoc.write(html);
  idoc.close();

  // Let layout settle, then wait for fonts and every embedded image.
  await new Promise((r) => setTimeout(r, 80));
  try {
    await idoc.fonts?.ready;
  } catch {
    /* fonts API optional */
  }
  await Promise.all(
    Array.from(idoc.images).map((im) =>
      im.complete
        ? Promise.resolve()
        : new Promise<void>((res) => {
            im.onload = () => res();
            im.onerror = () => res();
          })
    )
  );

  let removed = false;
  const cleanup = () => {
    if (removed) return;
    removed = true;
    try {
      document.body.removeChild(iframe);
    } catch {
      /* already gone */
    }
  };
  win.onafterprint = () => setTimeout(cleanup, 200);
  win.focus();
  win.print();
  // Safety net if afterprint never fires (some browsers).
  setTimeout(cleanup, 60_000);
}
