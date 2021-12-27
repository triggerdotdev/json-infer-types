import { JSONPhoneNumberFormat } from "../@types";

const phoneNumberRegex = /^\+[0-9]{6,15}$/;

export function inferPhoneNumber(
  value: string
): JSONPhoneNumberFormat | undefined {
  const cleanedValue = value.replace(/[\s-()]/g, "");

  if (phoneNumberRegex.test(cleanedValue)) {
    return {
      name: "phoneNumber",
      variant: "e.164",
    };
  }
}
