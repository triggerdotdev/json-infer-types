import { JSONStringFormat } from "../@types";

const rfc5321AddressRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;

const rfc5321Regex = new RegExp(`^${rfc5321AddressRegex.source}$`);

const rfc5322Regex = new RegExp(`^[^"]+<${rfc5321AddressRegex.source}>$`);

export function inferEmail(value: string): JSONStringFormat | undefined {
  if (rfc5321Regex.exec(value)) {
    return { name: "email", variant: "rfc5321" };
  }

  if (rfc5322Regex.exec(value)) {
    return { name: "email", variant: "rfc5322" };
  }

  return undefined;
}
