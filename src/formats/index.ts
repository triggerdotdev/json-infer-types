// This is the order the formats will be run in
import { inferDatetime, JSONDateTimeFormat } from "./datetime";
import { inferTimestamp, JSONTimestampFormat } from "./timestamp";
import { inferEmail, JSONEmailFormat } from "./email";
import { inferCurrency, JSONCurrencyFormat } from "./currency";
import { inferCountry, JSONCountryFormat } from "./country";
import { inferTld, JSONTLDFormat } from "./tld";
import { inferIpAddress, JSONIPAddressFormat } from "./ipAddress";
import { inferLanguage, JSONLanguageFormat } from "./language";
import { inferPhoneNumber, JSONPhoneNumberFormat } from "./phoneNumber";
import { inferUri, JSONURIFormat } from "./uri";
import { inferUuid, JSONUUIDFormat } from "./uuid";
import { inferFilesize, JSONFilesizeFormat } from "./filesize";
import { inferHostname, JSONHostnameFormat } from "./hostname";
import { inferJson, JSONJSONFormat } from "./json";

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

const formats = [
  inferDatetime,
  inferTimestamp,
  inferEmail,
  inferCurrency,
  inferCountry,
  inferTld,
  inferIpAddress,
  inferLanguage,
  inferPhoneNumber,
  inferUri,
  inferUuid,
  inferFilesize,
  inferHostname,
  inferJson,
];

export function inferFormat(value: string): JSONStringFormat | undefined {
  for (const [, format] of Object.entries(formats)) {
    const result = format(value);

    if (result) {
      return result;
    }
  }

  return undefined;
}
