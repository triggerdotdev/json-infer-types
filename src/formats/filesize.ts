import { JSONFilesizeFormat } from "../@types";

export function inferFilesize(value: string): JSONFilesizeFormat | undefined {
  if (value.match(/^[0-9.]+\s?(?:(B|MB|K|GB|TB|PB|MiB|KB|kB))$/)) {
    return {
      name: "filesize",
      variant: "human",
    };
  }

  return undefined;
}
