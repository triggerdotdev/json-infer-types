import { URL } from "url";
import { JSONURIFormat } from "../@types";
import mime from "mime-types";
import path from "path";

export function inferUri(value: string): JSONURIFormat | undefined {
  try {
    const url = new URL(value);

    // Get mimetype from extension
    const ext = path.extname(url.pathname);
    const mimeType = mime.lookup(ext);

    return {
      name: "uri",
      contentType: mimeType ? mimeType : undefined,
    };
  } catch (_) {
    // Ignore
  }

  return undefined;
}
