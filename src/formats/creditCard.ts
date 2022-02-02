export type JSONCreditCardFormat = {
  name: "creditcard";
  variant: "visa" | "amex" | "discover" | "mastercard" | "dinersclub";
};

const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
const amexRegex = /^3[47][0-9]{13}$/;
const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
const masterCardRegex =
  /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/;
const dinersClubRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;

export function inferCreditCard(value: string): JSONCreditCardFormat | undefined {
  const withoutWhitespace = value.replace(/\s/g, "");

  if (visaRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "visa",
    };
  } else if (amexRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "amex",
    };
  } else if (discoverRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "discover",
    };
  } else if (masterCardRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "mastercard",
    };
  } else if (dinersClubRegex.test(withoutWhitespace)) {
    return {
      name: "creditcard",
      variant: "dinersclub",
    };
  }

  return undefined;
}
