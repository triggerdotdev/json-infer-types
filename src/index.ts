import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";
import { JSONValueType, JSONStringFormat } from "./@types";

import * as formats from "./formats";

type InferTypeOptions = {
  shallow?: boolean;
};

export function inferType(
  value: any,
  options?: InferTypeOptions
): JSONValueType {
  const opts = Object.assign({}, { shallow: false }, options);

  if (value === null) {
    return { name: "null" };
  }

  if (typeof value === "boolean") {
    return { name: "bool" };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { name: "int" };
    } else {
      return { name: "float" };
    }
  }

  if (typeof value === "string") {
    return { name: "string", format: inferFormat(value) };
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      if (opts.shallow) {
        return {
          name: "array",
        };
      }

      const itemTypes = value.map((item) => inferType(item, opts));
      const uniqTypes = uniqWith(itemTypes, isEqual);

      if (uniqTypes.length === 1) {
        return {
          name: "array",
          items: uniqTypes[0],
        };
      }

      return {
        name: "array",
        items: uniqTypes,
      };
    }

    if (opts.shallow) {
      return {
        name: "object",
      };
    }

    return {
      name: "object",
      properties: Object.keys(value).reduce((acc, key) => {
        acc[key] = inferType(value[key]);
        return acc;
      }, {} as Record<string, JSONValueType>),
    };
  }

  return { name: "null" };
}

function inferFormat(value: string): JSONStringFormat | undefined {
  for (const [, format] of Object.entries(formats)) {
    const result = format(value);

    if (result) {
      return result;
    }
  }

  return undefined;
}
