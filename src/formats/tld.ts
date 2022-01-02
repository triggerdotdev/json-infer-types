export type JSONTLDFormat = {
  name: "tld";
};

export function inferTld(value: string): JSONTLDFormat | undefined {
  const tldRegex = /^\.\w{2,14}(\.\w{2,14})*$/i;

  if (tldRegex.test(value)) {
    return {
      name: "tld",
    };
  }

  return undefined;
}
