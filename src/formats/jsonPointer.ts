export type JSONJSONPointerFormat = {
  name: "jsonPointer";
  variant: "rfc6901" | "relative";
};

const rfc6901Regex = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
const draftLuffRegex = /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;

export function inferJsonPointer(value: string): JSONJSONPointerFormat | undefined {
  if (rfc6901Regex.exec(value)) {
    return { name: "jsonPointer", variant: "rfc6901" };
  }

  if (draftLuffRegex.exec(value)) {
    return { name: "jsonPointer", variant: "relative" };
  }

  return undefined;
}
