export type JSONDateTimeFormat = {
  name: "datetime";
  parts: "datetime" | "date" | "time";
  variant: "rfc2822" | "rfc3339";
};

export type JSONTimestampFormat = {
  name: "timestamp";
  variant:
    | "millisecondsSinceEpoch"
    | "nanosecondsSinceEpoch"
    | "secondsSinceEpoch";
};

export type JSONEmailFormat = {
  name: "email";
  variant: "rfc5321" | "rfc5322";
};

export type JSONCurrencyFormat = {
  name: "currency";
  variant: "iso4217" | "english" | "crypto";
};

export type JSONCountryFormat = {
  name: "country";
  variant: "iso3166-2" | "iso3166-3";
};

export type JSONTLDFormat = {
  name: "tld";
};

export type JSONIPAddressFormat = {
  name: "ip";
  variant: "v4" | "v6";
};

export type JSONLanguageFormat = {
  name: "language";
  variant: "iso693-1" | "iso693-2" | "english" | "native";
};

export type JSONPhoneNumberFormat = {
  name: "phoneNumber";
  variant: "e.164";
};

export type JSONURIFormat = {
  name: "uri";
  contentType?: string;
};

export type JSONUUIDFormat = {
  name: "uuid";
  variant: "v1" | "v4" | "v5";
};

export type JSONHostnameFormat = {
  name: "hostname";
  variant: "rfc1123" | "rfc5890";
};

export type JSONFilesizeFormat = {
  name: "filesize";
  variant: "human";
};

export type JSONJSONFormat = {
  name: "json";
  variant: "ecma262" | "json5";
};

export type JSONStringFormat =
  | JSONHostnameFormat
  | JSONUUIDFormat
  | JSONURIFormat
  | JSONPhoneNumberFormat
  | JSONLanguageFormat
  | JSONIPAddressFormat
  | JSONTLDFormat
  | JSONCountryFormat
  | JSONCurrencyFormat
  | JSONEmailFormat
  | JSONTimestampFormat
  | JSONDateTimeFormat
  | JSONFilesizeFormat
  | JSONJSONFormat;

export type JSONNullType = {
  name: "null";
};

export type JSONBoolType = {
  name: "bool";
};

export type JSONFloatType = {
  name: "float";
};

export type JSONIntType = {
  name: "int";
};

export type JSONStringType = {
  name: "string";
  format?: JSONStringFormat;
};

export type JSONObjectType = {
  name: "object";
  properties?: Record<string, JSONValueType>;
};

export type JSONArrayType = {
  name: "array";
  items?: JSONValueType | JSONValueType[];
};

export type JSONValueType =
  | JSONStringType
  | JSONBoolType
  | JSONIntType
  | JSONFloatType
  | JSONNullType
  | JSONObjectType
  | JSONArrayType;
