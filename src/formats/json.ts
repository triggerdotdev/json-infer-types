import JSON5 from "json5";

export type JSONJSONFormat = {
  name: "json";
  variant: "ecma262" | "json5";
};

export function inferJson(value: string): JSONJSONFormat | undefined {
  try {
    const parsedValue = JSON.parse(value);

    if (typeof parsedValue === "object") {
      return {
        name: "json",
        variant: "ecma262",
      };
    }
  } catch {
    // Ignore
  }

  try {
    const parsedValue = JSON5.parse(value);

    if (typeof parsedValue === "object") {
      return {
        name: "json",
        variant: "json5",
      };
    }
  } catch {
    // Ignore
  }

  return undefined;
}
