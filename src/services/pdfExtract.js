let pdfjsLib = null;

async function loadPdfJs() {
  if (pdfjsLib) return pdfjsLib;
  pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  return pdfjsLib;
}

export async function extractTextFromPdf(file, maxChars = 30000) {
  const lib = await loadPdfJs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
  const totalPages = pdf.numPages;
  let text = '';

  for (let i = 1; i <= totalPages; i++) {
    if (text.length >= maxChars) break;
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += `\n--- Page ${i} ---\n${pageText}`;
  }

  return {
    text: text.slice(0, maxChars),
    totalPages,
    truncated: text.length >= maxChars,
  };
}
