import { version, validate } from "uuid";

export type JSONUUIDFormat = {
  name: "uuid";
  variant: "v1" | "v4" | "v5";
};

function validateVersion(uuid: string, versionNumber: 1 | 3 | 4 | 5): boolean {
  return validate(uuid) && version(uuid) === versionNumber;
}

export function inferUuid(value: string): JSONUUIDFormat | undefined {
  if (validateVersion(value, 1)) {
    return {
      name: "uuid",
      variant: "v1",
    };
  }

  if (validateVersion(value, 4)) {
    return {
      name: "uuid",
      variant: "v4",
    };
  }

  if (validateVersion(value, 5)) {
    return {
      name: "uuid",
      variant: "v5",
    };
  }

  return undefined;
}
