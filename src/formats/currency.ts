export type JSONCurrencyFormat = {
  name: "currency";
  variant: "iso4217" | "english" | "crypto";
};

const iso4217Regex =
  /^(?:(AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BOV|BRL|BSD|BTC|BTN|BWP|BYN|BZD|CAD|CDF|CHE|CHF|CHW|CLF|CLP|CNY|COP|COU|CRC|CUC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MXV|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLL|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TWD|TZS|UAH|UGX|USD|USN|UYI|UYU|UYW|UZS|VED|VES|VND|VUV|WST|XAF|XAG|XAU|XBA|XBB|XBC|XBD|XCD|XDR|XOF|XPD|XPF|XPT|XSU|XTS|XUA|XXX|YER|ZAR|ZMW|ZWL))$/;

const cryptoRegex =
  /^(?:(XBT|XDG|XLM|XMR|XRP|XZC|ETH|LTC|BNB|USDT|SOL|ADA|USDC|LUNA|AVAX|DOT|DOGE|SHIB|MATIC|CRO|BUSD|WBTC|UNI|LINK|UST|DAI|ALGO|BCH))$/;

const englishNamesRegex =
  /^(?:(U.?S.?\sDollar|Euro|United\sStates\sdollar|Japanese\sYen|Swiss\sFranc|Australian\sDollar|British\sPound|Canadian\sDollar|South\sAfrican\sRand))$/;

export function inferCurrency(value: string): JSONCurrencyFormat | undefined {
  if (iso4217Regex.exec(value)) {
    return {
      name: "currency",
      variant: "iso4217",
    };
  }

  if (cryptoRegex.exec(value)) {
    return {
      name: "currency",
      variant: "crypto",
    };
  }

  if (englishNamesRegex.exec(value)) {
    return {
      name: "currency",
      variant: "english",
    };
  }

  return undefined;
}
