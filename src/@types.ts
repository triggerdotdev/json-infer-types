import { JSONStringFormat, JSONObjectFormat } from "./formats";

export type JSONNullType = {
  name: "null";
  value?: null;
};

export type JSONBoolType = {
  name: "bool";
  value?: boolean;
};

export type JSONFloatType = {
  name: "float";
  value?: number;
};

export type JSONIntType = {
  name: "int";
  value?: number;
};

export type JSONStringType = {
  name: "string";
  format?: JSONStringFormat;
  value?: string;
};

export type JSONObjectType = {
  name: "object";
  format?: JSONObjectFormat;
  value?: object;
};

export type JSONArrayType = {
  name: "array";
  value?: Array<unknown>;
};

export type JSONValueType =
  | JSONStringType
  | JSONBoolType
  | JSONIntType
  | JSONFloatType
  | JSONNullType
  | JSONObjectType
  | JSONArrayType;
