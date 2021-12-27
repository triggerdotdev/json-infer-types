import { JSONJSONFormat } from "../@types";
import JSON5 from "json5";

export function inferJson(value: string): JSONJSONFormat | undefined {
  try {
    JSON.parse(value);
    return {
      name: "json",
      variant: "ecma262",
    };
  } catch {
    // Ignore
  }

  try {
    JSON5.parse(value);
    return {
      name: "json",
      variant: "json5",
    };
  } catch {
    // Ignore
  }

  return undefined;
}
