import { JSONJSONFormat } from "../@types";

export function inferJson(value: string): JSONJSONFormat | undefined {
  try {
    JSON.parse(value);
    return {
      name: "json",
    };
  } catch {
    return undefined;
  }
}
