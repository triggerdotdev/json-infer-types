import { JSONValueType } from "./@types";
import { inferFormat, inferObjectFormat } from "./formats";

export { JSONValueType };
export { JSONStringFormat } from "./formats";

export type InferOptions = {
  returnValue?: "yes" | "no";
};

export function inferType(value: unknown, options?: InferOptions): JSONValueType {
  const opts: Required<InferOptions> = Object.assign({}, { returnValue: "yes" }, options);

  const shouldReturnValue = opts.returnValue === "yes";

  if (value === null) {
    return { name: "null", value: shouldReturnValue ? null : undefined };
  }

  if (typeof value === "boolean") {
    return { name: "bool", value: shouldReturnValue ? value : undefined };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { name: "int", value: shouldReturnValue ? value : undefined };
    } else {
      return { name: "float", value: shouldReturnValue ? value : undefined };
    }
  }

  if (typeof value === "string") {
    return {
      name: "string",
      value: shouldReturnValue ? value : undefined,
      format: inferFormat(value),
    };
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return {
        name: "array",
        value: shouldReturnValue ? value : undefined,
      };
    }

    return {
      name: "object",
      format: inferObjectFormat(value),
      value: shouldReturnValue ? value : undefined,
    };
  }

  return { name: "null", value: shouldReturnValue ? null : undefined };
}
