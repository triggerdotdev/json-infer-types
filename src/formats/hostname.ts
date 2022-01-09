import path from "path";

const filenameExtensions = [
  ".7z",
  ".aac",
  ".au",
  ".avi",
  ".bmp",
  ".bz2",
  ".css",
  ".csv",
  ".dmg",
  ".doc",
  ".docx",
  ".eot",
  ".epub",
  ".flac",
  ".flv",
  ".gif",
  ".gz",
  ".htm",
  ".html",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".json",
  ".key",
  ".m2v",
  ".m4a",
  ".m4v",
  ".m4v",
  ".md",
  ".mov",
  ".mp2",
  ".mp3",
  ".mp4",
  ".mpe",
  ".mpeg",
  ".mpeg",
  ".mpg",
  ".mpg",
  ".mpv",
  ".mxf",
  ".numbers",
  ".odt",
  ".ogg",
  ".ogv",
  ".pages",
  ".pdf",
  ".png",
  ".ppt",
  ".pptx",
  ".psd",
  ".rar",
  ".raw",
  ".rtf",
  ".svg",
  ".swf",
  ".tar",
  ".tgz",
  ".tif",
  ".tiff",
  ".ts",
  ".tsv",
  ".ttf",
  ".txt",
  ".wav",
  ".webp",
  ".wmv",
  ".woff",
  ".woff2",
  ".xls",
  ".xlsx",
  ".xml",
  ".xz",
  ".yaml",
  ".yml",
  ".z",
  ".zip",
];

function isNotFilename(value: string): boolean {
  const extname = path.extname(value);

  return extname === "" || !filenameExtensions.includes(extname);
}

export type JSONHostnameFormat = {
  name: "hostname";
  variant: "rfc1123" | "rfc5890";
};

function isValidHostname(value: string, allowUnderscore = false): boolean {
  if (value.length === 0) {
    return false;
  }

  if (value === "localhost") {
    return true;
  }

  if (!value.includes(".")) {
    return false;
  }

  const validHostnameChars = new RegExp(
    `^[a-zA-Z0-9-.${allowUnderscore ? "_" : ""}]{1,253}.?$`,
    "g",
  );
  if (!validHostnameChars.test(value)) {
    return false;
  }

  if (value.endsWith(".")) {
    value = value.slice(0, value.length - 1);
  }

  const labels = value.split(".");

  const isValid = labels.every(function (label) {
    const validLabelChars = new RegExp(`^([a-zA-Z0-9-${allowUnderscore ? "_" : ""}]+)$`, "g");

    const validLabel =
      validLabelChars.test(label) &&
      label.length < 64 &&
      !label.startsWith("-") &&
      !label.endsWith("-");

    return validLabel;
  });

  return isValid && isNotFilename(value);
}

export function inferHostname(value: string): JSONHostnameFormat | undefined {
  if (isValidHostname(value)) {
    return {
      name: "hostname",
      variant: "rfc1123",
    };
  }

  if (isValidHostname(value, true)) {
    return {
      name: "hostname",
      variant: "rfc5890",
    };
  }

  return undefined;
}
