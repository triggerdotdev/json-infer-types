import { Address6, Address4 } from "ip-address";

export type JSONIPAddressFormat = {
  name: "ip";
  variant: "v4" | "v6";
};

export function inferIpAddress(value: string): JSONIPAddressFormat | undefined {
  try {
    const ipv6 = new Address6(value);

    if (ipv6) {
      return {
        name: "ip",
        variant: "v6",
      };
    }
  } catch (error) {
    // Ignore
  }

  try {
    const ipv4 = new Address4(value);

    if (ipv4) {
      return {
        name: "ip",
        variant: "v4",
      };
    }
  } catch (error) {
    // Ignore
  }

  return undefined;
}
