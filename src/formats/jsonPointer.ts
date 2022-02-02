export type JSONJSONPointerFormat = {
  name: "jsonPointer";
  variant: "rfc6901";
};

const rfc6901Regex = /^(?:\/(?:[^~/]|~0|~1)*)*$/;

export function inferJsonPointer(value: string): JSONJSONPointerFormat | undefined {
  if (rfc6901Regex.exec(value)) {
    return { name: "jsonPointer", variant: "rfc6901" };
  }

  return undefined;
}
