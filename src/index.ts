import { JSONValueType } from "./@types";
import { inferFormat } from "./formats";

export { JSONValueType };

export function inferType(value: unknown): JSONValueType {
  if (value === null) {
    return { name: "null", value: null };
  }

  if (typeof value === "boolean") {
    return { name: "bool", value };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { name: "int", value };
    } else {
      return { name: "float", value };
    }
  }

  if (typeof value === "string") {
    return { name: "string", value, format: inferFormat(value) };
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return {
        name: "array",
        value: value,
      };
    }

    return {
      name: "object",
      value,
    };
  }

  return { name: "null", value: null };
}
