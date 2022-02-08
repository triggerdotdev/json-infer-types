export type JSONURIFormat = {
  name: "uri";
  contentType?: string;
};

function lookupMimeType(ext?: string): string | undefined {
  if (ext === undefined) {
    return undefined;
  }

  const extensionToMimeType: Record<string, string> = {
    json: "application/json",
    js: "application/javascript",
    html: "text/html",
    css: "text/css",
    txt: "text/plain",
    ts: "text/typescript",
    tsx: "text/typescript",
    aac: "audio/aac",
    abw: "application/x-abiword",
    arc: "application/x-freearc",
    avi: "video/x-msvideo",
    azw: "application/vnd.amazon.ebook",
    bin: "application/octet-stream",
    bmp: "image/bmp",
    bz: "application/x-bzip",
    bz2: "application/x-bzip2",
    cda: "application/x-cdf",
    csh: "application/x-csh",
    csv: "text/csv",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    eot: "application/vnd.ms-fontobject",
    epub: "application/epub+zip",
    gz: "application/gzip",
    gif: "image/gif",
    htm: "text/html",
    ico: "image/vnd.microsoft.icon",
    ics: "text/calendar",
    jar: "application/java-archive",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    jsonld: "application/ld+json",
    mid: "audio/midi",
    midi: "audio/midi",
    mjs: "text/javascript",
    mp3: "audio/mpeg",
    mp4: "video/mp4",
    mpeg: "video/mpeg",
    mpkg: "application/vnd.apple.installer+xml",
    odp: "application/vnd.oasis.opendocument.presentation",
    ods: "application/vnd.oasis.opendocument.spreadsheet",
    odt: "application/vnd.oasis.opendocument.text",
    oga: "audio/ogg",
    ogv: "video/ogg",
    ogx: "application/ogg",
    opus: "audio/opus",
    otf: "font/otf",
    png: "image/png",
    pdf: "application/pdf",
    php: "application/x-httpd-php",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    rar: "application/vnd.rar",
    rtf: "application/rtf",
    sh: "application/x-sh",
    svg: "image/svg+xml",
    swf: "application/x-shockwave-flash",
    tar: "application/x-tar",
    tif: "image/tiff",
    tiff: "image/tiff",
    ttf: "font/ttf",
    vsd: "application/vnd.visio",
    wav: "audio/wav",
    weba: "audio/webm",
    webm: "video/webm",
    webp: "image/webp",
    woff: "font/woff",
    woff2: "font/woff2",
    xhtml: "application/xhtml+xml",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xml: "application/xml",
    xul: "application/vnd.mozilla.xul+xml",
    zip: "application/zip",
    "3gp": "video/3gpp",
    "3g2": "video/3gpp2",
    "7z": "application/x-7z-compressed",
    md: "text/markdown",
  };

  return extensionToMimeType[ext];
}

export function inferUri(value: string): JSONURIFormat | undefined {
  try {
    const url = new URL(value);

    // Get mimetype from extension
    const ext = url.pathname.split(".").pop();
    const mimeType = lookupMimeType(ext);

    return {
      name: "uri",
      contentType: mimeType ? mimeType : undefined,
    };
  } catch (_) {
    // Ignore
  }

  return undefined;
}
