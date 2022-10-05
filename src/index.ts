import { JSONValueType } from "./@types";
import { inferFormat, inferObjectFormat, inferIntFormat } from "./formats";

export { JSONValueType };
export {
  JSONStringFormat,
  JSONObjectFormat,
  JSONHostnameFormat,
  JSONUUIDFormat,
  JSONURIFormat,
  JSONPhoneNumberFormat,
  JSONLanguageFormat,
  JSONIPAddressFormat,
  JSONTLDFormat,
  JSONCountryFormat,
  JSONCurrencyFormat,
  JSONEmailFormat,
  JSONTimestampFormat,
  JSONDateTimeFormat,
  JSONFilesizeFormat,
  JSONJSONFormat,
  JSONJSONPointerFormat,
  JSONEmojiFormat,
  JSONSemverFormat,
  JSONJWTStringFormat,
} from "./formats";
export {
  JSONNullType,
  JSONBoolType,
  JSONFloatType,
  JSONIntType,
  JSONStringType,
  JSONObjectType,
  JSONArrayType,
} from "./@types";

export function inferType(value: unknown): JSONValueType {
  if (value == null) {
    return { name: "null", value: null };
  }

  if (typeof value === "boolean") {
    return { name: "bool", value };
  }

  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { 
        name: "int", 
        value,
        format: inferIntFormat(value),
      };
    } else {
      return { name: "float", value };
    }
  }

  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return {
        name: "array",
        value,
      };
    }

    return {
      name: "object",
      format: inferObjectFormat(value),
      value,
    };
  }

  if (typeof value === "string") {
    return {
      name: "string",
      value,
      format: inferFormat(value),
    };
  }

  return { name: "null", value: null };
}
